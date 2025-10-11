import * as THREE from 'three';


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
function animate() {  
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

let isDown = false
let startx = 0;
let currentX = 0;

renderer.domElement.addEventListener('mousedown', (e) => {
  isDown = true
  startx = e.clientX
})
renderer.domElement.addEventListener('mousemove', (e) => {
  if (isDown) {
    const distanceX = e.clientX - startx;
    currentX += distanceX * 0.01
    startx = e.clientX
    camera.position.x = 40 * Math.cos(currentX)
    camera.position.z = 40 * Math.sin(currentX)
    camera.lookAt(0,0,0)
  }
})
renderer.domElement.addEventListener('mouseup', (e) => {
  isDown = false
})
