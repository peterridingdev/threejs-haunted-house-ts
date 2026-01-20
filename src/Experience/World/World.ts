import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";

export default class World {
  private experience: Experience;
  private scene: THREE.Scene;
  private environment: Environment;

  constructor(experience: Experience) {
    this.experience = experience; // pass in the singleton instance
    this.scene = this.experience.scene;

    // Test mesh
    // const testMesh = new THREE.Mesh(
    //   new THREE.BoxGeometry(1, 1, 1),
    //   new THREE.MeshStandardMaterial(),
    // );
    // this.scene.add(testMesh);

    // Setup
    this.environment = new Environment(this.experience);
  }
}
