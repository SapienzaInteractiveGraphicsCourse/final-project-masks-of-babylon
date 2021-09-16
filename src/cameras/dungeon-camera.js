/**
 * File that defines the camera to be used in dungeon scenes.
 * It is a UniversalCamera with special parameter and inpu configurations
 * to allow first-person exploration of the dungeon.
 * 
 * It also represents the player as well, and has a few extra attributes
 * to track its state.
 */

import { theGameState, CARRIEDOBJECT } from "../utils/game-state.js";
import key1 from "../models/keys/key1.js";
import key2 from "../models/keys/key2.js";
import { CARRIED_SCALING } from "../models/keys/keys-common.js";
import { theOptions } from "../utils/options.js";

function createCamera(name, position, target, scene, canvas) {
    const camera = new BABYLON.UniversalCamera(name, position, scene);

    camera.attachControl(canvas, true);

    // CAMERA PARAMETERS

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
    camera.angularSensibility = sens;

    camera.fov = Math.PI/4;
    camera.speed = 4;
    camera.angularSpeed = Math.PI/2;
    camera.angle = Math.PI/2;
    camera.direction = new BABYLON.Vector3(Math.cos(camera.angle), 0, Math.sin(camera.angle));
    camera.target = target;

    camera.minZ = 0.5;

    ///////////////////////////////




    // GRAVITY

    // Nothing has to actually fall anywhere in the project,
    // this gravity only needs to keep the player on the ground,
    // so we can use an arbitrary value
    // (-0.5 is known to keep a 20-FPS player on the ground, so the double should hold anyone)
    scene.gravity = new BABYLON.Vector3(0, -1, 0);
    camera.applyGravity = true;







    // COLLISIONS

    ///////////////////////////////

    //Set the ellipsoid around the camera
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

    // Enable Collisions
    scene.collisionsEnabled = true;
    camera.checkCollisions = true;






    // REDEFINE KEYBOARD INPUT TO ACCEPT WASD

    // remove the default keyboard input
    camera.inputs.removeByType("FreeCameraKeyboardMoveInput");


    // define a new one
    var FreeCameraKeyboardWalkInput = function () {
        // keycodes of the keys held down in the present moment (mutable)
        this._keys = [];
        // each of these arrays holds the keycodes of the keys
        // that correspond to that command (will be kept constant)
        this.keysForward = [87, 38];      //'W' = 87 ; arrowUp = 38
        this.keysBackward = [83, 40];     //'S' = 83 ; arrowDown = 40
        this.keysTurnLeft = [37];         //arrowLeft = 37
        this.keysTurnRight = [39];        //arrowRight = 39
        this.keysStrafeLeft = [65];       //'A' = 65
        this.keysStrafeRight = [68];      //'D' = 68
        this.keysRun = [16];              //Shift = 16
    }

    //Add attachment controls
    FreeCameraKeyboardWalkInput.prototype.attachControl = function (noPreventDefault) {
        var _this = this;
        var engine = this.camera.getEngine();
        var element = engine.getInputElement();
        if (!this._onKeyDown) {
            element.tabIndex = 1;
            // when a key is pressed: if its keycode is in any of our command arrays,
            // register it as currently held down
            this._onKeyDown = function (evt) {  
                if (_this.keysForward.indexOf(evt.keyCode) !== -1 ||
                    _this.keysBackward.indexOf(evt.keyCode) !== -1 ||
                    _this.keysTurnLeft.indexOf(evt.keyCode) !== -1 ||
                    _this.keysTurnRight.indexOf(evt.keyCode) !== -1 ||
                    _this.keysStrafeLeft.indexOf(evt.keyCode) !== -1 ||
                    _this.keysStrafeRight.indexOf(evt.keyCode) !== -1 ||
                    _this.keysRun.indexOf(evt.keyCode) !== -1) {
                    var index = _this._keys.indexOf(evt.keyCode);
                    if (index === -1) {
                        _this._keys.push(evt.keyCode);
                    }
                    if (!noPreventDefault) {
                        evt.preventDefault();
                    }
                }
            };
            // when a ky is released: if its keycode is in any of our command arrays,
            // unregister it as it is no longer held down
            this._onKeyUp = function (evt) {
                if (_this.keysForward.indexOf(evt.keyCode) !== -1 ||
                    _this.keysBackward.indexOf(evt.keyCode) !== -1 ||
                    _this.keysTurnLeft.indexOf(evt.keyCode) !== -1 ||
                    _this.keysTurnRight.indexOf(evt.keyCode) !== -1 ||
                    _this.keysStrafeLeft.indexOf(evt.keyCode) !== -1 ||
                    _this.keysStrafeRight.indexOf(evt.keyCode) !== -1 ||
                    _this.keysRun.indexOf(evt.keyCode) !== -1) {
                    var index = _this._keys.indexOf(evt.keyCode);
                    if (index >= 0) {
                        _this._keys.splice(index, 1);
                    }
                    if (!noPreventDefault) {
                        evt.preventDefault();
                    }
                }
            };
            // add these events to the DOM
            element.addEventListener("keydown", this._onKeyDown, false);
            element.addEventListener("keyup", this._onKeyUp, false);
        }
    };

    //Add detachment controls
    FreeCameraKeyboardWalkInput.prototype.detachControl = function () {
        var engine = this.camera.getEngine();
        var element = engine.getInputElement();
        if (this._onKeyDown) {
            element.removeEventListener("keydown", this._onKeyDown);
            element.removeEventListener("keyup", this._onKeyUp);
            BABYLON.Tools.UnregisterTopRootEvents(scene.getEngine().getHostWindow(), [
                { name: "blur", handler: this._onLostFocus }
            ]);
            this._keys = [];
            this._onKeyDown = null;
            this._onKeyUp = null;
        }
    };

    //Keys movement control by checking inputs
    FreeCameraKeyboardWalkInput.prototype.checkInputs = function () {
        if (this._onKeyDown) {
            var camera = this.camera;
            var engine = this.camera.getEngine();
            var speed = camera.speed * engine.getDeltaTime() / 1000;    // the DeltaTime ensures the desired speed is always enforced regardless of framerate
            // first check for the run keys in order to increase the speed
            for (var index = 0; index < this._keys.length; index++) {
                var keyCode = this._keys[index];
                if (this.keysRun.indexOf(keyCode) !== -1) {
                    speed *= 2;
                    break;
                }
            }
            // then check the other keys to move
            for (var index = 0; index < this._keys.length; index++) {
                // reset camera.direction so we don't move unwillingly
                camera.direction.copyFromFloats(0, 0, 0);
                var keyCode = this._keys[index];
                if (this.keysForward.indexOf(keyCode) !== -1) {
                    camera.direction.copyFromFloats(0, 0, speed);               
                }
                else if (this.keysBackward.indexOf(keyCode) !== -1) {
                    camera.direction.copyFromFloats(0, 0, -speed);
                }
                else if (this.keysStrafeLeft.indexOf(keyCode) !== -1) {
                    camera.direction.copyFromFloats(-speed, 0, 0);                
                }
                else if (this.keysStrafeRight.indexOf(keyCode) !== -1) {
                    camera.direction.copyFromFloats(speed, 0, 0);
                }
                else if (this.keysTurnLeft.indexOf(keyCode) !== -1) {
                    camera.rotation.y -= camera.angularSpeed * engine.getDeltaTime() / 1000;              
                }
                else if (this.keysTurnRight.indexOf(keyCode) !== -1) {
                    camera.rotation.y += camera.angularSpeed * engine.getDeltaTime() / 1000;
                }
                if (camera.getScene().useRightHandedSystem) {
                    camera.direction.z *= -1;
                }
                // transform camera.direction so that it moves relative to where it's looking
                camera.getViewMatrix().invertToRef(camera._cameraTransformMatrix);
                BABYLON.Vector3.TransformNormalToRef(camera.direction, camera._cameraTransformMatrix, camera._transformedDirection);
                camera.cameraDirection.addInPlace(camera._transformedDirection);
            }
        }
    };

    //Add the onLostFocus function
    FreeCameraKeyboardWalkInput.prototype._onLostFocus = function (e) {
        this._keys = [];
    };
    
    //Add the two required functions for the control Name
    FreeCameraKeyboardWalkInput.prototype.getClassName = function () {
        return "FreeCameraKeyboardWalkInput";
    };

    FreeCameraKeyboardWalkInput.prototype.getSimpleName = function () {
        return "keyboard";
    };

    //Add the new keys input manager to the camera.
    camera.inputs.add(new FreeCameraKeyboardWalkInput());





    // CARRIED OBJECT

    camera.carriedObject = undefined;
    camera.desiredRelativePositionOfCarriedObject = BABYLON.Vector3.Forward();    // each item may decide this independently when it's picked, this is just a reasonable initialization

    scene.onBeforeRenderObservable.add(() => {
        // if the player carries an object, place it always in front of them
        // since they are holding it
        if (camera.carriedObject) {
            // rotate desired object position by camera rotation so it'll always be in front of the camera
            let rotatedRelativePosition = new BABYLON.Vector3();
            camera.desiredRelativePositionOfCarriedObject.rotateByQuaternionToRef(
                BABYLON.Quaternion.FromEulerVector(camera.rotation),
                rotatedRelativePosition
            );
            // position object in front of the camera
            camera.carriedObject.position = camera.position.add(rotatedRelativePosition);
            // rotate object so it always faces the camera
            camera.carriedObject.rotation = camera.rotation.multiply(new BABYLON.Vector3(1, 1, 0));  // filter coordinates
        }
    })

    restoreCarriedObject(camera, scene);

    return camera;
}

/**
 * Reads the persistent state and assigns a carried object to the player
 * if they were holding one in the previous scene.
 */
function restoreCarriedObject(camera, scene) {
    let obj = undefined;
    let pos = BABYLON.Vector3.Forward();

    switch (theGameState.playerInDungeon.carriedObject) {
        case CARRIEDOBJECT.KEY_YELLOW:
            obj = key1.addClone([0,0,0], "yellow", false, scene);
            obj.scaling = CARRIED_SCALING;
            pos = new BABYLON.Vector3(0.3, -0.05, 0.8);
            break;
        case CARRIEDOBJECT.KEY_GREEN:
            obj = key1.addClone([0,0,0], "green", false, scene);
            obj.scaling = CARRIED_SCALING;
            pos = new BABYLON.Vector3(0.3, -0.05, 0.8);
            break;
        case CARRIEDOBJECT.KEY_BLUE:
            obj = key1.addClone([0,0,0], "blue", false, scene);
            obj.scaling = CARRIED_SCALING;
            pos = new BABYLON.Vector3(0.3, -0.05, 0.8);
            break;
        case CARRIEDOBJECT.KEY_RED:
            obj = key2.addClone([0,0,0], "red", false, scene);
            obj.scaling = CARRIED_SCALING;
            pos = new BABYLON.Vector3(0.3, -0.05, 0.8);
            break;
        case CARRIEDOBJECT.NONE:
        default:
            ;  // nothing to do, obj stays undefined
            break;
    }

    if (obj) {
        obj.isPickable = false;
    }
    camera.carriedObject = obj;
    camera.desiredRelativePositionOfCarriedObject = pos;
}

export {createCamera};
