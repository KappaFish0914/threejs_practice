import * as THREE from 'three';
import {
  initOrbitControls,
  initGridHelper
} from '../../utils/util.js'

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 0)
camera.lookAt(0, 0, 0)

const light = new THREE.AmbientLight( 0x404040 , 10); // 柔和的白光
const directionLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionLight.position.set(30, 30, 30)
scene.add( light );

const renderer = new THREE.WebGLRenderer({
  antialias: true  // 抗锯齿
});

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load("../../assets/images/rock_wall_15_diff_4k.jpg");
const displacementMap = textureLoader.load("../../assets/images/rock_wall_15_disp_4k.png");
const normalMap = textureLoader.load("../../assets/images/rock_wall_15_nor_gl_4k.exr");
const roughnessMap = textureLoader.load("../../assets/images/rock_wall_15_rough_4k.exr");

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    map: texture,
    displacementMap,
    normalMap,
    roughnessMap
  })
)
plane.rotateX(90 / 180 * Math.PI)
scene.add(plane)


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