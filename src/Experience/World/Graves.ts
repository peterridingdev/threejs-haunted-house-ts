import * as THREE from 'three';
import Experience from '../Experience';

type graveTextures = {
  color: THREE.Texture;
  arm: THREE.Texture;
  normal: THREE.Texture;
};

export default class Graves {
  private experience: Experience;
  private scene: THREE.Scene;
  private geometry!: THREE.BoxGeometry;
  private material!: THREE.MeshStandardMaterial;
  private resources: Experience['resources'];
  private textures!: graveTextures;
  private graves!: THREE.Group;

  constructor(experience: Experience) {
    this.experience = experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.graves = new THREE.Group();
    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setGraves();
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
  }
  setTextures() {
    const color = this.resources.items.graveColorTexture as THREE.Texture;

    const normal = this.resources.items.graveNormalTexture as THREE.Texture;

    const arm = this.resources.items.graveARMTexture as THREE.Texture;

    color.colorSpace = THREE.SRGBColorSpace;

    color.repeat.set(0.3, 0.4);
    arm.repeat.set(0.3, 0.4);
    normal.repeat.set(0.3, 0.4);

    color.wrapS = THREE.RepeatWrapping;
    arm.wrapS = THREE.RepeatWrapping;
    normal.wrapS = THREE.RepeatWrapping;

    color.wrapT = THREE.RepeatWrapping;
    arm.wrapT = THREE.RepeatWrapping;
    normal.wrapT = THREE.RepeatWrapping;

    this.textures = {
      color,
      arm,
      normal,
    };
  }
  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
      metalnessMap: this.textures.arm,
      roughnessMap: this.textures.arm,
      aoMap: this.textures.arm,
    });
  }
  setGraves() {
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 4;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      // Mesh
      const grave = new THREE.Mesh(this.geometry, this.material);
      grave.position.x = x;
      grave.position.y = Math.random() * 0.4;
      grave.position.z = z;
      grave.rotation.x = (Math.random() - 0.5) * 0.4;
      grave.rotation.y = (Math.random() - 0.5) * 0.4;
      grave.rotation.z = (Math.random() - 0.5) * 0.4;

      // Add to the graves group
      this.graves.add(grave);
    }
    this.scene.add(this.graves);
  }
}
