import * as THREE from 'three';
import Experience from '../Experience';
import Roof from './Roof';
import Door from './Door';
import Bushes from './Bushes';

type WallTextures = {
  color: THREE.Texture;
  normal: THREE.Texture;
  arm: THREE.Texture;
};

export default class House {
  private experience: Experience;
  private scene: THREE.Scene;
  private resources: Experience['resources'];

  public group!: THREE.Group;

  // Walls
  private walls!: THREE.Mesh;
  private wallTextures!: WallTextures;
  private wallGeometry!: THREE.BoxGeometry;
  private wallMaterial!: THREE.MeshStandardMaterial;

  // Roof
  private roof!: Roof;

  // // Door
  private door!: Door;

  // // Bushes
  private bushes!: Bushes;

  constructor(experience: Experience) {
    this.experience = experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.group = new THREE.Group();
    this.roof = new Roof(this.experience);
    this.door = new Door(this.experience);
    this.bushes = new Bushes(this.experience);
    this.group.add(this.door);
    this.group.add(this.roof);
    this.group.add(this.bushes);
    this.scene.add(this.group);

    // Build the house parts
    this.setWalls();
    // this.setRoof();
  }

  private setWallTextures(): WallTextures {
    const color = this.resources.items.wallColorTexture as THREE.Texture;
    const normal = this.resources.items.wallNormalTexture as THREE.Texture;
    const arm = this.resources.items.wallARMTexture as THREE.Texture;
    color.colorSpace = THREE.SRGBColorSpace;

    return { color, normal, arm };
  }

  private setWallGeometry(): void {
    this.wallGeometry = new THREE.BoxGeometry(4, 2.5, 4);
  }

  private setWallMaterial(): void {
    this.wallMaterial = new THREE.MeshStandardMaterial({
      map: this.wallTextures.color,
      aoMap: this.wallTextures.arm,
      roughnessMap: this.wallTextures.arm,
      metalnessMap: this.wallTextures.arm,
      normalMap: this.wallTextures.normal,
    });
  }

  private setWallMesh() {
    this.walls = new THREE.Mesh(this.wallGeometry, this.wallMaterial);
    this.walls.position.y += 1.25;
    this.group.add(this.walls);
  }

  private setWalls(): void {
    this.wallTextures = this.setWallTextures();
    this.setWallGeometry();
    this.setWallMaterial();
    this.setWallMesh();
  }
}
