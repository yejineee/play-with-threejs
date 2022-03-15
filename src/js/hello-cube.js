import * as THREE from 'three'

// Scene
const scene = new THREE.Scene();

// Light
const lightProperty = {
  color: 0xfffffff,
  intensity : 1,
}
const light = new THREE.DirectionalLight(lightProperty.color, lightProperty.intensity);
light.position.set(-1, 2, 4);

// Camera
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;


// Mesh
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

const cubes = [
  makeInstance(geometry, 0x44aa88,  0),
  makeInstance(geometry, 0x8844aa, -2),
  makeInstance(geometry, 0xaa8844,  2),
];


// Renderer
const webgl = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({canvas : webgl});

function makeInstance(geometry, color, x){
  const material = new THREE.MeshPhongMaterial({color});
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.x = x;
  return cube;
}

function render(time){
  time *= 0.001 ;  // time은 millisecond 단위, 더 편하게 하기 위해 second로 단위 변경

  cubes.forEach((cube, idx) => {
    const speed = 1 + idx * 0.5;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  })

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function main(){ 
  cubes.forEach(cube => {
    scene.add(cube);
  }) 
  scene.add(light);
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}


main()