import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

const VIEWANGLE =45;
const NEAR = 1;
const FAR  = 10000;
const container = document.querySelector('#displayMap');

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(window.devicePixelRatio)
container.appendChild(renderer.domElement);
const scene = new THREE.Scene();

let camera;
function resize() {
    let rect = container.getClientRects()
    let {width,height} = rect[0];
    let aspect = width/height;
    renderer.setSize(width|0,height|0);
    if(!camera){   
        camera = new THREE.PerspectiveCamera(VIEWANGLE, aspect, NEAR, FAR);
        camera.position.z = 400;
        scene.add(camera);
    }else{
        camera.aspect = width / height;
        camera.updateProjectionMatrix();        
    }
}
resize();
window.addEventListener("resize", resize, { passive: true });

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set(400,400,400)
controls.target.set(0,0,0)

const groundGeo = new THREE.PlaneGeometry(1000,1000,100,100);
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

function render() {
        controls.update()
        requestAnimationFrame(render);
        renderer.render(scene, camera);
}
render();

