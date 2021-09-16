/**
 * Contains the instructions to clone a key of any type since the only thing
 * differing between key1 and key2 is the mesh geometry.
 */

import { theGameState, CARRIEDOBJECT, KEYSTATE } from "../../utils/game-state.js";
import * as MYANIM from "../../utils/animation.js";

import * as DGLIB from "../../utils/lib-dungeon.js";

// keys will shrink when held by the player so they won't get too big when close to the camera
const ORIGINAL_SCALING = new BABYLON.Vector3(1.3, 1.3, 1);
const CARRIED_SCALING = new BABYLON.Vector3(0.55, 0.55, 0.55);

function addCloneGenericKey(mesh, position, scaling, color, check_collisions=false, scene=undefined) {
    //NOTE: spell color well, it will be used as a key (pun not intended) to access the GameState as well and it will be compared with the padlock's

    color = color.toLowerCase();

    if (!mesh || mesh.isDisposed()) {
        console.error("You have to load first!");
    }

    var newClone = mesh.clone("key");
    newClone.setEnabled(true);
    newClone.material = mesh.material.clone("keyMaterial");

    newClone.position = position;
    newClone.scaling = scaling;

    newClone.rotation = new BABYLON.Vector3(0,0,Math.PI);

    newClone.color = color;

    var carriedConstant;

    switch (color) {
        case "yellow":
            newClone.material.albedoColor = BABYLON.Color3.Yellow();
            carriedConstant = CARRIEDOBJECT.KEY_YELLOW;
            break;
        case "green":
            newClone.material.albedoColor = BABYLON.Color3.Green();
            carriedConstant = CARRIEDOBJECT.KEY_GREEN;
            break;
        case "blue":
            newClone.material.albedoColor = BABYLON.Color3.Blue();
            newClone.rotation = new BABYLON.Vector3(0, Math.PI/2, Math.PI);
            carriedConstant = CARRIEDOBJECT.KEY_BLUE;
            break;
        case "red":
            newClone.material.albedoColor = BABYLON.Color3.Red();
            carriedConstant = CARRIEDOBJECT.KEY_RED;
            break;
    }

    newClone.isPickable = true;

    //idle animation
    const _animOpen = new BABYLON.Animation("animOpen", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
    const quadEase = new BABYLON.QuadraticEase();
    quadEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    _animOpen.setEasingFunction(quadEase);

    // begin floating animation
    const _animFloat_bab = new BABYLON.Animation("animFloat", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
    _animFloat_bab.setEasingFunction(quadEase);
    const _animFloat_keys = [
        {
            frame:0,
            value:newClone.position
        }, {
            frame:30,
            value:newClone.position.add(new BABYLON.Vector3(0, 0.5, 0))
        }, {
            frame:60,
            value:newClone.position
        }
    ];
    const animFloat = new MYANIM.Animation(_animFloat_bab, _animFloat_keys);

    MYANIM.directAnimationLoop(scene, newClone, [animFloat])

    // add an action manager to change the cursor on hover
    newClone.actionManager = new BABYLON.ActionManager(scene);
    newClone.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){
        // project positions on the XZ plane to ignore vertical distances
        let playerpos = scene.activeCamera.position.multiply(new BABYLON.Vector3(1, 0, 1));
        let objectpos = ev.meshUnderPointer.position.multiply(new BABYLON.Vector3(1, 0, 1));
        let sqrdist = BABYLON.Vector3.DistanceSquared(playerpos, objectpos);
        if (sqrdist < DGLIB.PICK_DISTANCE_LIMIT*DGLIB.PICK_DISTANCE_LIMIT) {
            if (scene.activeCamera.carriedObject) {   // if player already holds an object...
                newClone.actionManager.hoverCursor = "not-allowed";    // ...they can't carry another one
            }
            else {
                newClone.actionManager.hoverCursor = "pointer";
            }
        }
        else {
            newClone.actionManager.hoverCursor = "default";
        }
    }));

    newClone.onPicked = function() {
        if (scene.activeCamera.carriedObject) {   // if player already holds an object...
            return;    // ...they can't carry another one
        }

        // deactivate camera controls to the user cannot control it during the following animation
        scene.activeCamera.detachControl();

        // disable this key so this event won't fire again
        newClone.isPickable = false;
        // no need to set it back because this will never be picked again:
        // the player cannot let go of a key unless it's properly inserted in its lock (which destroys both)

        // stop idle animation so it won't bother us anymore
        scene.stopAnimation(newClone);

        // animation "keys fly to hand of player"

        const _animPosition = new BABYLON.Animation("animOpen", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
        const _animRotation = new BABYLON.Animation("animOpen", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
        const _animScaling = new BABYLON.Animation("animOpen", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);

        const quadEase = new BABYLON.QuadraticEase();
        quadEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        _animPosition.setEasingFunction(quadEase);
        _animRotation.setEasingFunction(quadEase);
        _animScaling.setEasingFunction(quadEase);

        let desiredPositionWRTCamera = new BABYLON.Vector3(0.3, -0.05, 0.8);
        let rotatedPositionWRTCamera = new BABYLON.Vector3();
        desiredPositionWRTCamera.rotateByQuaternionToRef(
            BABYLON.Quaternion.FromEulerVector(scene.activeCamera.rotation),
            rotatedPositionWRTCamera
        )

        let animDuration = 1000;

        let positionAnimationPromise = BABYLON.Animation.TransitionTo(
            "position",
            scene.activeCamera.position.add(rotatedPositionWRTCamera),
            newClone,
            scene,
            30,  // framerate
            _animPosition,
            animDuration,  // duration in milliseconds
        ).waitAsync();

        let rotationAnimationPromise = BABYLON.Animation.TransitionTo(
            "rotation",
            scene.activeCamera.rotation.multiply(new BABYLON.Vector3(1, 1, 0)),  // filter coordinates
            newClone,
            scene,
            30,  // framerate
            _animRotation,
            animDuration,  // duration in milliseconds
        ).waitAsync();

        let scalingAnimationPromise = BABYLON.Animation.TransitionTo(
            "scaling",
            CARRIED_SCALING,
            newClone,
            scene,
            30,  // framerate
            _animScaling,
            animDuration,  // duration in milliseconds
        ).waitAsync();
        
        
        scalingAnimationPromise.then(() => {
            // player can move again after the animation
            scene.activeCamera.attachControl();
            // mark this key as taken so we don't spawn it again when the player returns here
            theGameState.keyState[color] = KEYSTATE.TAKEN;
            // player now holds object
            scene.activeCamera.carriedObject = newClone;
            scene.activeCamera.desiredRelativePositionOfCarriedObject = desiredPositionWRTCamera;
            // Save that the player has this key in the game state as well, so the player will still be holding it after changing scenes
            theGameState.playerInDungeon.carriedObject = carriedConstant;
        });

    }

    if (check_collisions) {
        createCollisionBox(scene, newClone);
    }

    return newClone;
}

function createCollisionBox(scene, newClone) {
    var cube = new BABYLON.Mesh.CreateBox("box", 2, scene);
    cube.isVisible = false;
    cube.isPickable = false;
    cube.setParent(newClone);
    cube.position = new BABYLON.Vector3(0, 0, 0);
    cube.rotation = BABYLON.Vector3.Zero();
    cube.scaling = newClone.scaling.multiply(new BABYLON.Vector3(0.2, 0.5, 0.2));
    cube.checkCollisions = true;
}

export {addCloneGenericKey, ORIGINAL_SCALING, CARRIED_SCALING}