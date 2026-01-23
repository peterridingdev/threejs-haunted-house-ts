import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import EventEmitter from './EventEmitter.js';

export type Source =
  | { name: string; type: 'gltfModel'; path: string }
  | { name: string; type: 'texture'; path: string }
  | { name: string; type: 'cubeTexture'; path: string[] };

type LoaderMap = {
  gltfLoader: GLTFLoader;
  textureLoader: THREE.TextureLoader;
  cubeTextureLoader: THREE.CubeTextureLoader;
};

export default class Resources extends EventEmitter {
  sources: Source[];
  items: Record<string, THREE.Texture | THREE.CubeTexture | GLTF> = {};
  toLoad: number;
  loaded: number = 0;
  loaders!: LoaderMap;

  constructor(sources: Source[]) {
    super();

    this.sources = sources;
    this.toLoad = sources.length;

    this.setLoaders();
    this.startLoading();
  }

  private setLoaders() {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
    };
  }

  private startLoading() {
    for (const source of this.sources) {
      switch (source.type) {
        case 'gltfModel':
          this.loaders.gltfLoader.load(source.path, (file: GLTF) => {
            this.sourceLoaded(source.name, file);
          });
          break;
        case 'texture':
          this.loaders.textureLoader.load(source.path, (file: THREE.Texture) => {
            this.sourceLoaded(source.name, file);
          });
          break;
        case 'cubeTexture':
          this.loaders.cubeTextureLoader.load(source.path, (file: THREE.CubeTexture) => {
            this.sourceLoaded(source.name, file);
          });
          break;
      }
    }
  }

  private sourceLoaded(name: string, file: THREE.Texture | THREE.CubeTexture | GLTF) {
    this.items[name] = file;
    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger('ready');
    }
  }
}
