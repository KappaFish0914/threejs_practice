import * as THREE from 'three';
import {
  initOrbitControls,
  initGridHelper
} from '../../utils/util.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from 'three/examples/jsm/Addons.js';
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5)


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 3)
camera.lookAt(0,0,0)

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light)

const renderer = new THREE.WebGLRenderer({
  antialias: true  // 抗锯齿
});

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

const gltfLoader = new GLTFLoader()
const oProcess = document.querySelector(".process");

gltfLoader.load("../../assets/models/AnisotropyBarnLamp.glb",
  (gltf) => {
    // 加载成功
    gltf.scene.position.set(0, 1, 0);
    scene.add(gltf.scene)
    console.log('gltf', gltf)
}, (xhr) => {
  // 加载进度
  if (xhr.lengthComputable) {
    // 如果length可计算
    // console.log('xhr', xhr, "总字节数:", xhr.total, "已加载字节数:",xhr.loaded)
    const percent = xhr.loaded / xhr.total * 100
    oProcess.textContent = `${Math.round(percent, 2)}%`
    if (percent >= 100) {
      oProcess.remove()
    }
  }
  
}, (err) => {
  // 错误回调
  console.log(err.message)
})

const objLoader = new OBJLoader()
objLoader.load("../../assets/models/cerberus/Cerberus.obj", 
  (obj) => {
    obj.position.set(0, 0, 0)
    scene.add(obj)
    console.log('obj', obj)
},(xhr) => {

}, (err) => {

})

const fbxLoader = new FBXLoader()
fbxLoader.load("../../assets/models/mixamo.fbx", 
  (fbx) => {
    console.log('fbx', fbx)
    fbx.scale.set(0.01, 0.01, 0.01)
    fbx.position.set(3, 0, 0)
    scene.add(fbx)
  }, 
  (xhr) => {

  },
  (err) => {

  })

function animate() {
  controls.update()
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

let controls = null
function initControls() {
  controls = initOrbitControls(camera, renderer);
  initGridHelper(scene)
  
}
initControls()

// 窗口大小调整
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});