import * as THREE from 'three';
import '../stylesheet/css3d_youtube.css';
import { TrackballControls } from './jsm/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from './jsm/renderers/CSS3DRenderer.js';

let camera, scene, renderer;
let controls;

function Element( id, x, y, z, ry ) {
  const size = {width: '480px', height: '360px'};

  const div = document.createElement( 'div' );
  div.style.width = size.width;
  div.style.height = size.height;
  div.style.backgroundColor = '#000';

  const iframe = document.createElement( 'iframe' );
  iframe.style.width = size.width;
  iframe.style.height = size.height;
  iframe.style.border = '0px';
  iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
  div.appendChild( iframe );

  const object = new CSS3DObject( div );
  object.position.set( x, y, z );
  object.rotation.y = ry;

  return object;

}

init();
animate();

function init() {

  document.body.innerHTML = `
    <div id="container"></div>
		<div id="blocker"></div>
  `  

  const container = document.getElementById( 'container' );

  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
  camera.position.set( 500, 350, 700 );

  scene = new THREE.Scene();

  renderer = new CSS3DRenderer({element: container});
  renderer.setSize( window.innerWidth, window.innerHeight );

  const group = new THREE.Group();
  group.add( new Element( 'SJOz3qjfQXU', 0, 0, 240, 0 ) );
  group.add( new Element( 'Y2-xZ-1HE-Q', 240, 0, 0, Math.PI / 2 ) );
  group.add( new Element( 'IrydklNpcFI', 0, 0, - 240, Math.PI ) );
  group.add( new Element( '9ubytEsCaS0', - 240, 0, 0, - Math.PI / 2 ) );
  scene.add( group );

  controls = new TrackballControls( camera, renderer.domElement );
  controls.rotateSpeed = 4;

  window.addEventListener( 'resize', onWindowResize );

  // Block iframe events when dragging camera

  const blocker = document.getElementById( 'blocker' );
  blocker.style.display = 'none';

  controls.addEventListener( 'start', function () {

    blocker.style.display = '';

  } );
  controls.addEventListener( 'end', function () {

    blocker.style.display = 'none';

  } );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );

}
