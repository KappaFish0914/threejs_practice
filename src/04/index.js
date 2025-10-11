import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
camera.position.set(0, 200, 20)
camera.lookAt(0,0,0)

const renderer = new THREE.WebGLRenderer({
  antialias: true  // 抗锯齿
});

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(10,10,10);
const material = new THREE.MeshBasicMaterial({ color: 0xcecece });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const size = 100;
const divisions = 10;
const colorCenterline = 0xffffff
const colorOtherLine = 0xff0000
const gridHelper = new THREE.GridHelper(size, divisions, colorCenterline, colorOtherLine)

scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.addEventListener('change', () => {
  console.log(camera.position)
  // renderer.render(scene, camera)
})
function animate() {  
  renderer.render(scene, camera);
  controls.update()
}

renderer.setAnimationLoop(animate);
