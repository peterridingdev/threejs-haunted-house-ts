import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World';
import Resources from './Utils/Resources';
import { sources } from './sources';

declare global {
  interface Window {
    experience: Experience;
  }
}

export default class Experience {
  // Singleton instance
  private static instance: Experience;

  canvas!: HTMLCanvasElement;
  sizes!: Sizes;
  time!: Time;
  scene!: THREE.Scene;
  camera!: Camera;
  renderer!: Renderer;
  world!: World;
  resources!: Resources;

  constructor(canvas: HTMLCanvasElement) {
    // Return existing instance if already created
    if (Experience.instance) return Experience.instance;

    // Set singleton instance
    Experience.instance = this;

    // Expose globally (optional, but useful for debugging)
    window.experience = this;

    // Initialize core systems
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera(this);
    this.renderer = new Renderer(this);
    this.resources = new Resources(sources);
    this.world = new World(this);

    // Event listeners
    this.sizes.on('resize', () => this.resize());
    this.time.on('tick', () => this.update());

    return this; // explicit return for clarity
  }

  resize(): void {
    this.camera.resize();
    this.renderer.resize();
  }

  update(): void {
    this.world.update();
    this.camera.update();
    this.renderer.update();
  }
}
