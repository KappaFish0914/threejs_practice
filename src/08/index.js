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
  antialias: true  // 抗锯齿
});

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide
  })
)
plane.rotation.x = -Math.PI / 2

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshStandardMaterial()
)
cube.position.set(0, 2, 0)

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial()
)
sphere.position.set(3, 2, 0)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.5),
  new THREE.MeshStandardMaterial()
)
torus.position.set(-3, 2, 0)


scene.add(plane, cube, sphere, torus);

// 环境光
const ambientLight = new THREE.AmbientLight(0xff0000, 1);
// scene.add(ambientLight)
// 平行光
const directionLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionLight.position.set(30, 30, -30)
// scene.add(directionLight)
// initDirectionalLightHelper(scene, directionLight, 5)

// 半球光
const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 1)
// scene.add(hemisphereLight);
// initHemispherelLightHelper(scene, hemisphereLight, 5)
// 点光源
const pointLight = new THREE.PointLight(0x00ff00, 1, 100, 1);
pointLight.position.set(-5, 5, 0)
scene.add(pointLight);
initPointLightHelper(scene, pointLight, 0.5)

function animate() {  
  renderer.render(scene, camera);
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