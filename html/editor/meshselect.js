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

        if (runscript == 1) {
            if (selectedObject.click) {
                try {
                    selectedObject.click(selectedObject);
                }
                catch (err) {
                    debug("[ERR] " + err.message);
                }
            }
        }
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

    titlebartext.innerHTML = "Object Properties"
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

    //quick actions
    let quickactions = document.createElement('fieldset');
    quickactions.innerHTML = "<legend>Quick Actions</legend>";

    //delete mesh button
    var deletebtn = document.createElement("button");
    deletebtn.innerHTML = '<i class="fa-solid fa-trash"></i> Delete Element'
    deletebtn.onclick = function () {
        removeObject(selectedObject)
        customwindow.remove()
        transformControls.detach();
        loadsceneexplorer(scene)
    }

    //view child mesh button
    var explorechildbtn = document.createElement("button");
    explorechildbtn.innerHTML = 'See Child Elements'
    explorechildbtn.onclick = function () {
        loadsceneexplorer(selectedObject)
        document.getElementById("sceneexplorerwindow").style.display = "block";
    }

    //add delete button
    quickactions.appendChild(deletebtn)
    quickactions.appendChild(explorechildbtn)
    windowcontent.appendChild(quickactions);

    //add mesh description
    let propertiessection = document.createElement('fieldset');
    propertiessection.innerHTML = "<legend>Object Properties</legend>";
    propertiessection.appendChild(windowcontent.appendChild(createCubePropertiesTableRow(selectedObject)))
    windowcontent.appendChild(propertiessection);

    //update script description
    let updatescript = document.createElement('fieldset');
    let textareascript = document.createElement('textarea');
    textareascript.style.width = "100%";
    textareascript.style.resize = "vertical";
    updatescript.innerHTML = "<legend>Update Script</legend>";
    updatescript.appendChild(textareascript);
    windowcontent.appendChild(updatescript);
    if (typeof selectedObject.script !== "undefined") {
        const functionBody = selectedObject.script.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
        textareascript.innerHTML = functionBody;
    }
    textareascript.onchange = function () {
        selectedObject.script = new Function("mesh", textareascript.value);
    }

    //click script description
    let clickscript = document.createElement('fieldset');
    let clicktextareascript = document.createElement('textarea');
    clicktextareascript.style.width = "100%";
    clicktextareascript.style.resize = "vertical";
    clickscript.innerHTML = "<legend>Click Script</legend>";
    clickscript.appendChild(clicktextareascript);
    windowcontent.appendChild(clickscript);
    if (typeof selectedObject.click !== "undefined") {
        const functionBody = selectedObject.click.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
        clicktextareascript.innerHTML = functionBody;
    }
    clicktextareascript.onchange = function () {
        selectedObject.click = new Function("mesh", clicktextareascript.value);
    }
}