"use strict";



import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { Webgl } from "./Webgl.js";
import { Caixa } from "./caixa.js";
import { Prateleira } from "./prateleira.js";
import { Armazem } from "./armazem.js";
import { Robo } from "./robo.js";

import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";
import { FlyControls } from "three/addons/controls/FlyControls.js";

export class MyGui {
  Webgl;
  trackballControls;
  orbitControls;
  firstPersonControls;
  flyControls;
  controls;

  robot;
  step = 0; //Controlar o movimento
  direction = 1; //Controlar a direção do robot
  initialPosition = { x: 2500, z: -2500 }; // Posição inicial do robô

  createSpotlightBox() {
    // create spotlight
    this.spotLight = new THREE.SpotLight(0xffffff, 1);
    this.spotLight.position.set(400, 700, 200);
    this.spotLight.castShadow = true;
    this.spotLight.shadow.camera.near = 300;
    this.spotLight.shadow.camera.far = 5000;
    this.spotLight.shadow.camera.fov = 30;
    this.spotLight.distance = 0;

    this.Webgl.scene.add(this.spotLight);
  }

  createSpotlightShelf() {
    // create spotlight
    this.spotLight = new THREE.SpotLight(0xffffff, 1);
    this.spotLight.position.set(400, 2200, -400);
    this.spotLight.castShadow = true;
    this.spotLight.shadow.camera.near = 300;
    this.spotLight.shadow.camera.far = 9000;
    this.spotLight.shadow.camera.fov = 45;
    this.spotLight.distance = 0;
    this.Webgl.scene.add(this.spotLight);
  }

  constructor(Webgl) {
    this.Webgl = Webgl;

    const guiVars = {
      trackballControls: true,
      orbitControls: false,
      firstPersonControls: false,
      flyControls: false,
      cleanScene: () => {
        this.Webgl.scene.clear();
      },
      drawBox: () => {
        const box = new Caixa(600, 300, 300, 10);
        this.Webgl.scene.add(box);
        this.createSpotlightBox();
      },
      drawShelf: () => {
        const shelf = new Prateleira(900, 1500, 600, 10, 600, 300, 300, 10);
        this.Webgl.scene.add(shelf);
        this.createSpotlightShelf();
      },
      drawStorage: () => {
        const armazem = new Armazem();
        this.Webgl.scene.add(armazem);
      },
      drawRobot: () => {
        this.robot = new Robo();
        this.Webgl.scene.add(this.robot);
        this.robot.translateX(this.initialPosition.x);
        this.robot.translateZ(this.initialPosition.z);
      },

      moveRobot: () => {
        const moveRobotFrame = () => {
          // Atualiza a posição do robô de acordo com a direção e a velocidade
          this.step += this.direction * 10; // Ajuste a velocidade de movimento conforme necessário
          if (this.robot) {
            this.robot.position.x = this.initialPosition.x - this.step; // Atualiza a posição do robô
          }

          // Verifica se o robô atingiu os limites e muda a direção
          if (this.step >= 4000) {
            this.direction = -1; // Muda para a direção negativa para ir para trás
          } else if (this.step <= 0) {
            this.direction = 1; // Muda para a direção positiva para ir para frente
          }

          // Solicita um novo quadro de renderização
          requestAnimationFrame(moveRobotFrame);
        };

        // Inicia o movimento do robô
        moveRobotFrame();
      },
    };

    const gui = new GUI();
    const trackballControls = gui
      .add(guiVars, "trackballControls")
      .name("Trackball Controls");
    const orbitControls = gui
      .add(guiVars, "orbitControls")
      .name("Orbit Controls");
    const firstPersonControls = gui
      .add(guiVars, "firstPersonControls")
      .name("First Person Controls");
    const flyControls = gui.add(guiVars, "flyControls").name("Fly Controls");

    const cleanScene = gui.add(guiVars, "cleanScene").name("Limpar ecra");
    const drawBox = gui.add(guiVars, "drawBox").name("Desenhar caixa");
    const drawShelf = gui.add(guiVars, "drawShelf").name("Desenhar Estante");
    const drawStorage = gui
      .add(guiVars, "drawStorage")
      .name("Desenhar Armazem");
    const drawRobot = gui.add(guiVars, "drawRobot").name("Vêr Robo");
    const moveRobot = gui.add(guiVars, "moveRobot").name("Ativar Robo");

    this.controls = {
      perspective: "Perspective",
      switchCamera: function () {
        if (this.Webgl.camera instanceof THREE.PerspectiveCamera) {
          const perspCamera = this.Webgl.camera;
          this.Webgl.camera = new THREE.OrthographicCamera(
            window.innerWidth / -0.3,
            window.innerWidth / 0.3,
            window.innerHeight / 0.3,
            window.innerHeight / -0.5,
            -500,
            19000
          );
          this.Webgl.camera.position.set(1200, 1600, -4800);
          this.Webgl.camera.lookAt(this.Webgl.scene.position);
          this.controls.perspective = "Orthographic";
        } else {
          this.Webgl.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            300,
            9000
          );
          this.Webgl.camera.position.set(1200, 1600, -4800);
          this.Webgl.camera.lookAt(this.Webgl.scene.position);
          this.controls.perspective = "Perspective";
        }

        // TRACKBALL CONTROLS
        this.trackballControls.dispose();

        trackballControls.onChange((value) => {
          this.Webgl.trackballControls.enabled =
            !this.Webgl.trackballControls.enabled;
        });

        this.trackballControls = new TrackballControls(
          this.Webgl.camera,
          this.Webgl.renderer.domElement
        );
        this.trackballControls.rotateSpeed = 10.0;
        this.trackballControls.zoomSpeed = 1.0;
        this.trackballControls.panSpeed = 1.0;
        this.trackballControls.staticMoving = true;
        this.trackballControls.enabled = guiVars.trackballControls;

        this.Webgl.trackballControls = this.trackballControls;

        //ORBIT CONTROLS
        this.orbitControls.dispose();
        orbitControls.onChange((value) => {
          this.Webgl.orbitControls.enabled = !this.Webgl.orbitControls.enabled;
        });
        this.orbitControls = new OrbitControls(
          this.Webgl.camera,
          this.Webgl.renderer.domElement
        );
        this.orbitControls.enableDamping = true;
        this.orbitControls.dampingFactor = 0.25;
        this.orbitControls.screenSpacePanning = false;
        this.orbitControls.maxPolarAngle = Math.PI / 2;
        this.orbitControls.enabled = guiVars.orbitControls;

        this.Webgl.orbitControls = this.orbitControls;

        //FIRST PERSON CONTROLS

        firstPersonControls.onChange((value) => {
          this.Webgl.firstPersonControls.enabled =
            !this.Webgl.firstPersonControls.enabled;
        });
        this.firstPersonControls = new FirstPersonControls(
          this.Webgl.camera,
          this.Webgl.renderer.domElement
        );
        this.controls.mouseDragOn = true;
        this.controls.activeLook = true;
        this.controls.movementSpeed = 5000;
        this.controls.lookSpeed = 0.1;
        this.firstPersonControls.enabled = guiVars.firstPersonControls;

        this.Webgl.firstPersonControls = this.firstPersonControls;

        //FLY CONTROLS

        flyControls.onChange((value) => {
          this.Webgl.flyControls.enabled = !this.Webgl.flyControls.enabled;
        });
        this.flyControls = new FlyControls(
          this.Webgl.camera,
          this.Webgl.renderer.domElement
        );
        this.flyControls.movementSpeed = 1;
        this.flyControls.rollSpeed = 1;
        this.flyControls.dragToLook = false;
        this.flyControls.enabled = guiVars.flyControls;

        this.Webgl.flyControls = this.flyControls;
      }.bind(this), // bind para manter o contexto do this
    };

    gui.add(this.controls, "switchCamera").name("Alterar Camera");
    gui.add(this.controls, "perspective").listen();

    // TRACKBALL CONTROLS
    trackballControls.onChange((value) => {
      this.Webgl.trackballControls.enabled =
        !this.Webgl.trackballControls.enabled;
    });

    this.trackballControls = new TrackballControls(
      this.Webgl.camera,
      this.Webgl.renderer.domElement
    );
    this.trackballControls.rotateSpeed = 10.0;
    this.trackballControls.zoomSpeed = 1.0;
    this.trackballControls.panSpeed = 1.0;
    this.trackballControls.staticMoving = true;
    this.trackballControls.enabled = guiVars.trackballControls;

    this.Webgl.trackballControls = this.trackballControls;

    //ORBIT CONTROLS
    orbitControls.onChange((value) => {
      this.Webgl.orbitControls.enabled = !this.Webgl.orbitControls.enabled;
    });
    this.orbitControls = new OrbitControls(
      this.Webgl.camera,
      this.Webgl.renderer.domElement
    );
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.25;
    this.orbitControls.screenSpacePanning = false;
    this.orbitControls.maxPolarAngle = Math.PI / 2;
    this.orbitControls.enabled = guiVars.orbitControls;
    this.Webgl.orbitControls = this.orbitControls;

    //FIRST PERSON CONTROLS
    firstPersonControls.onChange((value) => {
      this.Webgl.firstPersonControls.enabled =
        !this.Webgl.firstPersonControls.enabled;
    });
    this.firstPersonControls = new FirstPersonControls(
      this.Webgl.camera,
      this.Webgl.renderer.domElement
    );
    this.firstPersonControls.mouseDragOn = true;
    this.firstPersonControls.activeLook = true;
    this.firstPersonControls.movementSpeed = 5000;
    this.firstPersonControls.lookSpeed = 0.1;
    this.firstPersonControls.enabled = guiVars.firstPersonControls;
    this.Webgl.firstPersonControls = this.firstPersonControls;

    //FLY CONTROLS
    flyControls.onChange((value) => {
      this.Webgl.flyControls.enabled = !this.Webgl.flyControls.enabled;
    });
    this.flyControls = new FlyControls(
      this.Webgl.camera,
      this.Webgl.renderer.domElement
    );
    this.flyControls.movementSpeed = 10000;
    this.flyControls.rollSpeed = 0.01;
    this.flyControls.dragToLook = false;
    this.flyControls.enabled = guiVars.flyControls;
    this.Webgl.flyControls = this.flyControls;
  }
}
