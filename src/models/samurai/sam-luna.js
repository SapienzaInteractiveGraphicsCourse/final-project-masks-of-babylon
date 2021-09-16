/**
 * File for the Samurai's "Moonblade" attack,
 * referred to as "Luna" in the code for short
 * and to avoid any ambiguity with the associated auxiliary.
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

import * as GLOBLIB from "../../utils/lib-global.js";

/**************
 * PARAMETERS *
 **************/

// Color palette of the attack, influences both aux. mesh and light
const colorMain = new BABYLON.Color3(0.75, 0.75, 0.75);
const colorDark = new BABYLON.Color3(0.3, 0.3, 0.3);
const colorBright = new BABYLON.Color3(0.9, 0.9, 0.9);
const colorBrightish = new BABYLON.Color3(0.6, 0.6, 0.6)

// constant
//Light colors
const diffuse = colorMain;
const specular = colorBright;
const ground = colorBrightish;
//Direction of the hemispheric light
const hemiDir = new BABYLON.Vector3(1, 0, 0);

// SCENE-DEPENDENT:
// starting position of the projectile
var projectileStartPosition;
// the final point of the projectile's straight-line path, where it will disappear
var projectileEndPosition;
// the Time To Live of the projectile, in frames
var projectileTTL;
//Meshes to affect with the hemispheric light
var includedOnly = [];
//Meshes to exclude from the point light
var pointExcluded = [];    // the projectile mesh will be put in here, since the point light represents the light emitted from it

/**
 * Initializes the scene-dependent parameters
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function initParams(sceneInfo) {
    projectileStartPosition = samurai.defaultPosition.add(new BABYLON.Vector3(-0.5, 0.8, 0));
    projectileEndPosition = sceneInfo.player.defaultPosition.add(new BABYLON.Vector3(-1, 0.8, 0))
    includedOnly = [];
    includedOnly.push(...sceneInfo.player.meshdata.meshes);

    // also initialize the projectile animation, depending on these positions
    // determine animation duration based on approximate distance and velocity
    // this lets us play with the projectile's size and especially the end position of the path
    // without worrying too much about the exact frame count of this animation
    let xdist = Math.abs(projectileStartPosition.x - projectileEndPosition.x);
    let xvel = 2.75;  // units/second
    projectileTTL = Math.round(30*xdist/xvel);   // (30 is frames/second)
    _animProjectile_position_keys = [
        {
            frame:0,
            value:projectileStartPosition
        }, {
            frame:projectileTTL,
            value:projectileEndPosition
        }
    ];
    animProjectile_position = new MYANIM.Animation(_animProjectile_position_bab, _animProjectile_position_keys);

    // the point light's animations also depend entirely on the projectile's lifespan
    let pointDisp = new BABYLON.Vector3(-0.5, 1, 0);
    _animPoint_position_keys = [
        {
            frame:0,
            value:projectileStartPosition.add(pointDisp)
        }, {
            frame:projectileTTL,
            value:projectileEndPosition.add(pointDisp)
        }
    ];
    animPoint_position = new MYANIM.Animation(_animPoint_position_bab, _animPoint_position_keys);

    let pointFadeInFrames = 5;
    let pointFadeOutFrames = 5;
    if (projectileTTL < pointFadeInFrames+pointFadeOutFrames) {
        // if the lifespan is too short for the desired transitions, do what you can
        _animPoint_intensity_keys = [
            {
                frame:0,
                value:0
            }, {
                frame:projectileTTL/2,
                value:10
            }, {
                frame:projectileTTL,
                value:0
            }
        ];
    }
    else {
        // else realize the desired animation
        _animPoint_intensity_keys = [
            {
                frame:0,
                value:0
            }, {
                frame:pointFadeInFrames,
                value:10
            }, {
                frame:projectileTTL-pointFadeOutFrames,
                value:10
            }, {
                frame:projectileTTL,
                value:0
            }
        ];
    }
    animPoint_intensity = new MYANIM.Animation(_animPoint_intensity_bab, _animPoint_intensity_keys);
}




/**************
 * ANIMATIONS *
 **************/

// frames for the Samurai's animations, declared first so we can synchronize all bones properly
const _animSlashDown_frames = [
    0,
    // prepare: take the sword precisely in the middle
    30,
    // raise sword...
    50,
    // ...and strike down, generating a crescent-shaped wave/projectile to hit the player
    57,
    // pause (some nodes, like the cape, won't pause by necessity and will begin to return to rest)
    87,
    // return to rest
    130
];
const slashDownEase = new BABYLON.QuadraticEase();
slashDownEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
const lightEase = new BABYLON.SineEase();
lightEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

const _animSlashDown_spine_bab = new BABYLON.Animation("animSlashDown_spine", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animSlashDown_spine_bab.setEasingFunction(slashDownEase);
const _animSlashDown_spine_keys = [
    {
        frame:_animSlashDown_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animSlashDown_frames[2],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animSlashDown_frames[3],
        value:RotationFromDegrees(18.3, 0, 0)
    }, {
        frame:_animSlashDown_frames[4],
        value:RotationFromDegrees(18.3, 0, 0)
    }, {
        frame:_animSlashDown_frames[5],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animSlashDown_spine = new MYANIM.Animation(_animSlashDown_spine_bab, _animSlashDown_spine_keys);

const _animSlashDown_head_bab = new BABYLON.Animation("animSlashDown_head", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animSlashDown_head_bab.setEasingFunction(slashDownEase);
const _animSlashDown_head_keys = [
    {
        frame:_animSlashDown_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animSlashDown_frames[1],
        value:RotationFromDegrees(14, 0, 0)
    }, {
        frame:_animSlashDown_frames[2],
        value:RotationFromDegrees(14, 0, 0)
    }, {
        frame:_animSlashDown_frames[3],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animSlashDown_frames[4],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animSlashDown_frames[5],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animSlashDown_head = new MYANIM.Animation(_animSlashDown_head_bab, _animSlashDown_head_keys);

const _animSlashDown_L_upperarm_bab = new BABYLON.Animation("animSlashDown_L_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlashDown_L_upperarm_bab.setEasingFunction(slashDownEase);
const _animSlashDown_L_upperarm_keys = [
    {
        frame:_animSlashDown_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-71.8, 35.6, 0))
    }, {
        frame:_animSlashDown_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-71.8, -7.76, 0))
    }, {
        frame:_animSlashDown_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-51.9, -171, 157))
    }, {
        frame:_animSlashDown_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-45.8, 10.7, -7.97))
    }, {
        frame:_animSlashDown_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-45.8, 10.7, -7.97))
    }, {
        frame:_animSlashDown_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-71.8, 35.6, 0))
    }
];
const animSlashDown_L_upperarm = new MYANIM.Animation(_animSlashDown_L_upperarm_bab, _animSlashDown_L_upperarm_keys);

const _animSlashDown_L_forearm_bab = new BABYLON.Animation("animSlashDown_L_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlashDown_L_forearm_bab.setEasingFunction(slashDownEase);
const _animSlashDown_L_forearm_keys = [
    {
        frame:_animSlashDown_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-0.0076, -0.535, -91.6))
    }, {
        frame:_animSlashDown_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-0.346, 3.59, -79))
    }, {
        frame:_animSlashDown_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-4.52, 12.3, -49.6))
    }, {
        frame:_animSlashDown_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-0.137, -1.63, -78.5))
    }, {
        frame:_animSlashDown_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-0.137, -1.63, -78.5))
    }, {
        frame:_animSlashDown_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-0.0076, -0.535, -91.6))
    }
];
const animSlashDown_L_forearm = new MYANIM.Animation(_animSlashDown_L_forearm_bab, _animSlashDown_L_forearm_keys);

const _animSlashDown_L_hand_bab = new BABYLON.Animation("animSlashDown_L_hand", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlashDown_L_hand_bab.setEasingFunction(slashDownEase);
const _animSlashDown_L_hand_keys = [
    {
        frame:_animSlashDown_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animSlashDown_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 77.1))
    }, {
        frame:_animSlashDown_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 50.3))
    }, {
        frame:_animSlashDown_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-8.34, 80.4, 20.4))
    }, {
        frame:_animSlashDown_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-8.34, 80.4, 20.4))
    }, {
        frame:_animSlashDown_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animSlashDown_L_hand = new MYANIM.Animation(_animSlashDown_L_hand_bab, _animSlashDown_L_hand_keys);

const _animSlashDown_R_upperarm_bab = new BABYLON.Animation("animSlashDown_R_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlashDown_R_upperarm_bab.setEasingFunction(slashDownEase);
const _animSlashDown_R_upperarm_keys = [
    {
        frame:_animSlashDown_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-90, 0, 37.8))
    }, {
        frame:_animSlashDown_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-90, 0, 13.7))
    }, {
        frame:_animSlashDown_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-146, 0, 27.4))
    }, {
        frame:_animSlashDown_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-55.2, 1.87, 40.9))
    }, {
        frame:_animSlashDown_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-55.2, 1.87, 40.9))
    }, {
        frame:_animSlashDown_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-90, 0, 37.8))
    }
];
const animSlashDown_R_upperarm = new MYANIM.Animation(_animSlashDown_R_upperarm_bab, _animSlashDown_R_upperarm_keys);

const _animSlashDown_R_forearm_bab = new BABYLON.Animation("animSlashDown_R_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlashDown_R_forearm_bab.setEasingFunction(slashDownEase);
const _animSlashDown_R_forearm_keys = [
    {
        frame:_animSlashDown_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 50.2))
    }, {
        frame:_animSlashDown_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 63.2))
    }, {
        frame:_animSlashDown_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 23))
    }, {
        frame:_animSlashDown_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-1.77, -1.77, -12.4))
    }, {
        frame:_animSlashDown_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-1.77, -1.77, -12.4))
    }, {
        frame:_animSlashDown_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 50.2))
    }
];
const animSlashDown_R_forearm = new MYANIM.Animation(_animSlashDown_R_forearm_bab, _animSlashDown_R_forearm_keys);

const _animSlashDown_R_hand_bab = new BABYLON.Animation("animSlashDown_R_hand", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlashDown_R_hand_bab.setEasingFunction(slashDownEase);
const _animSlashDown_R_hand_keys = [
    {
        frame:_animSlashDown_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -31.7))
    }, {
        frame:_animSlashDown_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -77.1))
    }, {
        frame:_animSlashDown_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -50.3))
    }, {
        frame:_animSlashDown_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(23.3, -12.7, -32.9))
    }, {
        frame:_animSlashDown_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(23.3, -12.7, -32.9))
    }, {
        frame:_animSlashDown_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -31.7))
    }
];
const animSlashDown_R_hand = new MYANIM.Animation(_animSlashDown_R_hand_bab, _animSlashDown_R_hand_keys);

const _animSlashDown_ken_bab = new BABYLON.Animation("animSlashDown_ken", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animSlashDown_ken_bab.setEasingFunction(slashDownEase);
const _animSlashDown_ken_keys = [
    {
        frame:_animSlashDown_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animSlashDown_frames[2],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animSlashDown_frames[3],
        value:RotationFromDegrees(45.3, 0, 0)
    }, {
        frame:_animSlashDown_frames[4],
        value:RotationFromDegrees(45.3, 0, 0)
    }, {
        frame:_animSlashDown_frames[5],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animSlashDown_ken = new MYANIM.Animation(_animSlashDown_ken_bab, _animSlashDown_ken_keys);

const _animSlashDown_F_mant_01_bab = new BABYLON.Animation("animSlashDown_F_mant_01", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animSlashDown_F_mant_01_bab.setEasingFunction(slashDownEase);
const _animSlashDown_F_mant_01_keys = [
    {
        frame:_animSlashDown_frames[0],
        value:RotationFromDegrees(7, 0, 0)
    }, {
        frame:_animSlashDown_frames[2],
        value:RotationFromDegrees(7, 0, 0)
    }, {
        frame:_animSlashDown_frames[3],
        value:RotationFromDegrees(95, 0, 0)
    }, {
        frame:_animSlashDown_frames[5],
        value:RotationFromDegrees(7, 0, 0)
    }
];
const animSlashDown_F_mant_01 = new MYANIM.Animation(_animSlashDown_F_mant_01_bab, _animSlashDown_F_mant_01_keys);

const _animSlashDown_F_mant_02_bab = new BABYLON.Animation("animSlashDown_F_mant_02", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animSlashDown_F_mant_02_bab.setEasingFunction(slashDownEase);
const _animSlashDown_F_mant_02_keys = [
    {
        frame:_animSlashDown_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animSlashDown_frames[2],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animSlashDown_frames[3],
        value:RotationFromDegrees(55.6, 0, 0)
    }, {
        frame:_animSlashDown_frames[5],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animSlashDown_F_mant_02 = new MYANIM.Animation(_animSlashDown_F_mant_02_bab, _animSlashDown_F_mant_02_keys);

const _animSlashDown_L_mant_01_bab = new BABYLON.Animation("animSlashDown_L_mant_01", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlashDown_L_mant_01_bab.setEasingFunction(slashDownEase);
const _animSlashDown_L_mant_01_keys = [
    {
        frame:_animSlashDown_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(10, 0, 0))
    }, {
        frame:_animSlashDown_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(10, 0, 0))
    }, {
        frame:_animSlashDown_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(117, -149, -125))
    }, {
        frame:_animSlashDown_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(10, 0, 0))
    }
];
const animSlashDown_L_mant_01 = new MYANIM.Animation(_animSlashDown_L_mant_01_bab, _animSlashDown_L_mant_01_keys);

const _animSlashDown_L_mant_02_bab = new BABYLON.Animation("animSlashDown_L_mant_02", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlashDown_L_mant_02_bab.setEasingFunction(slashDownEase);
const _animSlashDown_L_mant_02_keys = [
    {
        frame:_animSlashDown_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animSlashDown_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animSlashDown_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(65.9, -1.27, 6.63))
    }, {
        frame:_animSlashDown_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animSlashDown_L_mant_02 = new MYANIM.Animation(_animSlashDown_L_mant_02_bab, _animSlashDown_L_mant_02_keys);

const _animSlashDown_R_mant_01_bab = new BABYLON.Animation("animSlashDown_R_mant_01", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlashDown_R_mant_01_bab.setEasingFunction(slashDownEase);
const _animSlashDown_R_mant_01_keys = [
    {
        frame:_animSlashDown_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(10, 0, 0))
    }, {
        frame:_animSlashDown_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(10, 0, 0))
    }, {
        frame:_animSlashDown_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(117, 149, 125))
    }, {
        frame:_animSlashDown_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(10, 0, 0))
    }
];
const animSlashDown_R_mant_01 = new MYANIM.Animation(_animSlashDown_R_mant_01_bab, _animSlashDown_R_mant_01_keys);

const _animSlashDown_R_mant_02_bab = new BABYLON.Animation("animSlashDown_R_mant_02", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animSlashDown_R_mant_02_bab.setEasingFunction(slashDownEase);
const _animSlashDown_R_mant_02_keys = [
    {
        frame:_animSlashDown_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animSlashDown_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animSlashDown_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(65.9, 1.27, -6.63))
    }, {
        frame:_animSlashDown_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animSlashDown_R_mant_02 = new MYANIM.Animation(_animSlashDown_R_mant_02_bab, _animSlashDown_R_mant_02_keys);

const _animEmission_bab = new BABYLON.Animation("animEmission", "emissiveColor", 30, BABYLON.Animation.ANIMATIONTYPE_COLOR3);
_animEmission_bab.setEasingFunction(lightEase);
const _animEmission_keys = [
    {
        frame:_animSlashDown_frames[0],
        value:BABYLON.Color3.Black()
    }, {
        frame:_animSlashDown_frames[1],
        value:BABYLON.Color3.White()
    }, {
        frame:_animSlashDown_frames[2]+4,
        value:BABYLON.Color3.White()
    }, {
        frame:_animSlashDown_frames[3],
        value:BABYLON.Color3.Black()
    }
];
const animEmission = new MYANIM.Animation(_animEmission_bab, _animEmission_keys);


const _animAmbientEmphasis_bab = new BABYLON.Animation("animAmbientEmphasis", "intensity", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
_animAmbientEmphasis_bab.setEasingFunction(lightEase);
const _animAmbientEmphasis_keys = [
    {
        frame:0,
        value:GLOBLIB.DEFAULT_AMBIENT_INTENSITY
    }, {
        frame:30,
        value:GLOBLIB.SPATK_AMBIENT_INTENSITY
    }, {
        frame:90,
        value:GLOBLIB.SPATK_AMBIENT_INTENSITY
    }, {
        frame:130,
        value:GLOBLIB.DEFAULT_AMBIENT_INTENSITY
    }
];
const animAmbientEmphasis = new MYANIM.Animation(_animAmbientEmphasis_bab, _animAmbientEmphasis_keys);


// SCENE-DEPENDENT ANIMATION
// the projectile travels in a straight line parallel to the ground
// from the enemy and through the player
var _animProjectile_position_bab = new BABYLON.Animation("animProjectile_position", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
var _animProjectile_position_keys;
var animProjectile_position;

// SCENE-DEPENDENT ANIMATION
// the point light is tied to the projectile, therefore it turns on and off at the same time as that appears and disappears
var _animPoint_intensity_bab = new BABYLON.Animation("animPoint_intensity", "intensity", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
_animPoint_intensity_bab.setEasingFunction(lightEase);
var _animPoint_intensity_keys;
var animPoint_intensity;

// SCENE-DEPENDENT ANIMATION
// the point light is tied to the projectile and travels along with it,
// but in a displaced position as the projectile's origin (its center if it were a sphere)
// may not be the best place for the point light
var _animPoint_position_bab = new BABYLON.Animation("animPoint_position", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
var _animPoint_position_keys;
var animPoint_position;

const _animHemi_bab = new BABYLON.Animation("animAgiHemi", "intensity", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
_animHemi_bab.setEasingFunction(lightEase);
const _animHemi_keys = [
    {
        frame:0,
        value:0
    }, {
        frame:5,
        value:2,
    }, {
        frame:25,
        value:0
    }
];
const animHemi = new MYANIM.Animation(_animHemi_bab, _animHemi_keys);



/***************
 * AUX. MESHES *
 ***************/

// In which we define any extra meshes used to represent the attack,
// in this case a very simple specifically-crafted blade/shockwave
// whose shape is identified with a crescent moon to reinforce this enemy's theme.

// will contain the projectile mesh's root node (used to position it), once it's created for the current scene
var projectileRoot;
// will contain the projectile mesh (which contains the material and is better for scaling), once it's created for the current scene
var projectileMesh;
// the promise that will resolve once the projectile mesh is properly loaded.
// always assumed to be valid, since we call every character's sceneSpecificInit at the very start of the battle
var projectileLoadingPromise;

/**
 * Creates the auxiliary mesh for this attack (a crescent-like blade/wave)
 * in the current scene and initializes its properties.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function initAuxMeshes(sceneInfo) {
    projectileLoadingPromise = BABYLON.SceneLoader.ImportMeshAsync("", "assets/Moonblade/", "moonblade.gltf", sceneInfo.scene).then((result) => {
        // get both results via destructuring assignment
        [projectileRoot, projectileMesh] = result.meshes;

        // initial positioning
        projectileRoot.position = projectileStartPosition;
        projectileRoot.rotation = new BABYLON.Vector3(0, Math.PI*0.5, 0);
        projectileMesh.scaling = new BABYLON.Vector3(0.9, 1.2, 1.2);

        // we set no material in Blender, but the GLTF loader still makes one by default.
        // let us delete that so we can replace it with a simpler one
        projectileMesh.material.dispose();

        // define a material for it: very emissive (it is a shining projectile!),
        // with a little diffuse to give it some 3D shading,
        // and no specular (mostly for coherence with the other special attacks)
        projectileMesh.material = new BABYLON.StandardMaterial("projectileMaterial", sceneInfo.scene);
        projectileMesh.material.diffuseColor = colorDark;
        projectileMesh.material.specularColor = new BABYLON.Color3(0,0,0);
        projectileMesh.material.emissiveColor = colorMain;

        // This mesh is normally disabled, and only enabled when the enemy
        // decides to use this attack
        projectileRoot.setEnabled(false);

        // exclude the projectile from the point light, since it represents the emitted light
        pointExcluded = [projectileMesh];
    });
}



/*************
 * PARTICLES *
 *************/

/**
 * The particle system for this attack
 */
var particles;

/**
 * Initializes the particle system for this attack in the given scene.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function initParticles(sceneInfo) {
    // Create particle system...
    particles = new BABYLON.ParticleSystem("lunaParticles", 2000, sceneInfo.scene);
    // ...and configure it
    particles.particleTexture = new BABYLON.Texture("assets/flare.png", sceneInfo.scene);
    particles.emitter = sceneInfo.player.pierceTarget;
    particles.minEmitBox = new BABYLON.Vector3(-0.01, 0, -0.01); // minimum box dimensions
    particles.maxEmitBox = new BABYLON.Vector3(0.01, 0, 0.01); // maximum box dimensions
    particles.minSize = 0.01;
    particles.maxSize = 0.05;
    particles.minLifeTime = 0.3;
    particles.maxLifeTime = 0.5;
    particles.emitRate = 1200;
    particles.direction1 = new BABYLON.Vector3(0.6, 1, 0.05);
    particles.direction2 = new BABYLON.Vector3(-0.6, -1, -0.05);
    particles.minEmitPower = 2;
    particles.maxEmitPower = 3;
    particles.updateSpeed = 0.01;
    particles.gravity = new BABYLON.Vector3(0, -9.81/8, 0);
}


/**
 * Initializes all animation events of this attack
 * for the current scene
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function makeEvents(sceneInfo) {

    const projectileSpawnEventFrame = 54;   // <- set this to easily change when the event happens  (55 is also nice)
    const damageEventFrame = 7;           // <- set this to easily change when the event happens  (8 is also fine)
    const particleStopEventFrame = 22;   // <- set this to easily change when the event happens  (23 is also good)

    animSlashDown_spine.anim.removeEvents(projectileSpawnEventFrame);
    const projectileSpawnEvent = new BABYLON.AnimationEvent(
        projectileSpawnEventFrame,
        function() {
            // have the projectile appear and animate
            projectileRoot.setEnabled(true);
            MYANIM.directAnimation(sceneInfo.scene, projectileRoot, [animProjectile_position], () => {projectileRoot.setEnabled(false);});
            // turn on the point light as well, and have it travel with the projectile,
            // representing the light it emits while traveling
            sceneInfo.effectPointLight.setEnabled(true);
            MYANIM.directAnimation(sceneInfo.scene, sceneInfo.effectPointLight, [animPoint_intensity], ()=>{sceneInfo.effectPointLight.setEnabled(false);});
            MYANIM.directAnimation(sceneInfo.scene, sceneInfo.effectPointLight, [animPoint_position]);
        },
        true
    );
    animSlashDown_spine.anim.addEvent(projectileSpawnEvent);

    animProjectile_position.anim.removeEvents(damageEventFrame);
    const damageEvent = new BABYLON.AnimationEvent(
        damageEventFrame,
        function() {
            particles.start();
            sceneInfo.effectHemiLight.setEnabled(true);
            MYANIM.directAnimation(sceneInfo.scene, sceneInfo.effectHemiLight, [animHemi], ()=>{sceneInfo.effectHemiLight.setEnabled(false);});
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
    animProjectile_position.anim.addEvent(damageEvent);

    animProjectile_position.anim.removeEvents(particleStopEventFrame);
    const particleStopEvent = new BABYLON.AnimationEvent(
        particleStopEventFrame,
        function() {
            particles.stop();
        },
        true
    );
    animProjectile_position.anim.addEvent(particleStopEvent);
}



/**
 * Randomly determines the damage dealt by this attack.
 * @returns The rolled damage
 */
function rollDamage() {
    if (theOptions.hardMode) {
        return d(8) + 8;
    }
    else {
        return d(4) + 8;
    }
}

/**
 * Executes this attack: performs all animations, triggering damage etc.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function perform(sceneInfo) {
    // only initiate the attack if the projectile is loaded, otherwise wait a little more
    // ( it is very unlikely for the mesh to not have been loaded by the first enemy turn anyway,
    //   as it is a very simple mesh and it has the whole first turn of the player before that
    //   (including the user thinking and selecting an action, and the animation being performed) )
    projectileLoadingPromise.then(() => {    // it has been verified that using an already-created promise in this way will NOT cause the mesh to reload every time this attack is performed
        samurai.meshdata.stopAllAnimations(sceneInfo.scene);
        //shared effect light management
        sceneInfo.effectPointLight.position = projectileStartPosition;
        sceneInfo.effectPointLight.diffuse = diffuse;
        sceneInfo.effectPointLight.specular = specular;
        sceneInfo.effectPointLight.excludedMeshes = pointExcluded;
        sceneInfo.effectPointLight.shadowEnabled = true;

        sceneInfo.effectHemiLight.direction = hemiDir;
        sceneInfo.effectHemiLight.diffuse = diffuse;
        sceneInfo.effectHemiLight.specular = specular;
        sceneInfo.effectHemiLight.groundColor = ground;
        sceneInfo.effectHemiLight.includedOnlyMeshes = includedOnly;

        //animation
        MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getBone("Bip01_Spine"), [animSlashDown_spine], ()=>{samurai.idle(sceneInfo)});
        MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getBone("Bip01_Head"), [animSlashDown_head]);
        MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getBone("Bip01_L_UpperArm"), [animSlashDown_L_upperarm]);
        MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getBone("Bip01_L_Forearm"), [animSlashDown_L_forearm]);
        MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getBone("Bip01_L_Hand"), [animSlashDown_L_hand]);
        MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getBone("Bip01_R_UpperArm"), [animSlashDown_R_upperarm]);
        MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getBone("Bip01_R_Forearm"), [animSlashDown_R_forearm]);
        MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getBone("Bip01_R_Hand"), [animSlashDown_R_hand]);
        MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getBone("ken_move01"), [animSlashDown_ken]);
        MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getBone("b_F_mant_01"), [animSlashDown_F_mant_01]);
        MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getBone("b_F_mant_02"), [animSlashDown_F_mant_02]);
        MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getBone("b_L_mant_01"), [animSlashDown_L_mant_01]);
        MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getBone("b_L_mant_02"), [animSlashDown_L_mant_02]);
        MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getBone("b_R_mant_01"), [animSlashDown_R_mant_01]);
        MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.getBone("b_R_mant_02"), [animSlashDown_R_mant_02]);
        MYANIM.directAnimation(sceneInfo.scene, samurai.meshdata.theMaterialWithEmission, [animEmission]);
        MYANIM.directAnimation(sceneInfo.scene, sceneInfo.ambientLight, [animAmbientEmphasis], ()=>{sceneInfo.turn_system.enemy_done();});
    })
}

/**
 * The exported object.
 */
const luna = {
    perform,
    makeEvents,
    initParams,
    initParticles,
    initAuxMeshes,
    animations: {
        animSlashDown_spine,
        animSlashDown_head,
        animSlashDown_L_upperarm,
        animSlashDown_L_forearm,
        animSlashDown_L_hand,
        animSlashDown_R_upperarm,
        animSlashDown_R_forearm,
        animSlashDown_R_hand,
        animSlashDown_ken,
        animSlashDown_F_mant_01,
        animSlashDown_F_mant_02,
        animSlashDown_L_mant_01,
        animSlashDown_L_mant_02,
        animSlashDown_R_mant_01,
        animSlashDown_R_mant_02,
        animAmbientEmphasis,
        animProjectile_position,
        animPoint_intensity,
        animPoint_position,
        animHemi,
    },
    rollDamage
};

export default luna;