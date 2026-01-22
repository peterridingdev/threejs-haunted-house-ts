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
    this.setPointLight();
  }

  private setDirectionalLight(): void {
    this.directionalLight = new THREE.DirectionalLight('#86cdff', 1);
    this.directionalLight.castShadow = true;
    // this.directionalLight.shadow.camera.far = 15;
    // this.directionalLight.shadow.mapSize.set(1024, 1024);
    // this.directionalLight.shadow.normalBias = 0.05;
    this.directionalLight.position.set(3, 2, -8);

    this.scene.add(this.directionalLight);
  }

  private setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight('#86cdff', 0.275);
    this.scene.add(this.ambientLight);
  }

  private setPointLight() {
    // Set light above door
    this.doorLight = new THREE.PointLight('#ff7d46', 5);
    this.doorLight.position.set(0, 2.2, 2.5);
  }
}
