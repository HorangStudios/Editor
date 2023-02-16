var objectList = document.getElementById("scenelist");

function loadsceneexplorer(selectedscene) {
    objectList.innerHTML = "";
    selectedscene.children.forEach(function (object) {
        var listItem = document.createElement("li");
        listItem.role = "option";
        listItem.innerHTML = object.type;
        listItem.onclick = function () {
            viewobject(object);
        }
        objectList.appendChild(listItem);
    });
}

function openscenelist() {
    var x = document.getElementById("sceneexplorerwindow");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function createCubePropertiesTableRow(cube) {
    //declare table
    const row = document.createElement('table');

    //position
    const posrow = document.createElement('tr');
    const poslabelCell = document.createElement('td');
    const posvalueCell = document.createElement('td');
    const positionLabel = document.createElement('td');
    positionLabel.innerText = 'Position: ';
    const positionInput = document.createElement('input');
    positionInput.value = cube.position.toArray().join(',');
    positionInput.addEventListener('change', () => {
        const [x, y, z] = positionInput.value.split(',');
        cube.position.set(parseFloat(x), parseFloat(y), parseFloat(z));
    });
    poslabelCell.appendChild(positionLabel);
    posvalueCell.appendChild(positionInput);
    posrow.appendChild(poslabelCell);
    posrow.appendChild(posvalueCell);
    row.appendChild(posrow);

    //scale
    const scalerow = document.createElement('tr');
    const scalelabelCell = document.createElement('td');
    const scalevalueCell = document.createElement('td');
    const scaleLabel = document.createElement('td');
    scaleLabel.innerText = 'Scale: ';
    const scaleInput = document.createElement('input');
    scaleInput.value = cube.scale.toArray().join(',');
    scaleInput.addEventListener('change', () => {
        const [x, y, z] = scaleInput.value.split(',');
        cube.scale.set(parseFloat(x), parseFloat(y), parseFloat(z));
    });
    scalelabelCell.appendChild(scaleLabel);
    scalevalueCell.appendChild(scaleInput);
    scalerow.appendChild(scalelabelCell);
    scalerow.appendChild(scalevalueCell);
    row.appendChild(scalerow);

    //rotation
    const rotrow = document.createElement('tr');
    const rotlabelCell = document.createElement('td');
    const rotvalueCell = document.createElement('td');
    const rotLabel = document.createElement('td');
    rotLabel.innerText = 'Rotation: ';
    const rotInput = document.createElement('input');
    rotInput.value = cube.rotation.toArray().join(',');
    rotInput.addEventListener('change', () => {
        const [x, y, z] = rotInput.value.split(',');
        cube.rotation.set(parseFloat(x), parseFloat(y), parseFloat(z));
    });
    rotlabelCell.appendChild(rotLabel);
    rotvalueCell.appendChild(rotInput);
    rotrow.appendChild(rotlabelCell);
    rotrow.appendChild(rotvalueCell);
    row.appendChild(rotrow);

    //color
    const clrrow = document.createElement('tr');
    const clrlabelCell = document.createElement('td');
    const clrvalueCell = document.createElement('td');
    const colorLabel = document.createElement('td');
    colorLabel.innerText = 'Color: ';
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = '#' + cube.material.color.getHexString();
    colorInput.addEventListener('change', () => {
        cube.material.color.set(colorInput.value);
    });
    clrlabelCell.appendChild(colorLabel);
    clrvalueCell.appendChild(colorInput);
    clrrow.appendChild(clrlabelCell);
    clrrow.appendChild(clrvalueCell);
    row.appendChild(clrrow);

    return row;
}