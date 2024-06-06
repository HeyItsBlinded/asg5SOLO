// WORKS CITED: 
// 'WINDOW' based on a tutorial by Robot Bobby - 
// https://www.youtube.com/watch?v=XPhAR1YdD6o

import * as THREE from "three";
import {OrbitControls} from "jsm/controls/OrbitControls.js";
import { OBJLoader } from 'three/OBJLoader';
import { MTLLoader } from 'three/MTLLoader';
// import { GTLFLoader } from 'three/GLTFLoader';

// -- SET ----------
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// -- LIGHTS ----------
const lightAMB = new THREE.AmbientLight(0xffffff, 0.5); // default
scene.add(lightAMB);

const lightDIR = new THREE.DirectionalLight(0xffffff, 0.5); // overhead
lightDIR.position.set(0, 12, 0);
const lightHelper = new THREE.DirectionalLightHelper(lightDIR, 6, 0xff0000); 
// scene.add(lightDIR, lightHelper);
scene.add(lightDIR);


const lightPOINT = new THREE.PointLight(0xffffff, 5, 8, 1);
lightPOINT.position.set(6.1, 5, 2);
const lightHelper2 = new THREE.PointLightHelper(lightPOINT, 0.4);
// scene.add(lightPOINT, lightHelper2);
scene.add(lightPOINT);
// 6, 4, 2

// -- CAMERA ----------
const camera = new THREE.PerspectiveCamera(76, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 10;
camera.position.z = 15;
// ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// -- SKYBOX ---------- 
// cite: Sonar Systems on YT
var skyboxGEO = new THREE.BoxGeometry(100, 100, 100);
var skyboxARRAY = [
    new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('textures/arid_ft.jpg'), side: THREE.DoubleSide} ),
    new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('textures/arid_bk.jpg'), side: THREE.DoubleSide} ),
    new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('textures/arid_up.jpg'), side: THREE.DoubleSide} ),
    new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('textures/arid_dn.jpg'), side: THREE.DoubleSide} ),
    new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('textures/arid_rt.jpg'), side: THREE.DoubleSide} ),
    new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load('textures/arid_lf.jpg'), side: THREE.DoubleSide} )
];
// var skyboxMAT = new THREE.MeshFaceMaterial( {skyboxARRAY} ); // !depreciated version!
var skybox = new THREE.Mesh(skyboxGEO, skyboxARRAY);
scene.add(skybox);

// -- COLOR INDEX ----------
const color1 = new THREE.MeshPhongMaterial( {color: 0xff1122} );
const color2 = new THREE.MeshPhongMaterial( {color: 0x25BEA6} );
const color3 = new THREE.MeshPhongMaterial( {color: 0x79A450} );
const color4 = new THREE.MeshPhongMaterial( {color: 0xE1A4F3} );
const color5 = new THREE.MeshPhongMaterial( {color: 0xECA617} );

// -- SHAPE INDEX ----------
const d6GEO = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const d8GEO = new THREE.OctahedronGeometry(0.5);
const d12GEO = new THREE.DodecahedronGeometry(0.5);
const d20GEO = new THREE.IcosahedronGeometry(0.5);

// -- GROUND ----------
const cubeGEO = new THREE.BoxGeometry(20, 0.25, 20);
const cubeMAT = new THREE.MeshPhongMaterial( {color: 0xa3a3a3} );
const cube = new THREE.Mesh(cubeGEO, cubeMAT);
scene.add(cube);
cube.rotateY((Math.PI / 180) * 45);


// -- D6 ----------
const dice3 = new THREE.Mesh(d6GEO, color3);
scene.add(dice3);
dice3.position.set(-3.4, 4.15, 1.7);
dice3.rotateY((Math.PI / 180) * 35);

const dice4 = new THREE.Mesh(d6GEO, color2);
scene.add(dice4);
dice4.position.set(3, 4.15, -2);
dice4.rotateY((Math.PI / 180) * 35);

// D12 -----
const dice9 = new THREE.Mesh(d12GEO, color4);
scene.add(dice9);
dice9.position.set(-2.5, 4.35, 2);
dice9.rotateX((Math.PI / 180) * 35);

// D8 -----
const dice12 = new THREE.Mesh(d8GEO, color2);
scene.add(dice12);
dice12.position.set(-3.25, 4.30, 2.75);
dice12.rotateX((Math.PI / 180) * 45);
dice12.rotateZ((Math.PI / 180) * 55);

// D20 -----
const dice19 = new THREE.Mesh(d20GEO, color5);
scene.add(dice19);
dice19.position.set(2.25, 4.4, -2.75);

// ----- HOVER-DICE -----
const dice20 = new THREE.Mesh(d20GEO, color1);
scene.add(dice20);
dice20.position.set(-4, 5, 0);

function diceHover() {
    const rotSpeed = 0.0005;
    const rotAngle = rotSpeed * Date.now();
    dice20.rotation.y = rotAngle;
    dice20.rotation.x = rotAngle;
    requestAnimationFrame(diceHover);
}
diceHover();

// ----- DESK -----
const objLoader = new OBJLoader();
objLoader.load('customModels/table.obj', (root) => {
    root.scale.set(0.75,0.75,0.5);
    root.rotation.set(THREE.MathUtils.degToRad(-90), THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(0));
    root.position.set(0, 0.1, 0);

    const material = new THREE.MeshPhongMaterial({ color: 0x5e3a0a }); // Custom color material
    root.traverse((child) => {
        if (child.isMesh) {
            child.material = material;
        }
    });
    scene.add(root);
});

// ----- CHAIR -----
const chair = new OBJLoader();
chair.load('customModels/chair.obj', (root) => {
    root.scale.set(7, 7, 7);
    root.rotation.set(THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(10), THREE.MathUtils.degToRad(0));
    root.position.set(0, 0, -4);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('textures/chairTEX.png', (texture) => {
        const chairMAT = new THREE.MeshPhongMaterial({ map: texture });

        root.traverse((child) => {
            if (child.isMesh) {
                child.material = chairMAT;
            }
        });
        scene.add(root);
    });
});

// ----- CHEST -----
const chest = new OBJLoader();
chest.load('customModels/chest.obj', (root) => {
    root.scale.set(4.5, 4.5, 4.5);
    root.rotation.set(THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(75), THREE.MathUtils.degToRad(0));
    root.position.set(-5, 5.25, 1.75);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('textures/chestTEX.png', (texture) => {
        const chairMAT = new THREE.MeshPhongMaterial({ map: texture });

        root.traverse((child) => {
            if (child.isMesh) {
                child.material = chairMAT;
            }
        });
        scene.add(root);
    });
});

// ----- PEDESTAL -----
const pedestal = new OBJLoader();
pedestal.load('customModels/pedestal.obj', (root) => {
    root.scale.set(1, 1, 1);
    root.rotation.set(THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(75), THREE.MathUtils.degToRad(0));
    root.position.set(-4, 4.25, 0);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('textures/pedestalTEX.png', (texture) => {
        const pedestalMAT = new THREE.MeshPhongMaterial({ map: texture });

        root.traverse((child) => {
            if (child.isMesh) {
                child.material = pedestalMAT;
            }
        });
        scene.add(root);
    });
});

// ----- BOOKS -----
const book1 = new OBJLoader();
book1.load('customModels/book.obj', (root) => {
    root.scale.set(8, 8, 8);
    root.rotation.set(THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(-10), THREE.MathUtils.degToRad(0));
    root.position.set(-6.25, 4, -1.25);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('textures/bookTEX.png', (texture) => {
        const pedestalMAT = new THREE.MeshPhongMaterial({ map: texture });

        root.traverse((child) => {
            if (child.isMesh) {
                child.material = pedestalMAT;
            }
        });
        scene.add(root);
    });
});

const book2 = new OBJLoader();
book2.load('customModels/book.obj', (root) => {
    root.scale.set(6.5, 6.5, 6.5);
    root.rotation.set(THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(-5), THREE.MathUtils.degToRad(0));
    root.position.set(-6.25, 4.75, -1.25);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('textures/bookTEX.png', (texture) => {
        const pedestalMAT = new THREE.MeshPhongMaterial({ map: texture });

        root.traverse((child) => {
            if (child.isMesh) {
                child.material = pedestalMAT;
            }
        });
        scene.add(root);
    });
});

const stack = new OBJLoader();
stack.load('customModels/stack.obj', (root) => {
    root.scale.set(0.07, 0.07, 0.07);
    root.rotation.set(THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(190), THREE.MathUtils.degToRad(0));
    root.position.set(5.5, 3.95, -1.5);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('textures/stackTEX.png', (texture) => {
        const pedestalMAT = new THREE.MeshPhongMaterial({ map: texture });

        root.traverse((child) => {
            if (child.isMesh) {
                child.material = pedestalMAT;
            }
        });
        scene.add(root);
    });
});

// ----- GOBLET -----
const goblet = new OBJLoader();
goblet.load('customModels/goblet.obj', (root) => {
    root.scale.set(5, 5, 5);
    root.rotation.set(THREE.MathUtils.degToRad(83), THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(-45));
    root.position.set(0, 4.20, -3);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('textures/gobletTEX.png', (texture) => {
        const pedestalMAT = new THREE.MeshPhongMaterial({ map: texture });

        root.traverse((child) => {
            if (child.isMesh) {
                child.material = pedestalMAT;
            }
        });
        scene.add(root);
    });
});

// ----- WINES -----
const wine = new OBJLoader();
wine.load('customModels/wine.obj', (root) => {
    root.scale.set(0.1, 0.1, 0.1);
    root.rotation.set(THREE.MathUtils.degToRad(-90), THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(0));
    root.position.set(-0.5, 3.95, -2);

    const material = new THREE.MeshPhongMaterial({ color: 0x1e4219 }); // Custom color material
    root.traverse((child) => {
        if (child.isMesh) {
            child.material = material;
        }
    });
    scene.add(root);
});

const wine2 = new OBJLoader();
wine2.load('customModels/wine.obj', (root) => {
    root.scale.set(0.1, 0.1, 0.1);
    root.rotation.set(THREE.MathUtils.degToRad(-90), THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(0));
    root.position.set(-2.5, 3.95, 3);

    const material = new THREE.MeshPhongMaterial({ color: 0x1e4219 }); // Custom color material
    root.traverse((child) => {
        if (child.isMesh) {
            child.material = material;
        }
    });
    scene.add(root);
});

const wine3 = new OBJLoader();
wine3.load('customModels/wine.obj', (root) => {
    root.scale.set(0.075, 0.075, 0.075);
    root.rotation.set(THREE.MathUtils.degToRad(-90), THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(0));
    root.position.set(-1.75, 3.95, 2.75);

    const material = new THREE.MeshPhongMaterial({ color: 0x1e4219 }); // Custom color material
    root.traverse((child) => {
        if (child.isMesh) {
            child.material = material;
        }
    });
    scene.add(root);
});

// ----- SWORD -----
const sword = new OBJLoader();
sword.load('customModels/sword.obj', (root) => {
    root.scale.set(0.5, 0.5, 0.5);
    root.rotation.set(THREE.MathUtils.degToRad(90), THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(25));
    root.position.set(4, 4.05, -2);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('textures/swordTEX.png', (texture) => {
        const pedestalMAT = new THREE.MeshPhongMaterial({ map: texture });

        root.traverse((child) => {
            if (child.isMesh) {
                child.material = pedestalMAT;
            }
        });
        scene.add(root);
    });
});

// ----- HELMET -----
const helmet = new OBJLoader();
helmet.load('customModels/helmet.obj', (root) => {
    root.scale.set(0.1, 0.1, 0.1);
    root.rotation.set(THREE.MathUtils.degToRad(-90), THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(0));
    root.position.set(3.5, 3.95, 3);

    const material = new THREE.MeshPhongMaterial({ color: 0x292828 }); // Custom color material
    root.traverse((child) => {
        if (child.isMesh) {
            child.material = material;
        }
    });
    scene.add(root);
});

// ----- WAND -----
const wand = new OBJLoader();
wand.load('customModels/wand.obj', (root) => {
    root.scale.set(0.2, 0.2, 0.2);
    root.rotation.set(THREE.MathUtils.degToRad(-90), THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(-20));
    root.position.set(-4.5, 3.9, -2.75);

    const material = new THREE.MeshPhongMaterial({ color: 0xc47e64 }); // Custom color material
    root.traverse((child) => {
        if (child.isMesh) {
            child.material = material;
        }
    });
    scene.add(root);
});

// ----- LANTERN -----
const lantern = new OBJLoader();
lantern.load('customModels/lantern.obj', (root) => {
    root.scale.set(0.75, 0.75, 0.75);
    root.rotation.set(THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(0));
    root.position.set(6, 4, 2);

    const material = new THREE.MeshPhongMaterial({ color: 0xa3a3a3 }); // Custom color material
    root.traverse((child) => {
        if (child.isMesh) {
            child.material = material;
        }
    });
    scene.add(root);
});

// -- FUNCTIONS ----------
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();