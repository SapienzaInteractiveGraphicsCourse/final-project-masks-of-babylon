/**
 * File for Makoto's "Fireball" attack,
 * referred to as "Agi" in the code for short
 * and to avoid any ambiguity with the fireball object.
 * Contains all the related animations and animation events for Makoto,
 * as well as the instructions to perform it and damage the enemy.
 * 
 * EXPORTS a JS object containing all the necessary info about it.
 */

import * as MYANIM from "../../utils/animation.js"
import makoto from "./makoto.js";
import {RotationFromDegrees} from "../../utils/angles.js";
import {d} from "../../utils/random.js"

import * as GLOBLIB from "../../utils/lib-global.js";

/**************
 * PARAMETERS *
 **************/

// Color palette of the attack, influences both fireball mesh and light
const colorMain = new BABYLON.Color3(1, 0, 0);
const colorDark = new BABYLON.Color3(0.4, 0.3, 0.2);
const colorBright = new BABYLON.Color3(1, 0.5, 0);

// constant
//Light colors
const diffuse = colorMain;
const specular = colorBright;


// SCENE-DEPENDENT:
// starting position of the fireball
var fireballStartPosition;
//The point the fireball has to reach and explode in
var target = new BABYLON.Vector3(1, 0, 0);    // reasonably initialized with the most common enemy position

/**
 * Initializes the scene-dependent parameters
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function initParams(sceneInfo) {
    fireballStartPosition = makoto.defaultPosition.add(new BABYLON.Vector3(0.25, 0.7, -0.045));
    target = sceneInfo.enemy.projectileTarget;

    // also initialize the fireball animation, dependent on these positions
    _animFireball_position_keys = [
        {
            frame:0,
            value:fireballStartPosition
        }, {
            frame:24,
            value:target
        }
    ];
    animFireball_position = new MYANIM.Animation(_animFireball_position_bab, _animFireball_position_keys);

    _animPoint_position_keys = [
        {
            frame:0,
            value:fireballStartPosition
        }, {
            frame:24,
            value:target.add(new BABYLON.Vector3(-0.3, 0, 0))
            // displace the light source a little bit wrt the mesh because the explosion should happen close
            // but the explosion point is too close to generate good shadows.
            // the difference in appearance is negligible.
        }
    ];
    animPoint_position = new MYANIM.Animation(_animPoint_position_bab, _animPoint_position_keys);
}




/**************
 * ANIMATIONS *
 **************/

// frames for Makoto's animations, declared first so we can synchronize all bones properly
const _animShoot_frames = [
    0,
    // go to ready position
    30,
    // wait in ready position
    45,
    // perform throwing motion
    55,
    // return to rest, more slowly
    90
]
const shootEase = new BABYLON.QuadraticEase();
shootEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
const lightEase = new BABYLON.SineEase();
lightEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

const _animShoot_spine1_bab = new BABYLON.Animation("animShoot_spine1", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animShoot_spine1_bab.setEasingFunction(shootEase);
const _animShoot_spine1_keys = [
    {
        frame:_animShoot_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animShoot_frames[1],
        value:RotationFromDegrees(0, -22.5, 0)
    }, {
        frame:_animShoot_frames[2],
        value:RotationFromDegrees(0, -22.5, 0)
    }, {
        frame:_animShoot_frames[3],
        value:RotationFromDegrees(0, 21.3, 0)
    }, {
        frame:_animShoot_frames[4],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animShoot_spine1 = new MYANIM.Animation(_animShoot_spine1_bab, _animShoot_spine1_keys);

const _animShoot_neck_bab = new BABYLON.Animation("animShoot_neck", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animShoot_neck_bab.setEasingFunction(shootEase);
const _animShoot_neck_keys = [
    {
        frame:_animShoot_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animShoot_frames[1],
        value:RotationFromDegrees(0, 22.5, 0)
    }, {
        frame:_animShoot_frames[2],
        value:RotationFromDegrees(0, 22.5, 0)
    }, {
        frame:_animShoot_frames[3],
        value:RotationFromDegrees(0, -22.5, 0)
    }, {
        frame:_animShoot_frames[4],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animShoot_neck = new MYANIM.Animation(_animShoot_neck_bab, _animShoot_neck_keys);

const _animShoot_L_clavicle_bab = new BABYLON.Animation("animShoot_L_clavicle", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animShoot_L_clavicle_bab.setEasingFunction(shootEase);
const _animShoot_L_clavicle_keys = [
    {
        frame:_animShoot_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animShoot_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-60, -45.4, 12))
    }, {
        frame:_animShoot_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-60, -45.4, 12))
    }, {
        frame:_animShoot_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-25, -12.8, 27.9))
    }, {
        frame:_animShoot_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animShoot_L_clavicle = new MYANIM.Animation(_animShoot_L_clavicle_bab, _animShoot_L_clavicle_keys);

const _animShoot_L_upperarm_bab = new BABYLON.Animation("animShoot_L_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animShoot_L_upperarm_bab.setEasingFunction(shootEase);
const _animShoot_L_upperarm_keys = [
    {
        frame:_animShoot_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -32.7, -17))
    }, {
        frame:_animShoot_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-18.3, -44.3, -35.1))
    }, {
        frame:_animShoot_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-18.3, -44.3, -35.1))
    }, {
        frame:_animShoot_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-0.0208, -34.3, 18.3))
    }, {
        frame:_animShoot_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -32.7, -17))
    }
];
const animShoot_L_upperarm = new MYANIM.Animation(_animShoot_L_upperarm_bab, _animShoot_L_upperarm_keys);

const _animShoot_L_forearm_bab = new BABYLON.Animation("animShoot_L_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animShoot_L_forearm_bab.setEasingFunction(shootEase);
const _animShoot_L_forearm_keys = [
    {
        frame:_animShoot_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -50.5, 17.6))
    }, {
        frame:_animShoot_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-42.2, -90.9, 26))
    }, {
        frame:_animShoot_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-42.2, -90.9, 26))
    }, {
        frame:_animShoot_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-9.78, -17.2, -5.29))
    }, {
        frame:_animShoot_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, -50.5, 17.6))
    }
];
const animShoot_L_forearm = new MYANIM.Animation(_animShoot_L_forearm_bab, _animShoot_L_forearm_keys);

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
        frame:120,
        value:GLOBLIB.DEFAULT_AMBIENT_INTENSITY
    }
];
const animAmbientEmphasis = new MYANIM.Animation(_animAmbientEmphasis_bab, _animAmbientEmphasis_keys);


const _animFireball_scaling_bab = new BABYLON.Animation("animFireball_scaling", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
const _animFireball_scaling_keys = [
    {
        frame:0,
        value:BABYLON.Vector3.Zero()
    }, {
        frame:5,
        value:BABYLON.Vector3.One()
    }
];
const animFireball_scaling = new MYANIM.Animation(_animFireball_scaling_bab, _animFireball_scaling_keys);


// SCENE-DEPENDENT ANIMATION
// fireball goes from player to enemy
var _animFireball_position_bab = new BABYLON.Animation("animFireball_position", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
var _animFireball_position_keys;
var animFireball_position;

// SCENE-DEPENDENT ANIMATION
// same for the light emitted by it
var _animPoint_position_bab = new BABYLON.Animation("animPoint_position", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
var _animPoint_position_keys;
var animPoint_position;

const _animPoint_intensity_bab = new BABYLON.Animation("animPoint_intensity", "intensity", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
_animPoint_intensity_bab.setEasingFunction(lightEase);
const _animPoint_intensity_keys = [
    {
        frame:0,
        value:0
    }, {
        frame:5,
        value:2,
    }, {
        frame:24,
        value:2,
    }, {    // upon explosion the light intensifies in order to convey something did explode and make the shadows more visible
        frame:26,
        value:15,
    }, {
        frame:30,
        value:15,
    }, {
        frame:54,
        value:0
    }
];
const animPoint_intensity = new MYANIM.Animation(_animPoint_intensity_bab, _animPoint_intensity_keys);



/***************
 * AUX. MESHES *
 ***************/

// In which we define any extra meshes used to represent the attack,
// in this case a fireball (sphere) shot by Makoto.

var fireball;   // will contain the sphere mesh, once it's created for the current scene

/**
 * Creates the auxiliary mesh for this attack (a sphere) in the current scene
 * and initializes its properties.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function initAuxMeshes(sceneInfo) {
    // create the mesh
    fireball = BABYLON.MeshBuilder.CreateSphere("fireball", {
        diameter: 0.25,
        segments: 16,
    }, sceneInfo.scene);
    // position it
    fireball.position = fireballStartPosition;
    // define a material for it: very emissive (it is a fireball!),
    // with a little diffuse to give it some 3D shading,
    // and no specular (a fireball shouldn't have specular reflection)
    fireball.material = new BABYLON.StandardMaterial("fireballMaterial", sceneInfo.scene);
    fireball.material.diffuseColor = colorDark;
    fireball.material.specularColor = new BABYLON.Color3.Black();
    fireball.material.emissiveTexture = new BABYLON.Texture("assets/sun360.jpg", sceneInfo.scene);
    // This mesh is normally disabled, and only enabled when the player
    // decides to use this attack
    fireball.setEnabled(false);
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
    particles = new BABYLON.ParticleSystem("agiParticles", 2000, sceneInfo.scene);
    // ...and configure it
    particles.particleTexture = new BABYLON.Texture("assets/fire.png", sceneInfo.scene);
    particles.emitter = target;
    particles.minEmitBox = new BABYLON.Vector3(-0.01, 0, -0.01); // minimum box dimensions
    particles.maxEmitBox = new BABYLON.Vector3(0.01, 0, 0.01); // maximum box dimensions
    particles.minSize = 0.01;
    particles.maxSize = 0.05;
    particles.minLifeTime = 0.3;
    particles.maxLifeTime = 0.3;
    particles.emitRate = 1000;
    particles.direction1 = new BABYLON.Vector3(1, 1, 1);
    particles.direction2 = new BABYLON.Vector3(-1, -1, -1);
    particles.minEmitPower = 2;
    particles.maxEmitPower = 3;
    particles.updateSpeed = 0.01;
    particles.gravity = new BABYLON.Vector3(0, -9.81/2, 0);
}


/**
 * Initializes all animation events of this attack
 * for the current scene
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function makeEvents(sceneInfo) {

    const fireballSpawnEventFrame = 50;      // <- set this to easily change when the event happens
    const particleStopEventFrame = 41;      // <- set this to easily change when the event happens

    animShoot_L_forearm.anim.removeEvents(fireballSpawnEventFrame);
    const fireballSpawnEvent = new BABYLON.AnimationEvent(
        fireballSpawnEventFrame,
        function() {
            // have the fireball appear and animate
            fireball.setEnabled(true);
            MYANIM.directAnimation(sceneInfo.scene, fireball, [animFireball_scaling]);
            MYANIM.directAnimation(sceneInfo.scene, fireball, [animFireball_position], () => {
                _fireballExplode(sceneInfo);
                fireball.setEnabled(false);
            });
            // turn on the point light as well, and have it travel with the fireball,
            // representing the light it emits while traveling
            // and later the light of the explosion
            sceneInfo.effectPointLight.setEnabled(true);
            MYANIM.directAnimation(sceneInfo.scene, sceneInfo.effectPointLight, [animPoint_intensity], ()=>{sceneInfo.effectPointLight.setEnabled(false);});
            MYANIM.directAnimation(sceneInfo.scene, sceneInfo.effectPointLight, [animPoint_position]);
        },
        true
    );
    animShoot_L_forearm.anim.addEvent(fireballSpawnEvent);

    animPoint_intensity.anim.removeEvents(particleStopEventFrame);
    const particleStopEvent = new BABYLON.AnimationEvent(
        particleStopEventFrame,
        function() {
            particles.stop();
        },
        true
    );
    animPoint_intensity.anim.addEvent(particleStopEvent);
}

/**
 * Called at the end of the fireball's motion,
 * this function causes it to explode and trigger the effects of the attack.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function _fireballExplode(sceneInfo) {
    particles.start();
    let dmg = rollDamage();
    sceneInfo.enemy.hp -= dmg;
    sceneInfo.ui.showDamage(dmg, sceneInfo.enemy);
    sceneInfo.enemy.flinch(sceneInfo, ()=>{sceneInfo.turn_system.enemy_done(sceneInfo);});
}



/**
 * Randomly determines the damage dealt by this attack.
 * @returns The rolled damage
 */
function rollDamage() {
    return d(4) + 12;
}

/**
 * Executes this attack: performs all animations, triggering damage etc.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function perform(sceneInfo) {
    makoto.meshdata.stopAllAnimations(sceneInfo.scene);
    //shared effect light management
    sceneInfo.effectPointLight.position = target;
    sceneInfo.effectPointLight.diffuse = diffuse;
    sceneInfo.effectPointLight.specular = specular;
    sceneInfo.effectPointLight.shadowEnabled = true;
    //animation
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("Bip01_Spine1"), [animShoot_spine1]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("Bip01_Neck"), [animShoot_neck]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("Bip01_L_Clavicle"), [animShoot_L_clavicle]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("Bip01_L_UpperArm"), [animShoot_L_upperarm]);
    MYANIM.directAnimation(sceneInfo.scene, makoto.meshdata.getBone("Bip01_L_Forearm"), [animShoot_L_forearm], ()=>{makoto.idle(sceneInfo)});
    MYANIM.directAnimation(sceneInfo.scene, sceneInfo.ambientLight, [animAmbientEmphasis], ()=>{sceneInfo.turn_system.player_done();});
}

/**
 * The exported object.
 */
const agi = {
    perform,
    makeEvents,
    initParams,
    initParticles,
    initAuxMeshes,
    animations: {
        animShoot_spine1,
        animShoot_neck,
        animShoot_L_clavicle,
        animShoot_L_upperarm,
        animShoot_L_forearm,
        animAmbientEmphasis,
        animPoint_position,
        animPoint_intensity,
    },
    rollDamage
};

export default agi;