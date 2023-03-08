//create terrain button
function createterrain() {
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

    titlebartext.innerHTML = "Generate Terrain"
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
    possection.innerHTML = "<legend>Size</legend>";
    windowcontent.appendChild(possection);
    possection.className = "positionbox";
    let posX = document.createElement('input');
    posX.placeholder = "Voxel Size";
    posX.type = "number";
    let posY = document.createElement('input');
    posY.placeholder = "Terrain Size";
    posY.type = "number";
    possection.appendChild(posX);
    possection.appendChild(posY);

    //create more buttons for window
    let colorbox = document.createElement('fieldset');
    colorbox.innerHTML = "<legend>Color</legend>";
    windowcontent.appendChild(colorbox);
    colorbox.className = "positionbox";
    let color = document.createElement('input');
    color.placeholder = "Color";
    color.type = "color";
    colorbox.appendChild(color);

    //create Terrain button
    let create = document.createElement('button');
    create.innerText = "Generate Terrain";
    create.type = "button";
    create.onclick = function () {
        generateterrain(
            posX.value,
            posY.value,
            color.value,
        )
        customwindow.remove()
    }
    windowcontent.appendChild(create);
}