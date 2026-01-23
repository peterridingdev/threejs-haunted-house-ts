import * as THREE from 'three';
import Experience from '../Experience';

export default class Fog {
  private experience: Experience;
  private scene: THREE.Scene;
  private fog: THREE.FogExp2;
  constructor(experience: Experience) {
    this.experience = experience;
    this.scene = this.experience.scene;

    // Assign the fog to the property and scene
    this.fog = new THREE.FogExp2(new THREE.Color(0x04343f), 0.09);
    this.scene.fog = this.fog;
  }
}
