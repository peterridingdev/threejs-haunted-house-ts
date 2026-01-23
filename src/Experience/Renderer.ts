import * as THREE from 'three';
import Experience from './Experience.js';
import Camera from './Camera.js';
import Sizes from './Utils/Sizes.js';

export default class Renderer {
  public instance!: THREE.WebGLRenderer;

  private canvas: HTMLCanvasElement;
  private sizes: Sizes;
  private scene: THREE.Scene;
  private camera: Camera;

  constructor(private experience: Experience) {
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance();
  }

  /** Initialize the WebGLRenderer */
  private setInstance(): void {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;

    this.resize(); // apply initial size and pixel ratio
  }

  /** Update renderer size on resize */
  public resize(): void {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  /** Render the scene each frame */
  public update(): void {
    this.instance.render(this.scene, this.camera.instance);
  }
}
