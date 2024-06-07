"use strict";

/*
   This file contains the weblg initialization code (creation of scene, camera, renderer, ...).
*/

import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import { FlyControls } from "three/addons/controls/FlyControls.js";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class Webgl {
  clock;
  renderer;
  scene;
  camera;
  trackballControls;
  flyControls;
  firstPersonControls;
  orbitControls;

  constructor() {
    this.clock = new THREE.Clock();

    // create a render and set the size
    const canvas = document.querySelector("#WebGL-canvas");
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    //this.renderer.useLegacyLights = true;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.useLegacyLights = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMapType = THREE.PCFShadowMap;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x555555);

    // create camera, position and point the camera to the center of the scene
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      300,
      9000
    );
    this.camera.position.x = 2500;
    this.camera.position.y = 2000;
    this.camera.position.z = -4500;
    this.camera.lookAt(this.scene.position);

    // Initialize controls
    this.trackballControls = new TrackballControls(
      this.camera,
      this.renderer.domElement
    );
    this.flyControls = new FlyControls(this.camera, this.renderer.domElement);
    this.firstPersonControls = new FirstPersonControls(
      this.camera,
      this.renderer.domElement
    );
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.25;
    this.orbitControls.screenSpacePanning = false;
    this.orbitControls.maxPolarAngle = Math.PI / 2;


    this.disableAllControls();
  }

  enableTrackballControls() {
    this.trackballControls.enabled = true;
  }

  disableTrackballControls() {
    this.trackballControls.enabled = false;
  }

  enableFlyControls() {
    this.flyControls.enabled = true;
  }

  disableFlyControls() {
    this.flyControls.enabled = false;
  }

  enableFirstPersonControls() {
    this.firstPersonControls.enabled = true;
  }

  disableFirstPersonControls() {
    this.firstPersonControls.enabled = false;
  }

  enableOrbitControls() {
    this.orbitControls.enabled = true;
  }

  disableOrbitControls() {
    this.orbitControls.enabled = false;
  }

  
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    const delta = this.clock.getDelta();
    this.trackballControls.update(delta);
    this.firstPersonControls.update(delta);
    this.orbitControls.update(delta);
    this.flyControls.update(delta);
    this.renderer.render(this.scene, this.camera);
 
  }

  disableAllControls() {
    this.disableTrackballControls();
    this.disableFlyControls();
    this.disableFirstPersonControls();
    this.disableOrbitControls();
  }
}
