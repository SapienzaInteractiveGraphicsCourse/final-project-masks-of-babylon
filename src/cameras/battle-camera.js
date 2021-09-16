/**
 * File that defines the camera to be used in battle scenes.
 * It is an ArcRotateCamera with a specialized parameter configuration
 * to make it move with the desired fluidity and within the limits of the scene.
 * 
 * Useful links:
 * https://doc.babylonjs.com/divingDeeper/cameras/customizingCameraInputs
 * https://doc.babylonjs.com/typedoc/classes/babylon.arcrotatecamera
 * https://doc.babylonjs.com/typedoc/classes/babylon.arcrotatecamerainputsmanager
 * https://doc.babylonjs.com/typedoc/classes/babylon.arcrotatecamerapointersinput
 * https://doc.babylonjs.com/typedoc/classes/babylon.targetcamera
 * 
 * https://forum.babylonjs.com/t/arcrotatecamera-and-right-click/4901
 * https://playground.babylonjs.com/#59FFHD#139
 */

import { theOptions } from "../utils/options.js";

/**
 * Creates a new camera, already configured for battle scenes in this project.
 * Parameters and return are just like the constructor of BABYLON.ArcRotateCamera,
 * with the addition of the canvas parameter, used by attachControl,
 * and an extra parameter to decide whether the camera starts locked or not.
 */
function createCamera(name, alpha, beta, radius, target, scene, canvas, beginLocked) {
    const camera = new BABYLON.ArcRotateCamera(name, alpha, beta, radius, target, scene);
    camera.attachControl(canvas, true);

    //the initial state will also serve as the default state when the camera is locked.
    camera.storeState();
    //this is only used for lock/unlock, so the user shouldn't accidentally trigger it
    camera.useInputToRestoreState = false;

    // limit camera latitudinal movement so it doesn't go underground
    camera.upperBetaLimit = Math.PI/1.73;
    
    // disable camera panning
    camera.panningSensibility = 0;

    // enable only left mouse to control the camera, no sense in having multiple buttons
    camera.inputs.attached.pointers.buttons = [0];
    /*
     * For reference: 0=left 1=middle 2=right
     * Order of this array is irrelevant, changing it won't e.g. make right rotate and left pan.
    */

    // effectively disable zooming through mouse wheel or touch pinch
    camera.wheelPrecision = 1000000;
    camera.pinchPrecision = 1000000;

    // Adjust parameters for a slightly more rigid movement;
    // the default settings have too much of a coda for my tastes.
    // Note: "inertia" does not appear in ArcRotateCamera's doc,
    // but in its parent's, TargetCamera.
    // Default:   (0.9, 1000)
    camera.inertia = 0.5;
    var sens;
    switch (theOptions.sensibility) {
        case 1:
            sens = 2000;
            break;
        case 2:
            sens = 800;
            break;
        case 3:
            sens = 200;
            camera.inertia = 0.3;
            break;
    }
    camera.angularSensibilityX = sens;
    camera.angularSensibilityY = sens;

    // easily read if camera is locked or not
    camera.locked = false;    // <- NEW ATTRIBUTE

    // deactivates control for the camera, effectively locking it in place
    // also return it to the standard position stored upon creation
    camera.lock = function() {    // <- NEW METHOD
        if (!camera.locked) { // idempotence
            camera.detachControl(canvas);
            camera.restoreState();
            camera.locked = true;
        }
    }

    // reactivates control for the camera, effectively unlocking it
    camera.unlock = function() {    // <- NEW METHOD
        if (camera.locked) { // idempotence
            camera.attachControl(canvas, true);
            camera.locked = false;
        }
    }

    // lock if unlocked, unlock if locked
    camera.toggleLock = function() {    // <- NEW METHOD
        if (camera.locked) {
            camera.unlock();
        }
        else {
            camera.lock();
        }
    }

    if (beginLocked) {
        camera.lock();
    }

    return camera;
}

export {createCamera};