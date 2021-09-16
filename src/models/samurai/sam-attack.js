/**
 * File for the Samurai's basic attack.
 * Contains all the related animations and animation events for the Samurai,
 * as well as the instructions to perform it and damage the player.
 * 
 * EXPORTS a JS object containing all the necessary info about it.
 */

import * as MYANIM from "../../utils/animation.js"
import samurai from "./samurai.js";
import { RotationFromDegrees } from "../../utils/angles.js";
import {d} from "../../utils/random.js"
import { theOptions } from "../../utils/options.js";

/**************
 * ANIMATIONS *
 **************/

const _animSlash_frames = [
    0,
    // go to ready position
    14,
    // begin slashing attack animation
    27,
    // return to rest
    49
]
const slashEase = new BABYLON.QuadraticEase();
slashEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

const _animSlash_spine_bab = new BABYLON.Animation("animSlash_spine", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlash_spine_bab.setEasingFunction(slashEase);
const _animSlash_spine_keys = [
    {
        frame:_animSlash_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animSlash_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-10.2, -14.2, 5.5))
    }, {
        frame:_animSlash_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(23.3, 24.9, -0.716))
    }, {
        frame:_animSlash_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animSlash_spine = new MYANIM.Animation(_animSlash_spine_bab, _animSlash_spine_keys);

const _animSlash_L_upperarm_bab = new BABYLON.Animation("animSlash_L_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlash_L_upperarm_bab.setEasingFunction(slashEase);
const _animSlash_L_upperarm_keys = [
    {
        frame:_animSlash_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-71.8, 35.6, 0))
    }, {
        frame:_animSlash_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(7.94, 33.8, 18.2))
    }, {
        frame:_animSlash_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-32.3, 36.3, -2.46))
    }, {
        frame:_animSlash_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-71.8, 35.6, 0))
    }
];
const animSlash_L_upperarm = new MYANIM.Animation(_animSlash_L_upperarm_bab, _animSlash_L_upperarm_keys);

const _animSlash_L_forearm_bab = new BABYLON.Animation("animSlash_L_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlash_L_forearm_bab.setEasingFunction(slashEase);
const _animSlash_L_forearm_keys = [
    {
        frame:_animSlash_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-0.0076, -0.535, -91.6))
    }, {
        frame:_animSlash_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-1.71, -1.68, -13.8))
    }, {
        frame:_animSlash_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-18.5, -21, -31.1))
    }, {
        frame:_animSlash_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-0.0076, -0.535, -91.6))
    }
];
const animSlash_L_forearm = new MYANIM.Animation(_animSlash_L_forearm_bab, _animSlash_L_forearm_keys);

const _animSlash_R_upperarm_bab = new BABYLON.Animation("animSlash_R_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlash_R_upperarm_bab.setEasingFunction(slashEase);
const _animSlash_R_upperarm_keys = [
    {
        frame:_animSlash_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-90, 0, 37.8))
    }, {
        frame:_animSlash_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-117, -177, 143))
    }, {
        frame:_animSlash_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-127, -87.5, 134))
    }, {
        frame:_animSlash_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-90, 0, 37.8))
    }
];
const animSlash_R_upperarm = new MYANIM.Animation(_animSlash_R_upperarm_bab, _animSlash_R_upperarm_keys);

const _animSlash_R_forearm_bab = new BABYLON.Animation("animSlash_R_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlash_R_forearm_bab.setEasingFunction(slashEase);
const _animSlash_R_forearm_keys = [
    {
        frame:_animSlash_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 50.2))
    }, {
        frame:_animSlash_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-28.2, -33.1, 9.39))
    }, {
        frame:_animSlash_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(3, -18.6, 44.2))
    }, {
        frame:_animSlash_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 50.2))
    }
];
const animSlash_R_forearm = new MYANIM.Animation(_animSlash_R_forearm_bab, _animSlash_R_forearm_keys);

const _animSlash_R_hand_bab = new BABYLON.Animation("animSlash_R_hand", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlash_R_hand_bab.setEasingFunction(slashEase);
const _animSlash_R_hand_keys = [
    {
        frame:_animSlash_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -31.7))
    }, {
        frame:_animSlash_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-24.3, -26.5, -17.2))
    }, {
        frame:_animSlash_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(56, -45.5, 41.8))
    }, {
        frame:_animSlash_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -31.7))
    }
];
const animSlash_R_hand = new MYANIM.Animation(_animSlash_R_hand_bab, _animSlash_R_hand_keys);

/**
 * Initializes all animation events of this attack
 * for the current scene
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function makeEvents(sceneInfo) {

    const hitEventFrame = 23;   // <- set this to easily change when the event happens

    animSlash_R_upperarm.anim.removeEvents(hitEventFrame);
    const hitEvent = new BABYLON.AnimationEvent(
        hitEventFrame,
        function() {
            let damage = rollDamage();
            if (sceneInfo.player.guarding) {
                damage = Math.floor(damage/2);
            }
            sceneInfo.player.hp -= damage;
            sceneInfo.ui.showDamage(damage, sceneInfo.player);
            sceneInfo.player.flinch(sceneInfo, ()=>{sceneInfo.turn_system.player_done(sceneInfo);});
        },
        true
    );
    animSlash_R_upperarm.anim.addEvent(hitEvent);
}



/**
 * Randomly determines the damage dealt by this attack.
 * @returns The rolled damage
 */
function rollDamage() {
    if (theOptions.hardMode) {
        return d(4) + d(4) + 3;
    }
    else {
        return d(4) + d(4);
    }
}

/**
 * Executes this attack: performs all animations, triggering damage etc.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function perform(sceneInfo) {
    samurai.meshdata.stopAllAnimations(sceneInfo.scene);
    MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getNode("Bip01_Spine"), [animSlash_spine]);
    MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getNode("Bip01_L_UpperArm"), [animSlash_L_upperarm]);
    MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getNode("Bip01_L_Forearm"), [animSlash_L_forearm]);
    MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getNode("Bip01_R_UpperArm"), [animSlash_R_upperarm], ()=>{sceneInfo.turn_system.enemy_done(sceneInfo)});
    MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getNode("Bip01_R_Forearm"), [animSlash_R_forearm]);
    MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getNode("Bip01_R_Hand"), [animSlash_R_hand]);
}

/**
 * The exported object.
 */
const attack = {
    perform,
    makeEvents,
    animations: {
        animSlash_spine,
        animSlash_L_upperarm,
        animSlash_L_forearm,
        animSlash_R_upperarm,
        animSlash_R_forearm,
        animSlash_R_hand,
    },
    rollDamage
};

export default attack;