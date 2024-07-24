import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const { createDevice } = RNBO;

let startStop, gain11, gain12, gain13, gain14, gain15, gain16, gain21, gain22, gain31, gain32, gain33, gain41, gain42

const startup = async () => {
    let context = listener.context;
    let sound3 = new THREE.PositionalAudio( listener );
    let rawPatcher = await fetch("src/assets/synths.export.json");
    let patcher = await rawPatcher.json();

    let device = await createDevice({ context, patcher });

    startStop = device.parametersById.get("startStop");
	gain11 = device.parametersById.get("gain11");
	gain12 = device.parametersById.get("gain12");
	gain13 = device.parametersById.get("gain13");
	gain14 = device.parametersById.get("gain14");
	gain15 = device.parametersById.get("gain15");
	gain16 = device.parametersById.get("gain16");
	gain21 = device.parametersById.get("gain21");
	gain22 = device.parametersById.get("gain22");
	gain31 = device.parametersById.get("gain31");
	gain32 = device.parametersById.get("gain32");
	gain33 = device.parametersById.get("gain33");
	gain41 = device.parametersById.get("gain41");
	gain42 = device.parametersById.get("gain42");

	startStop.value = 1;
	gain11.value = 1;
	gain12.value = 1;
	gain13.value = 1;
	gain14.value = 1;
	gain15.value = 1;
	gain16.value = 1;
	gain21.value = 1;
	gain22.value = 1;
	gain31.value = 1;
	gain32.value = 1;
	gain33.value = 1;
	gain41.value = 1;
	gain42.value = 1;

    // This connects the device to audio output, but you may still need to call context.resume()
    // from a user-initiated function.
    // device.node.connect(context.destination);
    sound3.setNodeSource(device.node);
};
const scene = new THREE.Scene();

scene.background = new THREE.CubeTextureLoader()
	.setPath( 'src/assets/cubemap/' )
	.load( [
				'px.png',
				'nx.png',
				'py.png',
				'ny.png',
				'pz.png',
				'nz.png'
			] );

scene.fog = new THREE.FogExp2( 'black', 0.01 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let controls;
const objects = [];
let raycaster;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();
const instructions = document.getElementById( 'instructions' );
instructions.addEventListener( 'click', function () {
    starty();
    controls.lock();
    instructions.style.display='none';
} );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const listener = new THREE.AudioListener();
camera.add( listener );

//const controls = new OrbitControls( camera, renderer.domElement );
controls = new PointerLockControls( camera, renderer.domElement );
scene.add( controls.getObject() );

let gains = [6, 20, 0, 1];
let z = 0;
let x = 0;
let c = 0;
let v = 0;

const onKeyDown = function ( event ) {

	switch ( event.code ) {

		case 'ArrowUp':
		case 'KeyW':
			moveForward = true;
			break;

		case 'ArrowLeft':
		case 'KeyA':
			moveLeft = true;
			break;

		case 'ArrowDown':
		case 'KeyS':
			moveBackward = true;
			break;

		case 'ArrowRight':
		case 'KeyD':
			moveRight = true;
			break;

		case 'KeyZ':
			gain11.value = gain11.value = gains[z]
			gain12.value = gain12.value = gains[z]
			gain13.value = gain13.value = gains[z]
			gain14.value = gain14.value = gains[z]
			gain15.value = gain15.value = gains[z]
			gain16.value = gain16.value = gains[z]
			console.log(gains[z])
			z = (z + 1) % gains.length;
			break;
		case 'KeyX':
			gain21.value = gain11.value = gains[x]
			gain22.value = gain12.value = gains[x]
			console.log(gains[x])
			x = (x + 1) % gains.length;
			break;
		case 'KeyC':
			gain31.value = gain31.value = gains[c]
			gain32.value = gain32.value = gains[c]
			gain33.value = gain33.value = gains[c]
			console.log(gains[c])
			c = (c + 1) % gains.length;
			break;
		case 'KeyV':
			gain41.value = gain41.value = gains[v]
			gain42.value = gain42.value = gains[v]
			console.log(gains[v])
			v = (v + 1) % gains.length;
			break;

	}

};

const onKeyUp = function ( event ) {

	switch ( event.code ) {

		case 'ArrowUp':
		case 'KeyW':
			moveForward = false;
			break;

		case 'ArrowLeft':
		case 'KeyA':
			moveLeft = false;
			break;

		case 'ArrowDown':
		case 'KeyS':
			moveBackward = false;
			break;

		case 'ArrowRight':
		case 'KeyD':
			moveRight = false;
			break;

	}

};

document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'keyup', onKeyUp );
raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light with full intensity
directionalLight.position.set(5, 10, 7.5); // Position the light
scene.add(directionalLight);

// Create and position an ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // White light with half intensity
scene.add(ambientLight);

// Adjust the camera position
camera.position.set(0, 1, 10); // Move the camera back and slightly up

// Point the camera at the origin (or another point)
camera.lookAt(0, 0, 0); // Look at the center of the scene

const loader = new GLTFLoader();

let gltfDog;

loader.load('src/assets/gltfmodel/dog/dog.gltf', function (gltf) {
	gltfDog = gltf.scene; 
	scene.add(gltfDog);
    gltfDog.scale.set(1/60, 1 /60, 1/60);
    gltfDog.position.set(0.5, -1, 0);
	console.log(gltfDog);
}, undefined, function (error) {
    console.error(error);
});

let gltfUfo;

loader.load('src/assets/gltfmodel/ufo/ufo.gltf', function (gltf) {
	gltfUfo = gltf.scene; 
	scene.add(gltfUfo);
    gltfUfo.scale.set(1/5, 1 /5, 1/5);
    gltfUfo.position.set(0, -3.5, 0);
    // scene.add(gltf.scene);
	gltfUfo.traverse(function (node) {
		if (node.isMesh) {
			node.material.metalness = 0; // No metal
			node.material.roughness = 1; // Full roughness
		}
	});
	console.log(gltfUfo);
}, undefined, function (error) {
    console.error(error);
});

// Create Three.js positional audio source

startup();

const amplitude = 1; // Maximum height of the jump
const frequency = .005; // Speed of the jump

function animate() {
	requestAnimationFrame( animate );
    const time = performance.now();

    if ( controls.isLocked === true ) {

        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 10;

        const intersections = raycaster.intersectObjects( objects, false );

        const onObject = intersections.length > 0;

        const delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

        if ( onObject === true ) {

            velocity.y = Math.max( 0, velocity.y );
            canJump = true;

        }

        controls.moveRight( - velocity.x * delta );
        controls.moveForward( - velocity.z * delta );

        controls.getObject().position.y += ( velocity.y * delta ); // new behavior

        if ( controls.getObject().position.y < 10 ) {

            velocity.y = 0;
            controls.getObject().position.y = 10;

            canJump = true;

        }

    }

    prevTime = time;

	if (gltfDog) {
		gltfDog.rotation.z = Math.PI/8 * Math.sin(time * frequency);
	}

	if (gltfUfo) {
		gltfUfo.rotation.y += 0.01; 
	}

	renderer.render( scene, camera );
}

animate();

function starty(){
    listener.context.resume();
    // Start oscillator
    //oscillator.start(0);
}

