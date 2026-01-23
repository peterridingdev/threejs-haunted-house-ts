import * as THREE from 'three';
import Experience from './Experience.js';
import Camera from './Camera.js';

export default class Renderer {
  private canvas: HTMLCanvasElement;
  private sizes: any; // Keep minimal; ideally type Sizes interface
  private scene: THREE.Scene;
  private camera: Camera; // Camera class instance
  public instance!: THREE.WebGLRenderer; // ! tells TS it will be initialized

  constructor(private experience: Experience) {
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance();
  }

  setInstance(): void {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;

    // First size setup
    this.instance.setSize(this.sizes.width, this.sizes.height);

    // Set pixel ratio
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize(): void {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update(): void {
    this.instance.render(this.scene, this.camera.instance);
  }
}
