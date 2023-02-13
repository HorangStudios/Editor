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