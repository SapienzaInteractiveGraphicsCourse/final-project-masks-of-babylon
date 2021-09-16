/**
 * Name stands for "Miscellaneous Animations".
 * File contains all animations of the Samurai not related to its actions,
 * because they are pretty long.
 * EXPORTS an objects with the functions to trigger those animations.
 */

import * as MYANIM from "../../utils/animation.js"
import { RotationFromDegrees } from "../../utils/angles.js";

/**
 * "Base" position of the character
 */
var idlePosition = new BABYLON.Vector3(1, -0.09, 0);



/**
 * Idle animation: a neutral stance with a light animation for when the character is doing nothing else.
 */

const _animIdle_frames = [0, 25, 50];
const idleEase_legs = new BABYLON.PowerEase(1.3);   // same rationale as Makoto's idle, see mak-miscanims.js
idleEase_legs.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
const idleEase_mant = new BABYLON.SineEase();
idleEase_mant.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

const _animIdle_meshY_bab = new BABYLON.Animation("animIdle_meshY", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
_animIdle_meshY_bab.setEasingFunction(idleEase_legs);
const _animIdle_meshY_keys = [
    {
        frame:_animIdle_frames[0],
        value:idlePosition.y
    }, {
        frame:_animIdle_frames[1],
        value:-0.13
    }, {
        frame:_animIdle_frames[2],
        value:idlePosition.y
    }
];
const animIdle_meshY = new MYANIM.Animation(_animIdle_meshY_bab, _animIdle_meshY_keys);

const _animIdle_L_thigh_bab = new BABYLON.Animation("animIdle_L_thigh", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animIdle_L_thigh_bab.setEasingFunction(idleEase_legs);
const _animIdle_L_thigh_keys = [
    {
        frame:_animIdle_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-29.9, 26.9, 25.6))
    }, {
        frame:_animIdle_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-33.7, 20, 37.9))
    }, {
        frame:_animIdle_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-29.9, 26.9, 25.6))
    }
];
const animIdle_L_thigh = new MYANIM.Animation(_animIdle_L_thigh_bab, _animIdle_L_thigh_keys);

const _animIdle_L_calf_bab = new BABYLON.Animation("animIdle_L_calf", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animIdle_L_calf_bab.setEasingFunction(idleEase_legs);
const _animIdle_L_calf_keys = [
    {
        frame:_animIdle_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(39.1, 33.3, 5.32))
    }, {
        frame:_animIdle_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(51.3, 29.6, -2.69))
    }, {
        frame:_animIdle_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(39.1, 33.3, 5.32))
    }
];
const animIdle_L_calf = new MYANIM.Animation(_animIdle_L_calf_bab, _animIdle_L_calf_keys);

const _animIdle_R_thigh_bab = new BABYLON.Animation("animIdle_R_thigh", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animIdle_R_thigh_bab.setEasingFunction(idleEase_legs);
const _animIdle_R_thigh_keys = [
    {
        frame:_animIdle_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-35.8, 30.9, -15.3))
    }, {
        frame:_animIdle_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-44.8, 37.9, -25))
    }, {
        frame:_animIdle_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-35.8, 30.9, -15.3))
    }
];
const animIdle_R_thigh = new MYANIM.Animation(_animIdle_R_thigh_bab, _animIdle_R_thigh_keys);

const _animIdle_R_calf_bab = new BABYLON.Animation("animIdle_R_calf", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animIdle_R_calf_bab.setEasingFunction(idleEase_legs);
const _animIdle_R_calf_keys = [
    {
        frame:_animIdle_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(38.3, -23.7, -7.63))
    }, {
        frame:_animIdle_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(53.9, -24.8, -7.73))
    }, {
        frame:_animIdle_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(38.3, -23.7, -7.63))
    }
];
const animIdle_R_calf = new MYANIM.Animation(_animIdle_R_calf_bab, _animIdle_R_calf_keys);

const _animIdle_F_armor_bab = new BABYLON.Animation("animIdle_F_armor", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animIdle_F_armor_bab.setEasingFunction(idleEase_legs);
const _animIdle_F_armor_keys = [
    {
        frame:_animIdle_frames[0],
        value:RotationFromDegrees(-12.9, 0, 0)
    }, {
        frame:_animIdle_frames[1],
        value:RotationFromDegrees(-23.2, 0, 0)
    }, {
        frame:_animIdle_frames[2],
        value:RotationFromDegrees(-12.9, 0, 0)
    }
];
const animIdle_F_armor = new MYANIM.Animation(_animIdle_F_armor_bab, _animIdle_F_armor_keys);

const _animIdle_L_armor_bab = new BABYLON.Animation("animIdle_L_armor", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animIdle_L_armor_bab.setEasingFunction(idleEase_legs);
const _animIdle_L_armor_keys = [
    {
        frame:_animIdle_frames[0],
        value:RotationFromDegrees(0, 0, 18.2)
    }, {
        frame:_animIdle_frames[1],
        value:RotationFromDegrees(0, 0, 26.2)
    }, {
        frame:_animIdle_frames[2],
        value:RotationFromDegrees(0, 0, 18.2)
    }
];
const animIdle_L_armor = new MYANIM.Animation(_animIdle_L_armor_bab, _animIdle_L_armor_keys);

// same for both cape sides
const _animIdle_LR_mant_bab = new BABYLON.Animation("animIdle_LR_mant", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animIdle_LR_mant_bab.setEasingFunction(idleEase_mant);
const _animIdle_LR_mant_keys = [
    {
        frame:_animIdle_frames[0],
        value:RotationFromDegrees(10, 0, 0)
    }, {
        frame:_animIdle_frames[1],
        value:RotationFromDegrees(22, 0, 0)
    }, {
        frame:_animIdle_frames[2],
        value:RotationFromDegrees(10, 0, 0)
    }
];
const animIdle_LR_mant = new MYANIM.Animation(_animIdle_LR_mant_bab, _animIdle_LR_mant_keys);

const _animIdle_F_mant_bab = new BABYLON.Animation("animIdle_F_mant", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animIdle_F_mant_bab.setEasingFunction(idleEase_mant);
const _animIdle_F_mant_keys = [
    {
        frame:_animIdle_frames[0],
        value:RotationFromDegrees(7, 0, 0)
    }, {
        frame:_animIdle_frames[1],
        value:RotationFromDegrees(25, 0, 0)
    }, {
        frame:_animIdle_frames[2],
        value:RotationFromDegrees(7, 0, 0)
    }
];
const animIdle_F_mant = new MYANIM.Animation(_animIdle_F_mant_bab, _animIdle_F_mant_keys);


/**
 * The Animatable for any animation in the idle loop, so we can listen for its loop event
 * We don't care which one exactly, as they are all synchronized anyway.
 */
var idleAnimatable_meshY;

function idle(meshdata, scene) {
    idleAnimatable_meshY = MYANIM.directAnimationLoop(scene, meshdata.mesh, [animIdle_meshY]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Bip01_L_Thigh"), [animIdle_L_thigh]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Bip01_L_Calf"), [animIdle_L_calf]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Bip01_R_Thigh"), [animIdle_R_thigh]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Bip01_R_Calf"), [animIdle_R_calf]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("b_L_maekake_01"), [animIdle_L_armor]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("b_F_maekake_01"), [animIdle_F_armor]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("b_L_mant_01"), [animIdle_LR_mant]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("b_F_mant_01"), [animIdle_F_mant]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("b_R_mant_01"), [animIdle_LR_mant]);
}

/**
 * Alternative function to trigger the idle animation which allows to
 * explicitly select the keyframes of the Y position.
 * Useful in the dungeon.
 */
function idle_customY(meshdata, yHigh, yLow, scene) {
    const _new_y_anim_bab = new BABYLON.Animation("new_y_anim", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
    _new_y_anim_bab.setEasingFunction(idleEase_legs);
    const _new_y_anim_keys = [
        {
            frame:_animIdle_frames[0],
            value:yHigh
        }, {
            frame:_animIdle_frames[1],
            value:yLow
        }, {
            frame:_animIdle_frames[2],
            value:yHigh
        }
    ];
    const new_y_anim = new MYANIM.Animation(_new_y_anim_bab, _new_y_anim_keys);

    idleAnimatable_meshY = MYANIM.directAnimationLoop(scene, meshdata.mesh, [new_y_anim]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Bip01_L_Thigh"), [animIdle_L_thigh]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Bip01_L_Calf"), [animIdle_L_calf]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Bip01_R_Thigh"), [animIdle_R_thigh]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Bip01_R_Calf"), [animIdle_R_calf]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("b_L_maekake_01"), [animIdle_L_armor]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("b_F_maekake_01"), [animIdle_F_armor]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("b_L_mant_01"), [animIdle_LR_mant]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("b_F_mant_01"), [animIdle_F_mant]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("b_R_mant_01"), [animIdle_LR_mant]);
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
        idleAnimatable_meshY.onAnimationLoopObservable.addOnce(()=>{resolve()});
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

const _animFlinch_frames = [0, 3, 36];
const flinchEase_back = new BABYLON.BackEase(0.6);
flinchEase_back.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
const flinchEase_noback = new BABYLON.CubicEase();
flinchEase_noback.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

const _animFlinch_spine_bab = new BABYLON.Animation("animFlinch_spine", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_spine_bab.setEasingFunction(flinchEase_back);
const _animFlinch_spine_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-12.9, 32.4, -9.87))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animFlinch_spine = new MYANIM.Animation(_animFlinch_spine_bab, _animFlinch_spine_keys);

const _animFlinch_spine1_bab = new BABYLON.Animation("animFlinch_spine1", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_spine1_bab.setEasingFunction(flinchEase_back);
const _animFlinch_spine1_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-2.59, 7.05, 0.547))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animFlinch_spine1 = new MYANIM.Animation(_animFlinch_spine1_bab, _animFlinch_spine1_keys);

const _animFlinch_neck_bab = new BABYLON.Animation("animFlinch_neck", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_neck_bab.setEasingFunction(flinchEase_back);
const _animFlinch_neck_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-19.7, 19.9, 0.644))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animFlinch_neck = new MYANIM.Animation(_animFlinch_neck_bab, _animFlinch_neck_keys);

const _animFlinch_L_upperarm_bab = new BABYLON.Animation("animFlinch_L_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_L_upperarm_bab.setEasingFunction(flinchEase_noback);
const _animFlinch_L_upperarm_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-71.8, 35.6, 0))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-71.6, 48.6, 17))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-71.8, 35.6, 0))
    }
];
const animFlinch_L_upperarm = new MYANIM.Animation(_animFlinch_L_upperarm_bab, _animFlinch_L_upperarm_keys);

const _animFlinch_L_forearm_bab = new BABYLON.Animation("animFlinch_L_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_L_forearm_bab.setEasingFunction(flinchEase_noback);
const _animFlinch_L_forearm_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-0.0076, -0.535, -91.6))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-21.3, 20, -11.9))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-0.0076, -0.535, -91.6))
    }
];
const animFlinch_L_forearm = new MYANIM.Animation(_animFlinch_L_forearm_bab, _animFlinch_L_forearm_keys);

const _animFlinch_R_upperarm_bab = new BABYLON.Animation("animFlinch_R_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_R_upperarm_bab.setEasingFunction(flinchEase_noback);
const _animFlinch_R_upperarm_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-90, 0, 37.8))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-107, 34.3, 5.23))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-90, 0, 37.8))
    }
];
const animFlinch_R_upperarm = new MYANIM.Animation(_animFlinch_R_upperarm_bab, _animFlinch_R_upperarm_keys);

const _animFlinch_R_forearm_bab = new BABYLON.Animation("animFlinch_R_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_R_forearm_bab.setEasingFunction(flinchEase_noback);
const _animFlinch_R_forearm_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 50.2))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-24.5, 8.74, 25.1))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 50.2))
    }
];
const animFlinch_R_forearm = new MYANIM.Animation(_animFlinch_R_forearm_bab, _animFlinch_R_forearm_keys);

const _animFlinch_R_hand_bab = new BABYLON.Animation("animFlinch_R_hand", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_R_hand_bab.setEasingFunction(flinchEase_noback);
const _animFlinch_R_hand_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -31.7))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(10.2, 39.4, 3.23))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -31.7))
    }
];
const animFlinch_R_hand = new MYANIM.Animation(_animFlinch_R_hand_bab, _animFlinch_R_hand_keys);

const _animFlinch_L_mant_01_bab = new BABYLON.Animation("animFlinch_L_mant_01", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_L_mant_01_bab.setEasingFunction(flinchEase_back);
const _animFlinch_L_mant_01_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(10, 0, 0))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-0.463, -2.8, -10.2))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(10, 0, 0))
    }
];
const animFlinch_L_mant_01 = new MYANIM.Animation(_animFlinch_L_mant_01_bab, _animFlinch_L_mant_01_keys);

const _animFlinch_L_mant_02_bab = new BABYLON.Animation("animFlinch_L_mant_02", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_L_mant_02_bab.setEasingFunction(flinchEase_back);
const _animFlinch_L_mant_02_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(46.5, 28.5, 30.5))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animFlinch_L_mant_02 = new MYANIM.Animation(_animFlinch_L_mant_02_bab, _animFlinch_L_mant_02_keys);

// the animation is triggered by this function
function flinch(meshdata, scene, onAnimationEnd) {
    meshdata.stopAllAnimations(scene);
    MYANIM.directAnimation(scene, meshdata.mesh, [animFlinch_meshPos]);
    MYANIM.directAnimation(scene, meshdata.getBone("Bip01_Spine"), [animFlinch_spine], onAnimationEnd);
    MYANIM.directAnimation(scene, meshdata.getBone("Bip01_Spine1"), [animFlinch_spine1]);
    MYANIM.directAnimation(scene, meshdata.getBone("Bip01_Neck"), [animFlinch_neck]);
    MYANIM.directAnimation(scene, meshdata.getBone("Bip01_L_UpperArm"), [animFlinch_L_upperarm]);
    MYANIM.directAnimation(scene, meshdata.getBone("Bip01_L_Forearm"), [animFlinch_L_forearm]);
    MYANIM.directAnimation(scene, meshdata.getBone("Bip01_R_UpperArm"), [animFlinch_R_upperarm]);
    MYANIM.directAnimation(scene, meshdata.getBone("Bip01_R_Forearm"), [animFlinch_R_forearm]);
    MYANIM.directAnimation(scene, meshdata.getBone("Bip01_R_Hand"), [animFlinch_R_hand]);
    MYANIM.directAnimation(scene, meshdata.getBone("b_L_mant_01"), [animFlinch_L_mant_01]);
    MYANIM.directAnimation(scene, meshdata.getBone("b_L_mant_02"), [animFlinch_L_mant_02]);
    // reset legs etc. (less noticeable because of the vibration, which is good because we can't wait for endIdleGracefully in this case)
    meshdata.getNode("Bip01_L_Thigh").rotation = RotationFromDegrees(-29.9, 26.9, 25.6);
    meshdata.getNode("Bip01_L_Calf").rotation = RotationFromDegrees(39.1, 33.3, 5.32);
    meshdata.getNode("Bip01_R_Thigh").rotation = RotationFromDegrees(-35.8, 30.9, -15.3);
    meshdata.getNode("Bip01_R_Calf").rotation = RotationFromDegrees(38.3, -23.7, -7.63);
    meshdata.getNode("b_F_maekake_01").rotation = RotationFromDegrees(-12.9, 0, 0);
    meshdata.getNode("b_L_maekake_01").rotation = RotationFromDegrees(0, 0, 18.2);
    meshdata.getNode("b_L_mant_01").rotation = RotationFromDegrees(10, 0, 0);
    meshdata.getNode("b_F_mant_01").rotation = RotationFromDegrees(7, 0, 0);
    meshdata.getNode("b_R_mant_01").rotation = RotationFromDegrees(10, 0, 0);
}






/**
 * Death animation: the character falls to the ground senseless, defeated
 */
const _animDeath_frames = [0, 20, 27, 37, 50];
const deathEase = new BABYLON.QuadraticEase();
deathEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

const _animDeath_meshY_bab = new BABYLON.Animation("animDeath_meshY", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
_animDeath_meshY_bab.setEasingFunction(deathEase);
const _animDeath_meshY_keys = [
    {
        frame:_animDeath_frames[0],
        value:idlePosition.y
    }, {
        frame:_animDeath_frames[1],
        value:0
    }, {
        frame:_animDeath_frames[4],
        value:-0.05
    }
];
const animDeath_meshY = new MYANIM.Animation(_animDeath_meshY_bab, _animDeath_meshY_keys);

const _animDeath_move_bab = new BABYLON.Animation("animDeath_move", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_move_bab.setEasingFunction(deathEase);
const _animDeath_move_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(68.9, 3.43, 0.88))
    }
];
const animDeath_move = new MYANIM.Animation(_animDeath_move_bab, _animDeath_move_keys);

const _animDeath_spine_bab = new BABYLON.Animation("animDeath_spine", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_spine_bab.setEasingFunction(deathEase);
const _animDeath_spine_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(5.4, 0.411, -3.26))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(7.75, 1.28, -5.21))
    }
];
const animDeath_spine = new MYANIM.Animation(_animDeath_spine_bab, _animDeath_spine_keys);

const _animDeath_spine1_bab = new BABYLON.Animation("animDeath_spine1", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_spine1_bab.setEasingFunction(deathEase);
const _animDeath_spine1_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(27.4, -13.4, -8.99))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(33.2, -14, -9.4))
    }
];
const animDeath_spine1 = new MYANIM.Animation(_animDeath_spine1_bab, _animDeath_spine1_keys);

const _animDeath_neck_bab = new BABYLON.Animation("animDeath_neck", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_neck_bab.setEasingFunction(deathEase);
const _animDeath_neck_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-2.94, 16.1, 0.946))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-2.94, 16.1, 0.946))
    }
];
const animDeath_neck = new MYANIM.Animation(_animDeath_neck_bab, _animDeath_neck_keys);

const _animDeath_head_bab = new BABYLON.Animation("animDeath_head", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_head_bab.setEasingFunction(deathEase);
const _animDeath_head_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-21.4, 30, -4.53))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-26.9, 41.1, -9.67))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-17.7, 64.8, 3.53))
    }
];
const animDeath_head = new MYANIM.Animation(_animDeath_head_bab, _animDeath_head_keys);

const _animDeath_L_upperarm_bab = new BABYLON.Animation("animDeath_L_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_L_upperarm_bab.setEasingFunction(deathEase);
const _animDeath_L_upperarm_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-71.8, 35.6, 0))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-67.4, 61.8, -17.8))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-48, 143, -116))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-46.4, 140, -113))
    }
];
const animDeath_L_upperarm = new MYANIM.Animation(_animDeath_L_upperarm_bab, _animDeath_L_upperarm_keys);

const _animDeath_L_forearm_bab = new BABYLON.Animation("animDeath_L_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_L_forearm_bab.setEasingFunction(deathEase);
const _animDeath_L_forearm_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-0.0076, -0.535, -91.6))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(5.82, 43.1, -43.5))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(4.96, -58.4, 29))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-7.78, -82.8, 39))
    }
];
const animDeath_L_forearm = new MYANIM.Animation(_animDeath_L_forearm_bab, _animDeath_L_forearm_keys);

const _animDeath_R_upperarm_bab = new BABYLON.Animation("animDeath_R_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_R_upperarm_bab.setEasingFunction(deathEase);
const _animDeath_R_upperarm_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-90, 0, 37.8))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-95.4, -73.5, 114))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-103, -21, 52.5))
    }
];
const animDeath_R_upperarm = new MYANIM.Animation(_animDeath_R_upperarm_bab, _animDeath_R_upperarm_keys);

const _animDeath_R_forearm_bab = new BABYLON.Animation("animDeath_R_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_R_forearm_bab.setEasingFunction(deathEase);
const _animDeath_R_forearm_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 50.2))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(1.69, 17.2, 57.7))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-9.92, 20.7, 68.4))
    }
];
const animDeath_R_forearm = new MYANIM.Animation(_animDeath_R_forearm_bab, _animDeath_R_forearm_keys);

const _animDeath_R_hand_bab = new BABYLON.Animation("animDeath_R_hand", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_R_hand_bab.setEasingFunction(deathEase);
const _animDeath_R_hand_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -31.7))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(12.6, 2.4, -14.4))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(16.9, -12.9, -23))
    }
];
const animDeath_R_hand = new MYANIM.Animation(_animDeath_R_hand_bab, _animDeath_R_hand_keys);

const _animDeath_L_thigh_bab = new BABYLON.Animation("animDeath_L_thigh", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_L_thigh_bab.setEasingFunction(deathEase);
const _animDeath_L_thigh_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-29.9, 26.9, 25.6))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-11.6, 37.4, 29.8))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-5.24, 38.8, 47.7))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-8.06, 34.5, 34.5))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-6.91, 26.5, 29.6))
    }
];
const animDeath_L_thigh = new MYANIM.Animation(_animDeath_L_thigh_bab, _animDeath_L_thigh_keys);

const _animDeath_L_calf_bab = new BABYLON.Animation("animDeath_L_calf", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_L_calf_bab.setEasingFunction(deathEase);
const _animDeath_L_calf_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(39.1, 33.3, 5.32))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(49, 35.7, 11.3))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(52.8, 35.3, 8.04))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(59.1, 40.8, 15.7))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(37.4, 18.4, -23.7))
    }
];
const animDeath_L_calf = new MYANIM.Animation(_animDeath_L_calf_bab, _animDeath_L_calf_keys);

const _animDeath_R_thigh_bab = new BABYLON.Animation("animDeath_R_thigh", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_R_thigh_bab.setEasingFunction(deathEase);
const _animDeath_R_thigh_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-35.8, 30.9, -15.3))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(25.8, 22.8, -10.5))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(15.9, 24.2, -15.7))
    }
];
const animDeath_R_thigh = new MYANIM.Animation(_animDeath_R_thigh_bab, _animDeath_R_thigh_keys);

const _animDeath_R_calf_bab = new BABYLON.Animation("animDeath_R_calf", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_R_calf_bab.setEasingFunction(deathEase);
const _animDeath_R_calf_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(38.3, -23.7, -7.63))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(45.1, -23.4, -8.54))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(129, -193, -175))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(162, -204, -188))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(162, -204, -188))
    }
];
const animDeath_R_calf = new MYANIM.Animation(_animDeath_R_calf_bab, _animDeath_R_calf_keys);

const _animDeath_F_armor_bab = new BABYLON.Animation("animDeath_F_armor", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animDeath_F_armor_bab.setEasingFunction(deathEase);
const _animDeath_F_armor_keys = [
    {
        frame:_animDeath_frames[0],
        value:RotationFromDegrees(-12.9, 0, 0)
    }, {
        frame:_animDeath_frames[2],
        value:RotationFromDegrees(-12.9, 0, 0)
    }, {
        frame:_animDeath_frames[4],
        value:RotationFromDegrees(0.551, 0, 0)
    }
];
const animDeath_F_armor = new MYANIM.Animation(_animDeath_F_armor_bab, _animDeath_F_armor_keys);

const _animDeath_F_mant_bab = new BABYLON.Animation("animDeath_F_mant", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_F_mant_bab.setEasingFunction(deathEase);
const _animDeath_F_mant_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(7, 0, 0))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(6.83, 1.01, -3.99))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(22.7, 2.47, -9))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(20.7, 7.94, -7.63))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-36.3, 3.42, -8.25))
    }
];
const animDeath_F_mant = new MYANIM.Animation(_animDeath_F_mant_bab, _animDeath_F_mant_keys);

const _animDeath_L_mant_bab = new BABYLON.Animation("animDeath_L_mant", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_L_mant_bab.setEasingFunction(deathEase);
const _animDeath_L_mant_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(10, 0, 0))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(5.83, 7.02, 2.22))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(7.68, 1.54, 7.09))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-22.3, -4.8, 4.54))
    }
];
const animDeath_L_mant = new MYANIM.Animation(_animDeath_L_mant_bab, _animDeath_L_mant_keys);

const _animDeath_R_mant_bab = new BABYLON.Animation("animDeath_R_mant", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_R_mant_bab.setEasingFunction(deathEase);
const _animDeath_R_mant_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(10, 0, 0))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(12.2, 9, -18.6))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(6.13, 12.4, -30.5))
    }, {
        frame:_animDeath_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-35.5, 16.3, -17.1))
    }
];
const animDeath_R_mant = new MYANIM.Animation(_animDeath_R_mant_bab, _animDeath_R_mant_keys);

// the animation is triggered by this function
function death(meshdata, scene, onAnimationEnd) {
    meshdata.stopAllAnimations(scene);
    MYANIM.directAnimation(scene, meshdata.mesh, [animDeath_meshY]);
    MYANIM.directAnimation(scene, meshdata.getNode("move"), [animDeath_move]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_Spine"), [animDeath_spine], onAnimationEnd);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_Spine1"), [animDeath_spine1]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_Neck"), [animDeath_neck]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_Head"), [animDeath_head]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_UpperArm"), [animDeath_L_upperarm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_Forearm"), [animDeath_L_forearm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_UpperArm"), [animDeath_R_upperarm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_Forearm"), [animDeath_R_forearm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_Hand"), [animDeath_R_hand]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_Thigh"), [animDeath_L_thigh]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_Calf"), [animDeath_L_calf]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_Thigh"), [animDeath_R_thigh]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_Calf"), [animDeath_R_calf]);
    MYANIM.directAnimation(scene, meshdata.getNode("b_F_maekake_01"), [animDeath_F_armor]);
    MYANIM.directAnimation(scene, meshdata.getNode("b_F_mant_01"), [animDeath_F_mant]);
    MYANIM.directAnimation(scene, meshdata.getNode("b_L_mant_01"), [animDeath_L_mant]);
    MYANIM.directAnimation(scene, meshdata.getNode("b_R_mant_01"), [animDeath_R_mant]);
}





/**
 * The exported object.
 */
const miscanims = {
    idle,
    idle_customY,
    endIdleGracefully,
    flinch,
    death,
};

export default miscanims;