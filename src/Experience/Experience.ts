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

  public canvas!: HTMLCanvasElement;
  public sizes!: Sizes;
  public time!: Time;
  public scene!: THREE.Scene;
  public camera!: Camera;
  public renderer!: Renderer;
  public world!: World;
  public resources!: Resources;

  constructor(canvas: HTMLCanvasElement) {
    if (Experience.instance) return Experience.instance;

    Experience.instance = this;
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
    this.sizes.on('resize', this.resize.bind(this));
    this.time.on('tick', this.update.bind(this));

    return this;
  }

  /** Resize all systems */
  public resize(): void {
    this.camera.resize();
    this.renderer.resize();
  }

  /** Update loop called every frame */
  public update(): void {
    this.world.update();
    this.camera.update();
    this.renderer.update();
  }
}
