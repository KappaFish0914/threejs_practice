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

const textureLoader = new THREE.TextureLoader();
const imgs = [
  "../../assets/images/21/cube4.png",
  "../../assets/images/21/cube3.png",
  "../../assets/images/21/cube5.png",
  "../../assets/images/21/cube6.png",
  "../../assets/images/21/cube1.png",
  "../../assets/images/21/cube2.png",
]
const materials = [];
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
for (let i = 0; i < imgs.length; i++) {
  const img = imgs[i];
  const texture = textureLoader.load(img);
  const boxMaterial = new THREE.MeshBasicMaterial(
    {
      map: texture
    }
  )
  materials.push(boxMaterial)
  
}
const box = new THREE.Mesh(boxGeometry, materials);

scene.add(box);
/**
 * 四元数
 * (x, y, z, w)
 * (0, 0, 0, 1)
 * 使用四元数旋转 Θ 度
 * q = (x, y, z, w) = (
 *  sin(θ/2) * vx,
 *  sin(θ/2) * vy,
 *  sin(θ/2) * vz,
 *  cos(Θ/2)
 * )
 */
// const angle = 30 / 180 * Math.PI;
// const halfAngle = angle / 2;
// const sinAngle = Math.sin(halfAngle);
// const cosAngle = Math.cos(halfAngle);
// const quaternion = new THREE.Quaternion(
//   sinAngle * 1, // 绕着x轴旋转
//   sinAngle * 1, // 绕着y轴旋转
//   sinAngle * 0, // 不绕z轴旋转
//   cosAngle
// )
// box.quaternion.copy(quaternion);
// 方式2
// const angle = 30 / 180 * Math.PI;
// const quaternion = new THREE.Quaternion();
// const axis = new THREE.Vector3(1, 0, 0); // 绕x轴旋转
// quaternion.setFromAxisAngle(
//   axis,
//   angle
// )
// box.quaternion.copy(quaternion);

// const quaternion = new THREE.Quaternion();
// const euler = new THREE.Euler(
//   Math.PI * 30 / 180,
//   Math.PI * 30 / 180,
//   Math.PI * 30 / 180
// );
// quaternion.setFromEuler(euler)


// const angle = 45 / 180 * Math.PI;
// const quaternion = new THREE.Quaternion();
// const q1 = new THREE.Quaternion()
// const axis = new THREE.Vector3(1, 0, 0)
// q1.setFromAxisAngle(axis, angle)
// const q2 = new THREE.Quaternion();
// q2.setFromAxisAngle(axis, angle)
// // 旋转45度四元数 * 旋转45度四元数 = 旋转90度四元数
// quaternion.multiplyQuaternions(
//   q1,
//   q2
// )
// box.quaternion.copy(quaternion)


const angle = 90 / 180 * Math.PI;
const quaternion = new THREE.Quaternion();
quaternion.setFromAxisAngle(
  new THREE.Vector3(0, 1, 0),
  angle
)
box.quaternion.copy(quaternion);
console.log(box.quaternion);

function animate() {
  if (controls) {
    controls.update()
  }

  const qx = new THREE.Quaternion();
  qx.setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    1 / 180 * Math.PI
  )
  const qz = new THREE.Quaternion()
  qz.setFromAxisAngle(
    new THREE.Vector3(0, 0, 1),
    1 / 180 * Math.PI
  )
  box.quaternion.multiplyQuaternions(
    qx,
    box.quaternion
  )
  box.quaternion.multiplyQuaternions(
    qz,
    box.quaternion
  )

  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)