"use strict";

import * as THREE from "three";
import * as SceneUtils from "three/addons/utils/SceneUtils.js";
import { Caixa } from "./caixa.js";

export class Robo extends THREE.Object3D {
  constructor() {
    super();

    // Corpo principal
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xADD8E6 }); // Azul pastel
    const body = new THREE.Mesh(new THREE.BoxGeometry(300, 600, 300), bodyMaterial);
    body.position.y = 300;
    this.add(body);

    // Parte superior
    const topMaterial = new THREE.MeshLambertMaterial({ color: 0xADD8E6 }); // Azul pastel
    const top = new THREE.Mesh(new THREE.BoxGeometry(300, 10, 300), topMaterial);
    top.position.y = 300;
    body.add(top);

    // Rodas
    const rodaMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 }); // Cinza escuro
    const rodaRadius = 50;
    const rodaSegments = 32;

    const createRoda = (x, y, z) => {
      const roda = new THREE.Mesh(
          new THREE.SphereGeometry(rodaRadius, rodaSegments, rodaSegments),
          rodaMaterial
      );
      roda.position.set(x, y, z);
      return roda;
    };

    body.add(createRoda(-50, -300, -150));
    body.add(createRoda(-50, -300, 150));


    // Pilar para elevação do braço
    const pillarMaterial = new THREE.MeshLambertMaterial({ color: 0xFFD700 }); // Dourado
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(100, 1200, 100), pillarMaterial);
    pillar.position.set(0, 600, 0);
    body.add(pillar);

    // Plataforma que sobe no pilar
    const platformMaterial = new THREE.MeshLambertMaterial({ color: 0xADD8E6 }); // Azul pastel
    const platform = new THREE.Mesh(new THREE.BoxGeometry(300, 20, 300), platformMaterial);
    platform.position.set(0, 600, 0);
    pillar.add(platform);

    // Braço direito
    const bracoMaterial = new THREE.MeshLambertMaterial({ color: 0xADD8E6 }); // Azul pastel
    const braco1 = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 600), bracoMaterial);
    braco1.position.set(0, 0, 250);
    platform.add(braco1);

    const braco2 = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 400), bracoMaterial);
    braco2.position.set(0, 0, 300);
    braco1.add(braco2);

    const braco3 = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 200), bracoMaterial);
    braco3.position.set(0, 0, 200);
    braco2.add(braco3);

    // Mão para pegar caixas
    const handMaterial = new THREE.MeshLambertMaterial({ color: 0xADD8E6 }); // Azul pastel
    const hand = new THREE.Mesh(new THREE.BoxGeometry(150, 50, 50), handMaterial);
    hand.position.set(0, 0, 100);
    braco3.add(hand);

    // Caixa
    const boxMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 }); // Marrom
    const caixa = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), boxMaterial);
    caixa.position.set(0, 200, 100);
    this.add(caixa);

    // Cabeça esférica
    const headRadius = 70;
    const headMaterial = new THREE.MeshLambertMaterial({ color: 0xC3C6D6 }); // Azul claro
    const head = new THREE.Mesh(new THREE.SphereGeometry(headRadius, rodaSegments, rodaSegments), headMaterial);
    head.position.set(0, 400, 0);
    top.add(head);
  }

  createMesh(geom, color) {
    const meshMaterial = new THREE.MeshLambertMaterial({
      color: color,
      side: THREE.DoubleSide,
      castShadow: true
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
