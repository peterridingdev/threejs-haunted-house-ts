import * as THREE from 'three';
import Experience from '../Experience';

type RoofTextures = {
  color: THREE.Texture;
  normal: THREE.Texture;
  arm: THREE.Texture;
};

export default class Roof {
  private experience: Experience;
  private geometry!: THREE.ConeGeometry;
  private resources: Experience['resources'];
  private textures!: RoofTextures;
  private material!: THREE.MeshStandardMaterial;
  private mesh!: THREE.Mesh;
  private scene: THREE.Scene;

  constructor(experience: Experience) {
    this.experience = experience;
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
    this.setGeometry();
    this.setTextures();

    this.setMaterial();
    this.setMesh();
  }
  setGeometry(): void {
    this.geometry = new THREE.ConeGeometry(3.5, 1.5, 4);
  }

  setTextures(): void {
    const color = this.resources.items.roofColorTexture as THREE.Texture;
    const normal = this.resources.items.roofNormalTexture as THREE.Texture;
    const arm = this.resources.items.roofARMTexture as THREE.Texture;

    color.colorSpace = THREE.SRGBColorSpace;

    color.repeat.set(3, 1);
    arm.repeat.set(3, 1);
    normal.repeat.set(3, 1);

    color.wrapS = THREE.RepeatWrapping;
    arm.wrapS = THREE.RepeatWrapping;
    normal.wrapS = THREE.RepeatWrapping;

    this.textures = {
      color,
      normal,
      arm,
    };
  }

  setMaterial(): void {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      aoMap: this.textures.arm,
      roughnessMap: this.textures.arm,
      metalnessMap: this.textures.arm,
      normalMap: this.textures.normal,
    });
  }

  setMesh(): void {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y = 2.5 + 0.75;
    this.mesh.rotation.y = Math.PI * 0.25;
    this.scene.add(this.mesh);
  }
}
