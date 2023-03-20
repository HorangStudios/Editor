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
    }
}

function viewobject(selectedObject) {
    // show the properties of the selected object (e.g. position, rotation, scale)
    console.log("Selected object: ", selectedObject);
    transformControls.attach(selectedObject);

    function applyToTextArea(textarea) {
        const keywords = ["break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else", "export", "extends", "finally", "for", "function", "if", "import", "in", "instanceof", "let", "new", "return", "super", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "with", "yield", "mesh"];
        const functions = ["alert", "prompt", "debug", "Math.abs", "Math.floor", "Math.random", "Array.concat", "Array.filter", "Array.forEach", "Array.indexOf", "Array.join", "Array.map", "Array.push", "Array.pop", "Array.slice", "Date.getDate", "Date.getDay", "Date.getMonth", "Date.getFullYear", "Date.getHours", "Date.getMinutes", "Date.getSeconds", "String.charAt", "String.charCodeAt", "String.concat", "String.indexOf", "String.match", "String.replace", "String.search", "String.slice", "String.split", "String.substr", "String.substring", "String.toLowerCase", "String.toUpperCase"];
        const suggestions = keywords.concat(functions);

        $(textarea).autocomplete({
            source: suggestions
        });
    }

    //create window
    let customwindow = document.createElement('div');
    let titlebar = document.createElement('div');
    let titlebartext = document.createElement('div');
    let titlebarcontrols = document.createElement('div');
    let windowcontent = document.createElement('div');
    let navTabs = document.createElement('menu');

    customwindow.className = "window active  above childwindow";
    customwindow.onclick = function () {
        focusWindow(this)
    }
    customwindow.style.width = 400;
    customwindow.style.height = "fit-content";
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
    windowcontent.style.height = "fit-content";
    customwindow.appendChild(windowcontent);

    navTabs.innerHTML = `
        <button role="tab" aria-controls="tab-A" aria-selected="true">Quick Actions</button>
        <button role="tab" aria-controls="tab-B">Properties</button>
        <button role="tab" aria-controls="tab-C">Update Script</button>
        <button role="tab" aria-controls="tab-D">Click Script</button>
        <button role="tab" aria-controls="tab-E">Init Script</button>
    `
    navTabs.setAttribute("role", "tablist")
    windowcontent.appendChild(navTabs);

    //quick actions
    let quickactions = document.createElement('div');
    quickactions.setAttribute("role", "tabpanel")
    quickactions.id = "tab-A"

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

    //duplicate mesh button
    var duplicateBtn = document.createElement("button");
    duplicateBtn.innerHTML = 'Duplicate Object'
    duplicateBtn.onclick = function () {
        let newmesh = selectedObject.clone()
        scene.add(newmesh);
        loadsceneexplorer(scene)
    }

    //add delete button
    quickactions.appendChild(deletebtn)
    quickactions.appendChild(explorechildbtn)
    quickactions.appendChild(duplicateBtn)
    windowcontent.appendChild(quickactions);

    //add mesh description
    let propertiessection = document.createElement('fieldset');
    propertiessection.setAttribute("role", "tabpanel")
    propertiessection.setAttribute("hidden", "")
    propertiessection.id = "tab-B"
    propertiessection.appendChild(windowcontent.appendChild(createCubePropertiesTableRow(selectedObject)))
    windowcontent.appendChild(propertiessection);

    //update script description
    let updatescript = document.createElement('fieldset');
    let textareascript = document.createElement('textarea');
    textareascript.style.width = "100%";
    textareascript.style.resize = "vertical";
    updatescript.setAttribute("role", "tabpanel")
    updatescript.setAttribute("hidden", "")
    updatescript.id = "tab-C"
    updatescript.appendChild(textareascript);
    windowcontent.appendChild(updatescript);
    if (typeof selectedObject.userData.script !== "undefined") {
        const functionBody = selectedObject.userData.script.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
        textareascript.innerHTML = functionBody;
    }
    textareascript.onchange = function () {
        const scriptFunction = new Function("mesh", textareascript.value);
        selectedObject.userData.script = scriptFunction.toString();
        selectedObject.userData.scriptFunction = scriptFunction;
    }

    //click script description
    let clickscript = document.createElement('fieldset');
    let clicktextareascript = document.createElement('textarea');
    clicktextareascript.style.width = "100%";
    clicktextareascript.style.resize = "vertical";
    clickscript.setAttribute("role", "tabpanel")
    clickscript.setAttribute("hidden", "")
    clickscript.id = "tab-D"
    clickscript.appendChild(clicktextareascript);
    windowcontent.appendChild(clickscript);
    if (typeof selectedObject.userData.clickscript !== "undefined") {
        const functionBody = selectedObject.userData.clickscript.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
        clicktextareascript.innerHTML = functionBody;
    }
    clicktextareascript.onchange = function () {
        const clickscriptfunction = new Function("mesh", clicktextareascript.value);
        selectedObject.userData.clickscript = clickscriptfunction.toString();
        selectedObject.userData.clickscriptfunction = clickscriptfunction;
    }

    //init script description
    let initscript = document.createElement('fieldset');
    let inittextareascript = document.createElement('textarea');
    inittextareascript.style.width = "100%";
    inittextareascript.style.resize = "vertical";
    initscript.setAttribute("role", "tabpanel")
    initscript.setAttribute("hidden", "")
    initscript.id = "tab-E"
    initscript.appendChild(inittextareascript);
    windowcontent.appendChild(initscript);
    if (typeof selectedObject.userData.initscript !== "undefined") {
        const functionBody = selectedObject.userData.initscript.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
        inittextareascript.innerHTML = functionBody;
    }
    inittextareascript.onchange = function () {
        const initscriptfunction = new Function("mesh", inittextareascript.value);
        selectedObject.userData.initscript = initscriptfunction.toString();
        selectedObject.userData.initscriptfunction = initscriptfunction;
    }

    //tabs
    const tabButtons = document.querySelectorAll("[role=tab]");
    tabButtons.forEach((tabButton) => {
        tabButton.addEventListener("click", (e) => {
            e.preventDefault();
            const tabContainer = e.target.parentElement.parentElement;
            const targetId = e.target.getAttribute("aria-controls");
            tabButtons.forEach((_tabButton) =>
                _tabButton.setAttribute("aria-selected", false)
            );
            tabButton.setAttribute("aria-selected", true);
            tabContainer
                .querySelectorAll("[role=tabpanel]")
                .forEach((tabPanel) => tabPanel.setAttribute("hidden", true));
            tabContainer
                .querySelector(`[role=tabpanel]#${targetId}`)
                .removeAttribute("hidden");
        });
    });

    //apply autocomplete to textarea
    applyToTextArea(textareascript)
    applyToTextArea(clicktextareascript)
    applyToTextArea(inittextareascript)
}