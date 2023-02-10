document.getElementById('canvas').addEventListener('click', onDocumentMouseDown, false);

function onDocumentMouseDown(event) {

    // Get the mouse position relative to the canvas
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    // Create a new raycaster
    var raycaster = new THREE.Raycaster();

    // Set the origin and direction of the raycaster
    raycaster.setFromCamera(mouse, camera);

    // Get an array of objects that the ray intersects with
    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        // Get the first intersected object
        var selectedObject = intersects[0].object;

        // viewobject(selectedObject);
    }
}


function viewobject(selectedObject) {
    // show the properties of the selected object (e.g. position, rotation, scale)
    console.log("Selected object: ", selectedObject);

    transformControls.attach(selectedObject);

    //create window
    let customwindow = document.createElement('div');
    let titlebar = document.createElement('div');
    let titlebartext = document.createElement('div');
    let titlebarcontrols = document.createElement('div');
    let windowcontent = document.createElement('div');

    customwindow.className = "window active glass above childwindow";
    customwindow.style.width = 300;
    mainwindow.prepend(customwindow);

    titlebar.className = "title-bar";
    customwindow.appendChild(titlebar);

    titlebartext.innerHTML = "Mesh Properties"
    titlebartext.className = "title-bar-text"
    titlebar.appendChild(titlebartext);

    titlebarcontrols.className = "title-bar-controls";
    titlebarcontrols.innerHTML = "<button aria-label='Close'></button>";
    titlebarcontrols.onclick = function () {
        customwindow.remove()
        transformControls.detach();
    }
    titlebar.appendChild(titlebarcontrols);

    windowcontent.className = "window-body has-space";
    customwindow.appendChild(windowcontent);

    //delete mesh button
    var deletebtn = document.createElement("button");
    deletebtn.innerHTML = '<i class="fa-solid fa-trash"></i> Delete Element'
    deletebtn.onclick = function () {
        scene.remove(selectedObject)
        customwindow.remove()
        transformControls.detach();
        loadsceneexplorer()
    }

    //set mesh description
    windowcontent.innerHTML = (
        "Position: <br> " + JSON.stringify(selectedObject.position, null, 4) +
        "<br><br> Rotation: <br> " + JSON.stringify(selectedObject.rotation, null, 4) +
        "<br><br> Scale: <br> " + JSON.stringify(selectedObject.geometry.parameters, null, 4) +
        "<br><br> Color: <br> #" + selectedObject.material.color.getHexString() + "<div style='padding: 3px; background: #" + selectedObject.material.color.getHexString() + " ;'></div><br>"
    );

    //add delete button
    windowcontent.appendChild(deletebtn)
}