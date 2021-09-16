/**
 * File for Makoto's "Charge" action.
 * Contains all the related animations and animation events for Makoto,
 * as well as the instructions to perform it.
 * 
 * EXPORTS a JS object containing all the necessary info about it.
 */

import * as MYANIM from "../../utils/animation.js"
import makoto from "./makoto.js";
import {RotationFromDegrees} from "../../utils/angles.js";

/**************
 * ANIMATIONS *
 **************/

const _animGuard_frames = [0, 30];
const guardEase = new BABYLON.SineEase();
guardEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

const _animGuard_L_upperarm_bab = new BABYLON.Animation("animGuard_L_upperarm", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animGuard_L_upperarm_bab.setEasingFunction(guardEase);
const _animGuard_L_upperarm_keys = [
    {
        frame:_animGuard_frames[0],
        value:RotationFromDegrees(0, -32.7, -17)
    }, {
        frame:_animGuard_frames[1],
        value:RotationFromDegrees(0, -31.8, 8.96)
    }
];
const animGuard_L_upperarm = new MYANIM.Animation(_animGuard_L_upperarm_bab, _animGuard_L_upperarm_keys);

const _animGuard_L_forearm_bab = new BABYLON.Animation("animGuard_L_forearm", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animGuard_L_forearm_bab.setEasingFunction(guardEase);
const _animGuard_L_forearm_keys = [
    {
        frame:_animGuard_frames[0],
        value:RotationFromDegrees(0, -50.5, 17.6)
    }, {
        frame:_animGuard_frames[1],
        value:RotationFromDegrees(-48.3, -35.2, 6.82)
    }
];
const animGuard_L_forearm = new MYANIM.Animation(_animGuard_L_forearm_bab, _animGuard_L_forearm_keys);

const _animGuard_L_hand_bab = new BABYLON.Animation("animGuard_L_hand", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animGuard_L_hand_bab.setEasingFunction(guardEase);
const _animGuard_L_hand_keys = [
    {
        frame:_animGuard_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animGuard_frames[1],
        value:RotationFromDegrees(0, 0, 84.5)
    }
];
const animGuard_L_hand = new MYANIM.Animation(_animGuard_L_hand_bab, _animGuard_L_hand_keys);

const _animGuard_R_clavicle_bab = new BABYLON.Animation("animGuard_R_clavicle", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animGuard_R_clavicle_bab.setEasingFunction(guardEase);
const _animGuard_R_clavicle_keys = [
    {
        frame:_animGuard_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animGuard_frames[1],
        value:RotationFromDegrees(0, 0, -35.7)
    }
];
const animGuard_R_clavicle = new MYANIM.Animation(_animGuard_R_clavicle_bab, _animGuard_R_clavicle_keys);

const _animGuard_R_upperarm_bab = new BABYLON.Animation("animGuard_R_upperarm", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animGuard_R_upperarm_bab.setEasingFunction(guardEase);
const _animGuard_R_upperarm_keys = [
    {
        frame:_animGuard_frames[0],
        value:RotationFromDegrees(0, -20.3, 0)
    }, {
        frame:_animGuard_frames[1],
        value:RotationFromDegrees(0, 23, -24.9)
    }
];
const animGuard_R_upperarm = new MYANIM.Animation(_animGuard_R_upperarm_bab, _animGuard_R_upperarm_keys);

const _animGuard_R_forearm_bab = new BABYLON.Animation("animGuard_R_forearm", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animGuard_R_forearm_bab.setEasingFunction(guardEase);
const _animGuard_R_forearm_keys = [
    {
        frame:_animGuard_frames[0],
        value:RotationFromDegrees(0, 41.6, 0)
    }, {
        frame:_animGuard_frames[1],
        value:RotationFromDegrees(-15.4, 47.4, -56.5)
    }
];
const animGuard_R_forearm = new MYANIM.Animation(_animGuard_R_forearm_bab, _animGuard_R_forearm_keys);

const _animGuard_weapon_bab = new BABYLON.Animation("animGuard_weapon", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animGuard_weapon_bab.setEasingFunction(guardEase);
const _animGuard_weapon_keys = [
    {
        frame:_animGuard_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animGuard_frames[1],
        value:RotationFromDegrees(-25.3, -2.25, 96.5)
    }
];
const animGuard_weapon = new MYANIM.Animation(_animGuard_weapon_bab, _animGuard_weapon_keys);



// callback function for the end of the charge animation
// defined explicitly since it consists of more than two instructions
function animChargeDone(sceneInfo) {
    sceneInfo.ui.showCharged(makoto);
    makoto.charged=true;
    sceneInfo.turn_system.player_done(sceneInfo);
}


/**
 * Executes this action: performs all animations, etc.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function perform(sceneInfo) {
    makoto.guarding=true;
    sceneInfo.turn_system.enemy_done();   //enemy has no action in this case
    makoto.meshdata.stopAllAnimations(sceneInfo.scene);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getNode("Bip01_L_UpperArm"), [animGuard_L_upperarm]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getNode("Bip01_L_Forearm"), [animGuard_L_forearm]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getNode("Bip01_L_Hand"), [animGuard_L_hand]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getNode("Bip01_R_Clavicle"), [animGuard_R_clavicle], ()=>{animChargeDone(sceneInfo)});
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getNode("Bip01_R_UpperArm"), [animGuard_R_upperarm]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getNode("Bip01_R_Forearm"), [animGuard_R_forearm]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getNode("weapon"), [animGuard_weapon]);
}

/**
 * Returns Makoto to the default pose.
 * Notifies the end of the operation with a Promise (see startTurn in makoto.js)
 * @param {*} scene The current scene
 */
function revertAsync(scene) {
    return Promise.all([
        MYANIM.directAnimationReverse(scene, makoto.meshdata.getNode("Bip01_L_UpperArm"), [animGuard_L_upperarm]).waitAsync(),
        MYANIM.directAnimationReverse(scene, makoto.meshdata.getNode("Bip01_L_Forearm"), [animGuard_L_forearm]).waitAsync(),
        MYANIM.directAnimationReverse(scene, makoto.meshdata.getNode("Bip01_L_Hand"), [animGuard_L_hand]).waitAsync(),
        MYANIM.directAnimationReverse(scene, makoto.meshdata.getNode("Bip01_R_Clavicle"), [animGuard_R_clavicle]).waitAsync(),
        MYANIM.directAnimationReverse(scene, makoto.meshdata.getNode("Bip01_R_UpperArm"), [animGuard_R_upperarm]).waitAsync(),
        MYANIM.directAnimationReverse(scene, makoto.meshdata.getNode("Bip01_R_Forearm"), [animGuard_R_forearm]).waitAsync(),
        MYANIM.directAnimationReverse(scene, makoto.meshdata.getNode("weapon"), [animGuard_weapon]).waitAsync(),
    ])
}

/**
 * The exported object.
 */
const charge = {
    perform,
    animations: {
        animGuard_L_upperarm,
        animGuard_L_forearm,
        animGuard_L_hand,
        animGuard_R_clavicle,
        animGuard_R_upperarm,
        animGuard_R_forearm,
        animGuard_weapon,
    },
    revertAsync,
};

export default charge;