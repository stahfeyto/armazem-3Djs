"use strict";

import * as THREE from "three";
import * as SceneUtils from "three/addons/utils/SceneUtils.js";

export class Caixa extends THREE.Object3D {
  constructor(largura, altura, profundidade, espessura, cor = 0xC8A2C8) { // Cor padrão alterada para lilás
    super();

    const materiais = this.criarMateriais(cor);

    const bottom = this.createMesh(
        new THREE.BoxGeometry(largura, espessura, profundidade),
        materiais
    );
    bottom.position.set(largura / 2, espessura / 2, profundidade / 2);
    this.add(bottom);

    const leftside = this.createMesh(
        new THREE.BoxGeometry(espessura, altura, profundidade),
        materiais
    );
    leftside.position.set(espessura / 2, altura / 2, profundidade / 2);
    this.add(leftside);

    const rightside = this.createMesh(
        new THREE.BoxGeometry(espessura, altura, profundidade),
        materiais
    );
    rightside.position.set(largura - espessura / 2, altura / 2, profundidade / 2);
    this.add(rightside);

    const backside = this.createMesh(
        new THREE.BoxGeometry(largura, altura, espessura),
        materiais
    );
    backside.position.set(largura / 2, altura / 2, espessura / 2);
    this.add(backside);

    const frontside = this.createMesh(
        new THREE.BoxGeometry(largura, altura, espessura),
        materiais
    );
    frontside.position.set(largura / 2, altura / 2, profundidade - espessura / 2);
    this.add(frontside);
  }

  criarMateriais(cor) {
    const meshMaterial = new THREE.MeshLambertMaterial({
      color: cor,
      side: THREE.DoubleSide,
      castShadow: true,
    });

    const wireFrameMat = new THREE.MeshLambertMaterial({
      color: cor,
      wireframe: false,
    });

    return [meshMaterial, wireFrameMat];
  }

  createMesh(geom, materiais) {
    const mesh = SceneUtils.createMultiMaterialObject(geom, materiais);
    return mesh;
  }
}
