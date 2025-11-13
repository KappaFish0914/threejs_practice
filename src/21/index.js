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
 * 绕着x轴旋转90度
 */
// const euler = new THREE.Euler(
//   90 / 180 * Math.PI,
//   0,
//   0
// );
// box.rotation.copy(euler)
// box.rotation.set(
//   Math.PI / 2,
//   0,
//   0
// )
// 这种写法最后是旋转了70度
// box.rotation.set(
//   20 / 180 * Math.PI,
//   0,
//   0
// )
// box.rotation.set(
//   70 / 180 * Math.PI,
//   0,
//   0
// )
// 这种写法最后是旋转了20 + 70 = 90度
box.rotateX(20 / 180 * Math.PI)
box.rotateX(70 / 180 * Math.PI)

let angel = 0
function animate() {
  if (controls) {
    controls.update()
  }
  angel++;
  // box.rotation.set(angel / 180 * Math.PI, 0, 0)
  // box.rotation.x = angel / 180 * Math.PI
  
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)