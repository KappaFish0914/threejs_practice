import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { color } from 'three/tsl';

const scene = new THREE.Scene();

scene.background = new THREE.Color('hsl(35, 90%, 41%)')

const loader = new THREE.TextureLoader()
loader.load('../../assets/images/back.png', function(texture) {
  scene.background = texture;
  
  // 正常是要掉用渲染器进行渲染的
  // 但是因为 animation() 方法一直在执行，所以这里不写也没关系
  renderer.render(scene, camera);
});

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 40)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({
  antialias: true  // 抗锯齿
});

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);
// 创建结构 几何体
const widthSegments = 1
const heightSegments = 1
// const geometry = new THREE.PlaneGeometry(10, 10, widthSegments, heightSegments);
// Float32Array 类型化数组
// 绘制一个平面
const vertics = new Float32Array([
  -1.0, -1.0, 1.0,
   1.0, -1.0, 1.0,
   1.0,  1.0, 1.0,
   1.0,  1.0, 1.0,
  -1.0,  1.0, 1.0,
  -1.0, -1.0, 1.0
])
const colors = new Float32Array([
  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0,
  0.0, 0.0, 1.0,
  1.0, 1.0, 0.0,
  1.0, 0.0, 0.0,
])
// 绘制一个cube（也就是6个平面)
const vertics2 = new Float32Array([
  -1.0, -1.0, 1.0,
   1.0, -1.0, 1.0,
   1.0,  1.0, 1.0,
   1.0,  1.0, 1.0,
  -1.0,  1.0, 1.0,
  -1.0, -1.0, 1.0,  

  -1.0, -1.0, -1.0,
   1.0, -1.0, -1.0,
   1.0,  1.0, -1.0,
   1.0,  1.0, -1.0,
  -1.0,  1.0, -1.0,
  -1.0, -1.0, -1.0,

  -1.0, -1.0, 1.0,
  -1.0, -1.0, -1.0,
  -1.0, 1.0, -1.0,
  -1.0, 1.0, -1.0,
  -1.0, 1.0, 1.0,
  -1.0, -1.0, 1.0,

  1.0, -1.0, 1.0,
  1.0, -1.0, -1.0,
  1.0, 1.0, -1.0,
  1.0, 1.0, -1.0,
  1.0, 1.0, 1.0,
  1.0, -1.0, 1.0,

  -1.0, 1.0, 1.0,
   -1.0, 1.0, -1.0,
   1.0, 1.0, -1.0,
   1.0, 1.0, -1.0,
  1.0, 1.0, 1.0,
  -1.0, 1.0, 1.0,

  -1.0, -1.0, 1.0,
   -1.0, -1.0, -1.0,
   1.0, -1.0, -1.0,
   1.0, -1.0, -1.0,
  1.0, -1.0, 1.0,
  -1.0, -1.0, 1.0,


])

const colors2 = new Float32Array([
  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0,
  0.0, 0.0, 1.0,
  1.0, 1.0, 0.0,
  1.0, 0.0, 0.0,

  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0,
  0.0, 0.0, 1.0,
  1.0, 1.0, 0.0,
  1.0, 0.0, 0.0,

  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0,
  0.0, 0.0, 1.0,
  1.0, 1.0, 0.0,
  1.0, 0.0, 0.0,

  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0,
  0.0, 0.0, 1.0,
  1.0, 1.0, 0.0,
  1.0, 0.0, 0.0,

  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0,
  0.0, 0.0, 1.0,
  1.0, 1.0, 0.0,
  1.0, 0.0, 0.0,

  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0,
  0.0, 0.0, 1.0,
  1.0, 1.0, 0.0,
  1.0, 0.0, 0.0,

])
const geometry = new THREE.BufferGeometry()
geometry.setAttribute("position", new THREE.BufferAttribute(vertics2, 3));
geometry.setAttribute("color", new THREE.BufferAttribute(colors2, 3))
// 创建材质 外观
const material = new THREE.MeshBasicMaterial({ 
  // color: 0xffee0,
  vertexColors: true,
  side: THREE.DoubleSide,
  wireframe: true
});
// 结构和材质组合 生成一个物体
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const size = 100;
const divisions = 10;
const colorCenterline = 0xffffff
const colorOtherLine = 0xff0000

const gridHelper = new THREE.GridHelper(size, divisions, colorCenterline, colorOtherLine)
scene.add(gridHelper);

// 辅助坐标系
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
// controls.addEventListener('change', () => {
//   console.log(camera.position)
//   // renderer.render(scene, camera)
// })
function animate() {  
  renderer.render(scene, camera);
  controls.update()
}

renderer.setAnimationLoop(animate);
