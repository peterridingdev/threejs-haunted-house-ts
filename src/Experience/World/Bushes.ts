import * as THREE from 'three';
import Experience from '../Experience';

type bushesTextures = {
  color: THREE.Texture;
  normal: THREE.Texture;
  arm: THREE.Texture;
};

export default class Bushes extends THREE.Group {
  private experience: Experience;
  private geometry!: THREE.SphereGeometry;
  private resources: Experience['resources'];
  private textures!: bushesTextures;
  private material!: THREE.MeshStandardMaterial;
  private bush1!: THREE.Mesh;
  private bush2!: THREE.Mesh;
  private bush3!: THREE.Mesh;
  private bush4!: THREE.Mesh;
  constructor(experience: Experience) {
    super();
    this.experience = experience;
    this.resources = this.experience.resources;
    this.setGeometry();
    this.setTextures();
    this.setMaterials();
    this.setBush1();
    this.setBush2();
    this.setBush3();
    this.setBush4();
  }

  setGeometry(): void {
    this.geometry = new THREE.SphereGeometry(1, 16, 16);
  }

  setTextures(): void {
    const color = this.resources.items.bushColorTexture as THREE.Texture;

    const normal = this.resources.items.bushNormalTexture as THREE.Texture;

    const arm = this.resources.items.bushARMTexture as THREE.Texture;

    color.colorSpace = THREE.SRGBColorSpace;

    color.repeat.set(2, 1);
    arm.repeat.set(2, 1);
    normal.repeat.set(2, 1);

    color.wrapS = THREE.RepeatWrapping;
    arm.wrapS = THREE.RepeatWrapping;
    normal.wrapS = THREE.RepeatWrapping;

    this.textures = {
      color,
      normal,
      arm,
    };
  }

  setMaterials() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
      metalnessMap: this.textures.arm,
      roughnessMap: this.textures.arm,
      aoMap: this.textures.arm,
    });
  }

  setBush1() {
    this.bush1 = new THREE.Mesh(this.geometry, this.material);

    this.bush1.scale.set(0.5, 0.5, 0.5);
    this.bush1.position.set(0.8, 0.2, 2.2);
    this.bush1.rotation.x = -0.75;
    this.add(this.bush1);
  }

  setBush2() {
    this.bush2 = new THREE.Mesh(this.geometry, this.material);

    this.bush2.scale.set(0.25, 0.25, 0.25);
    this.bush2.position.set(1.4, 0.1, 2.1);
    this.bush2.rotation.x = -0.75;

    this.add(this.bush2);
  }

  setBush3() {
    this.bush3 = new THREE.Mesh(this.geometry, this.material);
    this.bush3.scale.set(0.4, 0.4, 0.4);
    this.bush3.position.set(-0.8, 0.1, 2.2);
    this.bush3.rotation.x = -0.75;

    this.add(this.bush3);
  }

  setBush4() {
    this.bush4 = new THREE.Mesh(this.geometry, this.material);

    this.bush4.scale.set(0.15, 0.15, 0.15);
    this.bush4.position.set(-1, 0.05, 2.6);
    this.bush4.rotation.x = -0.75;

    this.add(this.bush4);
  }
}
