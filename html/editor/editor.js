//editor debug
function debug(text) {
    var ul = document.getElementById("scriptlog");
    var li = document.createElement("p");
    li.innerText = text;
    ul.appendChild(li);
}

//declare main window
var mainwindow = document.getElementById('section');

// Create a scene
var scene = new THREE.Scene();

//create a camera
var camera = new THREE.PerspectiveCamera(75, 640 / 400, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Create a renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(640, 400);
renderer.setClearColor(0xadd8e6); // Set the background color to #add8e6
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

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.color.setHSL(0.1, 1, 0.95);
dirLight.position.set(- 1, 1.75, 1);
dirLight.position.multiplyScalar(30);
scene.add(dirLight);

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

const d = 50;

dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;

dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = - 0.0001;

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

//declare objects
var objects = [];

//testing skybox
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    '../resources/posx.jpg',
    '../resources/negx.jpg',
    '../resources/posy.jpg',
    '../resources/negy.jpg',
    '../resources/posz.jpg',
    '../resources/negz.jpg',
]);
scene.background = texture;

//initiate transform controls
var transformControls = new THREE.TransformControls(camera, renderer.domElement);
transformControls.addEventListener('change', render);
transformControls.addEventListener('dragging-changed', function (event) {
    controls.enabled = !event.value;
});
scene.add(transformControls);

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
    loadsceneexplorer(scene)
    addObject()
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
    loadsceneexplorer(scene)
    addObject()
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
    loadsceneexplorer(scene)
    addObject()
}

function addCylinder(x, y, z, sizeX, sizeY, sizeZ, radialSegments, color) {
    // Create a new geometry for the cone
    var geometry = new THREE.CylinderGeometry(sizeX, sizeY, sizeZ, radialSegments);
    // Create a new material for the cone
    var material = new THREE.MeshPhongMaterial({ color: color });
    // Create a new mesh from the geometry and material
    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    cylinder.position.set(x, y, z);
    // Add the cone to the scene
    scene.add(cylinder);
    // Add the cone to the list of objects
    objects.push(cylinder);
    loadsceneexplorer(scene)
    addObject()
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
    loadsceneexplorer(scene)
    addObject()
}

function generateterrain(voxsize, tersize, color) {
    // Create a new ImprovedNoise object
    var noise = new THREE.ImprovedNoise();

    // Create a voxel size and terrain size
    var voxelSize = voxsize;
    var terrainSize = tersize;

    // Create a new geometry and material for the voxel terrain
    var geometry = new THREE.BoxGeometry(voxelSize, voxelSize, voxelSize);
    var material = new THREE.MeshPhongMaterial({ color: color });

    // Loop through each position in the terrain and create a voxel mesh
    for (var x = 0; x < terrainSize; x++) {
        for (var y = 0; y < terrainSize; y++) {
            // Generate a random height value using ImprovedNoise
            var height = noise.noise(x / 10, y / 10, 0) * 10;

            // Create a new voxel mesh and position it based on the terrain size and voxel size
            var voxel = new THREE.Mesh(geometry, material);
            voxel.position.x = x * voxelSize;
            voxel.position.y = height;
            voxel.position.z = y * voxelSize;

            // Add the voxel mesh to the scene
            scene.add(voxel);
        }
    }
}

// Function to export the scene to a GLTF file
function exportgltf() {
    var exporter = new THREE.GLTFExporter();
    exporter.parse(scene, function (result) {
        var output = JSON.stringify(result, null, 2);

        var link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([output], { type: 'text/plain' }));
        link.download = 'scene.gltf';
        link.click();
    }, { trs: true });
}

// Function to export the scene to a HHLX file
function exportScene() {
    // Convert scene to JSON format
    transformControls.detach()
    transformControls.dispose()
    const json = JSON.stringify(scene.toJSON(), null, 2);

    // Create a new blob with the JSON data and custom file extension
    const blob = new Blob([json], { type: "application/json" });
    const fileName = "scene.HHLX";

    // Use the browser's native save dialog to save the file
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
}

// Function to import a GLTF file to the scene
function importScene() {
    var input = document.getElementById("file-input");
    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = function (event) {
        const contents = event.target.result;
        const json = JSON.parse(contents);
        scene.children = importJSON(json).children;
        scene.add(transformControls);
    };

    reader.readAsText(file);
}

function importJSON(jsonString) {
    const loader = new THREE.ObjectLoader();
    const scene = loader.parse(jsonString);

    scene.traverse((mesh) => {
        if (mesh.userData && mesh.userData.script) {
            const functionBody = mesh.userData.script.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
            const scriptFunction = new Function("mesh", functionBody);
            mesh.userData.scriptFunction = scriptFunction;
        }

        if (mesh.userData && mesh.userData.clickscript) {
            const functionBody = mesh.userData.clickscript.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
            const clickscriptfunction = new Function("mesh", functionBody);
            mesh.userData.clickscriptfunction = clickscriptfunction;
        }
    });

    return scene;
}


function runEditorScript() {
    let script = document.getElementById("scripteditorbox").value
    try {
        eval(script);
    } catch (e) {
        if (e instanceof SyntaxError) {
            debug("[ERR] " + e.message);
        }
    }
}

// Render the scene
function animate() {

    requestAnimationFrame(animate);

    render();

}

function render() {
    $(".childwindow").draggable({ handle: ".title-bar", containment: "#section" });

    controls.update()

    updateResourceMonitor()

    renderer.render(scene, camera);
}

function openscriptwindow() {
    var x = document.getElementById("scripteditor");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function openlogwindow() {
    var x = document.getElementById("openlogwindow");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
animate()

//Spawn baseplate
spawnCube(0, 0, 0, 16, 1, 16, 0x008000)