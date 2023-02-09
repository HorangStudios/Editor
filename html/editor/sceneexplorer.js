var objectList = document.getElementById("scenelist");

function loadsceneexplorer() {
    objectList.innerHTML = "";
    scene.children.forEach(function (object) {
        if (object.type == "Mesh") {
            var listItem = document.createElement("li");
            listItem.role = "option";
            listItem.innerHTML = object.type;
            listItem.onclick = function () {
                viewobject(object);
            }
            objectList.appendChild(listItem);
        }
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