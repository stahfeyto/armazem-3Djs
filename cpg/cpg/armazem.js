"use strict";

import * as THREE from "three";
import * as SceneUtils from "three/addons/utils/SceneUtils.js";
import { Prateleira } from "./prateleira.js";

export class Armazem extends THREE.Object3D {
  constructor() {
    super();

    const shelf1 = new Prateleira(900, 1500, 600, 10, 600, 300, 300, 10);
    this.add(shelf1);
    this.addSpotLights(shelf1);

    const shelf2 = new Prateleira(900, 1500, 600, 10, 600, 300, 300, 10);
    shelf2.translateX(1500);
    this.add(shelf2);
    this.addSpotLights(shelf2);

    const shelf3 = new Prateleira(900, 1500, 600, 10, 600, 300, 300, 10);
    shelf3.translateX(-1500);
    this.add(shelf3);
    this.addSpotLights(shelf3);

    const chao = this.createMesh(
      new THREE.PlaneGeometry(8000, 10000),
      0x2e2e2e
    );
    chao.rotation.x = -0.5 * Math.PI;
    chao.position.x = 500;
    chao.position.z = -2000;
    chao.castShadow = true;
    this.add(chao);

    const parede_traseira = this.createMesh(
      new THREE.PlaneGeometry(8000, 3000),
      0xf5f5dc
    );
    parede_traseira.rotation.x = -Math.PI;
    parede_traseira.position.y = 1500;
    parede_traseira.position.x = 500;
    parede_traseira.position.z = 3000;

    this.add(parede_traseira);

    const parede_lateral_e = this.createMesh(
      new THREE.PlaneGeometry(3000, 8000),
      0xf5f5dc
    );
    parede_lateral_e.rotation.z = -0.5 * Math.PI;
    parede_lateral_e.rotation.y = -0.5 * Math.PI;
    parede_lateral_e.position.y = 1500;
    parede_lateral_e.position.x = 4500;
    parede_lateral_e.position.z = -1000;
    this.add(parede_lateral_e);

    const parede_lateral_d = this.createMesh(
      new THREE.PlaneGeometry(3000, 8000),
      0xf5f5dc
    );

    parede_lateral_d.rotation.z = -0.5 * Math.PI;
    parede_lateral_d.rotation.y = 0.5 * Math.PI;
    parede_lateral_d.position.y = 1500;
    parede_lateral_d.position.x = -3500;
    parede_lateral_d.position.z = -1000;
    this.add(parede_lateral_d);

    const teto = this.createMesh(
      new THREE.PlaneGeometry(8000, 10000),
      0x2e2e2e
    );
    teto.rotation.x = 0.5 * Math.PI;

    teto.position.x = 500;
    teto.position.y = 3000;
    teto.position.z = -2000;
    this.add(teto);

    const light = new THREE.AmbientLight(0x404040);
    this.add(light);
  }

  createMesh(geom, color) {
    const meshMaterial = new THREE.MeshLambertMaterial({
      color: color,
    });
    meshMaterial.side = THREE.DoubleSide;
    meshMaterial.castShadow = true;

    const wireFrameMat = new THREE.MeshLambertMaterial({
      color: color,
      wireframe: false,
    });

    const mesh = SceneUtils.createMultiMaterialObject(geom, [
      meshMaterial,
      wireFrameMat,
    ]);

    return mesh;
  }

  addSpotLights(Shelf) {
    // Adiciona spotlight
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(-100, 1900, 0);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 300;
    spotLight.shadow.camera.far = 9000;
    spotLight.shadow.camera.fov = 45;
    spotLight.target = Shelf;
    spotLight.distance = 0;
    Shelf.add(spotLight);
  }
}
