import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";

let instance: Experience | null = null;

declare global {
  interface Window {
    experience: Experience;
  }
}

export default class Experience {
  canvas!: HTMLCanvasElement;
  sizes!: Sizes;
  time!: Time;
  scene!: THREE.Scene;
  camera!: Camera;
  renderer!: Renderer;
  world!: World;

  constructor(canvas: HTMLCanvasElement) {
    if (instance) return instance;
    instance = this;

    window.experience = this;

    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    this.sizes.on("resize", () => this.resize());
    this.time.on("tick", () => this.update());
  }

  resize(): void {
    this.camera.resize();
    this.renderer.resize();
  }

  update(): void {
    this.camera.update();
    this.renderer.update();
  }
}
