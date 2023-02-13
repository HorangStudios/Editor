let sceneStates = [];
let currentState = 0;

function saveSceneState() {
    let state = {
        objects: [...scene.children],
    };
    sceneStates.push(state);
    currentState++;
}

function undoScene() {
    if (currentState > 0) {
        currentState--;
        let state = sceneStates[currentState];
        scene.children = state.objects;
    }
}

function redoScene() {
    if (currentState > 0) {
        currentState++;
        let state = sceneStates[currentState];
        scene.children = state.objects;
    }
}