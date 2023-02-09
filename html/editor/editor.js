//editor debug
function debug(text) {
    console.log(text)
}

//declare main window
var mainwindow = document.getElementById('section');

// Create a scene
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, 512 / 512, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Create a renderer
var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize(512, 512);
renderer.setClearColor(0x1e90ff); // Set the background color to #add8e6
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.domElement.id = 'canvas';
document.getElementById('section1').appendChild(renderer.domElement);

// LIGHTS
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
hemiLight.color.setHSL(0.6, 1, 0.6);
hemiLight.groundColor.setHSL(0.095, 1, 0.75);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);

// const dirLight = new THREE.DirectionalLight(0xffffff, 1);
// dirLight.color.setHSL(0.1, 1, 0.95);
// dirLight.position.set(- 1, 1.75, 1);
// dirLight.position.multiplyScalar(30);
// scene.add(dirLight);

// dirLight.castShadow = true;

// dirLight.shadow.mapSize.width = 2048;
// dirLight.shadow.mapSize.height = 2048;

// const d = 50;

// dirLight.shadow.camera.left = - d;
// dirLight.shadow.camera.right = d;
// dirLight.shadow.camera.top = d;
// dirLight.shadow.camera.bottom = - d;

// dirLight.shadow.camera.far = 3500;
// dirLight.shadow.bias = - 0.0001;


//declare objects
var objects = [];

//initiate transform controls
var transformControls = new THREE.TransformControls( camera, renderer.domElement );
transformControls.addEventListener( 'change', render );
transformControls.addEventListener( 'dragging-changed', function ( event ) {
	controls.enabled = ! event.value;
} );
scene.add( transformControls );

// Add OrbitControls
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// Function to spawn a new cube
function spawnCube(x, y, z, sizeX, sizeY, sizeZ, color) {
    // Create the cube's geometry
    var cubeGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);

    // Create the cube's material
    var cubeMaterial = new THREE.MeshPhongMaterial({ color: color });

    // Create the cube
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.set(x, y, z);

    // Add the cube to the scene
    scene.add(cube);
    objects.push(cube);
}

function addSphere(sphereradius, spherewidth, sphereheight, sizeX, sizeY, sizeZ, color) {
    // Create a new sphere geometry with a radius of 1
    var sphereGeometry = new THREE.SphereGeometry(sizeX, sizeY, sizeZ);
    // Create a new mesh material with a red color
    var sphereMaterial = new THREE.MeshPhongMaterial({ color: color });
    // Create a new mesh using the sphere geometry and material
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.position.set(sphereradius, spherewidth, sphereheight);
    // Add the sphere to the scene
    scene.add(sphere);
    objects.push(sphere);
}

function addCone(x, y, z, sizeX, sizeY, sizeZ, color) {
    // Create a new geometry for the cone
    var geometry = new THREE.ConeGeometry(sizeX, sizeY, sizeZ);
    // Create a new material for the cone
    var material = new THREE.MeshPhongMaterial({ color: color });
    // Create a new mesh from the geometry and material
    var cone = new THREE.Mesh(geometry, material);
    cone.castShadow = true;
    cone.receiveShadow = true;
    cone.position.set(x, y, z);
    // Add the cone to the scene
    scene.add(cone);
    // Add the cone to the list of objects
    objects.push(cone);
}

function addLight(x, y, z, intensity, distance, color) {
    // Create a new point light
    var light = new THREE.PointLight(color, intensity, distance);
    // Position the light in the scene
    light.position.set(x, y, z);
    light.castShadow = true;
    // Add the light to the scene
    scene.add(light);
    objects.push(light);
}

// Function to export the scene to a GLTF file
function exportScene() {
    var exporter = new THREE.GLTFExporter();
    exporter.parse(scene, function (result) {
        var output = JSON.stringify(result, null, 2);
        console.log(output);
        editorDebug(JSON.stringify(output, null, 2))

        var link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([output], { type: 'text/plain' }));
        link.download = 'scene.gltf';
        link.click();
    }, { trs: true });
}

// Function to import a GLTF file to the scene
function importScene() {
    var input = document.getElementById("file-input");
    var file = input.files[0];
    var loader = new THREE.GLTFLoader();
    loader.load(URL.createObjectURL(file), function (gltf) {
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });
}

function runscript() {
	let script = document.getElementById("scripteditor").value
	try {
		eval(script); 
	} catch (e) {
		if (e instanceof SyntaxError) {
			debug(e.message);
		}
	}
}

// Render the scene
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();

    $(".childwindow").draggable({ handle: ".title-bar", containment: "#section"});
}
render();

//Spawn baseplate
spawnCube(0, 0, 0, 16, 1, 16, 0x00ff00)