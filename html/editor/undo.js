let sceneHistory = []; // array to store scene history
let currentIndex = -1; // current index in scene history

// add object to the scene
function addObject() {
    sceneHistory.splice(currentIndex + 1, sceneHistory.length - currentIndex); // remove history after current index
    sceneHistory.push(objects.slice()); // add current state of objects to history
    currentIndex = sceneHistory.length - 1; // update current index
    updateScene();
}

// update scene to display all objects
function updateScene() {
    // remove all objects from the scene
    while (objects.length > 0) {
        let object = objects.pop();
        scene.remove(object);
    }

    // add all objects in the sceneHistory at currentIndex
    objects = sceneHistory[currentIndex].slice();
    for (let i = 0; i < objects.length; i++) {
        scene.add(objects[i]);
    }
}

// undo function
function undo() {
    if (currentIndex > 0) {
        currentIndex--;
        updateScene();
    } else {
        shell.beep()
    }
}

// redo function
function redo() {
    if (currentIndex < sceneHistory.length - 1) {
        currentIndex++;
        updateScene();
    } else {
        shell.beep()
    }
}

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "z") {
        undo();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "y") {
        redo();
    }
});