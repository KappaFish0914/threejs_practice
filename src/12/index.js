import * as THREE from 'three';
import * as CANNON from 'cannon';
import {
  initOrbitControls,
  initGridHelper
} from '../../utils/util.js'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(30, 30, 30)
camera.lookAt(0,0,0)
scene.add(camera)

const light = new THREE.AmbientLight(
  new THREE.Color(0xffffff),
  1
)
scene.add(light)

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshBasicMaterial({
    color: new THREE.Color("rgb(105, 105, 105)"),
    side: THREE.DoubleSide
  })
)
plane.rotateX(0.5 * Math.PI)
scene.add(plane)
const sphereRadius = 2
const spherePosition = [0, 10, 0]
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(sphereRadius, 32, 32),
  new THREE.MeshPhongMaterial({
    color: new THREE.Color("rgb(255, 0, 0)")
  })
)
sphere.position.set(...spherePosition)
scene.add(sphere)

// 创建物理世界
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0)
// 创建物理材料
const groundMaterial = new CANNON.Material("groundMaterial");
const sphereMaterial = new CANNON.Material("sphereMaterial");
const contactMaterial = new CANNON.ContactMaterial(groundMaterial, sphereMaterial, {
  friction: 0.3, // 摩擦系数
  restitution: 0.8, // 反弹系数
})
world.addContactMaterial(contactMaterial)
// 创建物理地面
const groundBody = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Plane(),
  material: groundMaterial
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

world.addBody(groundBody)
// 创建物理小球
const sphereBody = new CANNON.Body({
  mass: 1,
  position: new CANNON.Vec3(...spherePosition),
  material: sphereMaterial
})
const sphereShape = new CANNON.Sphere(sphereRadius)
sphereBody.addShape(sphereShape)
world.addBody(sphereBody)

const updatePhysic = () => {
  world.step(1/30); // 每秒30帧的步长更新
  sphere.position.copy(sphereBody.position)
}

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera);


function animate() {
  updatePhysic()

  renderer.render(scene, camera);
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