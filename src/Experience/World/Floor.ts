import * as THREE from "three";
import Experience from "../Experience";

type FloorTextures = {
  color: THREE.Texture;
  normal: THREE.Texture;
  displacement: THREE.Texture;
  arm: THREE.Texture;
  alpha: THREE.Texture;
};

export default class Floor {
  private experience: Experience;
  private scene: THREE.Scene;
  private resources: Experience["resources"];
  private textures!: FloorTextures;
  private geometry!: THREE.PlaneGeometry;
  private material!: THREE.MeshStandardMaterial;
  private mesh!: THREE.Mesh;

  constructor(experience: Experience) {
    this.experience = experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  private setGeometry(): void {
    this.geometry = new THREE.PlaneGeometry(20, 20, 100, 100);
  }

  private setTextures(): void {
    const color = this.resources.items.floorColorTexture as THREE.Texture;
    const normal = this.resources.items.floorNormalTexture as THREE.Texture;
    const displacement = this.resources.items
      .floorDisplacementTexture as THREE.Texture;
    const arm = this.resources.items.floorARMTexture as THREE.Texture;

    const alpha = this.resources.items.floorAlphaTexture as THREE.Texture;
    color.colorSpace = THREE.SRGBColorSpace;

    // Apply repeat and wrapping individually
    color.colorSpace = THREE.SRGBColorSpace;
    color.repeat.set(8, 8);
    color.wrapS = THREE.RepeatWrapping;
    color.wrapT = THREE.RepeatWrapping;

    arm.repeat.set(8, 8);
    arm.wrapS = THREE.RepeatWrapping;
    arm.wrapT = THREE.RepeatWrapping;

    normal.repeat.set(8, 8);
    normal.wrapS = THREE.RepeatWrapping;
    normal.wrapT = THREE.RepeatWrapping;

    displacement.repeat.set(8, 8);
    displacement.wrapS = THREE.RepeatWrapping;
    displacement.wrapT = THREE.RepeatWrapping;

    this.textures = {
      color,
      normal,
      displacement,
      arm,
      alpha,
    };
  }

  private setMaterial(): void {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
      displacementMap: this.textures.displacement,
      roughnessMap: this.textures.arm,
      metalnessMap: this.textures.arm,
      alphaMap: this.textures.alpha,
      aoMap: this.textures.arm,
      transparent: true,
      displacementScale: 0.3,
      displacementBias: -0.2,
    });
  }

  private setMesh(): void {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
