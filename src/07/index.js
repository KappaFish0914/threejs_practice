import * as THREE from 'three';
import {
  initOrbitControls,
  initGridHelper
} from '../../utils/util.js'

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 40)
camera.lookAt(0, 0, 0)


const renderer = new THREE.WebGLRenderer({
  antialias: true  // 抗锯齿
});

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

// const image = new Image();
// image.src = "../../assets/images/texture.png"

// const texture = new THREE.Texture(image)
// image.onload = () => {
  
//   texture.needsUpdate = true
  
// }
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load("../../assets/images/texture.png", (texture) => {
  
}, undefined, (err) => {
  console.error('加载纹理失败')
})

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshBasicMaterial({
    map: texture
  })
)
scene.add(cube);




function animate() {  
  renderer.render(scene, camera);
  if (controls) {
    controls.update()
  }
  
}

renderer.setAnimationLoop(animate);

let controls = null
function initControls() {
  controls = initOrbitControls(camera, renderer);
  initGridHelper(scene)
}
initControls()