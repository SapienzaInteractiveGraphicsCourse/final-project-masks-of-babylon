/**
 * File for Phantom Master's basic attack.
 * Contains all the related animations and animation events for the Phantom,
 * as well as the instructions to perform it and damage the player.
 * 
 * EXPORTS a JS object containing all the necessary info about it.
 */

import * as MYANIM from "../../utils/animation.js"
import phantomMaster from "./phantom-master.js";
import { RotationFromDegrees } from "../../utils/angles.js";
import {d} from "../../utils/random.js"
import { theOptions } from "../../utils/options.js";

/**************
 * ANIMATIONS *
 **************/

const _animAttack_frames = [
    0,
    // raise hand and cape
    20,
    // attack with the supernaturally long and sharp cape
    30,
    // return to rest
    70
]
const attackEase = new BABYLON.QuadraticEase();
attackEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

const _animAttack_spine2_bab = new BABYLON.Animation("animAttack_spine2", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animAttack_spine2_bab.setEasingFunction(attackEase);
const _animAttack_spine2_keys = [
    {
        frame:_animAttack_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animAttack_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -21.6, 0))
    }, {
        frame:_animAttack_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(20.3, 82.9, 4.55))
    }, {
        frame:_animAttack_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animAttack_spine2 = new MYANIM.Animation(_animAttack_spine2_bab, _animAttack_spine2_keys);

const _animAttack_R_upperarm_bab = new BABYLON.Animation("animAttack_R_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animAttack_R_upperarm_bab.setEasingFunction(attackEase);
const _animAttack_R_upperarm_keys = [
    {
        frame:_animAttack_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 30))
    }, {
        frame:_animAttack_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(5.33, 34.9, -33.5))
    }, {
        frame:_animAttack_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(25.8, 167, 10.2))
    }, {
        frame:_animAttack_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 30))
    }
];
const animAttack_R_upperarm = new MYANIM.Animation(_animAttack_R_upperarm_bab, _animAttack_R_upperarm_keys);

const _animAttack_R_mantfront_rot_bab = new BABYLON.Animation("animAttack_R_mantfront_rot", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animAttack_R_mantfront_rot_bab.setEasingFunction(attackEase);
const _animAttack_R_mantfront_rot_keys = [
    {
        frame:_animAttack_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 23.7))
    }, {
        frame:_animAttack_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-53.6, 8.38, -58))
    }, {
        frame:_animAttack_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-53.6, 8.38, 50.9))
    }, {
        frame:_animAttack_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 23.7))
    }
];
const animAttack_R_mantfront_rot = new MYANIM.Animation(_animAttack_R_mantfront_rot_bab, _animAttack_R_mantfront_rot_keys);

const _animAttack_R_mantfront_scl_bab = new BABYLON.Animation("animAttack_R_mantfront_scl", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animAttack_R_mantfront_scl_bab.setEasingFunction(attackEase);
const _animAttack_R_mantfront_scl_keys = [
    {
        frame:_animAttack_frames[0],
        value:BABYLON.Vector3.One()
    }, {
        frame:_animAttack_frames[1],
        value:BABYLON.Vector3.One().scale(1.308)
    }, {
        frame:_animAttack_frames[2],
        value:BABYLON.Vector3.One().scale(1.615)
    }, {
        frame:_animAttack_frames[3],
        value:BABYLON.Vector3.One()
    }
];
const animAttack_R_mantfront_scl = new MYANIM.Animation(_animAttack_R_mantfront_scl_bab, _animAttack_R_mantfront_scl_keys);

/**
 * Initializes all animation events of this attack
 * for the current scene
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function makeEvents(sceneInfo) {

    const hitEventFrame = 24;   // <- set this to easily change when the event happens

    animAttack_R_upperarm.anim.removeEvents(hitEventFrame);
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
    animAttack_R_upperarm.anim.addEvent(hitEvent);
}



/**
 * Randomly determines the damage dealt by this attack.
 * @returns The rolled damage
 */
function rollDamage() {
    if (theOptions.hardMode) {
        return d(6) + d(6) + 2;
    }
    else {
        return d(4) + d(4) + 2;
    }
}

/**
 * Executes this attack: performs all animations, triggering damage etc.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function perform(sceneInfo) {
    phantomMaster.meshdata.stopAllAnimations(sceneInfo.scene);
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getNode("Bip01_Spine2"), [animAttack_spine2]);
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getNode("Bip01_R_UpperArm"), [animAttack_R_upperarm], ()=>{sceneInfo.turn_system.enemy_done(sceneInfo);});
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getNode("b_r_mantFRONT_00"), [animAttack_R_mantfront_rot, animAttack_R_mantfront_scl]);
}

/**
 * The exported object.
 */
const attack = {
    perform,
    makeEvents,
    animations: {
        animAttack_spine2,
        animAttack_R_upperarm,
        animAttack_R_mantfront_rot,
        animAttack_R_mantfront_scl,
    },
    rollDamage
};

export default attack;