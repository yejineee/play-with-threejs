import * as THREE from 'three'

/**
 * WebGLRenderer
 * Scene을 WebGL을 사용하여 보여준다.
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/**
 * Perspective Camera (fov, aspect, near, far)
 * 인간이 보는 방식을 흉내내기 위해 projection mode를 사용함.
 */
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );


/**
 * Define a Material
 * create a blue LineBasicMaterial
 * 도형의 와이어프레임 스타일을 그리기 위한 material
 */
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const points = [];
points.push( new THREE.Vector3( -10, 0, 10 ) );
points.push( new THREE.Vector3( 0, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );

/**
 * BufferGeometry
 * mesh, line, point geometry의 표현
 */
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( geometry, material );

/**
 * Scene
 * scene을 통해 무엇을 어디에 그릴지를 설정할 수 있다.
 * scene에 object, light, camera를 두게 된다.
 */
const scene = new THREE.Scene();
scene.add( line );

renderer.render( scene, camera );