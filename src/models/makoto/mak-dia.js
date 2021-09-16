/**
 * File for Makoto's "Prayer" action,
 * conventionally called "Dia" in the code for short.
 * Contains all the related animations and animation events for Makoto,
 * as well as the instructions to perform it and heal the player.
 * 
 * EXPORTS a JS object containing all the necessary info about it.
 */

import * as MYANIM from "../../utils/animation.js"
import makoto from "./makoto.js";
import {RotationFromDegrees} from "../../utils/angles.js";
import {d} from "../../utils/random.js"

import * as GLOBLIB from "../../utils/lib-global.js";

/**************
 * ANIMATIONS *
 **************/

const _animPray_frames = [
    0,
    // join hands and invert the sword's grip so it doesn't stick out of Makoto's head
    30,    // the sword has to finish earlier than the hands so it finishes before the arm moves too much: it would result in too wide a motion for the sword
    // still joining hands
    49,
    // pause a for just a few frames before activating the power
    54,
    // look up and activate effect
    64,
    // remain in this position for the duration of all the special effects
    90,
    // return to rest
    100,   // again, the sword has to start later to avoid a wide swing in total
    // keep returning to rest
    120
]
const prayEase = new BABYLON.SineEase();
prayEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
const lightEase = new BABYLON.SineEase();
lightEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

const _animPray_L_upperarm_bab = new BABYLON.Animation("animPray_L_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animPray_L_upperarm_bab.setEasingFunction(prayEase);
const _animPray_L_upperarm_keys = [
    {
        frame:_animPray_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -32.7, -17))
    }, {
        frame:_animPray_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-2.38, -76, -7.59))
    }, {
        frame:_animPray_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-2.38, -76, -7.59))
    }, {
        frame:_animPray_frames[7],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -32.7, -17))
    }
];
const animPray_L_upperarm = new MYANIM.Animation(_animPray_L_upperarm_bab, _animPray_L_upperarm_keys);

const _animPray_L_forearm_bab = new BABYLON.Animation("animPray_L_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animPray_L_forearm_bab.setEasingFunction(prayEase);
const _animPray_L_forearm_keys = [
    {
        frame:_animPray_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -50.5, 17.6))
    }, {
        frame:_animPray_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-11.7, -107, 96.7))
    }, {
        frame:_animPray_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-11.7, -107, 96.7))
    }, {
        frame:_animPray_frames[7],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -50.5, 17.6))
    }
];
const animPray_L_forearm = new MYANIM.Animation(_animPray_L_forearm_bab, _animPray_L_forearm_keys);

const _animPray_R_upperarm_bab = new BABYLON.Animation("animPray_R_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animPray_R_upperarm_bab.setEasingFunction(prayEase);
const _animPray_R_upperarm_keys = [
    {
        frame:_animPray_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -20.3, 0))
    }, {
        frame:_animPray_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(10.6, 69.6, -6.5))
    }, {
        frame:_animPray_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(10.6, 69.6, -6.5))
    }, {
        frame:_animPray_frames[7],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -20.3, 0))
    }
];
const animPray_R_upperarm = new MYANIM.Animation(_animPray_R_upperarm_bab, _animPray_R_upperarm_keys);

const _animPray_R_forearm_bab = new BABYLON.Animation("animPray_R_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animPray_R_forearm_bab.setEasingFunction(prayEase);
const _animPray_R_forearm_keys = [
    {
        frame:_animPray_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 41.6, 0))
    }, {
        frame:_animPray_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-27.2, 133, -106))
    }, {
        frame:_animPray_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-27.2, 133, -106))
    }, {
        frame:_animPray_frames[7],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 41.6, 0))
    }
];
const animPray_R_forearm = new MYANIM.Animation(_animPray_R_forearm_bab, _animPray_R_forearm_keys);

const _animPray_R_hand_bab = new BABYLON.Animation("animPray_R_hand", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animPray_R_hand_bab.setEasingFunction(prayEase);
const _animPray_R_hand_keys = [
    {
        frame:_animPray_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animPray_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-21.1, -16.7, 3.9))
    }, {
        frame:_animPray_frames[5],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-21.1, -16.7, 3.9))
    }, {
        frame:_animPray_frames[7],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animPray_R_hand = new MYANIM.Animation(_animPray_R_hand_bab, _animPray_R_hand_keys);

const _animPray_weapon_bab = new BABYLON.Animation("animPray_weapon", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animPray_weapon_bab.setEasingFunction(prayEase);
// This animation CANNOT use quaternions:
// the interplation they require would have the sword cut through Makoto!
const _animPray_weapon_keys = [
    {
        frame:_animPray_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animPray_frames[1],
        value:RotationFromDegrees(-19.4, -207, 34.6)
    }, {
        frame:_animPray_frames[6],
        value:RotationFromDegrees(-19.4, -207, 34.6)
    }, {
        frame:_animPray_frames[7],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animPray_weapon = new MYANIM.Animation(_animPray_weapon_bab, _animPray_weapon_keys);

const _animPray_neck_bab = new BABYLON.Animation("animPray_neck", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animPray_neck_bab.setEasingFunction(prayEase);
const _animPray_neck_keys = [
    {
        frame:_animPray_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animPray_frames[3],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animPray_frames[4],
        value:RotationFromDegrees(-30, 0, 0)
    }, {
        frame:_animPray_frames[5],
        value:RotationFromDegrees(-30, 0, 0)
    }, {
        frame:_animPray_frames[7],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animPray_neck = new MYANIM.Animation(_animPray_neck_bab, _animPray_neck_keys);

const _animAmbientEmphasis_bab = new BABYLON.Animation("animAmbientEmphasis", "intensity", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
_animAmbientEmphasis_bab.setEasingFunction(lightEase);
const _animAmbientEmphasis_keys = [
    {
        frame:0,
        value:GLOBLIB.DEFAULT_AMBIENT_INTENSITY
    }, {
        frame:45,
        value:GLOBLIB.SPATK_AMBIENT_INTENSITY
    }, {
        frame:90,
        value:GLOBLIB.SPATK_AMBIENT_INTENSITY
    }, {
        frame:120,
        value:GLOBLIB.DEFAULT_AMBIENT_INTENSITY
    }
];
const animAmbientEmphasis = new MYANIM.Animation(_animAmbientEmphasis_bab, _animAmbientEmphasis_keys);

const _animPoint_bab = new BABYLON.Animation("animAgiPoint", "intensity", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
_animPoint_bab.setEasingFunction(lightEase);
const _animPoint_keys = [
    {
        frame:0,
        value:0
    }, {
        frame:15,
        value:1,
    }, {
        frame:50,
        value:0
    }
];
const animPoint = new MYANIM.Animation(_animPoint_bab, _animPoint_keys);

const _animHemi_bab = new BABYLON.Animation("animAgiHemi", "intensity", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
_animHemi_bab.setEasingFunction(lightEase);
const _animHemi_keys = [
    {
        frame:0,
        value:0
    }, {
        frame:15,
        value:4,
    }, {
        frame:50,
        value:0
    }
];
const animHemi = new MYANIM.Animation(_animHemi_bab, _animHemi_keys);




/**************
 * PARAMETERS *
 **************/

// constant
//Light colors
const diffuse = new BABYLON.Color3(0, 1, 0.68);
const specular = new BABYLON.Color3(0, 1, 1);
const ground = new BABYLON.Color3(0, 1, 0.68);
//Direction of the hemispheric light
const hemiDir = new BABYLON.Vector3(1, 0, -1);   //irrelevant, groundcolor is the same

// scene-dependent
//The position of the point light
var pointPos = new BABYLON.Vector3(-1, 0.5, 0);    // reasonably initialized with the expected player position
//Meshes to affect with the hemispheric light
var includedOnly = [];

/**
 * Initializes the scene-dependent parameters
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function initParams(sceneInfo) {
    pointPos = sceneInfo.player.defaultPosition.add(new BABYLON.Vector3(0, 0.5, 0));
    includedOnly = [];
    includedOnly.push(...sceneInfo.player.meshdata.meshes);
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
    particles = new BABYLON.ParticleSystem("diaParticles", 2000, sceneInfo.scene);
    // ...and configure it
    particles.particleTexture = new BABYLON.Texture("assets/particle.png", sceneInfo.scene);
    particles.emitter = sceneInfo.player.defaultPosition.add(new BABYLON.Vector3(0, -0.25, 0));
    particles.color1 = diffuse;
    particles.color2 = diffuse;
    particles.minEmitBox = new BABYLON.Vector3(-0.01, 0, -0.01); // minimum box dimensions
    particles.maxEmitBox = new BABYLON.Vector3(0.01, 0, 0.01); // maximum box dimensions
    particles.minSize = 0.04;
    particles.maxSize = 0.09;
    particles.minInitialRotation = -Math.PI/4;
    particles.maxInitialRotation = Math.PI/4;
    particles.minLifeTime = 1.0;
    particles.maxLifeTime = 1.0;
    particles.emitRate = 600;
    particles.direction1 = new BABYLON.Vector3(0.4, 1, 0.4);
    particles.direction2 = new BABYLON.Vector3(-0.4, 1, -0.4);
    particles.minEmitPower = 1;
    particles.maxEmitPower = 2;
    particles.updateSpeed = 0.01;
    particles.gravity = new BABYLON.Vector3(0, -9.81/8, 0);
}



/**
 * Initializes all animation events of this attack
 * for the current scene
 * @param {*} sceneInfo Scene Info object for the current scene
 */
 function makeEvents(sceneInfo) {

    const diaEventOneFrame = 56;   // <- set this to easily change when the event happens
    const diaEventTwoFrame = 85;   // <- set this to easily change when the event happens

    animPray_R_upperarm.anim.removeEvents(diaEventOneFrame);
    const diaEventOne = new BABYLON.AnimationEvent(
        diaEventOneFrame,
        function() {
            sceneInfo.effectPointLight.setEnabled(true);
            sceneInfo.effectHemiLight.setEnabled(true);
            particles.start();
            MYANIM.directAnimation(sceneInfo.scene, sceneInfo.effectPointLight, [animPoint], ()=>{sceneInfo.effectPointLight.setEnabled(false);});
            MYANIM.directAnimation(sceneInfo.scene, sceneInfo.effectHemiLight, [animHemi], ()=>{sceneInfo.effectHemiLight.setEnabled(false);});
            let heal = rollHealing();
            makoto.hp += heal;
            if (makoto.hp > makoto.maxhp) {
                makoto.hp = makoto.maxhp;
            }
            sceneInfo.ui.showHealing(heal, makoto);
        },
        true
    );
    animPray_R_upperarm.anim.addEvent(diaEventOne);

    animPray_R_upperarm.anim.removeEvents(diaEventTwoFrame);
    const diaEventTwo = new BABYLON.AnimationEvent(
        diaEventTwoFrame,
        function() {
            particles.stop();
        },
        true
    );
    animPray_R_upperarm.anim.addEvent(diaEventTwo);
}


/**
 * Randomly determines the amount healed by this action.
 * @returns The rolled healing
 */
 function rollHealing() {
    return d(8) + 20;
}


/**
 * Executes this action: performs all animations, triggering healing etc.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
 function perform(sceneInfo) {
    sceneInfo.turn_system.enemy_done();   //enemy has no action in this case
    makoto.meshdata.stopAllAnimations(sceneInfo.scene);
    //shared effect light management
    sceneInfo.effectPointLight.position = pointPos;
    sceneInfo.effectPointLight.diffuse = diffuse;
    sceneInfo.effectPointLight.specular = specular;
    sceneInfo.effectPointLight.shadowEnabled = false;

    sceneInfo.effectHemiLight.direction = hemiDir;
    sceneInfo.effectHemiLight.diffuse = diffuse;
    sceneInfo.effectHemiLight.specular = specular;
    sceneInfo.effectHemiLight.groundColor = ground;
    sceneInfo.effectHemiLight.includedOnlyMeshes = includedOnly;

    //animation
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("Bip01_L_UpperArm"), [animPray_L_upperarm], ()=>{sceneInfo.turn_system.player_done(sceneInfo);});
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("Bip01_L_Forearm"), [animPray_L_forearm]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("Bip01_R_UpperArm"), [animPray_R_upperarm]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("Bip01_R_Forearm"), [animPray_R_forearm]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("Bip01_R_Hand"), [animPray_R_hand]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("weapon"), [animPray_weapon]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("Bip01_Neck"), [animPray_neck]);
    MYANIM.directAnimation(sceneInfo.scene, sceneInfo.ambientLight, [animAmbientEmphasis]);
}



/**
 * The exported object.
 */
const dia = {
    perform,
    makeEvents,
    initParams,
    initParticles,
    animations: {
        animPray_L_upperarm,
        animPray_L_forearm,
        animPray_R_upperarm,
        animPray_R_forearm,
        animPray_R_hand,
        animPray_weapon,
        animPray_neck,
        animAmbientEmphasis,
        animPoint,
        animHemi,
    },
    rollHealing,
};

export default dia;