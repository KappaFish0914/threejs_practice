import * as THREE from 'three';
import {
  scene,
  camera,
  createLight,
  renderer,
} from '../../utils/base.js';
import {
  initAxesHelper,
  initOrbitControls
} from '../../utils/util.js';

const endPoint = new THREE.Vector3(0, 0, 0)
camera.position.set(0, 5, 10);
camera.lookAt(endPoint)
// 获取照相机观察方向的方向向量
const direction = new THREE.Vector3()
camera.getWorldDirection(direction);
console.log(direction);

/**
 * 手动计算方向向量
 * 终点坐标 - 起点坐标
 * 中心位置点坐标 - 相机位置点坐标
 * (0, 0, 0) - (0, 0, 10) = 
 * (0, 0, -10)
 * 
 * 用勾股定理获取每个分量的长度，
 * 获取每个分量的长度后，就可以进行归一化操作
 */
function vectorLength(sourceVector3, targetVector3) {
  const x = targetVector3.x - sourceVector3.x;
  const y = targetVector3.y - sourceVector3.y;
  const z = targetVector3.z - sourceVector3.z;

  const x_pow = Math.pow(x, 2);
  const y_pow = Math.pow(y, 2);
  const z_pow = Math.pow(z, 2);

  const sum = x_pow + y_pow + z_pow;

  const sum_sqrt = Math.sqrt(sum);
  
  // 归一化后的向量
  const result = new THREE.Vector3(
    x/sum_sqrt,
    y/sum_sqrt,
    z/sum_sqrt
  )
  console.log(result)
  return result
}
/**
 * THREE.Vector3 直接提供了 向量减法
 * @param {*} sourceVector3 
 * @param {*} targetVector3 
 * @returns 
 */
function vertorLength2(sourceVector3, targetVector3) {
  
  let subVector3 = new THREE.Vector3();
  subVector3.clone(targetVector3);
  subVector3.sub(sourceVector3)
  const x_pow = Math.pow(subVector3.x, 2);
  const y_pow = Math.pow(subVector3.y, 2);
  const z_pow = Math.pow(subVector3.z, 2);

  const sum = x_pow + y_pow + z_pow;

  const sum_sqrt = Math.sqrt(sum);
  
  // 归一化后的向量
  const result = new THREE.Vector3(
    subVector3.x/sum_sqrt,
    subVector3.y/sum_sqrt,
    subVector3.z/sum_sqrt
  )
  console.log(result)
  return result

}

vectorLength(
  camera.position,
  endPoint
)
vertorLength2(
  camera.position,
  endPoint
)






// createLight()
let controls;
function initHelper() {
  controls = initOrbitControls(camera, renderer)
  initAxesHelper(scene,5);
}
initHelper()

// 添加一个SphereGeometry,用于显示相机位置方便观察
const cubeCamera = new THREE.Mesh(
  new THREE.SphereGeometry(0.2),
  new THREE.MeshBasicMaterial({
    color: 0xff1ff1,
    wireframe: true
  })
)
// 相机位置向量，缩放 0.6得到的向量(这里缩放是为了让小球处于相机前面，好让相机观察到)
const pVector = camera.position.clone().multiplyScalar(0.8);
cubeCamera.position.copy(pVector);
scene.add(cubeCamera);

const geometry = new THREE.BufferGeometry()
.setFromPoints([
  pVector,
  endPoint
]);
const material = new THREE.LineBasicMaterial({
  color: 0xffffff
});
const line = new THREE.Line(geometry, material)
scene.add(line)

function animate() {
  if (controls) {
    controls.update()
  }
  
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)