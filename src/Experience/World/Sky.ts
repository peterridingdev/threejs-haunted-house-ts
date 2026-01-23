import * as THREE from 'three';
import Experience from '../Experience';
import { Sky as SkyBackground } from 'three/examples/jsm/objects/Sky.js';

interface SkyUniforms {
  turbidity: { value: number };
  rayleigh: { value: number };
  mieCoefficient: { value: number };
  mieDirectionalG: { value: number };
  sunPosition: { value: THREE.Vector3 };
}

export default class Sky {
  private experience: Experience;
  private sky: SkyBackground;
  private scene: THREE.Scene;

  constructor(experience: Experience) {
    this.experience = experience;
    this.sky = new SkyBackground();
    this.scene = this.experience.scene;

    this.setSky();
  }

  private setSky() {
    // Cast uniforms to our interface so TS knows the properties
    const uniforms = this.sky.material.uniforms as unknown as SkyUniforms;

    uniforms.turbidity.value = 10;
    uniforms.rayleigh.value = 3;
    uniforms.mieCoefficient.value = 0.1;
    uniforms.mieDirectionalG.value = 0.95;
    uniforms.sunPosition.value.set(0.3, -0.038, -0.95);

    this.sky.scale.set(100, 100, 100);
    this.scene.add(this.sky);
  }
}
