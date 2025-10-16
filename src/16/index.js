import * as THREE from 'three';
import {
  initOrbitControls,
  initGridHelper,
  initStats
} from '../../utils/util.js';
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5)


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0.5, -3.5)
camera.lookAt(0,0,0)

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light)

const renderer = new THREE.WebGLRenderer({
  antialias: true  // 抗锯齿
});

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);



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

