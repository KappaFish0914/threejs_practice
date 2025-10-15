import * as THREE from 'three';
import {
  initOrbitControls,
  initGridHelper,
  initStats
} from '../../utils/util.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from 'three/examples/jsm/Addons.js';
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

const gltfLoader = new GLTFLoader()
const oProcess = document.querySelector(".process");
// const oInput = document.querySelector(".input");
// let lamp;
// oInput.addEventListener("input", (event) => {
//   console.log(event.target.value)
//   lamp.material.color.set(new THREE.Color(event.target.value))
// })
let mixer, idleAction, runAction, currentAction;
gltfLoader.load("../../assets/models/Soldier.glb",
  (gltf) => {
    // 加载成功
    
    const model = gltf.scene;
    const animations = gltf.animations;
    const runClip = animations.find((animation) => {
      return animation.name === 'Run'
    })
    const idleClip = animations.find((animation) => {
      return animation.name === "Idle"
    })
    mixer = new THREE.AnimationMixer(model)
    if (runClip) {
      runAction = mixer.clipAction(runClip)
      // runAction.play()
      console.log('runAction', runAction)
    }
    if (idleClip) {
      idleAction = mixer.clipAction(idleClip)
      idleAction.play()
      currentAction = idleAction
    }
    model.position.set(0, 0, 0);
    
    scene.add(model)
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

window.addEventListener('keydown', (event) => {
  if (event.code === 'KeyW') {
    if (runAction && runAction !== currentAction) {
      currentAction.fadeOut(0.5); // 去掉当前动作
      runAction.reset().fadeIn(0.5).play()
      currentAction = runAction
    }
  }
})
window.addEventListener('keyup', (event) => {
  if (event.code === 'KeyW') {
    if (idleAction && idleAction !== runAction) {
      currentAction.fadeOut(0.5); // 去掉当前动作
      idleAction.reset().fadeIn(0.5).play()
      currentAction = idleAction
    }
  }
})

// const objLoader = new OBJLoader()
// objLoader.load("../../assets/models/cerberus/Cerberus.obj", 
//   (obj) => {
//     obj.position.set(0, 0, 0)
//     scene.add(obj)
//     console.log('obj', obj)
// },(xhr) => {

// }, (err) => {

// })

// const fbxLoader = new FBXLoader()
// fbxLoader.load("../../assets/models/mixamo.fbx", 
//   (fbx) => {
//     console.log('fbx', fbx)
//     fbx.scale.set(0.01, 0.01, 0.01)
//     fbx.position.set(3, 0, 0)
    
//     scene.add(fbx)
//   }, 
//   (xhr) => {

//   },
//   (err) => {

//   }
// )



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
  
  if (mixer) {
    // 这个能正常执行
    mixer.update(1/60)
    // 用总时间elapsedTime 鬼畜了
    // mixer.update(elapsedTime)
    // 如果电脑不好的话，会掉帧，
    // 可能导致2帧之间的时间差deltaTime会很大
    // 动画就会变得一卡一卡的
    // 但是我不知道为什么，我电脑拿到的deltaTime大部分时间是0
    // 所以动画就不执行
    // 有时又取到非常小的值，
    // 并且由于deltaTime非常不稳定
    // 如果使用 deltaTime * 1000 会放大这种不稳定
    // 导致动画一卡一卡的
    // mixer.update(deltaTime);
  }

  if (controls) {
    controls.update()
  }
  if (stats) {
    stats.update()
  }
  
  renderer.render(scene, camera);
  // requestAnimationFrame(animate)
}
// animate()
renderer.setAnimationLoop(animate);

// 窗口大小调整
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

