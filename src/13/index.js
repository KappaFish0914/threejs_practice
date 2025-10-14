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

const sphereRadius = 2
const textureLoader = new THREE.TextureLoader()
let texture = textureLoader.load("../../assets/images/texture.png");
let sphereList = []
const createSphere = (position, direction) => {
  // 创建可视化小球
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(sphereRadius, 32, 32),
    new THREE.MeshPhongMaterial({
      // color: new THREE.Color("rgb(255, 0, 0)"),
      map: texture
    })
  )
  sphere.position.copy(position)
  scene.add(sphere)

  // 创建物理小球
  const sphereBody = new CANNON.Body({
    mass: 1,
    material: sphereMaterial,
    linearDamping: 0.5, // （空气）阻力
  })
  const sphereShape = new CANNON.Sphere(sphereRadius)
  sphereBody.position.copy(position)
  sphereBody.addShape(sphereShape)
  sphereBody.applyLocalForce(
    direction.scale(100),
    new CANNON.Vec3(0, -10, 0),
  )
  world.addBody(sphereBody)
  sphereList.push({
    sphere,
    sphereBody,
  })
}



const updatePhysic = () => {
  world.step(1/30); // 每秒30帧的步长更新
  sphereList.forEach(({sphere, sphereBody}) => {
    sphere.position.copy(sphereBody.position)
  
    // console.log('sphereBody', sphereBody)
    // 并没有 sphereBody.rotation 属性
    // sphere.rotation.copy(sphereBody.rotation)
    // 使用四元数quaternion更新滚动状态
    sphere.quaternion.copy(sphereBody.quaternion)
  })
  
}

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
renderer.domElement.addEventListener("mouseup", (event) => {
  const mouse = new THREE.Vector2()
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = - ((event.clientY / window.innerHeight) * 2 - 1)
  const raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(mouse, camera);
  const pos = new THREE.Vector3()
  pos.copy(raycaster.ray.direction)
  pos.add(raycaster.ray.origin)
  const direction = new CANNON.Vec3(
    raycaster.ray.direction.x,
    raycaster.ray.direction.y,
    raycaster.ray.direction.z
  )
  createSphere({x: pos.x, y: pos.y, z: pos.z}, direction)
})
renderer.render(scene, camera);


function animate() {
  updatePhysic()

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);



let controls = null
function initControls() {
  controls = initOrbitControls(camera, renderer);
  // initGridHelper(scene)
  
}
initControls()

// 窗口大小调整
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});