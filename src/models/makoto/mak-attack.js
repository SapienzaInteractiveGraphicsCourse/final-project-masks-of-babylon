/**
 * File for Makoto's basic attack.
 * Contains all the related animations and animation events for Makoto,
 * as well as the instructions to perform it and damage the enemy.
 * 
 * EXPORTS a JS object containing all the necessary info about it.
 */

import * as MYANIM from "../../utils/animation.js"
import makoto from "./makoto.js";
import {d} from "../../utils/random.js"
import {RotationFromDegrees} from "../../utils/angles.js";

/**************
 * ANIMATIONS *
 **************/

const _animSlash_frames = [
    0,
    // go to ready position (14 frames)
    14,
    // begin slashing attack animation (6 frames)
    20,
    // return to rest (12 frames)
    32
];
const slashEase = new BABYLON.QuadraticEase();
slashEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

const _animSlash_spine1_bab = new BABYLON.Animation("animSlash_spine1", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animSlash_spine1_bab.setEasingFunction(slashEase);
const _animSlash_spine1_keys = [
    {
        frame:_animSlash_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animSlash_frames[1],
        value:RotationFromDegrees(0, 21.3, 0)
    }, {
        frame:_animSlash_frames[2],
        value:RotationFromDegrees(0, -22.5, 0)
    }, {
        frame:_animSlash_frames[3],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animSlash_spine1 = new MYANIM.Animation(_animSlash_spine1_bab, _animSlash_spine1_keys);

const _animSlash_neck_bab = new BABYLON.Animation("animSlash_neck", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animSlash_neck_bab.setEasingFunction(slashEase);
const _animSlash_neck_keys = [
    {
        frame:_animSlash_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animSlash_frames[1],
        value:RotationFromDegrees(0, -22.5, 0)
    }, {
        frame:_animSlash_frames[2],
        value:RotationFromDegrees(0, 22.5, 0)
    }, {
        frame:_animSlash_frames[3],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animSlash_neck = new MYANIM.Animation(_animSlash_neck_bab, _animSlash_neck_keys);

const _animSlash_R_clavicle_bab = new BABYLON.Animation("animSlash_R_clavicle", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlash_R_clavicle_bab.setEasingFunction(slashEase);
const _animSlash_R_clavicle_keys = [
    {
        frame:_animSlash_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animSlash_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-7.31, 28, -9.58))
    }, {
        frame:_animSlash_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0.657, -11.6, 3.64))
    }, {
        frame:_animSlash_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animSlash_R_clavicle = new MYANIM.Animation(_animSlash_R_clavicle_bab, _animSlash_R_clavicle_keys);

const _animSlash_R_upperarm_bab = new BABYLON.Animation("animSlash_R_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlash_R_upperarm_bab.setEasingFunction(slashEase);
const _animSlash_R_upperarm_keys = [
    {
        frame:_animSlash_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -20.3, 0))
    }, {
        frame:_animSlash_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-19, 82, -33.9))
    }, {
        frame:_animSlash_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(17.7, -3.03, 19.8))
    }, {
        frame:_animSlash_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -20.3, 0))
    }
];
const animSlash_R_upperarm = new MYANIM.Animation(_animSlash_R_upperarm_bab, _animSlash_R_upperarm_keys);

const _animSlash_R_forearm_bab = new BABYLON.Animation("animSlash_R_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlash_R_forearm_bab.setEasingFunction(slashEase);
const _animSlash_R_forearm_keys = [
    {
        frame:_animSlash_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 41.6, 0))
    }, {
        frame:_animSlash_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-26.7, 40.7, -27.6))
    }, {
        frame:_animSlash_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-3.68, 5.49, -3.81))
    }, {
        frame:_animSlash_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 41.6, 0))
    }
];
const animSlash_R_forearm = new MYANIM.Animation(_animSlash_R_forearm_bab, _animSlash_R_forearm_keys);







/**
 * Initializes all animation events of this attack
 * for the current scene
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function makeEvents(sceneInfo) {

    const attackEventFrame = 17;   // <- set this to easily change when the event happens

    animSlash_R_upperarm.anim.removeEvents(attackEventFrame);
    const attackEvent = new BABYLON.AnimationEvent(
        attackEventFrame,
        function() {
            let dmg = rollDamage();
            sceneInfo.enemy.hp -= dmg;
            sceneInfo.ui.showDamage(dmg, sceneInfo.enemy);
            sceneInfo.enemy.flinch(sceneInfo, ()=>{sceneInfo.turn_system.enemy_done(sceneInfo);});
        },
        true
    );
    animSlash_R_upperarm.anim.addEvent(attackEvent);
}



/**
 * Randomly determines the damage dealt by this attack.
 * @returns The rolled damage
 */
 function rollDamage() {
    return d(6) + 1;
}

/**
 * Executes this attack: performs all animations, triggering damage etc.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function perform(sceneInfo) {
    makoto.meshdata.stopAllAnimations(sceneInfo.scene);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("Bip01_Spine1"), [animSlash_spine1]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("Bip01_Neck"), [animSlash_neck]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("Bip01_R_Clavicle"), [animSlash_R_clavicle]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("Bip01_R_UpperArm"), [animSlash_R_upperarm], ()=>{sceneInfo.turn_system.player_done(sceneInfo);});
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("Bip01_R_Forearm"), [animSlash_R_forearm]);
}

/**
 * The exported object.
 */
const attack = {
    perform,
    makeEvents,
    animations: {
        animSlash_spine1,
        animSlash_neck,
        animSlash_R_clavicle,
        animSlash_R_upperarm,
        animSlash_R_forearm,
    },
    rollDamage
};

export default attack;