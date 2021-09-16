/**
 * Small library of functions useful to all dungeon scenes.
 */

const PICK_DISTANCE_LIMIT = 5;

var darknessMaterial;

/**
 * Creates a couple black planes beyond a door.
 * They represent the darkness ahead of that door, and hide the end of the currently loaded scene.
 * @param {BABYLON.Vector3} doorPosInBlocks Position of the door in the "block" unit. One block is 6 standard units in the first dungeon.
 * @param {*} dir "N", "S", "W", or "E". See instantiation of some dungeon components such as walls and doors.
 * @param {BABYLON.Scene} scene The current scene.
 */
function addDarkness(doorPosInBlocks, dir, scene) {
    // lazily create a material if we don't have one ready
    if (!darknessMaterial) {
        darknessMaterial = new BABYLON.StandardMaterial("darknessMaterial", scene);
        darknessMaterial.diffuseColor = BABYLON.Color3.Black();
        darknessMaterial.specularColor = BABYLON.Color3.Black();
        darknessMaterial.onDispose = () => {
            // forget this material if it's unloaded
            darknessMaterial = undefined;
        }
    }

    let front = BABYLON.MeshBuilder.CreatePlane("frontDarkness", {
        width: 6,
        height: 4,
    }, scene);
    switch (dir.toLowerCase()) {
        case "n":
            front.position = doorPosInBlocks.scale(6).add(new BABYLON.Vector3(0, 2, 0.75*6));
            break;
        case "s":
            front.position = doorPosInBlocks.scale(6).add(new BABYLON.Vector3(0, 2, -0.75*6));
            front.rotation.y = Math.PI;
            break;
        case "w":
            front.position = doorPosInBlocks.scale(6).add(new BABYLON.Vector3(-0.75*6, 2, 0));
            front.rotation.y = -Math.PI/2;
            break;
        case "e":
            front.position = doorPosInBlocks.scale(6).add(new BABYLON.Vector3(0.75*6, 2, 0));
            front.rotation.y = Math.PI/2;
            break;
        ;
    }
    front.material = darknessMaterial;

    let top = BABYLON.MeshBuilder.CreatePlane("topDarkness", {
        width: 6,
        height: 6,
    }, scene);
    switch (dir.toLowerCase()) {
        case "n":
            top.position = doorPosInBlocks.scale(6).add(new BABYLON.Vector3(0, 4, 0.5*6));
            break;
        case "s":
            top.position = doorPosInBlocks.scale(6).add(new BABYLON.Vector3(0, 4, -0.5*6));
            break;
        case "w":
            top.position = doorPosInBlocks.scale(6).add(new BABYLON.Vector3(-0.5*6, 4, 0));
            break;
        case "e":
            top.position = doorPosInBlocks.scale(6).add(new BABYLON.Vector3(0.5*6, 4, 0));
            break;
        ;
    }
    top.rotation.x = -Math.PI/2;
    top.material = darknessMaterial;
}





/**
 * A callback to add to the onPointerObservable which takes care of picking events in the dungeon.
 */
function pickingObserverFunction(pointerInfo) {
    switch (pointerInfo.type) {
        // act only if we had a pick event...
        case BABYLON.PointerEventTypes.POINTERPICK:
            // ...and we had a hit
            if(pointerInfo.pickInfo.hit) {
                // distance limit on interaction
                if(pointerInfo.pickInfo.distance<PICK_DISTANCE_LIMIT) {
                    // we define interactable objects as those which have this method
                    if (pointerInfo.pickInfo.pickedMesh.onPicked) {
                        // call that method, triggering the event of the specific picked object
                        pointerInfo.pickInfo.pickedMesh.onPicked();
                    }
                }
            }
            break;
    }
}





export {
    addDarkness,
    pickingObserverFunction,
    PICK_DISTANCE_LIMIT,
}