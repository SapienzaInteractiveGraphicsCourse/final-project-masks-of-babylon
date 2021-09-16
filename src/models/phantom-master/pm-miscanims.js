/**
 * Name stands for "Miscellaneous Animations".
 * File contains all animations of the Phantom Master not related to its actions,
 * because they are pretty long.
 * EXPORTS an objects with the functions to trigger those animations.
 */

import * as MYANIM from "../../utils/animation.js"
import { RotationFromDegrees } from "../../utils/angles.js";

/**
 * "Base" position of the character
 */
var idlePosition = new BABYLON.Vector3(1, 0, 0);



/**
 * Idle animation: a neutral stance with a light animation for when the character is doing nothing else.
 */

const _animIdle_frames = [0, 25, 50];
const idleEase = new BABYLON.SineEase();
idleEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

const _animIdle_L_mantfront_bab = new BABYLON.Animation("animIdle_L_mantfront", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animIdle_L_mantfront_bab.setEasingFunction(idleEase);
const _animIdle_L_mantfront_keys = [
    {
        frame:_animIdle_frames[0],
        value:RotationFromDegrees(0, 0, -23.7)
    }, {
        frame:_animIdle_frames[1],
        value:RotationFromDegrees(0, 0, -20.9)
    }, {
        frame:_animIdle_frames[2],
        value:RotationFromDegrees(0, 0, -23.7)
    }
];
const animIdle_L_mantfront = new MYANIM.Animation(_animIdle_L_mantfront_bab, _animIdle_L_mantfront_keys);

const _animIdle_L_mantsideback_bab = new BABYLON.Animation("animIdle_L_mantsideback", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animIdle_L_mantsideback_bab.setEasingFunction(idleEase);
const _animIdle_L_mantsideback_keys = [
    {
        frame:_animIdle_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animIdle_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(4.08, 0.535, 1.74))
    }, {
        frame:_animIdle_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animIdle_L_mantsideback = new MYANIM.Animation(_animIdle_L_mantsideback_bab, _animIdle_L_mantsideback_keys);

const _animIdle_mantback_bab = new BABYLON.Animation("animIdle_mantback", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animIdle_mantback_bab.setEasingFunction(idleEase);
const _animIdle_mantback_keys = [
    {
        frame:_animIdle_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animIdle_frames[1],
        value:RotationFromDegrees(7.45, 0, 0)
    }, {
        frame:_animIdle_frames[2],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animIdle_mantback = new MYANIM.Animation(_animIdle_mantback_bab, _animIdle_mantback_keys);

const _animIdle_R_mantsideback_bab = new BABYLON.Animation("animIdle_R_mantsideback", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animIdle_R_mantsideback_bab.setEasingFunction(idleEase);
const _animIdle_R_mantsideback_keys = [
    {
        frame:_animIdle_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animIdle_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(4.08, -0.535, -1.74))
    }, {
        frame:_animIdle_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animIdle_R_mantsideback = new MYANIM.Animation(_animIdle_R_mantsideback_bab, _animIdle_R_mantsideback_keys);

const _animIdle_R_mantfront_bab = new BABYLON.Animation("animIdle_R_mantfront", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animIdle_R_mantfront_bab.setEasingFunction(idleEase);
const _animIdle_R_mantfront_keys = [
    {
        frame:_animIdle_frames[0],
        value:RotationFromDegrees(0, 0, 23.7)
    }, {
        frame:_animIdle_frames[1],
        value:RotationFromDegrees(0, 0, 20.9)
    }, {
        frame:_animIdle_frames[2],
        value:RotationFromDegrees(0, 0, 23.7)
    }
];
const animIdle_R_mantfront = new MYANIM.Animation(_animIdle_R_mantfront_bab, _animIdle_R_mantfront_keys);

/**
 * The Animatable for any animation in the idle loop, so we can listen for its loop event
 * We don't care which one exactly, as they are all synchronized anyway.
 */
var idleAnimatable_L_mantfront;

function idle(meshdata, scene) {
    idleAnimatable_L_mantfront = MYANIM.directAnimationLoop(scene, meshdata.getNode("b_l_mantFRONT_00"), [animIdle_L_mantfront]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("b_l_mantSIDEBACK_00"), [animIdle_L_mantsideback]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("b_mantBACK_00"), [animIdle_mantback]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("b_r_mantSIDEBACK_00"), [animIdle_R_mantsideback]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("b_r_mantFRONT_00"), [animIdle_R_mantfront]);
}

/**
 * Returns a Promise that resolves the next time that the idle animation ends a loop.
 * It allows us to have all action animations start from the same pose
 * without having an abrupt, transitionless reset every time,
 * at the cost of potentially waiting less than 2 seconds at most between
 * enemy turn beginning and action execution.
 */
function endIdleGracefully() {
    return new Promise((resolve, reject) => {
        idleAnimatable_L_mantfront.onAnimationLoopObservable.addOnce(()=>{resolve()});
    });
}





/*
 * Flinch animation: the character recoils when it takes a hit
 */
const flinchDisp = new BABYLON.Vector3(0.0625,0,-0.0625);

const _animFlinch_meshPos_bab = new BABYLON.Animation("animFlinch_meshPos", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
const _animFlinch_meshPos_keys = [
    {
        frame:0,
        value:idlePosition
    }, {
        frame:1,
        value:idlePosition.add(flinchDisp)
    }, {
        frame:3,
        value:idlePosition.subtract(flinchDisp)
    }, {
        frame:5,
        value:idlePosition.add(flinchDisp)
    }, {
        frame:7,
        value:idlePosition.subtract(flinchDisp)
    }, {
        frame:9,
        value:idlePosition.add(flinchDisp)
    }, {
        frame:11,
        value:idlePosition.subtract(flinchDisp)
    }, {
        frame:13,
        value:idlePosition.add(flinchDisp)
    }, {
        frame:15,
        value:idlePosition.subtract(flinchDisp)
    }, {
        frame:16,
        value:idlePosition
    }
];
const animFlinch_meshPos = new MYANIM.Animation(_animFlinch_meshPos_bab, _animFlinch_meshPos_keys);

const _animFlinch_frames = [0, 5, 44];
const flinchEase = new BABYLON.BackEase(0.3);
flinchEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

const _animFlinch_spine2_bab = new BABYLON.Animation("animFlinch_spine2", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_spine2_bab.setEasingFunction(flinchEase);
const _animFlinch_spine2_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-14.9, 2.42, 1.77))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animFlinch_spine2 = new MYANIM.Animation(_animFlinch_spine2_bab, _animFlinch_spine2_keys);

const _animFlinch_spine3_bab = new BABYLON.Animation("animFlinch_spine3", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_spine3_bab.setEasingFunction(flinchEase);
const _animFlinch_spine3_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-10.7, 35, -13.9))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animFlinch_spine3 = new MYANIM.Animation(_animFlinch_spine3_bab, _animFlinch_spine3_keys);

const _animFlinch_L_upperarm_bab = new BABYLON.Animation("animFlinch_L_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_L_upperarm_bab.setEasingFunction(flinchEase);
const _animFlinch_L_upperarm_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -30))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-6.48, -18.4, -9.63))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -30))
    }
];
const animFlinch_L_upperarm = new MYANIM.Animation(_animFlinch_L_upperarm_bab, _animFlinch_L_upperarm_keys);

const _animFlinch_R_upperarm_bab = new BABYLON.Animation("animFlinch_R_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_R_upperarm_bab.setEasingFunction(flinchEase);
const _animFlinch_R_upperarm_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 30))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-6.48, 18.4, 9.63))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 30))
    }
];
const animFlinch_R_upperarm = new MYANIM.Animation(_animFlinch_R_upperarm_bab, _animFlinch_R_upperarm_keys);

const _animFlinch_L_mantfront_bab = new BABYLON.Animation("animFlinch_L_mantfront", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_L_mantfront_bab.setEasingFunction(flinchEase);
const _animFlinch_L_mantfront_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -23.7))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-41.3, 114, -70.5))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -23.7))
    }
];
const animFlinch_L_mantfront = new MYANIM.Animation(_animFlinch_L_mantfront_bab, _animFlinch_L_mantfront_keys);

const _animFlinch_R_mantfront_bab = new BABYLON.Animation("animFlinch_R_mantfront", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_R_mantfront_bab.setEasingFunction(flinchEase);
const _animFlinch_R_mantfront_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 23.7))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-39.3, -89.6, 62.2))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 23.7))
    }
];
const animFlinch_R_mantfront = new MYANIM.Animation(_animFlinch_R_mantfront_bab, _animFlinch_R_mantfront_keys);

// the animation is triggered by this function
function flinch(meshdata, scene, onAnimationEnd) {
    meshdata.stopAllAnimations(scene);
    MYANIM.directAnimation(scene, meshdata.mesh, [animFlinch_meshPos]);
    MYANIM.directAnimation(scene, meshdata.getBone("Bip01_Spine2"), [animFlinch_spine2], onAnimationEnd);
    MYANIM.directAnimation(scene, meshdata.getBone("Bip01_Spine3"), [animFlinch_spine3]);
    MYANIM.directAnimation(scene, meshdata.getBone("Bip01_L_UpperArm"), [animFlinch_L_upperarm]);
    MYANIM.directAnimation(scene, meshdata.getBone("Bip01_R_UpperArm"), [animFlinch_R_upperarm]);
    MYANIM.directAnimation(scene, meshdata.getBone("b_l_mantFRONT_00"), [animFlinch_L_mantfront]);
    MYANIM.directAnimation(scene, meshdata.getBone("b_r_mantFRONT_00"), [animFlinch_R_mantfront]);
    // reset cape nodes (less noticeable because of the vibration, which is good because we can't wait for endIdleGracefully in this case)
    meshdata.getNode("b_l_mantFRONT_00").rotation = RotationFromDegrees(0, 0, -23.7);
    meshdata.getNode("b_l_mantSIDEBACK_00").rotation = RotationFromDegrees(0, 0, 0);
    meshdata.getNode("b_mantBACK_00").rotation = RotationFromDegrees(0, 0, 0);
    meshdata.getNode("b_r_mantSIDEBACK_00").rotation = RotationFromDegrees(0, 0, 0);
    meshdata.getNode("b_r_mantFRONT_00").rotation = RotationFromDegrees(0, 0, 23.7);
}






/**
 * Death animation: the character falls to the ground senseless, defeated
 */
const _animDeath_frames = [
    0,
    // recoil
    30,
    // hands to chest
    60,
    // fall down, part 1
    90,
    // fall down, part 2
    120,
    // body fallen, cape finishes falling
    150,
];
const deathEase = new BABYLON.SineEase();
deathEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

const _animDeath_root_bab = new BABYLON.Animation("animDeath_root", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_root_bab.setEasingFunction(deathEase);
// NEEDS to be quat b/c gimbal lock
const _animDeath_root_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-90-0, 0, 0))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-90-77.1, 0, 0))
    }, {
        frame:_animDeath_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-90-77.1, 0, 0))
    }
];
const animDeath_root = new MYANIM.Animation(_animDeath_root_bab, _animDeath_root_keys);

const _animDeath_spine2_bab = new BABYLON.Animation("animDeath_spine2", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_spine2_bab.setEasingFunction(deathEase);
const _animDeath_spine2_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-15.4, 0.458, -2.07))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(14.1, 0.0654, 1.84))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-18, 0.0667, 1.8))
    }, {
        frame:_animDeath_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-18, 0.0667, 1.8))
    }
];
const animDeath_spine2 = new MYANIM.Animation(_animDeath_spine2_bab, _animDeath_spine2_keys);

const _animDeath_spine3_bab = new BABYLON.Animation("animDeath_spine3", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_spine3_bab.setEasingFunction(deathEase);
const _animDeath_spine3_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(3.36, -0.0258, 0.434))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(10.3, 0.00191, 1.33))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(5.84, 0.142, 1.32))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(4.85, 0.173, 1.32))
    }, {
        frame:_animDeath_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(4.85, 0.173, 1.32))
    }
];
const animDeath_spine3 = new MYANIM.Animation(_animDeath_spine3_bab, _animDeath_spine3_keys);

const _animDeath_L_upperarm_bab = new BABYLON.Animation("animDeath_L_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_L_upperarm_bab.setEasingFunction(deathEase);
const _animDeath_L_upperarm_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -30))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -30))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-10.2, 1.34, -34.4))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(21.7, -69.8, -28.5))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(14.8, -79.5, -37.3))
    }, {
        frame:_animDeath_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(14.8, -79.5, -37.3))
    }
];
const animDeath_L_upperarm = new MYANIM.Animation(_animDeath_L_upperarm_bab, _animDeath_L_upperarm_keys);

const _animDeath_L_forearm_bab = new BABYLON.Animation("animDeath_L_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_L_forearm_bab.setEasingFunction(deathEase);
const _animDeath_L_forearm_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-64.4, -210, 117))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-58.8, 71.8, -36.5))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-43.5, 122, -47.5))
    }, {
        frame:_animDeath_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-43.5, 122, -47.5))
    }
];
const animDeath_L_forearm = new MYANIM.Animation(_animDeath_L_forearm_bab, _animDeath_L_forearm_keys);

// choose intermediate keyframes to let the arm stay stretched out longer
// as the boss dramatically laments its demise.
// it's for only 2 nodes out of ~15,
// so we'll find some intermediate frames algorithmically
// rather than bothering the array
const _animDeath_R_upperarm_bab = new BABYLON.Animation("animDeath_R_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_R_upperarm_bab.setEasingFunction(deathEase);
const _animDeath_R_upperarm_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 30))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 30))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-10.2, -1.34, 34.4))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-58.9, -8.76, 41.7))
    }, {
        frame:_animDeath_frames[4] - (_animDeath_frames[4]-_animDeath_frames[3])*0.17,
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-58.9, -8.76, 41.7))
    }, {
        frame:_animDeath_frames[4] + (_animDeath_frames[4]-_animDeath_frames[3])*0.5,
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-4, -0.661, 14.8))
    }, {
        frame:_animDeath_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-4, -0.661, 14.8))
    }
];
const animDeath_R_upperarm = new MYANIM.Animation(_animDeath_R_upperarm_bab, _animDeath_R_upperarm_keys);

// choose intermediate keyframes to let the arm stay stretched out longer
// as the boss dramatically laments its demise.
// it's for only 2 nodes out of ~15,
// so we'll find some intermediate frames algorithmically
// rather than bothering the array
const _animDeath_R_forearm_bab = new BABYLON.Animation("animDeath_R_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_R_forearm_bab.setEasingFunction(deathEase);
const _animDeath_R_forearm_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-64.4, 210, -117))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(7.33, 59, 9.72))
    }, {
        frame:_animDeath_frames[4] - (_animDeath_frames[4]-_animDeath_frames[3])*0.17,
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(7.33, 59, 9.72))
    }, {
        frame:_animDeath_frames[4] + (_animDeath_frames[4]-_animDeath_frames[3])*0.5,
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-76.4, 233, -124))
    }, {
        frame:_animDeath_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-76.4, 233, -124))
    }
];
const animDeath_R_forearm = new MYANIM.Animation(_animDeath_R_forearm_bab, _animDeath_R_forearm_keys);

const _animDeath_head_bab = new BABYLON.Animation("animDeath_head", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_head_bab.setEasingFunction(deathEase);
const _animDeath_head_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(2.1, 19.6, 6.63))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(2.33, 20.5, -0.112))
    }, {
        frame:_animDeath_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0.237, 32.8, 5.31))
    }
];
const animDeath_head = new MYANIM.Animation(_animDeath_head_bab, _animDeath_head_keys);

const _animDeath_hood_bab = new BABYLON.Animation("animDeath_hood", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_hood_bab.setEasingFunction(deathEase);
const _animDeath_hood_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(3.58, -0.194, 0.0183))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-34.6, 32.2, 0.967))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-28.1, 24.4, 15.1))
    }, {
        frame:_animDeath_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-43.3, 24.9, 16.5))
    }
];
const animDeath_hood = new MYANIM.Animation(_animDeath_hood_bab, _animDeath_hood_keys);

const _animDeath_L_mantfront_lv1_bab = new BABYLON.Animation("animDeath_L_mantfront_lv1", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_L_mantfront_lv1_bab.setEasingFunction(deathEase);
const _animDeath_L_mantfront_lv1_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -23.7))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0.406, 21.1, 23.1))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0.406, 21.1, 23.1))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-62.2, 117, -93))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-63.9, 136, -108))
    }, {
        frame:_animDeath_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-57.5, 232, -180))
    }
];
const animDeath_L_mantfront_lv1 = new MYANIM.Animation(_animDeath_L_mantfront_lv1_bab, _animDeath_L_mantfront_lv1_keys);

const _animDeath_L_mantfront_lv2_bab = new BABYLON.Animation("animDeath_L_mantfront_lv2", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_L_mantfront_lv2_bab.setEasingFunction(deathEase);
const _animDeath_L_mantfront_lv2_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-1.64, -4.84, 4.64))
    }
];
const animDeath_L_mantfront_lv2 = new MYANIM.Animation(_animDeath_L_mantfront_lv2_bab, _animDeath_L_mantfront_lv2_keys);

const _animDeath_R_mantfront_bab = new BABYLON.Animation("animDeath_R_mantfront", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_R_mantfront_bab.setEasingFunction(deathEase);
const _animDeath_R_mantfront_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 23.7))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0.406, -21.1, -23.1))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0.406, -9.4, -23.1))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-51.9, -101, 95))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-49.2, -133, 121))
    }, {
        frame:_animDeath_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-35.7, -190, 135))
    }
];
const animDeath_R_mantfront = new MYANIM.Animation(_animDeath_R_mantfront_bab, _animDeath_R_mantfront_keys);

const _animDeath_L_mantsideback_bab = new BABYLON.Animation("animDeath_L_mantsideback", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_L_mantsideback_bab.setEasingFunction(deathEase);
const _animDeath_L_mantsideback_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-14.8, -3.45, 14.5))
    }
];
const animDeath_L_mantsideback = new MYANIM.Animation(_animDeath_L_mantsideback_bab, _animDeath_L_mantsideback_keys);

const _animDeath_R_mantsideback_bab = new BABYLON.Animation("animDeath_R_mantsideback", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_R_mantsideback_bab.setEasingFunction(deathEase);
const _animDeath_R_mantsideback_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-16.2, 5.94, -15.6))
    }
];
const animDeath_R_mantsideback = new MYANIM.Animation(_animDeath_R_mantsideback_bab, _animDeath_R_mantsideback_keys);

const _animDeath_mantback_bab = new BABYLON.Animation("animDeath_mantback", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_mantback_bab.setEasingFunction(deathEase);
const _animDeath_mantback_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-8.68, 0.481, -0.0959))
    }
];
const animDeath_mantback = new MYANIM.Animation(_animDeath_mantback_bab, _animDeath_mantback_keys);

// the animation is triggered by this function
function death(meshdata, scene, onAnimationEnd) {
    meshdata.stopAllAnimations(scene);
    MYANIM.directAnimation(scene, meshdata.getNode("root"), [animDeath_root], onAnimationEnd);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_Spine2"), [animDeath_spine2]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_Spine3"), [animDeath_spine3]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_UpperArm"), [animDeath_L_upperarm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_Forearm"), [animDeath_L_forearm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_UpperArm"), [animDeath_R_upperarm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_Forearm"), [animDeath_R_forearm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_Head"), [animDeath_head]);
    MYANIM.directAnimation(scene, meshdata.getNode("b_hood_1"), [animDeath_hood]);
    MYANIM.directAnimation(scene, meshdata.getNode("b_l_mantFRONT_00"), [animDeath_L_mantfront_lv1]);
    MYANIM.directAnimation(scene, meshdata.getNode("b_l_mantFRONT_01"), [animDeath_L_mantfront_lv2]);
    MYANIM.directAnimation(scene, meshdata.getNode("b_r_mantFRONT_00"), [animDeath_R_mantfront]);
    MYANIM.directAnimation(scene, meshdata.getNode("b_l_mantSIDEBACK_00"), [animDeath_L_mantsideback]);
    MYANIM.directAnimation(scene, meshdata.getNode("b_r_mantSIDEBACK_00"), [animDeath_R_mantsideback]);
    MYANIM.directAnimation(scene, meshdata.getNode("b_mantBACK_00"), [animDeath_mantback]);
}





/**
 * The exported object.
 */
const miscanims = {
    idle,
    endIdleGracefully,
    flinch,
    death,
};

export default miscanims;