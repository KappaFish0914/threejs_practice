import * as THREE from 'three';
import {
  scene,
  camera,
  createLight,
  renderer,
} from '../../utils/base.js';
import {
  initAxesHelper,
  initOrbitControls,
  initGridHelper
} from '../../utils/util.js';

const endPoint = new THREE.Vector3(0, 0, 0)
camera.position.set(0, 5, 10);
camera.lookAt(endPoint)
// 获取照相机观察方向的方向向量
const direction = new THREE.Vector3()
camera.getWorldDirection(direction);
console.log(direction);


let controls;
function initHelper() {
  controls = initOrbitControls(camera, renderer);
  initGridHelper(scene, 5);
}
initHelper()


const player = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 1, 32),
  new THREE.MeshBasicMaterial({
    color: 0xffff00
  })
)
player.position.set(0, 0.5, 0);
scene.add(player);
// 速度(方向 + 大小)
const velocity = new THREE.Vector3(3, 0, 3);

const keyEnum = {
  W: false,
  A: false,
  D: false,
  S: false
}
window.addEventListener("keydown", (event) => {
  const keyCode = event.key.toUpperCase()
  if(keyEnum.hasOwnProperty(keyCode)) {
    keyEnum[keyCode] = true
  }
})
window.addEventListener("keyup", (event) => {
  const keyCode = event.key.toUpperCase()
  if(keyEnum.hasOwnProperty(keyCode)) {
    keyEnum[keyCode] = false
  }
})

function animate() {
  if (controls) {
    controls.update()
  }
  if (keyEnum.W) {
    // // 向量缩放
    // const velClone = velocity.clone().multiplyScalar(1/180)
    // // 向量加减法API
    // player.position.add(velClone);
    // 向量缩放后，赋值给 调用向量（也就是上面两个函数的结合）
    player.position.addScaledVector(velocity, 1/180);
  }
  
  
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)