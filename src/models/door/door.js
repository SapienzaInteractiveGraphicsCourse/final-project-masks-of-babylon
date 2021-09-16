// Asset: a door. Clicking on it allows to move between different areas of the dungeon.

import { theSceneManager } from "../../utils/scene-manager.js";

import * as DGLIB from "../../utils/lib-dungeon.js";

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Door/", "Door.gltf", scene).then((result) => {
        door.meshes = result.meshes;
        door.mesh = result.meshes[1];
        door.mesh.setEnabled(false);
        door.mesh.setParent(null);
        door.mesh.material.backFaceCulling = true;
        return result;
    });
}

function addInstance(offset, tpDest, dir, check_collisions=false, scene=undefined) {

    dir = dir.toLowerCase();

    let mesh = door.mesh;
    let wall_thickness = 0.4;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newInstance = mesh.createInstance("door");

    newInstance.position.x = offset[0]*6;
    newInstance.position.y = offset[1]*6 + 1.45;
    newInstance.position.z = offset[2]*6;

    switch (dir) {
        case "e":
            newInstance.rotation = new BABYLON.Vector3(0, Math.PI/2, 0);
            newInstance.position.z += 1.8;
            break;
        case "w":
            newInstance.rotation = new BABYLON.Vector3(0, -Math.PI/2, 0);
            newInstance.position.z -= 1.8;
            break;
        case "n":
            newInstance.rotation = new BABYLON.Vector3(0, 0, 0);
            newInstance.position.x -= 1.8;
            break;
        case "s":
            newInstance.rotation = new BABYLON.Vector3(0, Math.PI, 0);
            newInstance.position.x += 1.8;
            break;
    }

    newInstance.scaling.x = 1.5;
    newInstance.scaling.y = 1; // Seems trivial, but explicitly defining this actually avoids a strange flipping. So don't remove this.

    newInstance.isPickable = true;

    // add an action manager to change the cursor on hover
    newInstance.actionManager = new BABYLON.ActionManager(scene);
    newInstance.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){
        // project positions on the XZ plane to ignore vertical distances
        let playerpos = scene.activeCamera.position.multiply(new BABYLON.Vector3(1, 0, 1));
        let objectpos = ev.meshUnderPointer.position.multiply(new BABYLON.Vector3(1, 0, 1));
        let sqrdist = BABYLON.Vector3.DistanceSquared(playerpos, objectpos);
        if (sqrdist < DGLIB.PICK_DISTANCE_LIMIT*DGLIB.PICK_DISTANCE_LIMIT) {
            newInstance.actionManager.hoverCursor = "pointer";
        }
        else {
            newInstance.actionManager.hoverCursor = "default";
        }
    }));

    newInstance.onPicked = function() {
        // deactivate camera controls to the user cannot control it during the following animation and scene change
        scene.activeCamera.detachControl();

        //disable this door so this event won't fire again
        newInstance.isPickable = false;
        // no need to set it back because this scene will be destroyed in a few moments

        // initiate a "door open" animation, then move to the next scene

        const _animOpen = new BABYLON.Animation("animOpen", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);

        const quadEase = new BABYLON.QuadraticEase();
        quadEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        _animOpen.setEasingFunction(quadEase);

        BABYLON.Animation.TransitionTo(
            "rotation",
            newInstance.rotation.add(new BABYLON.Vector3(0, -Math.PI/2, 0)),
            newInstance,
            scene,
            30,  // framerate
            _animOpen,
            1500,  // duration in milliseconds
        ).waitAsync().then(() => {
            theSceneManager.gotoSceneForDungeon(tpDest);
        });
    }

    if (check_collisions) {
        createCollisionBox(scene, newInstance, wall_thickness);
    }
}

function createCollisionBox(scene, newInstance, wall_thickness) {
    var cube = new BABYLON.Mesh.CreateBox("box", 2, scene);
    cube.isVisible = false;
    cube.isPickable = false;
    cube.setParent(newInstance);
    cube.position = BABYLON.Vector3.Zero();
    cube.position = cube.position.add(new BABYLON.Vector3(1.5, 0, 0));
    cube.rotation = BABYLON.Vector3.Zero();
    cube.scaling = newInstance.scaling.multiply(new BABYLON.Vector3(1.1, 1.1, 1.1*wall_thickness));
    cube.checkCollisions = true;
}

const door = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addInstance,
};

export default door;