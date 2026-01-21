import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";

export default class World {
  private experience: Experience;
  private scene: THREE.Scene;
  private environment?: Environment;
  private floor?: Floor;

  constructor(experience: Experience) {
    this.experience = experience; // pass in the singleton instance
    this.scene = this.experience.scene;

    // Setup
    experience.resources.on("ready", () => {
      this.floor = new Floor(experience);
      this.environment = new Environment(experience);
    });
  }
}
