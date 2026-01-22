import * as THREE from 'three';
import Experience from '../Experience';

type doorTextures = {
  color: THREE.Texture;
  normal: THREE.Texture;
  ao: THREE.Texture;
  height: THREE.Texture;
  metalness: THREE.Texture;
  roughness: THREE.Texture;
  alpha: THREE.Texture;
};

export default class Door extends THREE.Group {
  private experience: Experience;
  private resources: Experience['resources'];
  private textures!: doorTextures;
  private material!: THREE.MeshStandardMaterial;
  private geometry!: THREE.PlaneGeometry;
  private mesh!: THREE.Mesh;
  constructor(experience: Experience) {
    super();

    this.experience = experience;
    this.resources = experience.resources;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry(): void {
    this.geometry = new THREE.PlaneGeometry(2.2, 2.2, 100, 100);
  }

  setTextures(): void {
    const color = this.resources.items.doorColorTexture as THREE.Texture;
    const normal = this.resources.items.doorNormalTexture as THREE.Texture;
    const ao = this.resources.items.doorAmbientOcclusionTexture as THREE.Texture;
    const height = this.resources.items.doorHeightTexture as THREE.Texture;
    const metalness = this.resources.items.doorMetalnessTexture as THREE.Texture;
    const roughness = this.resources.items.doorRoughnessTexture as THREE.Texture;
    const alpha = this.resources.items.doorAlphaTexture as THREE.Texture;

    color.colorSpace = THREE.SRGBColorSpace;

    this.textures = { color, normal, ao, height, metalness, roughness, alpha };
  }

  setMaterial(): void {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      transparent: true,
      alphaMap: this.textures.alpha,
      aoMap: this.textures.ao,
      displacementMap: this.textures.height,
      displacementScale: 0.15,
      displacementBias: -0.04,
      normalMap: this.textures.normal,
      metalnessMap: this.textures.metalness,
      roughnessMap: this.textures.roughness,
    });
  }

  setMesh(): void {
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.y = 1;
    this.position.z = 2 + 0.01;

    this.add(this.mesh);
  }
}
