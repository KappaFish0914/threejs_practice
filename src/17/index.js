import * as THREE from 'three';
import {
  initOrbitControls,
  initGridHelper,
  initStats
} from '../../utils/util.js';
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5)


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5)
camera.lookAt(0,0,0)

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light)

const renderer = new THREE.WebGLRenderer({
  antialias: true  // 抗锯齿
});

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

// const textureLoader = new THREE.TextureLoader()
// const images = [
//   "../../assets/images/16/posx.jpg",
//   "../../assets/images/16/negx.jpg",
//   "../../assets/images/16/posy.jpg",
//   "../../assets/images/16/negy.jpg",
//   "../../assets/images/16/posz.jpg",
//   "../../assets/images/16/negz.jpg",
// ]
// const materials = []
// images.forEach((imgUrl) => {
//   const texture = textureLoader.load(imgUrl);
//   materials.push(
//     new THREE.MeshBasicMaterial({
//       map: texture
//     })
//   )
// })
// // 创建立方体盒子
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(40, 40, 40),
//   materials
// )
// // 把z轴 放大系数设为-1，从而改变法向向量方向
// // 这样才能在 cube 内部看到贴图
// cube.geometry.scale(1, 1, -1)
// scene.add(cube)

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load("../../assets/images/17/hay_bales_1k.jpg");

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(16, 32, 32),
  new THREE.MeshBasicMaterial({
    map: texture
  })
)
sphere.geometry.scale(1, 1, -1)
scene.add(sphere)
// 点精灵
const spriteTexture = textureLoader.load("../../assets/images/17/scene1.png")
const spriteMaterial = new THREE.SpriteMaterial({
  map: spriteTexture
})
const sprite = new THREE.Sprite(spriteMaterial)
sprite.scale.set(0.5, 0.25, 1)
sprite.position.set(-1.8, 0, -1.5)
scene.add(sprite)

// 事件
const oTips = document.querySelector(".tips");
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2()
renderer.domElement.addEventListener('mousemove', (event) => {
  // --------------------- 屏幕坐标转化成世界坐标 开始 ------------------------
  // 屏幕坐标归一化
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = - ((event.clientY / window.innerHeight) * 2 - 1)
  // 利用 raycaster 射线，扫到物体后，获取物体的坐标
  raycaster.setFromCamera(mouse, camera)
  let intersect = raycaster.intersectObject(sprite)
  
  if (intersect && intersect.length > 0) {
    // console.log('intersct', intersect)
    // 将物体的坐标当作世界坐标
    const worldVector = new THREE.Vector3(
      intersect[0].object.position.x,
      intersect[0].object.position.y,
      intersect[0].object.position.z
    );
    // --------------------- 屏幕坐标转化成世界坐标 结束 ------------------------
    // 将此坐标从世界空间投影到相机的标准化设备坐标（也就是屏幕坐标）
    const dncPosition = worldVector.project(camera)
    const halfWidth = window.innerWidth / 2
    const left = halfWidth * dncPosition.x + halfWidth
    const halfHeight = window.innerHeight / 2
    const top = - halfHeight * dncPosition.y + halfHeight
    
    oTips.style.left = left + 'px'
    oTips.style.top = top - oTips.clientHeight / 2 + 'px' 
    
  } else {
    oTips.style.left = 0
    oTips.style.top = 0
  }


  // oTips.style.left = 
  // oTips.style.top = 
})
renderer.domElement.addEventListener('mousedown', (event) => {

})

let controls = null
let stats = null
function initControls() {
  controls = initOrbitControls(camera, renderer);
  initGridHelper(scene)
  stats = initStats()
}
initControls()

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime()  // 总时间
  const deltaTime = clock.getDelta(); // 两帧之间的时间差
  // console.log('deltaTime', deltaTime.toFixed(4))
  
  
  if (controls) {
    controls.update()
  }
  if (stats) {
    stats.update()
  }
  
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// 窗口大小调整
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

