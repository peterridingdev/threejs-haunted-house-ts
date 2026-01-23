import * as THREE from 'three';
import Experience from '../Experience';
import Environment from './Environment';
import Floor from './Floor';
import House from './House';
import Graves from './Graves';
import Ghosts from './Ghosts';
import Sky from './Sky';
import Fog from './Fog';

export default class World {
  private experience: Experience;
  private scene: THREE.Scene;
  private environment?: Environment;
  private floor?: Floor;
  private house?: House;
  private graves?: Graves;
  private ghosts?: Ghosts;
  private sky?: Sky;
  private fog?: Fog;

  constructor(experience: Experience) {
    this.experience = experience; // pass in the singleton instance
    this.scene = this.experience.scene;

    // Setup after resources are ready
    this.experience.resources.on('ready', () => {
      this.floor = new Floor(this.experience);
      this.environment = new Environment(this.experience);
      this.house = new House(this.experience);
      this.graves = new Graves(this.experience);
      this.ghosts = new Ghosts(this.experience);
      this.sky = new Sky(this.experience);
      this.fog = new Fog(this.experience);
    });
  }

  public update(): void {
    this.ghosts?.update();
  }
}
