// Asset: a lock. Always associated to a set of bars, if the player has the correct key the lock can be opened to clear the way.

import { RotationFromDegrees } from "../../utils/angles.js";
import { theGameState, CARRIEDOBJECT, KEYSTATE } from "../../utils/game-state.js";

import { ORIGINAL_SCALING } from "../keys/keys-common.js";

import * as DGLIB from "../../utils/lib-dungeon.js";

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Padlock/", "Padlock.gltf", scene).then((result) => {
        padlock.meshes = result.meshes;
        padlock.mesh = result.meshes[1];
        padlock.mesh.setEnabled(false);
        padlock.mesh.setParent(null);
        padlock.mesh.material.backFaceCulling = true;
        padlock.clones = [];
        return result;
    });
}

function addClone(offset, color, bars, check_collisions=false, scene=undefined) {
    //NOTE: spell color well, it will be compared with the key's

    color = color.toLowerCase();

    let mesh = padlock.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newClone = mesh.clone("padlock");
    newClone.setEnabled(true);
    newClone.material = mesh.material.clone("padlockMaterial");

    newClone.position.x = offset[0]*6;
    newClone.position.y = offset[1]*6 + 1.6;
    newClone.position.z = offset[2]*6;

    newClone.scaling.x = 1.2;
    newClone.scaling.y = 1.2;
    newClone.scaling.z = 0.5;

    newClone.color = color;

    newClone.isPickable = true;

    var tolockTargetRelativePosition;
    var tolockTargetRotation;

    switch (color) {
        case "yellow":
            newClone.material.albedoColor = BABYLON.Color3.Yellow();
            newClone.rotation = new BABYLON.Vector3(0,Math.PI/2,0);
            tolockTargetRelativePosition = new BABYLON.Vector3(0.35, 0, 0);
            tolockTargetRotation = RotationFromDegrees(0, 0, -90);
            break;
        case "green":
            newClone.material.albedoColor = BABYLON.Color3.Green();
            newClone.rotation = new BABYLON.Vector3(0,3*Math.PI/2,0);
            tolockTargetRelativePosition = new BABYLON.Vector3(-0.35, 0, 0);
            tolockTargetRotation = RotationFromDegrees(0, 180, -90);
            break;
        case "blue":
            newClone.material.albedoColor = BABYLON.Color3.Blue();
            newClone.rotation = new BABYLON.Vector3(0,Math.PI/2,0);
            tolockTargetRelativePosition = new BABYLON.Vector3(0.35, 0, 0);
            tolockTargetRotation = RotationFromDegrees(0, 0, -90);
            break;
        case "red":
            newClone.material.albedoColor = BABYLON.Color3.Red();
            newClone.rotation = new BABYLON.Vector3(0,Math.PI,0);
            tolockTargetRelativePosition = new BABYLON.Vector3(0, 0, -0.35);
            tolockTargetRotation = RotationFromDegrees(180, -90, 90);
            break;
        default:
            newClone.material.albedoColor = BABYLON.Color3.Black();
            break;
        /*
        MEMENTO: If there ever was a "south" lock, it would use these parameters:
        tolockTargetRelativePosition = new BABYLON.Vector3(0, 0, 0.35);
        tolockTargetRotation = RotationFromDegrees(180, 90, 90);
        */
    }

    // add an action manager to change the cursor on hover
    newClone.actionManager = new BABYLON.ActionManager(scene);
    newClone.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){
        // project positions on the XZ plane to ignore vertical distances
        let playerpos = scene.activeCamera.position.multiply(new BABYLON.Vector3(1, 0, 1));
        let objectpos = ev.meshUnderPointer.position.multiply(new BABYLON.Vector3(1, 0, 1));
        let sqrdist = BABYLON.Vector3.DistanceSquared(playerpos, objectpos);
        if (sqrdist < DGLIB.PICK_DISTANCE_LIMIT*DGLIB.PICK_DISTANCE_LIMIT) {
            // check if the player is holding the correct key to open the lock
            let key = scene.activeCamera.carriedObject;
            if (key && key.color == color) {
                newClone.actionManager.hoverCursor = "pointer";
            }
            else {
                newClone.actionManager.hoverCursor = "not-allowed";
            }
        }
        else {
            newClone.actionManager.hoverCursor = "default";
        }
    }));

    newClone.onPicked = function() {
        // check if the player is holding the correct key to open the lock
        let key = scene.activeCamera.carriedObject;

        if (key && key.color == color) {
            // deactivate camera controls to the user cannot control it during the following animation
            scene.activeCamera.detachControl();
    
            //disable this padlock so this event won't fire again
            newClone.isPickable = false;

            // release the key
            scene.activeCamera.carriedObject = undefined;
            theGameState.playerInDungeon.carriedObject = CARRIEDOBJECT.NONE;
    
            const animationFramerate = 30;

            // Animation in three steps:
            // first have key fly to lock

            const animTolockDuration = 1000;

            const quadEase = new BABYLON.QuadraticEase();
            quadEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

            const _animTolockPos = new BABYLON.Animation("animTolockPos", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
            _animTolockPos.setEasingFunction(quadEase)
            BABYLON.Animation.TransitionTo(
                "position",
                newClone.position.add(tolockTargetRelativePosition),
                key,
                scene,
                animationFramerate,
                _animTolockPos,
                animTolockDuration,
            )

            const _animTolockScl = new BABYLON.Animation("animTolockScl", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
            _animTolockScl.setEasingFunction(quadEase)
            BABYLON.Animation.TransitionTo(
                "scaling",
                ORIGINAL_SCALING,
                key,
                scene,
                animationFramerate,
                _animTolockScl,
                animTolockDuration,
            ).waitAsync();

            const _animTolockRot = new BABYLON.Animation("animTolockRot", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
            _animTolockRot.setEasingFunction(quadEase)
            let tolockRotPromise = BABYLON.Animation.TransitionTo(
                "rotation",
                tolockTargetRotation,
                key,
                scene,
                animationFramerate,
                _animTolockRot,
                animTolockDuration,
            ).waitAsync();

            tolockRotPromise.then(() => {
                // then the key turns

                // clear key.animations so it won't replay the rotation
                // (b/c TransitionTo adds animations to this array and starts all animations in it but doesn't clear them)
                key.animations = [];

                const cubEase = new BABYLON.CubicEase();
                cubEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);

                const _animUnlockRot = new BABYLON.Animation("animUnlockRot", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
                _animUnlockRot.setEasingFunction(cubEase);
                return BABYLON.Animation.TransitionTo(
                    "rotation",
                    tolockTargetRotation.add(RotationFromDegrees(-90, 0, 0)),  // fortunately the Euler angles of the keys happen to be right in the order that allows rotating the key along its axis with a simple addition. (this is a very special case.)
                    key,
                    scene,
                    animationFramerate,
                    _animUnlockRot,
                    250,
                ).waitAsync();

            }).then(() => {
                // finally lock, bars and key all disappear as the obstacle, now unlocked, retreats into the ground

                // clear key.animations so it won't replay the rotation
                // (b/c TransitionTo adds animations to this array and starts all animations in it but doesn't clear them)
                key.animations = [];

                const animOpenDuration = 2500;  // duration in milliseconds

                const quartEase = new BABYLON.QuarticEase();
                quartEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
        
                const _animOpen = new BABYLON.Animation("animOpen", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
                _animOpen.setEasingFunction(quartEase);
                let padlockAnimationPromise = BABYLON.Animation.TransitionTo(
                    "position",
                    newClone.position.add(new BABYLON.Vector3(0, -4, 0)),
                    newClone,
                    scene,
                    animationFramerate,
                    _animOpen,
                    animOpenDuration,
                ).waitAsync();
        
                
                let _animOpen2 = _animOpen.clone();   // each transition seems to need its own animation
                _animOpen2.setEasingFunction(quartEase);
                BABYLON.Animation.TransitionTo(
                    "position",
                    bars.position.add(new BABYLON.Vector3(0, -4, 0)),
                    bars,
                    scene,
                    animationFramerate,
                    _animOpen2,
                    animOpenDuration,
                )
        
                let _animOpen3 = _animOpen.clone();   // each transition seems to need its own animation
                _animOpen3.setEasingFunction(quartEase);
                BABYLON.Animation.TransitionTo(
                    "position",
                    key.position.add(new BABYLON.Vector3(0, -4, 0)),
                    key,
                    scene,
                    animationFramerate,
                    _animOpen3,
                    animOpenDuration,
                )
        
                padlockAnimationPromise.then(() => {
                    // mark this door as open persistently
                    theGameState.keyState[color] = KEYSTATE.DONE;
                    // return control to the player
                    scene.activeCamera.attachControl();
                });
            })
        }
        // else, if the player has no key or the wrong key, do absolutely nothing. Don't open.
        // the "not-allowed" cursor should be enough to communicate to the user
        // that they can't do anything at the time.
    }

    if (check_collisions) {
        createCollisionBox(scene, newClone);
    }

    padlock.clones.push(newClone)
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

const padlock = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addClone,
    clones: [],
};

export default padlock;