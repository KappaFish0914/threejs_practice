import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';

export function initGridHelper(scene) {
  const size = 100;
  const divisions = 10;
  const colorCenterline = 0xffffff
  const colorOtherLine = 0xff0000

  const gridHelper = new THREE.GridHelper(size, divisions, colorCenterline, colorOtherLine)
  scene.add(gridHelper);

  // 辅助坐标系
  const axesHelper = new THREE.AxesHelper();
  scene.add(axesHelper);

  return axesHelper
} 

export function initOrbitControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  return controls
}

