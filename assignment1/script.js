import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/********** 
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
} 

/**********
** SCENE **
***********/
// Canvas 
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(0, 0, 5)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

/***********
** MESHES **
************/
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})

// caveWall
const caveWallGeometry = new THREE.PlaneGeometry(10, 5)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI * 0.5
caveWall.position.set(-5, 0, 0)
caveWall.receiveShadow = true
scene.add(caveWall)

// barrierWall
const barrierWallGeometry = new THREE.PlaneGeometry(10, 2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.rotation.y = Math.PI * 0.5
barrierWall.position.set(5, -1.5, 0)
scene.add(barrierWall)

// caveFloor
const caveFloorGeometry = new THREE.PlaneGeometry(10, 10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x = Math.PI * 0.5
caveFloor.position.set(0, -2.5, 0)
scene.add(caveFloor)

// OBJECTS
// Cone
const ConeGeometry = new THREE.ConeGeometry( 1, 2, 8)
const ConeMaterial = new THREE.MeshNormalMaterial()
const Cone = new THREE.Mesh(ConeGeometry, ConeMaterial)
Cone.position.set(6, 2.5, 0)
Cone.castShadow = true
scene.add(Cone)

const Cone2Geometry = new THREE.ConeGeometry( 1, 2, 8)
const Cone2Material = new THREE.MeshNormalMaterial()
const Cone2 = new THREE.Mesh(ConeGeometry, ConeMaterial)
Cone2.rotation.x = Math.PI * 1
Cone2.position.set(6, 0.5, 0)
Cone2.castShadow = true
scene.add(Cone2)


/***********
** LIGHTS **
************/

// Ambient Light
/*const ambientLight = new THREE.AmbientLight( 
    new THREE.Color('white')
 )
scene.add(ambientLight)
*/

// Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
directionalLight.target = caveWall
directionalLight.position.set(8.6, 1.7, 0)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
scene.add(directionalLight)

// Directional Light Helper 
//const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/*******
** UI **
********/
/*
const ui = new dat.GUI()

const uiObject = {}

uiObject.reset = () =>
{
    directionalLight.position.set(8.6, 1.7, 0)

}

// Directional Light
const lightPositionFolder = ui.addFolder('Directional Light Positon')

lightPositionFolder
    .add(directionalLight.position, 'x')
    .min(-10)
    .max(20)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(uiObject, 'reset')
    .name('Reset Position')

lightPositionFolder
    .add(torusKnot.position, 'x')
    .min(-5)
    .max(5)
    .step(0.1)
*/

/*********************
** DOM INTERACTIONS **
**********************/
//domObject
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
}


// continue-reading
document.querySelector('#continue-reading').onclick = function () {
    document.querySelector('#part-two').classList.remove('hidden')
    document.querySelector('#part-one').classList.add('hidden')
    domObject.part = 2
}

// restart 
document.querySelector('#restart').onclick = function() {
    document.querySelector('#part-two').classList.add('hidden')
    document.querySelector('#part-one').classList.remove('hidden')
    domObject.part = 1

    // reset domObject changes
    domObject.firstChange = false
    domObject.secondChange = false
    domObject.thirdChange = false 
    domObject.fourthChange = false

    Cone.rotation.x = Math.PI * 10
    Cone.position.set(6, 2.5, 0)
    Cone2.rotation.x = Math.PI * 1
    Cone2.position.set(6, 0.5, 0)

    // reset directionalLight
    directionalLight.position.set(8.6, 1.7, 0)
}

// first change
document.querySelector('#first-change').onclick = function() {
    domObject.firstChange = true
}

// second change 
document.querySelector('#second-change').onclick = function() {
    domObject.secondChange = true
}

// third change
document.querySelector('#third-change').onclick = function() {
    domObject.thirdChange = true
}

// fourth change 
document.querySelector('#fourth-change').onclick = function() {
    domObject.fourthChange = true
}

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate Objects 
    //torusKnot.rotation.y = elapsedTime
    //torusKnot.position.z = Math.sin(elapsedTime * 0.5) * 2

    // Update directionalLightHelper
    //directionalLightHelper.update()

    // Controls
    controls.update()


    // DOM INTERACTIONS
    // part 1
    if(domObject.part === 1){
        camera.position.set(1.1, 0.3, 1.3)
        camera.lookAt(-5, 0, 1)
    }

    // part 2
    if(domObject.part === 2){
        camera.position.set(9.9, 3.5, 10.5)
        camera.lookAt(0, 0, 0)
    }

    // first-change
    if(domObject.firstChange){
        Cone.rotation.y = (elapsedTime * 0.5) * -6
        Cone2.rotation.y = (elapsedTime * 0.5) * 6
        
        
    }

    // second-change
    if(domObject.secondChange){
        Cone.position.z = Math.sin(elapsedTime * 0.5) * 6
        Cone2.position.z = Math.sin(elapsedTime * 0.5) * 6
    }

    // third-change
    if(domObject.thirdChange){
        Cone.position.z = Math.sin(elapsedTime * 0.5) * 6
        Cone.rotation.x = Math.sin(elapsedTime * 0.5) * 6
        Cone2.rotation.x = Math.sin(elapsedTime * 0.5) * -6
        Cone2.position.z = Math.sin(elapsedTime * 0.5) * -6

    }

    // fourth-change
    if(domObject.fourthChange){
        directionalLight.position.y += elapsedTime * 0.0010
        Cone.position.y = 1.5
        Cone.position.z = 4
        Cone.rotation.x = Math.PI * 1.5
        Cone2.position.y = 1.5
        Cone2.position.z = -4
        Cone2.rotation.x = Math.PI * -1.5
    }


    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()