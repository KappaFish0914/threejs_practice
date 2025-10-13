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
});
renderer.shadowMap.enabled = true // enable要写这里才有用

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  })
)
plane.receiveShadow = true;
plane.rotateX(0.5 * Math.PI)

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 16),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    shadowSide: THREE.DoubleSide,
  })
)
sphere.castShadow = true
sphere.receiveShadow = false;
sphere.position.set(-4, 0, 0)

const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 16),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    shadowSide: THREE.DoubleSide,
  })
)
sphere2.castShadow = true
sphere2.receiveShadow = false;
sphere2.position.set(0, 1, 0)

const sphere3 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 16),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    shadowSide: THREE.DoubleSide,
  })
)
sphere3.castShadow = true
sphere3.receiveShadow = false;
sphere3.position.set(4, 0, 0)

scene.add(plane, sphere, sphere2, sphere3);

const raycaster = new THREE.Raycaster()
const rayOrigin = new THREE.Vector3(-6, 0, 0)
const rayDirection = new THREE.Vector3(1, 0, 0)
rayDirection.normalize(); // 归一化/成为单位向量
// raycaster.set(rayOrigin, rayDirection)
const meshes = [sphere, sphere2, sphere3]

const pointer = new THREE.Vector2()
function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  
}

// 环境光 不会产生阴影
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight)
// 点光源
const light = new THREE.PointLight(0xffffff, 5, 100, 0.5);
light.position.set(10, 10, 0)
light.castShadow = true
// 增加阴影分辨率减少阴影毛刺/锯齿
// 减少阴影分辨率增加阴影毛刺/锯齿
light.shadow.mapSize.width = 512
light.shadow.mapSize.height = 512
scene.add(light)
let lightHelper = initPointLightHelper(scene, light, 2)



let delta = 0.5;
function animate() {  
  
  delta += 2
  raycaster.setFromCamera(pointer, camera);

  
  sphere.position.y = 2 * Math.sin(delta * Math.PI / 180 * 0.5)
  sphere2.position.y = 2 * Math.sin(delta * Math.PI / 180 )
  sphere3.position.y = 2 * Math.sin(delta * Math.PI / 180 * 1.5)

  meshes.forEach((mesh) => {
    mesh.material.color.set(new THREE.Color(0xffffff))
  })
  const intersectArr = raycaster.intersectObjects(meshes)
  console.log('intersectArr', intersectArr)
  for (const intersecObject of intersectArr) {
    intersecObject.object.material.color.set(new THREE.Color(0xff0000))
  } 
  
  if (controls) {
    controls.update()
  }
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('pointermove', onPointerMove)

let controls = null
function initControls() {
  controls = initOrbitControls(camera, renderer);
  initGridHelper(scene)
  
}
// initControls()


// 窗口大小调整
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});