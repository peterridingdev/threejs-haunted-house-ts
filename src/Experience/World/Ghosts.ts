import * as THREE from 'three';
import Experience from '../Experience';
import Time from '../Utils/Time';

export default class Ghosts {
  private scene: THREE.Scene;
  private time: Time;
  private experience: Experience;
  private ghost1!: THREE.PointLight;
  private ghost2!: THREE.PointLight;
  private ghost3!: THREE.PointLight;

  // Store the angles for smooth per-frame motion
  private ghost1Angle = 0;
  private ghost2Angle = 0;
  private ghost3Angle = 0;

  constructor(experience: Experience) {
    this.experience = experience;
    this.time = this.experience.time;
    this.scene = this.experience.scene;

    this.setGhosts();
  }

  private setGhosts(): void {
    this.ghost1 = new THREE.PointLight('#8800ff', 6);
    this.ghost2 = new THREE.PointLight('#ff0088', 6);
    this.ghost3 = new THREE.PointLight('#ff0000', 6);

    // Shadows
    this.ghost1.castShadow = true;
    this.ghost2.castShadow = true;
    this.ghost3.castShadow = true;

    this.ghost1.shadow.mapSize.width = 256;
    this.ghost1.shadow.mapSize.height = 256;
    this.ghost1.shadow.camera.far = 10;

    this.ghost2.shadow.mapSize.width = 256;
    this.ghost2.shadow.mapSize.height = 256;
    this.ghost2.shadow.camera.far = 10;

    this.ghost3.shadow.mapSize.width = 256;
    this.ghost3.shadow.mapSize.height = 256;
    this.ghost3.shadow.camera.far = 10;

    // Add to scene
    this.scene.add(this.ghost1, this.ghost2, this.ghost3);
  }

  update(): void {
    const delta = this.time.delta * 0.001;

    // Angular speed in radians per second
    const speed1 = 0.5;
    const speed2 = 0.38;
    const speed3 = 0.23;

    // Increment angles based on delta
    this.ghost1Angle += delta * speed1;
    this.ghost2Angle -= delta * speed2;
    this.ghost3Angle += delta * speed3;

    // Update positions
    this.ghost1.position.x = Math.cos(this.ghost1Angle) * 4;
    this.ghost1.position.z = Math.sin(this.ghost1Angle) * 4;
    this.ghost1.position.y =
      Math.sin(this.ghost1Angle) *
      Math.sin(this.ghost1Angle * 2.34) *
      Math.sin(this.ghost1Angle * 3.45);

    this.ghost2.position.x = Math.cos(this.ghost2Angle) * 5;
    this.ghost2.position.z = Math.sin(this.ghost2Angle) * 5;
    this.ghost2.position.y =
      Math.sin(this.ghost2Angle) *
      Math.sin(this.ghost2Angle * 2.34) *
      Math.sin(this.ghost2Angle * 3.45);

    this.ghost3.position.x = Math.cos(this.ghost3Angle) * 6;
    this.ghost3.position.z = Math.sin(this.ghost3Angle) * 6;
    this.ghost3.position.y =
      Math.sin(this.ghost3Angle) *
      Math.sin(this.ghost3Angle * 2.34) *
      Math.sin(this.ghost3Angle * 3.45);
  }
}
