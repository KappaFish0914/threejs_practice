import * as THREE from 'three';

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xc89e06b)
// scene.background = new THREE.Color('rgb(200, 150, 11)')
scene.background = new THREE.Color('hsl(35, 90%, 41%)')

const loader = new THREE.TextureLoader()
loader.load('../../assets/images/back.png', function(texture) {
  scene.background = texture;
  
  // 正常是要掉用渲染器进行渲染的
  // 但是因为 animation() 方法一直在执行，所以这里不写也没关系
  renderer.render(scene, camera);
});

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.lookAt(0,0,0)
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: 0xcecece });
const cube = new THREE.Mesh(geometry, material);
const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube2 = new THREE.Mesh(geometry, material2);
cube2.position.x = 2
scene.add(cube);
scene.add(cube2)

camera.position.z = 5;

function animate() {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff })

// const points = [];

// points.push(new THREE.Vector3(-10, 0, 0));
// points.push(new THREE.Vector3(0, 10, 0));
// points.push(new THREE.Vector3(10, 0, 0));

// const geometry2 = new THREE.BufferGeometry().setFromPoints( points );

// const line = new THREE.Line( geometry2, material );

// scene.add(line);
// renderer.render(scene, camera)

