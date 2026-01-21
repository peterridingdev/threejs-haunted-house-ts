import * as THREE from 'three';
import Experience from './Experience';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Camera {
  // Public
  public instance!: THREE.PerspectiveCamera;
  public controls!: OrbitControls;

  // Private references
  private experience: Experience;
  private sizes: { width: number; height: number };
  private scene: THREE.Scene;
  private canvas: HTMLCanvasElement;

  constructor(experience: Experience) {
    this.experience = experience;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    // Initialize camera + controls
    this.setInstance();
    this.setControls();
  }

  private setInstance(): void {
    this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }

  private setControls(): void {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  public resize(): void {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  public update(): void {
    this.controls.update();
  }

  // Fallback if no canvas exists yet (strict TS safe)
  private createCanvas(): HTMLCanvasElement {
    const canvas = document.querySelector<HTMLCanvasElement>('canvas.webgl');
    if (!canvas) throw new Error('Canvas not found');
    return canvas;
  }
}
