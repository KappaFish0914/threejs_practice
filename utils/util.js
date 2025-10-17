import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
/**
 * 坐标系
 * @param {*} scene 
 * @returns 
 */
export function initGridHelper(scene) {
  const size = 100;
  const divisions = 10;
  const colorCenterline = 0xffffff
  const colorOtherLine = 0xff0000

  const gridHelper = new THREE.GridHelper(size, divisions, colorCenterline, colorOtherLine)
  scene.add(gridHelper);

  // 辅助坐标系
  const axesHelper = new THREE.AxesHelper(2);
  scene.add(axesHelper);

  return axesHelper
} 
/**
 * 轨道
 * @param {*} camera 
 * @param {*} renderer 
 * @returns 
 */
export function initOrbitControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  return controls
}
/**
 * 平行光辅助对象
 */
export function initDirectionalLightHelper(scene, light, size = 5, color) {
  const helper = new THREE.DirectionalLightHelper(light, size, color)
  scene.add(helper)
  return helper;
}

/**
 * 半球光辅助对象
 */
export function initHemispherelLightHelper(scene, light, size = 5, color) {
  const helper = new THREE.HemisphereLightHelper(light, size, color)
  scene.add(helper)
  return helper;
}

/**
 * 点光源辅助对象
 */
export function initPointLightHelper(scene, light, size = 1, color) {
  const helper = new THREE.PointLightHelper(light, size, color)
  scene.add(helper)
  return helper;
}

export function initStats() {
  const stats = new Stats();
  document.body.appendChild(stats.dom);
  stats.dom.style.position = "absolute";
  stats.dom.style.left = "20px";
  stats.dom.style.top = "20px";

  return stats;
}