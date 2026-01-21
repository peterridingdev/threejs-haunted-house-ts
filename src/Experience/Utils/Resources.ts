import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import EventEmitter from "./EventEmitter.js";

// Source type union for different resources
export type Source =
  | { name: string; type: "gltfModel"; path: string }
  | { name: string; type: "texture"; path: string }
  | { name: string; type: "cubeTexture"; path: string[] };

type LoaderMap = {
  gltfLoader: GLTFLoader;
  textureLoader: THREE.TextureLoader;
  cubeTextureLoader: THREE.CubeTextureLoader;
};

export default class Resources extends EventEmitter {
  sources: Source[];
  items: Record<string, any>; // Loaded items (THREE.Texture | THREE.CubeTexture | GLTF)
  toLoad: number;
  loaded: number;
  loaders!: LoaderMap;

  constructor(sources: Source[]) {
    super();

    // Options
    this.sources = sources;

    // Setup
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  private setLoaders(): void {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
    };
  }

  private startLoading(): void {
    for (const source of this.sources) {
      switch (source.type) {
        case "gltfModel":
          this.loaders.gltfLoader.load(source.path, (file: GLTF) => {
            this.sourceLoaded(source, file);
          });
          break;
        case "texture":
          this.loaders.textureLoader.load(
            source.path,
            (file: THREE.Texture) => {
              this.sourceLoaded(source, file);
            },
          );
          break;
        case "cubeTexture":
          this.loaders.cubeTextureLoader.load(
            source.path,
            (file: THREE.CubeTexture) => {
              this.sourceLoaded(source, file);
            },
          );
          break;
      }
    }
  }

  private sourceLoaded(source: Source, file: any): void {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger("ready", []); // EventEmitter expects _args array
    }
  }
}
