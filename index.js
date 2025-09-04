import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const WIDTH = 1000;
const HEIGHT = 1000;
const VIEWANGLE =45;
const ASPECT = WIDTH/HEIGHT;
const NEAR = 1;
const FAR  = 1000000;
const container = document.querySelector('#displayMap');

const camera = new THREE.PerspectiveCamera(VIEWANGLE, ASPECT, NEAR, FAR);
camera.position.z = 400;

const scene = new THREE.Scene();
//scene.add(camera);

/*let params = new URLSearchParams(document.location.search);
const imageName = params.get("idmap");

console.log('imageName',imageName);
console.log('srcName',"./output/"+imageName);
*/

const groundGeo = new THREE.PlaneGeometry(WIDTH,HEIGHT,100,100);
let hmap = document.getElementById('heightmap');
let disMap = new THREE.TextureLoader().load("./map1756996835.8727.png");

const groundMap = new THREE.MeshStandardMaterial({
        emissive: "white",
        wireframe: true,
        displacementMap: disMap,
        displacementScale: 100,
});

const groundMesh = new THREE.Mesh(groundGeo, groundMap);
groundMesh.rotation.x = -Math.PI / 2;
groundMesh.position.y = -0.5;

scene.add(groundMesh);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH,HEIGHT);
container.appendChild(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement );
//renderer.setClearColor('red')
camera.position.set(400,400,400)
controls.target.set(0,0,0)


function resize() {
    let WIDTH = container.clientWidth;
    let HEIGHT = container.clientHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

window.addEventListener("resize", resize, {
    passive: true
});
resize();

function render() {
        controls.update()
        requestAnimationFrame(render);
        renderer.render(scene, camera);
}
render();

