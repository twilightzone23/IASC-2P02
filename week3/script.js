import * as THREE from "three"

/***********
** SCENE **
***********/
// Canvas 
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#36494E')

// Camera 
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
camera.position.set(0, 0, 5)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)

/***********
** MESHES **
************/
// testsphere
const boxgeometry = new THREE.BoxGeometry( 1, 1, 1 ); 
const MeshBasicMaterial = new THREE.MeshBasicMaterial(); 
const cube = new THREE.Mesh( boxgeometry, MeshBasicMaterial ); 

scene.add( cube );

const boxgeometry1 = new THREE.BoxGeometry( 1, 1, 1 ); 
const MeshBasicMaterial1 = new THREE.MeshBasicMaterial(); 
const cube1 = new THREE.Mesh( boxgeometry, MeshBasicMaterial ); 

scene.add( cube1 );

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    
    //Animate testSphere
    cube.position.z = Math.sin(elapsedTime)
    cube.position.x = Math.sin(elapsedTime)
    cube.position.y = Math.sin(elapsedTime)
    cube.rotation.z = Math.sin(elapsedTime)

    cube1.position.z = Math.sin(elapsedTime)
    cube1.position.x = Math.cos(elapsedTime)
    cube1.position.y = Math.cos(elapsedTime)
    cube.rotation.x = Math.cos(elapsedTime)


    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)

}

animation()
