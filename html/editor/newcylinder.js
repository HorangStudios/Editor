//create cylinder button
function createcylinder() {
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

    titlebartext.innerHTML = "New Cylinder"
    titlebartext.className = "title-bar-text"
    titlebar.appendChild(titlebartext);

    titlebarcontrols.className = "title-bar-controls";
    titlebarcontrols.innerHTML = "<button aria-label='Close'></button>";
    titlebarcontrols.onclick = function () {
        customwindow.remove()
    }
    titlebar.appendChild(titlebarcontrols);

    windowcontent.className = "window-body has-space";
    customwindow.appendChild(windowcontent);

    //create buttons for window
    let possection = document.createElement('fieldset');
    possection.innerHTML = "<legend>Position</legend>";
    windowcontent.appendChild(possection);
    possection.className = "positionbox";
    let posX = document.createElement('input');
    posX.placeholder = "X Position";
    posX.type = "number";
    let posY = document.createElement('input');
    posY.placeholder = "Y Position";
    posY.type = "number";
    let posZ = document.createElement('input');
    posZ.placeholder = "Z Position";
    posZ.type = "number";
    possection.appendChild(posX);
    possection.appendChild(posY);
    possection.appendChild(posZ);

    //create more buttons for window
    let size = document.createElement('fieldset');
    size.innerHTML = "<legend>Size</legend>";
    windowcontent.appendChild(size);
    size.className = "positionbox";
    let sizeX = document.createElement('input');
    sizeX.placeholder = "radiusTop";
    sizeX.type = "number";
    let sizeY = document.createElement('input');
    sizeY.placeholder = "radiusBottom";
    sizeY.type = "number";
    let sizeZ = document.createElement('input');
    sizeZ.placeholder = "height";
    sizeZ.type = "number";
    let sizeS = document.createElement('input');
    sizeS.placeholder = "radialSegments";
    sizeS.type = "number";
    size.appendChild(sizeX);
    size.appendChild(sizeY);
    size.appendChild(sizeZ);
    size.appendChild(sizeS);

    //create more buttons for window
    let colorbox = document.createElement('fieldset');
    colorbox.innerHTML = "<legend>Color</legend>";
    windowcontent.appendChild(colorbox);
    colorbox.className = "positionbox";
    let color = document.createElement('input');
    color.placeholder = "Color";
    color.type = "color";
    colorbox.appendChild(color);

    //create Cylinder button
    let create = document.createElement('button');
    create.innerText = "Create Cylinder";
    create.type = "button";
    create.onclick = function () {
        addCylinder(
            posX.value,
            posY.value,
            posZ.value,
            sizeX.value,
            sizeY.value,
            sizeZ.value,
            sizeS.value,
            color.value,
        )
        customwindow.remove()
    }
    windowcontent.appendChild(create);
}
