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
scene.background = new THREE.Color('white')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(0, 0, 20)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    const: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Orbit Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** LIGHTS **
************/
// Direction Light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/***********
** MESHES **
************/
// Cube Geometry 
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)


// Cube Materials
const redMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('red')
})
const greenMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('green')
})
const blueMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('blue')
})

const drawCube = (i, material) =>
{
    const cube = new THREE.Mesh(cubeGeometry, material)
    cube.position.x = (Math.random() - 0.5) * 10 
    cube.position.z = (Math.random() - 0.5) * 10 
    cube.position.y = i - 10

    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI

    scene.add(cube)
}


/**********************
** TEXT PARSERS & UI **
***********************/
let preset = {}

const uiobj = {
    text: '',
    textArray: [],
    term1: 'katniss',
    term2: 'peeta',
    term3: 'snow',
    rotateCamera: false,
    reveal(){
        // Save terms to uiobj
       preset = ui.save()

       // Parse Text and Terms
       parseTextandTerms()

       // Hide termsFolder ui
       termsFolder.hide()

       // Show interationFolder ui
       createInteractionFolders()

    }
}

// Text Parsers
// Load source text
fetch('https://raw.githubusercontent.com/pull-ups/ybigta_21winter/master/2021.%202.%204%20(%EB%AA%A9)%20wordcloud-konlpy/The%20Hunger%20Games.txt')
    .then(response => response.text())
    .then((data) =>
    {
        uiobj.text = data       
    }
    )

// Parse Text and Terms
const parseTextandTerms = () =>
{
    // Strip periods and downcase text 
    const parsedText = uiobj.text.replaceAll(".", "").toLowerCase()

    // Tokenize Text
    uiobj.textArray = parsedText.split(/[^\w']+/)

    // Find term 1
    findTermInParsedText(uiobj.term1, redMaterial)

    // Find term 2
    findTermInParsedText(uiobj.term2, greenMaterial)

    // Find term 3
    findTermInParsedText(uiobj.term3, blueMaterial)
}

const findTermInParsedText = (term, material) =>
{
    for (let i=0; i < 10; i++)
    {
        if(uiobj.textArray[i] === term)
        {
        // covert i into n, which is a value between 0 and 20
        const n = (100 / uiobj.textArray.length) * i * 0.2

        // call drawCube function using converted n value
        for(let a=0; a < 5; a++)
        {
            drawCube(n, material)
        }

        }
    }
}

// UI
const ui = new dat.GUI()

// Terms Folder
const termsFolder = ui.addFolder('Enter Terms')

termsFolder
    .add(uiobj, 'term1')
    .name('Red Term')

termsFolder
    .add(uiobj, 'term2')
    .name('Green Term')

termsFolder
    .add(uiobj, 'term3')
    .name('Blue Term')

termsFolder
    .add(uiobj, 'reveal')
    .name('Reveal')

// Interaction Folder 
const createInteractionFolders = () =>
{
    // Cubes Folder
    const cubesFolder = ui.addFolder('Filter Terms')

    cubesFolder
        .add(redMaterial, 'visible')
        .name(`${uiobj.term1}`)

    cubesFolder
        .add(greenMaterial, 'visible')
        .name(`${uiobj.term2}`)

    cubesFolder 
        .add(blueMaterial, 'visible')
        .name(`${uiobj.term3}`)


    // Camera Folder 
    const cameraFolder = ui.addFolder('Camera')

    cameraFolder
        .add(uiobj, 'rotateCamera')
        .name('Rotate Camera')

}

/*******************
** Animation Loop **
********************/
const clock = new THREE.Clock()

// Animate 
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Orbit Controls
    controls.update()

    // Camera Rotation
    if(uiobj.rotateCamera)
    {
        camera.position.x = Math.sin(elapsedTime * 0.2) * 16
        camera.position.y = Math.cos(elapsedTime * 0.2) * 16
    }

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()