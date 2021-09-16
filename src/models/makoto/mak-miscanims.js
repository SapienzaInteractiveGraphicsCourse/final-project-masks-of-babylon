/**
 * Name stands for "Miscellaneous Animations".
 * File contains all animations of Makoto not related to his actions,
 * because they are pretty long.
 * EXPORTS an objects with the functions to trigger those animations.
 */

import * as MYANIM from "../../utils/animation.js"
import { RotationFromDegrees } from "../../utils/angles.js";
import charge from "./mak-charge.js";

/**
 * "Base" position of the character
 */
var idlePosition = new BABYLON.Vector3(-1, -0.04, 0);





/**
 * Idle animation: a combat stance with a light animation for when the player is doing nothing else.
 */
const _animIdle_frames = [0, 25, 50];
const idleEase = new BABYLON.PowerEase(1.3);
idleEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
// Also tried SineEase, but in my opinion [Francesco] it's not weighty enough for this type of "squatting" animation.
// Still, we can consider SineEase if PowerEase gives performance issues.
// QuadraticEase instead is a big no: the middle of the in-between is too fast.
// Which is also why I ruled out the other polynomials and most other easings.

const _animIdle_meshY_bab = new BABYLON.Animation("animIdle_meshY", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
_animIdle_meshY_bab.setEasingFunction(idleEase);
const _animIdle_meshY_keys = [
    {
        frame:_animIdle_frames[0],
        value:idlePosition.y
    }, {
        frame:_animIdle_frames[1],
        value:-0.09
    }, {
        frame:_animIdle_frames[2],
        value:idlePosition.y
    }
];
const animIdle_meshY = new MYANIM.Animation(_animIdle_meshY_bab, _animIdle_meshY_keys);

const _animIdle_L_thigh_bab = new BABYLON.Animation("animIdle_L_thigh", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animIdle_L_thigh_bab.setEasingFunction(idleEase);
const _animIdle_L_thigh_keys = [
    {
        frame:_animIdle_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-24.3, 23.5, 7.93))
    }, {
        frame:_animIdle_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-49.8, 25.7, 2.56))
    }, {
        frame:_animIdle_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-24.3, 23.5, 7.93))
    }
];
const animIdle_L_thigh = new MYANIM.Animation(_animIdle_L_thigh_bab, _animIdle_L_thigh_keys);

const _animIdle_L_calf_bab = new BABYLON.Animation("animIdle_L_calf", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animIdle_L_calf_bab.setEasingFunction(idleEase);
const _animIdle_L_calf_keys = [
    {
        frame:_animIdle_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(24, 23, 8))
    }, {
        frame:_animIdle_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(46.5, 28.3, 20.5))
    }, {
        frame:_animIdle_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(24, 23, 8))
    }
];
const animIdle_L_calf = new MYANIM.Animation(_animIdle_L_calf_bab, _animIdle_L_calf_keys);

const _animIdle_R_thigh_bab = new BABYLON.Animation("animIdle_R_thigh", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animIdle_R_thigh_bab.setEasingFunction(idleEase);
const _animIdle_R_thigh_keys = [
    {
        frame:_animIdle_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-22.8, -33, -11.9))
    }, {
        frame:_animIdle_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-29.1, -27.8, -39))
    }, {
        frame:_animIdle_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-22.8, -33, -11.9))
    }
];
const animIdle_R_thigh = new MYANIM.Animation(_animIdle_R_thigh_bab, _animIdle_R_thigh_keys);

const _animIdle_R_calf_bab = new BABYLON.Animation("animIdle_R_calf", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animIdle_R_calf_bab.setEasingFunction(idleEase);
const _animIdle_R_calf_keys = [
    {
        frame:_animIdle_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(22.4, -33, -12))
    }, {
        frame:_animIdle_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(46.2, -33.3, 3.05))
    }, {
        frame:_animIdle_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(22.4, -33, -12))
    }
];
const animIdle_R_calf = new MYANIM.Animation(_animIdle_R_calf_bab, _animIdle_R_calf_keys);

/**
 * The Animatable for any animation in the idle loop, so we can listen for its loop event
 * We don't care which one exactly, as they are all synchronized anyway.
 */
var idleAnimatable_meshY;

//trigger all components of the animation with this one function
function idle(meshdata, scene) {
    idleAnimatable_meshY = MYANIM.directAnimationLoop(scene, meshdata.mesh, [animIdle_meshY]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Bip01_L_Thigh"), [animIdle_L_thigh]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Bip01_L_Calf"), [animIdle_L_calf]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Bip01_R_Thigh"), [animIdle_R_thigh]);
    MYANIM.directAnimationLoop(scene, meshdata.getNode("Bip01_R_Calf"), [animIdle_R_calf]);
}

/**
 * Returns a Promise that resolves the next time that the idle animation ends a loop.
 * It allows us to have all action animations start from the same pose
 * without having an abrupt, transitionless reset every time,
 * at the cost of potentially waiting less than 2 seconds at most between
 * command input and action execution.
 */
function endIdleGracefully(scene) {
    return new Promise((resolve, reject) => {
        // addOnce deletes the observer once the event is triggered,
        // which is good for us since the new promise is single-use anyway,
        // so we don't want any more resolutio events to fire for nothing
        idleAnimatable_meshY.onAnimationLoopObservable.addOnce(()=>{resolve()});
    })
}






/*
 * Flinch animation: the character recoils when he takes a hit
 * Memento: the mesh position animation for Flinch is one of the few
 * that looks better with no easing, plus the vibration is so fast
 * it matters little
 */
function generateFlinchMeshKeys(flinchDisp) {
    return [
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
    ]
}
const _animFlinch_meshPos_bab = new BABYLON.Animation("animFlinch_meshPos", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
const _animFlinch_meshPos_keys = generateFlinchMeshKeys(new BABYLON.Vector3(0.0625, 0, 0.0625))
const animFlinch_meshPos = new MYANIM.Animation(_animFlinch_meshPos_bab, _animFlinch_meshPos_keys);

const _animFlinch_meshPos_minor_bab = new BABYLON.Animation("animFlinch_meshPos_minor", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
const _animFlinch_meshPos_minor_keys = generateFlinchMeshKeys(new BABYLON.Vector3(0.03125, 0, 0.03125))
const animFlinch_meshPos_minor = new MYANIM.Animation(_animFlinch_meshPos_minor_bab, _animFlinch_meshPos_minor_keys);

const _animFlinch_frames = [0, 3, 36];
const flinchEase = new BABYLON.BackEase(0.75);
flinchEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

const _animFlinch_spine1_bab = new BABYLON.Animation("animFlinch_spine1", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_spine1_bab.setEasingFunction(flinchEase);
const _animFlinch_spine1_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-23.3, 41.5, -27.1))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animFlinch_spine1 = new MYANIM.Animation(_animFlinch_spine1_bab, _animFlinch_spine1_keys);

const _animFlinch_L_forearm_bab = new BABYLON.Animation("animFlinch_L_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_L_forearm_bab.setEasingFunction(flinchEase);
const _animFlinch_L_forearm_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -50.5, 17.6))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(20.6, -64.6, -20.1))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -50.5, 17.6))
    }
];
const animFlinch_L_forearm = new MYANIM.Animation(_animFlinch_L_forearm_bab, _animFlinch_L_forearm_keys);

const _animFlinch_R_upperarm_bab = new BABYLON.Animation("animFlinch_R_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_R_upperarm_bab.setEasingFunction(flinchEase);
const _animFlinch_R_upperarm_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -20.3, 0))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-31.9, -68, -6.23))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -20.3, 0))
    }
];
const animFlinch_R_upperarm = new MYANIM.Animation(_animFlinch_R_upperarm_bab, _animFlinch_R_upperarm_keys);

const _animFlinch_R_forearm_bab = new BABYLON.Animation("animFlinch_R_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animFlinch_R_forearm_bab.setEasingFunction(flinchEase);
const _animFlinch_R_forearm_keys = [
    {
        frame:_animFlinch_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 41.6, 0))
    }, {
        frame:_animFlinch_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-62, 14.4, -20.2))
    }, {
        frame:_animFlinch_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 41.6, 0))
    }
];
const animFlinch_R_forearm = new MYANIM.Animation(_animFlinch_R_forearm_bab, _animFlinch_R_forearm_keys);

// the animation is triggered by this function
function flinch(meshdata, makGuarding, makHP, scene, onAnimationEnd) {
    meshdata.stopAllAnimations(scene);
    meshdata.mesh.position = idlePosition;
    // if the character is guarding, he animates less as he takes less damage
    if (makGuarding) {
        if (makHP > 0) {
            MYANIM.directAnimation(scene, meshdata.mesh, [animFlinch_meshPos_minor], onAnimationEnd);
        }
        // ...but if that's the killing blow he takes it and leaves the guarding pose
        else {
            MYANIM.directAnimation(scene, meshdata.mesh, [animFlinch_meshPos]);
            charge.revertAsync(scene).then(()=>{onAnimationEnd();})
        }
    }
    else {
        MYANIM.directAnimation(scene, meshdata.mesh, [animFlinch_meshPos]);
        MYANIM.directAnimation(scene, meshdata.getNode("Bip01_Spine1"), [animFlinch_spine1], onAnimationEnd);
        MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_Forearm"), [animFlinch_L_forearm]);
        MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_UpperArm"), [animFlinch_R_upperarm]);
        MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_Forearm"), [animFlinch_R_forearm]);
    }
    // reset legs (less noticeable because of the vibration, which is good because we can't wait for endIdleGracefully in this case)
    meshdata.getNode("Bip01_L_Thigh").rotation = RotationFromDegrees(-24.3, 23.5, 7.93);
    meshdata.getNode("Bip01_L_Calf").rotation = RotationFromDegrees(24, 23, 8);
    meshdata.getNode("Bip01_R_Thigh").rotation = RotationFromDegrees(-22.8, -33, -11.9);
    meshdata.getNode("Bip01_R_Calf").rotation = RotationFromDegrees(22.4, -33, -12);
}







/**
 * Death animation: the character falls to the ground senseless, defeated
 */
const _animDeath_frames = [
    0,
    // fall on knees
    23,
    // very short pause for emphasis
    26,
    // fall down
    59
];
const deathEase = new BABYLON.CubicEase();
deathEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
// Rationale: hesitant beginning + fast movement (Cubic) and abrupt stop (EASEIN)
// look perfect for the simple animation of falling to one's knees and then to the ground.

const _animDeath_meshPos_bab = new BABYLON.Animation("animDeath_meshPos", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animDeath_meshPos_bab.setEasingFunction(deathEase);
const _animDeath_meshPos_keys = [
    {
        frame:_animDeath_frames[0],
        value:idlePosition
    }, {
        frame:_animDeath_frames[1],
        value:idlePosition.add(new BABYLON.Vector3(0.228, -0.228, 0))
    }, {
        frame:_animDeath_frames[2],
        value:idlePosition.add(new BABYLON.Vector3(0.228, -0.228, 0))
    }, {
        frame:_animDeath_frames[3],
        value:idlePosition.add(new BABYLON.Vector3(0.359, -0.359, 0))
    }
];
const animDeath_meshPos = new MYANIM.Animation(_animDeath_meshPos_bab, _animDeath_meshPos_keys);

const _animDeath_bip01_bab = new BABYLON.Animation("animDeath_bip01", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animDeath_bip01_bab.setEasingFunction(deathEase);
const _animDeath_bip01_keys = [
    {
        frame:_animDeath_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animDeath_frames[1],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animDeath_frames[2],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animDeath_frames[3],
        value:RotationFromDegrees(90, 0, 0)
    }
];
const animDeath_bip01 = new MYANIM.Animation(_animDeath_bip01_bab, _animDeath_bip01_keys);

const _animDeath_L_upperarm_bab = new BABYLON.Animation("animDeath_L_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_L_upperarm_bab.setEasingFunction(deathEase);
const _animDeath_L_upperarm_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -32.7, -17))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(17.3, -32.5, -21.3))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(17.3, -32.5, -21.3))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(17.3, -32.5, -21.3))
    }
];
const animDeath_L_upperarm = new MYANIM.Animation(_animDeath_L_upperarm_bab, _animDeath_L_upperarm_keys);


const _animDeath_L_forearm_bab = new BABYLON.Animation("animDeath_L_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_L_forearm_bab.setEasingFunction(deathEase);
const _animDeath_L_forearm_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -50.5, 17.6))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(6.29, -42.8, -19.1))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(6.29, -42.8, -19.1))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(6.29, -42.8, -19.1))
    }
];
const animDeath_L_forearm = new MYANIM.Animation(_animDeath_L_forearm_bab, _animDeath_L_forearm_keys);

const _animDeath_R_upperarm_bab = new BABYLON.Animation("animDeath_R_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_R_upperarm_bab.setEasingFunction(deathEase);
const _animDeath_R_upperarm_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -20.3, 0))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-16.2, -35.5, 41.1))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-16.2, -35.5, 41.1))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-16.2, -35.5, 41.1))
    }
];
const animDeath_R_upperarm = new MYANIM.Animation(_animDeath_R_upperarm_bab, _animDeath_R_upperarm_keys);

const _animDeath_R_forearm_bab = new BABYLON.Animation("animDeath_R_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_R_forearm_bab.setEasingFunction(deathEase);
const _animDeath_R_forearm_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 41.6, 0))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(33.9, 24.8, -2.79))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(33.9, 24.8, -2.79))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(33.9, 24.8, -2.79))
    }
];
const animDeath_R_forearm = new MYANIM.Animation(_animDeath_R_forearm_bab, _animDeath_R_forearm_keys);

const _animDeath_L_thigh_bab = new BABYLON.Animation("animDeath_L_thigh", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_L_thigh_bab.setEasingFunction(deathEase);
const _animDeath_L_thigh_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-24.3, 23.5, 7.93))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-18.1, 22.5, 10.8))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-18.1, 22.5, 10.8))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-11.5, 21.8, 13.5))
    }
];
const animDeath_L_thigh = new MYANIM.Animation(_animDeath_L_thigh_bab, _animDeath_L_thigh_keys);

const _animDeath_L_calf_bab = new BABYLON.Animation("animDeath_L_calf", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_L_calf_bab.setEasingFunction(deathEase);
const _animDeath_L_calf_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(24, 23, 8))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(58.8, 76.2, 109))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(58.8, 76.2, 109))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(10.6, 24.3, -6.51))
    }
];
const animDeath_L_calf = new MYANIM.Animation(_animDeath_L_calf_bab, _animDeath_L_calf_keys);

const _animDeath_R_thigh_bab = new BABYLON.Animation("animDeath_R_thigh", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_R_thigh_bab.setEasingFunction(deathEase);
const _animDeath_R_thigh_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-22.8, -33, -11.9))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-20, -32, -13.5))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-20, -32, -13.5))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-17, -31.1, -15.1))
    }
];
const animDeath_R_thigh = new MYANIM.Animation(_animDeath_R_thigh_bab, _animDeath_R_thigh_keys);

const _animDeath_R_calf_bab = new BABYLON.Animation("animDeath_R_calf", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_R_calf_bab.setEasingFunction(deathEase);
const _animDeath_R_calf_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(22.4, -33, -12))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(39.7, -62.5, -100))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(39.7, -62.5, -100))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(23.4, -37.8, 2.78))
    }
];
const animDeath_R_calf = new MYANIM.Animation(_animDeath_R_calf_bab, _animDeath_R_calf_keys);

const _animDeath_weapon_bab = new BABYLON.Animation("animDeath_weapon", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animDeath_weapon_bab.setEasingFunction(deathEase);
const _animDeath_weapon_keys = [
    {
        frame:_animDeath_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animDeath_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-87.5, 225, -205))
    }
];
const animDeath_weapon = new MYANIM.Animation(_animDeath_weapon_bab, _animDeath_weapon_keys);

// the animation is triggered by this function
function death(meshdata, scene, onAnimationEnd) {
    meshdata.stopAllAnimations(scene);
    MYANIM.directAnimation(scene, meshdata.mesh, [animDeath_meshPos]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01"), [animDeath_bip01], onAnimationEnd);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_UpperArm"), [animDeath_L_upperarm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_Forearm"), [animDeath_L_forearm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_UpperArm"), [animDeath_R_upperarm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_Forearm"), [animDeath_R_forearm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_Thigh"), [animDeath_L_thigh]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_Calf"), [animDeath_L_calf]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_Thigh"), [animDeath_R_thigh]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_Calf"), [animDeath_R_calf]);
    MYANIM.directAnimation(scene, meshdata.getNode("weapon"), [animDeath_weapon]);
}






/**
 * Victory animation: a short celebration for when the character wins a battle
 */
const _animVictory_frames = [
    0,
    // celebratory sword slash: get to ready position
    20,
    // sword slash: execute
    25,
    // carefree "hand in pocket" motion: get to ready position
    45,
    // hand in pocket: execute
    60
];
const victoryEase = new BABYLON.SineEase();
victoryEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

const _animVictory_L_upperarm_bab = new BABYLON.Animation("animVictory_L_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animVictory_L_upperarm_bab.setEasingFunction(victoryEase);
const _animVictory_L_upperarm_keys = [
    {
        frame:_animVictory_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -32.7, -17))
    }, {
        frame:_animVictory_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -32.7, -17))
    }, {
        frame:_animVictory_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(21.4, -25.7, 7.65))
    }, {
        frame:_animVictory_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(3.29, -32.8, -24.4))
    }
];
const animVictory_L_upperarm = new MYANIM.Animation(_animVictory_L_upperarm_bab, _animVictory_L_upperarm_keys);

const _animVictory_L_forearm_bab = new BABYLON.Animation("animVictory_L_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animVictory_L_forearm_bab.setEasingFunction(victoryEase);
const _animVictory_L_forearm_keys = [
    {
        frame:_animVictory_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -50.5, 17.6))
    }, {
        frame:_animVictory_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -50.5, 17.6))
    }, {
        frame:_animVictory_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-35.6, -50.2, -29.7))
    }, {
        frame:_animVictory_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-5.33, -44.1, -22.1))
    }
];
const animVictory_L_forearm = new MYANIM.Animation(_animVictory_L_forearm_bab, _animVictory_L_forearm_keys);

const _animVictory_R_clavicle_bab = new BABYLON.Animation("animVictory_R_clavicle", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animVictory_R_clavicle_bab.setEasingFunction(victoryEase);
const _animVictory_R_clavicle_keys = [
    {
        frame:_animVictory_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animVictory_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-7.31, 28, -9.58))
    }, {
        frame:_animVictory_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(1.93, -17.9, 5.76))
    }, {
        frame:_animVictory_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(1.93, -17.9, 5.76))
    }
];
const animVictory_R_clavicle = new MYANIM.Animation(_animVictory_R_clavicle_bab, _animVictory_R_clavicle_keys);

const _animVictory_R_upperarm_bab = new BABYLON.Animation("animVictory_R_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animVictory_R_upperarm_bab.setEasingFunction(victoryEase);
const _animVictory_R_upperarm_keys = [
    {
        frame:_animVictory_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -20.3, 0))
    }, {
        frame:_animVictory_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-19, 82, -33.9))
    }, {
        frame:_animVictory_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(6.05, -19.9, 6.21))
    }, {
        frame:_animVictory_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(6.05, -19.9, 6.21))
    }
];
const animVictory_R_upperarm = new MYANIM.Animation(_animVictory_R_upperarm_bab, _animVictory_R_upperarm_keys);

const _animVictory_R_forearm_bab = new BABYLON.Animation("animVictory_R_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animVictory_R_forearm_bab.setEasingFunction(victoryEase);
const _animVictory_R_forearm_keys = [
    {
        frame:_animVictory_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 41.6, 0))
    }, {
        frame:_animVictory_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-26.7, 40.7, -27.6))
    }, {
        frame:_animVictory_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animVictory_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animVictory_R_forearm = new MYANIM.Animation(_animVictory_R_forearm_bab, _animVictory_R_forearm_keys);

// the animation is triggered by this function
function victory(meshdata, scene, onAnimationEnd) {
    meshdata.stopAllAnimations(scene);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_UpperArm"), [animVictory_L_upperarm], onAnimationEnd);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_Forearm"), [animVictory_L_forearm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_Clavicle"), [animVictory_R_clavicle]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_UpperArm"), [animVictory_R_upperarm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_Forearm"), [animVictory_R_forearm]);
}






/**
 * Ending animation: Makoto hops up and down in a manifestation of joy for completing his quest.
 * (This animation does not appear in battle like the others, but only in the ending scene.)
 */
const _animEnding_frames = [
    0,
    // small pause betwen jumps  (the duration is actually doubled because of the reversing loop)
    3,
    // jump up
    23
    // the return will be accomplished by reversing this animation.
    // this has the benefit of automatically reversing the easing as well.
];
const endingEase = new BABYLON.QuadraticEase();
endingEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

const _animEnding_meshY_bab = new BABYLON.Animation("animEnding_meshY", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
_animEnding_meshY_bab.setEasingFunction(endingEase);
const _animEnding_meshY_keys = [
    {
        frame:_animEnding_frames[0],
        value:0
    }, {
        frame:_animEnding_frames[1],
        value:0
    }, {
        frame:_animEnding_frames[2],
        value:0.3
    }
];
const animEnding_meshY = new MYANIM.Animation(_animEnding_meshY_bab, _animEnding_meshY_keys);

const _animEnding_spine1_bab = new BABYLON.Animation("animEnding_spine1", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animEnding_spine1_bab.setEasingFunction(endingEase);
const _animEnding_spine1_keys = [
    {
        frame:_animEnding_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animEnding_frames[1],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animEnding_frames[2],
        value:RotationFromDegrees(-12.9, 0, 0)
    }
];
const animEnding_spine1 = new MYANIM.Animation(_animEnding_spine1_bab, _animEnding_spine1_keys);

const _animEnding_neck_bab = new BABYLON.Animation("animEnding_neck", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animEnding_neck_bab.setEasingFunction(endingEase);
const _animEnding_neck_keys = [
    {
        frame:_animEnding_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animEnding_frames[1],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animEnding_frames[2],
        value:RotationFromDegrees(-32.4, 0, 0)
    }
];
const animEnding_neck = new MYANIM.Animation(_animEnding_neck_bab, _animEnding_neck_keys);

const _animEnding_L_clavicle_bab = new BABYLON.Animation("animEnding_L_clavicle", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animEnding_L_clavicle_bab.setEasingFunction(endingEase);
const _animEnding_L_clavicle_keys = [
    {
        frame:_animEnding_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animEnding_frames[1],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animEnding_frames[2],
        value:RotationFromDegrees(-59.7, 0, 0)
    }
];
const animEnding_L_clavicle = new MYANIM.Animation(_animEnding_L_clavicle_bab, _animEnding_L_clavicle_keys);

const _animEnding_L_upperarm_bab = new BABYLON.Animation("animEnding_L_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animEnding_L_upperarm_bab.setEasingFunction(endingEase);
const _animEnding_L_upperarm_keys = [
    {
        frame:_animEnding_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-2.44, -19.4, -24.5))
    }, {
        frame:_animEnding_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-2.44, -19.4, -24.5))
    }, {
        frame:_animEnding_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-43, -26.9, 11.7))
    }
];
const animEnding_L_upperarm = new MYANIM.Animation(_animEnding_L_upperarm_bab, _animEnding_L_upperarm_keys);

const _animEnding_L_forearm_bab = new BABYLON.Animation("animEnding_L_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animEnding_L_forearm_bab.setEasingFunction(endingEase);
const _animEnding_L_forearm_keys = [
    {
        frame:_animEnding_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animEnding_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animEnding_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-69, -17.8, -10.8))
    }
];
const animEnding_L_forearm = new MYANIM.Animation(_animEnding_L_forearm_bab, _animEnding_L_forearm_keys);

const _animEnding_R_clavicle_bab = new BABYLON.Animation("animEnding_R_clavicle", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animEnding_R_clavicle_bab.setEasingFunction(endingEase);
const _animEnding_R_clavicle_keys = [
    {
        frame:_animEnding_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animEnding_frames[1],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animEnding_frames[2],
        value:RotationFromDegrees(-59.7, 0, 0)
    }
];
const animEnding_R_clavicle = new MYANIM.Animation(_animEnding_R_clavicle_bab, _animEnding_R_clavicle_keys);

const _animEnding_R_upperarm_bab = new BABYLON.Animation("animEnding_R_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animEnding_R_upperarm_bab.setEasingFunction(endingEase);
const _animEnding_R_upperarm_keys = [
    {
        frame:_animEnding_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-2.44, 19.4, 24.5))
    }, {
        frame:_animEnding_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-2.44, 19.4, 24.5))
    }, {
        frame:_animEnding_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-43, 26.9, -11.7))
    }
];
const animEnding_R_upperarm = new MYANIM.Animation(_animEnding_R_upperarm_bab, _animEnding_R_upperarm_keys);

const _animEnding_R_forearm_bab = new BABYLON.Animation("animEnding_R_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animEnding_R_forearm_bab.setEasingFunction(endingEase);
const _animEnding_R_forearm_keys = [
    {
        frame:_animEnding_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animEnding_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animEnding_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-69, 17.8, 10.8))
    }
];
const animEnding_R_forearm = new MYANIM.Animation(_animEnding_R_forearm_bab, _animEnding_R_forearm_keys);

const _animEnding_L_thigh_bab = new BABYLON.Animation("animEnding_L_thigh", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animEnding_L_thigh_bab.setEasingFunction(endingEase);
const _animEnding_L_thigh_keys = [
    {
        frame:_animEnding_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-12.8, 12.4, 4.17))
    }, {
        frame:_animEnding_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-12.8, 12.4, 4.17))
    }, {
        frame:_animEnding_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(22.2, 13, 11.9))
    }
];
const animEnding_L_thigh = new MYANIM.Animation(_animEnding_L_thigh_bab, _animEnding_L_thigh_keys);

const _animEnding_L_calf_bab = new BABYLON.Animation("animEnding_L_calf", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animEnding_L_calf_bab.setEasingFunction(endingEase);
const _animEnding_L_calf_keys = [
    {
        frame:_animEnding_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(12.6, 12.1, 4.21))
    }, {
        frame:_animEnding_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(12.6, 12.1, 4.21))
    }, {
        frame:_animEnding_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(68.1, 45.7, 60.1))
    }
];
const animEnding_L_calf = new MYANIM.Animation(_animEnding_L_calf_bab, _animEnding_L_calf_keys);

const _animEnding_R_thigh_bab = new BABYLON.Animation("animEnding_R_thigh", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animEnding_R_thigh_bab.setEasingFunction(endingEase);
const _animEnding_R_thigh_keys = [
    {
        frame:_animEnding_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-12.8, -12.4, -4.17))
    }, {
        frame:_animEnding_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-12.8, -12.4, -4.17))
    }, {
        frame:_animEnding_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(22.2, -13, -11.9))
    }
];
const animEnding_R_thigh = new MYANIM.Animation(_animEnding_R_thigh_bab, _animEnding_R_thigh_keys);

const _animEnding_R_calf_bab = new BABYLON.Animation("animEnding_R_calf", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animEnding_R_calf_bab.setEasingFunction(endingEase);
const _animEnding_R_calf_keys = [
    {
        frame:_animEnding_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(12.6, -12.1, -4.21))
    }, {
        frame:_animEnding_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(12.6, -12.1, -4.21))
    }, {
        frame:_animEnding_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(68.1, -45.7, -60.1))
    }
];
const animEnding_R_calf = new MYANIM.Animation(_animEnding_R_calf_bab, _animEnding_R_calf_keys);

// The animation is triggered by this function
function ending(meshdata, scene) {
    MYANIM.directAnimation(scene, meshdata.mesh, [animEnding_meshY], () => {endingReverse(meshdata, scene)});
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_Spine1"), [animEnding_spine1]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_Neck"), [animEnding_neck]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_Clavicle"), [animEnding_L_clavicle]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_UpperArm"), [animEnding_L_upperarm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_Forearm"), [animEnding_L_forearm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_Clavicle"), [animEnding_R_clavicle]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_UpperArm"), [animEnding_R_upperarm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_Forearm"), [animEnding_R_forearm]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_Thigh"), [animEnding_L_thigh]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_L_Calf"), [animEnding_L_calf]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_Thigh"), [animEnding_R_thigh]);
    MYANIM.directAnimation(scene, meshdata.getNode("Bip01_R_Calf"), [animEnding_R_calf]);
}

// Trigger the reverse animation to go back down
function endingReverse(meshdata, scene) {
    MYANIM.directAnimationReverse(scene, meshdata.mesh, [animEnding_meshY], () => {ending(meshdata, scene)});
    MYANIM.directAnimationReverse(scene, meshdata.getNode("Bip01_Spine1"), [animEnding_spine1]);
    MYANIM.directAnimationReverse(scene, meshdata.getNode("Bip01_Neck"), [animEnding_neck]);
    MYANIM.directAnimationReverse(scene, meshdata.getNode("Bip01_L_Clavicle"), [animEnding_L_clavicle]);
    MYANIM.directAnimationReverse(scene, meshdata.getNode("Bip01_L_UpperArm"), [animEnding_L_upperarm]);
    MYANIM.directAnimationReverse(scene, meshdata.getNode("Bip01_L_Forearm"), [animEnding_L_forearm]);
    MYANIM.directAnimationReverse(scene, meshdata.getNode("Bip01_R_Clavicle"), [animEnding_R_clavicle]);
    MYANIM.directAnimationReverse(scene, meshdata.getNode("Bip01_R_UpperArm"), [animEnding_R_upperarm]);
    MYANIM.directAnimationReverse(scene, meshdata.getNode("Bip01_R_Forearm"), [animEnding_R_forearm]);
    MYANIM.directAnimationReverse(scene, meshdata.getNode("Bip01_L_Thigh"), [animEnding_L_thigh]);
    MYANIM.directAnimationReverse(scene, meshdata.getNode("Bip01_L_Calf"), [animEnding_L_calf]);
    MYANIM.directAnimationReverse(scene, meshdata.getNode("Bip01_R_Thigh"), [animEnding_R_thigh]);
    MYANIM.directAnimationReverse(scene, meshdata.getNode("Bip01_R_Calf"), [animEnding_R_calf]);
}




/**
 * The exported object.
 */
const miscanims = {
    idle,
    endIdleGracefully,
    flinch,
    death,
    victory,
    ending,
};

export default miscanims;
