import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { color } from 'three/tsl';

const scene = new THREE.Scene();

// scene.background = new THREE.Color('hsl(35, 90%, 41%)')

const loader = new THREE.TextureLoader()
// loader.load('../../assets/images/back.png', function(texture) {
//   scene.background = texture;
  
//   // 正常是要掉用渲染器进行渲染的
//   // 但是因为 animation() 方法一直在执行，所以这里不写也没关系
//   renderer.render(scene, camera);
// });

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 40)
camera.lookAt(0, 0, 0)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
const directionLight = new THREE.DirectionalLight(0xffffff, 1)
directionLight.position.set(30, 30, 30)
scene.add(ambientLight)
scene.add(directionLight)

const renderer = new THREE.WebGLRenderer({
  antialias: true  // 抗锯齿
});

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);
// 创建结构 几何体
const geometry = new THREE.SphereGeometry(12, 32, 32);
// 贴图
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./texture.png')
// 创建材质 外观
const material = new THREE.MeshStandardMaterial({ 
  color: 0xff0000,
  // emissive: 0xff1234, // 自发光
  // map: texture,
  roughness: 0.5, // 粗糙度 0 镜面反射 1 漫反射
  metalness: 0.7, // 0 粗糙/木材/石材 1 金属
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
