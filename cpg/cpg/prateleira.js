"use strict";

import * as THREE from "three";
import * as SceneUtils from "three/addons/utils/SceneUtils.js";
import { Caixa } from "./caixa.js";

export class Prateleira extends THREE.Object3D {
  constructor(
      largura,
      altura,
      profundidade,
      espessura,
      largura_caixa,
      altura_caixa,
      profundidade_caixa,
      espessura_caixa
  ) {
    super();

    // Criar a Estante base
    const baseColor = 0xF5F5DC; // Cor bege para a estante

    const backside = this.createMesh(
        new THREE.BoxGeometry(largura, altura, espessura),
        baseColor
    );
    backside.translateX(largura / 2);
    backside.translateY(altura / 3);
    backside.translateZ(espessura / 2);
    this.add(backside);

    const prateleira1 = this.createMesh(
        new THREE.BoxGeometry(largura, espessura, profundidade + 500),
        baseColor
    );
    prateleira1.translateX(largura / 2);
    prateleira1.translateY(espessura / 2 + altura / 1.2);
    prateleira1.translateZ(profundidade / 2 - 850);
    prateleira1.rotation.x = Math.PI / 25;
    const dobra1 = this.createMesh(
        new THREE.BoxGeometry(largura, altura - 1400, espessura, profundidade),
        baseColor
    );

    dobra1.translateX(largura / 2);
    dobra1.translateY(altura / 1.1);
    dobra1.translateZ(-profundidade - 500);
    this.add(dobra1);
    this.add(prateleira1);

    const box11 = new Caixa(
        largura_caixa,
        altura_caixa,
        profundidade_caixa,
        espessura_caixa
    );
    box11.translateX(largura / 6);
    box11.translateY(altura / 2 + 570);
    box11.translateZ(-profundidade - 480);
    box11.rotation.x = Math.PI / 30;
    this.add(box11);

    const box12 = new Caixa(
        largura_caixa,
        altura_caixa,
        profundidade_caixa,
        espessura_caixa
    );
    box12.translateX(largura / 6);
    box12.translateY(altura / 2 + 520);
    box12.translateZ(-profundidade - 100);
    box12.rotation.x = Math.PI / 30;
    this.add(box12);

    const prateleira2 = this.createMesh(
        new THREE.BoxGeometry(largura, espessura, profundidade + 700), // Ajustar o tamanho da prateleira2
        baseColor
    );
    prateleira2.translateX(largura / 2);
    prateleira2.translateY(espessura / 2 + altura / 2);
    prateleira2.translateZ(profundidade / 2 - 935); // Reposicionar a prateleira2 um pouco para trás
    prateleira2.rotation.x = Math.PI / -30;
    const dobra2 = this.createMesh(
        new THREE.BoxGeometry(largura, altura - 1400, espessura, profundidade),
        baseColor
    );
    dobra2.translateX(largura / 2);
    dobra2.translateY(altura / 2 - 20);
    dobra2.translateZ(-profundidade - 680);
    this.add(dobra2);
    this.add(prateleira2);

    const box21 = new Caixa(
        largura_caixa,
        altura_caixa,
        profundidade_caixa,
        espessura_caixa
    );
    box21.translateX(largura / 6);
    box21.translateY(altura / 2 - 30);
    box21.translateZ(-profundidade - 290);
    box21.rotation.x = Math.PI / -30;
    this.add(box21);

    const box22 = new Caixa(
        largura_caixa,
        altura_caixa,
        profundidade_caixa,
        espessura_caixa
    );
    box22.translateX(largura / 6);
    box22.translateY(altura / 2 - 70);
    box22.translateZ(-profundidade - 620);
    box22.rotation.x = Math.PI / -30;
    this.add(box22);

    const prateleira3 = this.createMesh(
        new THREE.BoxGeometry(largura, espessura, profundidade * 3, 5),
        baseColor
    );
    prateleira3.translateX(largura / 2);
    prateleira3.translateY(espessura / 2 + altura / 9);
    prateleira3.translateZ(profundidade / 2 - 1210);
    prateleira3.rotation.x = Math.PI / -30;
    const dobra3 = this.createMesh(
        new THREE.BoxGeometry(largura, altura - 1400, espessura, profundidade),
        baseColor
    );
    dobra3.translateX(largura / 2);
    dobra3.translateY(120);
    dobra3.translateZ(-profundidade - 1200);
    this.add(dobra3);
    this.add(prateleira3);

    const box31 = new Caixa(
        largura_caixa,
        altura_caixa,
        profundidade_caixa,
        espessura_caixa
    );
    box31.translateX(largura / 6);
    box31.translateY(120);
    box31.translateZ(-profundidade - 850);
    box31.rotation.x = Math.PI / -30;
    this.add(box31);
    // prateleira3.add(box31);
    const box32 = new Caixa(
        largura_caixa,
        altura_caixa,
        profundidade_caixa,
        espessura_caixa
    );
    box32.translateX(largura / 6);
    box32.translateY(80);
    box32.translateZ(-profundidade - 1160);
    box32.rotation.x = Math.PI / -30;
    this.add(box32);
  }

  createMesh(geom, color) {
    const meshMaterial = new THREE.MeshLambertMaterial({
      color: color,
      side: THREE.DoubleSide,
      castShadow: true,
    });

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
}
