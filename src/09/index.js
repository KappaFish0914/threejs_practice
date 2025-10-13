import * as THREE from 'three';
import {
  initOrbitControls,
  initGridHelper,
  initDirectionalLightHelper,
  initHemispherelLightHelper,
  initPointLightHelper
} from '../../utils/util.js'

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 40)
camera.lookAt(0, 0, 0)


const renderer = new THREE.WebGLRenderer({
  antialias: true,  // 抗锯齿
  // shadowMap: {  // 这里写阴影配置没用
    // enable: true,
    // type: THREE.PCFSoftShadowMap // 使用柔和阴影
  // }
});
renderer.shadowMap.enabled = true // enable要写这里才有用

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    color: 0xffffff,
    // receiveShadow: true, // 这里写阴影配置没用
  })
)
plane.receiveShadow = true
plane.rotation.x = -Math.PI / 2

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshStandardMaterial({
    color: 0xff0000,
    shadowSide: THREE.DoubleSide,
    // castShadow: true // 这里写阴影配置没用
  })
)
cube.castShadow = true
cube.receiveShadow = false;
cube.position.set(0, 1, 0)

scene.add(plane, cube);

// 环境光 不会产生阴影
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight)
// 平行光
// const light = new THREE.DirectionalLight(0xffffff, 0.5);
// light.position.set(30, 30, -30)
// light.castShadow = true
// // 增加阴影分辨率减少阴影毛刺/锯齿
// light.shadow.mapSize.width = 2048
// light.shadow.mapSize.height = 2048
// scene.add(light)
// let lightHelper = initDirectionalLightHelper(scene, light, 5)
// 点光源
const light = new THREE.PointLight(0xffffff, 5, 100, 0.5);
light.position.set(30, 30, -30)
light.castShadow = true
// 增加阴影分辨率减少阴影毛刺/锯齿
// 减少阴影分辨率增加阴影毛刺/锯齿
light.shadow.mapSize.width = 512
light.shadow.mapSize.height = 512
scene.add(light)
let lightHelper = initPointLightHelper(scene, light, 2)

let delta = 0.5;
let radius = 30;
function animate() {  
  renderer.render(scene, camera);
  delta += 0.5
  light.position.x = radius * Math.cos(delta * Math.PI / 180)
  light.position.y = radius * Math.sin(delta * Math.PI / 180)
  lightHelper.update()
  if (controls) {
    controls.update()
  }
}

renderer.setAnimationLoop(animate);

let controls = null
function initControls() {
  controls = initOrbitControls(camera, renderer);
  initGridHelper(scene)
  
}
initControls()


// 窗口大小调整
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});