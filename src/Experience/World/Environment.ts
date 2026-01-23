import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Environment {
  private experience: Experience;
  private scene: THREE.Scene;
  private directionalLight!: THREE.DirectionalLight;
  private ambientLight!: THREE.AmbientLight;
  private doorLight!: THREE.PointLight;

  constructor(experience: Experience) {
    this.experience = experience; // pass in the singleton
    this.scene = this.experience.scene;

    // Setup
    this.setDirectionalLight();
    this.setAmbientLight();
  }

  private setDirectionalLight(): void {
    this.directionalLight = new THREE.DirectionalLight('#86cdff', 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.position.set(3, 2, -8);

    // Mappings
    this.directionalLight.shadow.mapSize.width = 256;
    this.directionalLight.shadow.mapSize.height = 256;
    this.directionalLight.shadow.camera.top = 8;
    this.directionalLight.shadow.camera.right = 8;
    this.directionalLight.shadow.camera.bottom = -8;
    this.directionalLight.shadow.camera.left = -8;
    this.directionalLight.shadow.camera.near = 1;
    this.directionalLight.shadow.camera.far = 20;

    // Add to scene
    this.scene.add(this.directionalLight);
  }

  private setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight('#86cdff', 0.275);
    this.scene.add(this.ambientLight);
  }
}
