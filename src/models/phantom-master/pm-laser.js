/**
 * File for Phantom Master's "Laser" attack.
 * Contains all the related animations and animation events for the Phantom,
 * as well as the instructions to perform it and damage the player.
 * 
 * EXPORTS a JS object containing all the necessary info about it.
 */

import * as MYANIM from "../../utils/animation.js"
import phantomMaster from "./phantom-master.js";
import { RotationFromDegrees } from "../../utils/angles.js";
import {d} from "../../utils/random.js"

import * as GLOBLIB from "../../utils/lib-global.js";
import { theOptions } from "../../utils/options.js";

/**************
 * ANIMATIONS *
 **************/

const _animShoot_frames = [
    0,
    // get in ready position
    38,
    // quickly spread arms and cape (and shoot laser from the mask via AnimationEvent)
    42,
    // pause until beam is done
    80,
    // return to rest
    110
];
const shootEase = new BABYLON.QuadraticEase();
shootEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
const lightEase = new BABYLON.SineEase();
lightEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

const _animShoot_spine2_bab = new BABYLON.Animation("animShoot_spine2", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animShoot_spine2_bab.setEasingFunction(shootEase);
const _animShoot_spine2_keys = [
    {
        frame:_animShoot_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animShoot_frames[1],
        value:RotationFromDegrees(5, 0, 0)
    }, {
        frame:_animShoot_frames[2],
        value:RotationFromDegrees(10, 0, 0)
    }, {
        frame:_animShoot_frames[3],
        value:RotationFromDegrees(10, 0, 0)
    }, {
        frame:_animShoot_frames[4],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animShoot_spine2 = new MYANIM.Animation(_animShoot_spine2_bab, _animShoot_spine2_keys);

const _animShoot_L_upperarm_bab = new BABYLON.Animation("animShoot_L_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animShoot_L_upperarm_bab.setEasingFunction(shootEase);
const _animShoot_L_upperarm_keys = [
    {
        frame:_animShoot_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -30))
    }, {
        frame:_animShoot_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-4.92, -0.003, -26))
    }, {
        frame:_animShoot_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-31.8, 143, -125))
    }, {
        frame:_animShoot_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-31.8, 143, -125))
    }, {
        frame:_animShoot_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, -30))
    }
];
const animShoot_L_upperarm = new MYANIM.Animation(_animShoot_L_upperarm_bab, _animShoot_L_upperarm_keys);

const _animShoot_L_forearm_bab = new BABYLON.Animation("animShoot_L_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animShoot_L_forearm_bab.setEasingFunction(shootEase);
const _animShoot_L_forearm_keys = [
    {
        frame:_animShoot_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animShoot_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-17.2, -16, -7.79))
    }, {
        frame:_animShoot_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-17.2, -16, -7.79))
    }, {
        frame:_animShoot_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-17.2, -16, -7.79))
    }, {
        frame:_animShoot_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animShoot_L_forearm = new MYANIM.Animation(_animShoot_L_forearm_bab, _animShoot_L_forearm_keys);

const _animShoot_R_upperarm_bab = new BABYLON.Animation("animShoot_R_upperarm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animShoot_R_upperarm_bab.setEasingFunction(shootEase);
const _animShoot_R_upperarm_keys = [
    {
        frame:_animShoot_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 30))
    }, {
        frame:_animShoot_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-4.92, 0.003, 26))
    }, {
        frame:_animShoot_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-31.8, -143, 125))
    }, {
        frame:_animShoot_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-31.8, -143, 125))
    }, {
        frame:_animShoot_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 30))
    }
];
const animShoot_R_upperarm = new MYANIM.Animation(_animShoot_R_upperarm_bab, _animShoot_R_upperarm_keys);

const _animShoot_R_forearm_bab = new BABYLON.Animation("animShoot_R_forearm", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animShoot_R_forearm_bab.setEasingFunction(shootEase);
const _animShoot_R_forearm_keys = [
    {
        frame:_animShoot_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animShoot_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-17.2, 16, 7.79))
    }, {
        frame:_animShoot_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-17.2, 16, 7.79))
    }, {
        frame:_animShoot_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(-17.2, 16, 7.79))
    }, {
        frame:_animShoot_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animShoot_R_forearm = new MYANIM.Animation(_animShoot_R_forearm_bab, _animShoot_R_forearm_keys);

const _animShoot_L_mantfront_lv1_bab = new BABYLON.Animation("animShoot_L_mantfront_lv1", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animShoot_L_mantfront_lv1_bab.setEasingFunction(shootEase);
const _animShoot_L_mantfront_lv1_keys = [
    {
        frame:_animShoot_frames[0],
        value:RotationFromDegrees(0, 0, -23.7)
    }, {
        frame:_animShoot_frames[1],
        value:RotationFromDegrees(0, 0, 38.7)
    }, {
        frame:_animShoot_frames[2],
        value:RotationFromDegrees(0, 0, 58.6)
    }, {
        frame:_animShoot_frames[3],
        value:RotationFromDegrees(0, 0, 58.6)
    }, {
        frame:_animShoot_frames[4],
        value:RotationFromDegrees(0, 0, -23.7)
    }
];
const animShoot_L_mantfront_lv1 = new MYANIM.Animation(_animShoot_L_mantfront_lv1_bab, _animShoot_L_mantfront_lv1_keys);

const _animShoot_L_mantfront_lv2_bab = new BABYLON.Animation("animShoot_L_mantfront_lv2", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animShoot_L_mantfront_lv2_bab.setEasingFunction(shootEase);
const _animShoot_L_mantfront_lv2_keys = [
    {
        frame:_animShoot_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animShoot_frames[1],
        value:RotationFromDegrees(0, 0, -62.2)
    }, {
        frame:_animShoot_frames[2],
        value:RotationFromDegrees(0, 0, 17)
    }, {
        frame:_animShoot_frames[3],
        value:RotationFromDegrees(0, 0, 17)
    }, {
        frame:_animShoot_frames[4],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animShoot_L_mantfront_lv2 = new MYANIM.Animation(_animShoot_L_mantfront_lv2_bab, _animShoot_L_mantfront_lv2_keys);

const _animShoot_R_mantfront_lv1_bab = new BABYLON.Animation("animShoot_R_mantfront_lv1", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animShoot_R_mantfront_lv1_bab.setEasingFunction(shootEase);
const _animShoot_R_mantfront_lv1_keys = [
    {
        frame:_animShoot_frames[0],
        value:RotationFromDegrees(0, 0, 23.7)
    }, {
        frame:_animShoot_frames[1],
        value:RotationFromDegrees(0, 0, -38.7)
    }, {
        frame:_animShoot_frames[2],
        value:RotationFromDegrees(0, 0, -58.6)
    }, {
        frame:_animShoot_frames[3],
        value:RotationFromDegrees(0, 0, -58.6)
    }, {
        frame:_animShoot_frames[4],
        value:RotationFromDegrees(0, 0, 23.7)
    }
];
const animShoot_R_mantfront_lv1 = new MYANIM.Animation(_animShoot_R_mantfront_lv1_bab, _animShoot_R_mantfront_lv1_keys);

const _animShoot_R_mantfront_lv2_bab = new BABYLON.Animation("animShoot_R_mantfront_lv2", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animShoot_R_mantfront_lv2_bab.setEasingFunction(shootEase);
const _animShoot_R_mantfront_lv2_keys = [
    {
        frame:_animShoot_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animShoot_frames[1],
        value:RotationFromDegrees(0, 0, 62.2)
    }, {
        frame:_animShoot_frames[2],
        value:RotationFromDegrees(0, 0, -17)
    }, {
        frame:_animShoot_frames[3],
        value:RotationFromDegrees(0, 0, -17)
    }, {
        frame:_animShoot_frames[4],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animShoot_R_mantfront_lv2 = new MYANIM.Animation(_animShoot_R_mantfront_lv2_bab, _animShoot_R_mantfront_lv2_keys);

const _animShoot_L_mantsideback_lv1_bab = new BABYLON.Animation("animShoot_L_mantsideback_lv1", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animShoot_L_mantsideback_lv1_bab.setEasingFunction(shootEase);
const _animShoot_L_mantsideback_lv1_keys = [
    {
        frame:_animShoot_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animShoot_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animShoot_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(49.4, -16.3, 0))
    }, {
        frame:_animShoot_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(49.4, -16.3, 0))
    }, {
        frame:_animShoot_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animShoot_L_mantsideback_lv1 = new MYANIM.Animation(_animShoot_L_mantsideback_lv1_bab, _animShoot_L_mantsideback_lv1_keys);

const _animShoot_L_mantsideback_lv2_bab = new BABYLON.Animation("animShoot_L_mantsideback_lv2", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animShoot_L_mantsideback_lv2_bab.setEasingFunction(shootEase);
const _animShoot_L_mantsideback_lv2_keys = [
    {
        frame:_animShoot_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animShoot_frames[1],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animShoot_frames[2],
        value:RotationFromDegrees(14.3, 0, 0)
    }, {
        frame:_animShoot_frames[3],
        value:RotationFromDegrees(14.3, 0, 0)
    }, {
        frame:_animShoot_frames[4],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animShoot_L_mantsideback_lv2 = new MYANIM.Animation(_animShoot_L_mantsideback_lv2_bab, _animShoot_L_mantsideback_lv2_keys);

const _animShoot_R_mantsideback_lv1_bab = new BABYLON.Animation("animShoot_R_mantsideback_lv1", "rotationQuaternion", 30, BABYLON.Animation.ANIMATIONTYPE_QUATERNION);
_animShoot_R_mantsideback_lv1_bab.setEasingFunction(shootEase);
const _animShoot_R_mantsideback_lv1_keys = [
    {
        frame:_animShoot_frames[0],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animShoot_frames[1],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }, {
        frame:_animShoot_frames[2],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(49.4, 16.3, 0))
    }, {
        frame:_animShoot_frames[3],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(49.4, 16.3, 0))
    }, {
        frame:_animShoot_frames[4],
        value:BABYLON.Quaternion.FromEulerVector(RotationFromDegrees(0, 0, 0))
    }
];
const animShoot_R_mantsideback_lv1 = new MYANIM.Animation(_animShoot_R_mantsideback_lv1_bab, _animShoot_R_mantsideback_lv1_keys);

const _animShoot_R_mantsideback_lv2_bab = new BABYLON.Animation("animShoot_R_mantsideback_lv2", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animShoot_R_mantsideback_lv2_bab.setEasingFunction(shootEase);
const _animShoot_R_mantsideback_lv2_keys = [
    {
        frame:_animShoot_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animShoot_frames[1],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animShoot_frames[2],
        value:RotationFromDegrees(14.3, 0, 0)
    }, {
        frame:_animShoot_frames[3],
        value:RotationFromDegrees(14.3, 0, 0)
    }, {
        frame:_animShoot_frames[4],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animShoot_R_mantsideback_lv2 = new MYANIM.Animation(_animShoot_R_mantsideback_lv2_bab, _animShoot_R_mantsideback_lv2_keys);

const _animShoot_mantback_lv1_bab = new BABYLON.Animation("animShoot_mantback_lv1", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animShoot_mantback_lv1_bab.setEasingFunction(shootEase);
const _animShoot_mantback_lv1_keys = [
    {
        frame:_animShoot_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animShoot_frames[1],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animShoot_frames[2],
        value:RotationFromDegrees(53.4, 0, 0)
    }, {
        frame:_animShoot_frames[3],
        value:RotationFromDegrees(53.4, 0, 0)
    }, {
        frame:_animShoot_frames[4],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animShoot_mantback_lv1 = new MYANIM.Animation(_animShoot_mantback_lv1_bab, _animShoot_mantback_lv1_keys);

const _animShoot_mantback_lv2_bab = new BABYLON.Animation("animShoot_mantback_lv2", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
_animShoot_mantback_lv2_bab.setEasingFunction(shootEase);
const _animShoot_mantback_lv2_keys = [
    {
        frame:_animShoot_frames[0],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animShoot_frames[1],
        value:RotationFromDegrees(0, 0, 0)
    }, {
        frame:_animShoot_frames[2],
        value:RotationFromDegrees(40, 0, 0)
    }, {
        frame:_animShoot_frames[3],
        value:RotationFromDegrees(40, 0, 0)
    }, {
        frame:_animShoot_frames[4],
        value:RotationFromDegrees(0, 0, 0)
    }
];
const animShoot_mantback_lv2 = new MYANIM.Animation(_animShoot_mantback_lv2_bab, _animShoot_mantback_lv2_keys);



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
        frame:80,
        value:GLOBLIB.SPATK_AMBIENT_INTENSITY
    }, {
        frame:110,
        value:GLOBLIB.DEFAULT_AMBIENT_INTENSITY
    }
];
const animAmbientEmphasis = new MYANIM.Animation(_animAmbientEmphasis_bab, _animAmbientEmphasis_keys);


const _animBeam_bab = new BABYLON.Animation("animBeam", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
const _animBeam_keys = [
    {
        frame:0,
        value:new BABYLON.Vector3(0,1,0)
    }, {
        frame:5,
        value:new BABYLON.Vector3(1,1,1)
    }, {
        frame:25,
        value:new BABYLON.Vector3(1,1,1)
    }, {
        frame:35,
        value:new BABYLON.Vector3(0,1,0)
    }
];
const animBeam = new MYANIM.Animation(_animBeam_bab, _animBeam_keys);

const _animSpot_bab = new BABYLON.Animation("animLaserSpot", "intensity", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
_animSpot_bab.setEasingFunction(lightEase);
const _animSpot_keys = [
    {
        frame:0,
        value:0
    }, {
        frame:5,
        value:75,
    }, {
        frame:25,
        value:75,
    }, {
        frame:35,
        value:0
    }
];
const animSpot = new MYANIM.Animation(_animSpot_bab, _animSpot_keys);



/**************
 * PARAMETERS *
 **************/


// Color palette of the attack, influences both beam mesh and light
const colorMain = new BABYLON.Color3(0.6, 0, 1);
const colorSecond = new BABYLON.Color3(0.8, 0.1, 1);
const colorDark = new BABYLON.Color3(0.4, 0.3, 0.4);
const colorBright = new BABYLON.Color3(0.9, 0.3, 1);
const colorBrighter = new BABYLON.Color3(1, 0.6, 1);

// For the auxiliary mesh:
const beamDmt = 0.04;  // diameter of the cylinder
const beamLen = 4;   // length of the cylinder
// point from which the laser beam originates (inside the Phantom's head)
var beamOrigin;   // initialized in initParams for syntactic reasons
// rotation around Z axis, so it points downwards at the player character
var beamAngle;   // depends on the target

// Light colors
const diffuse = colorSecond;
const specular = colorBright;
// Other parameters for the spot light
var lightpos;   // initialized with beamOrigin
var lightdir;  // depends on beamAngle
const lightangle = Math.PI/3;
const lightexp = 2;

// The point the beam has to hit, and where particles will be generated.
// Should be right in the middle of the player.
var target;   // depends on player of the current scene

/**
 * Initializes the scene-dependent parameters
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function initParams(sceneInfo) {
    target = sceneInfo.player.pierceTarget;

    beamOrigin = phantomMaster.defaultPosition.add(new BABYLON.Vector3(-0.1, 2.04, 0));
    lightpos = beamOrigin;

    // roles of x and y in atan2 have been exchanged because of the specific way
    // the babylon frame is made and of the specific use I make of this angle.
    // See also the way I use sin and cos in the very next line.
    beamAngle = Math.atan2(target.x-beamOrigin.x, beamOrigin.y-target.y);
    lightdir = new BABYLON.Vector3(Math.sin(beamAngle), -Math.cos(beamAngle), 0);
}


/***************
 * AUX. MESHES *
 ***************/

// In which we define any extra meshes used to represent the attack,
// in this case a laser beam (cylinder) shot by the Phantom's mask.

var beam;   // will contain the cylinder mesh, once it's created for the current scene

/**
 * A function with an overly-long name explaining its purpose:
 * positions the given cylinder so that one of its faces it at the given position
 * and the cylinder is rotated around Z by the given angle.
 * (Normally, the cylinder's center is the controllable point.)
 */
function _position_a_face_of_the_cylinder_and_rotate_around_that_faces_center(cyl, position, rotZ) {
    cyl.rotation.z = rotZ;
    cyl.position = position.add(new BABYLON.Vector3(Math.sin(rotZ)*beamLen/2, -Math.cos(rotZ)*beamLen/2, 0));
}

/**
 * Creates the auxiliary mesh for this attack (a cylinder) in the current scene
 * and initializes its properties.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function initAuxMeshes(sceneInfo) {
    // create the mesh
    beam = BABYLON.MeshBuilder.CreateCylinder("beam", {
        diameter: beamDmt,
        height: beamLen,
        tessellation: 12,
    }, sceneInfo.scene);
    // position it
    _position_a_face_of_the_cylinder_and_rotate_around_that_faces_center(beam, beamOrigin, beamAngle);
    // define a material for it: very emissive (it is a light beam!),
    // with a little diffuse to give it some 3D shading,
    // and no specular (a laser beam shouldn't have specular reflection)
    beam.material = new BABYLON.StandardMaterial("beamMaterial", sceneInfo.scene);
    beam.material.diffuseColor = colorDark;
    beam.material.specularColor = new BABYLON.Color3(0,0,0);
    beam.material.emissiveColor = colorMain;
    // This mesh is normally disabled, and only enabled when the enemy
    // decides to use this attack
    beam.setEnabled(false);
}



/*************
 * PARTICLES *
 *************/

/**
 * The particle system for this attack
 */
var particles;

/**
 * An ad-hoc function that generates direction1 and direction2 such that
 * the particles will be emitted in a cone with lightdir as its axis.
 * It is written with the laser's specific lightdir in mind,
 * because it having z=0 trivializes finding two orthogonal vectors
 * for the tangent plane.
 */
function _cone_directions(amplitude) {
    const t1 = new BABYLON.Vector3(-lightdir.y, lightdir.x, 0).scale(amplitude);
    const t2 = new BABYLON.Vector3(0, 0, 1).scale(amplitude);
    return [
        lightdir.add(t1).add(t2),
        lightdir.subtract(t1).subtract(t2)
    ];
}

/**
 * Initializes the particle system for this attack in the given scene.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function initParticles(sceneInfo) {
    // Create particle system...
    particles = new BABYLON.ParticleSystem("laserParticles", 2000, sceneInfo.scene);
    // ...and configure it
    particles.particleTexture = new BABYLON.Texture("assets/sparkStretched_blackbg.png", sceneInfo.scene);
    particles.emitter = target;
    particles.minEmitBox = new BABYLON.Vector3(-0.01, 0, -0.01); // minimum box dimensions
    particles.maxEmitBox = new BABYLON.Vector3(0.01, 0, 0.01); // maximum box dimensions
    particles.color1 = colorBright;
    particles.color2 = colorBrighter;
    particles.minInitialRotation = 0;
    particles.maxInitialRotation = Math.PI*2;
    particles.minAngularSpeed = Math.PI*4;
    particles.maxAngularSpeed = Math.PI*12;
    particles.minSize = 0.05;
    particles.maxSize = 0.10;
    particles.minLifeTime = 0.3;
    particles.maxLifeTime = 0.3;
    particles.emitRate = 600;
    [ particles.direction1, particles.direction2 ] = _cone_directions(0.6);
    particles.minEmitPower = 4;
    particles.maxEmitPower = 5;
    particles.updateSpeed = 0.01;
    particles.gravity = new BABYLON.Vector3(0, -9.81/8, 0);
}



/**
 * Initializes all animation events of this attack
 * for the current scene
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function makeEvents(sceneInfo) {

    const shootEventFrame = 40;   // <- set this to easily change when the event happens
    const damageEventFrame = 5;   // <- set this to easily change when the event happens
    const particleStopEventFrame = 23;   // <- set this to easily change when the event happens

    animShoot_spine2.anim.removeEvents(shootEventFrame);
    const shootEvent = new BABYLON.AnimationEvent(
        shootEventFrame,
        function() {
            // turn on the spotlight representing the illumination of the laser beam
            sceneInfo.effectSpotLight.setEnabled(true);
            MYANIM.directAnimation(sceneInfo.scene, sceneInfo.effectSpotLight, [animSpot], ()=>{sceneInfo.effectSpotLight.setEnabled(false);});
            // have the beam itself animate
            beam.setEnabled(true);
            MYANIM.directAnimation(sceneInfo.scene, beam, [animBeam], () => {beam.setEnabled(false)});
        },
        true
    );
    animShoot_spine2.anim.addEvent(shootEvent);

    animBeam.anim.removeEvents(damageEventFrame);
    const damageEvent = new BABYLON.AnimationEvent(
        damageEventFrame,
        function() {
            particles.start();
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
    animBeam.anim.addEvent(damageEvent);

    animBeam.anim.removeEvents(particleStopEventFrame);
    const particleStopEvent = new BABYLON.AnimationEvent(
        particleStopEventFrame,
        function() {
            particles.stop();
        },
        true
    );
    animBeam.anim.addEvent(particleStopEvent);
}


/**
 * Randomly determines the damage dealt by this attack.
 * @returns The rolled damage
 */
function rollDamage() {
    if (theOptions.hardMode) {
        return d(10) + 9;
    }
    else {
        return d(8) + 9;
    }
}


/**
 * Executes this attack: performs all animations, triggering damage etc.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
 function perform(sceneInfo) {
    phantomMaster.meshdata.stopAllAnimations(sceneInfo.scene);
    //shared effect light management
    sceneInfo.effectSpotLight.diffuse = diffuse;
    sceneInfo.effectSpotLight.specular = specular;
    sceneInfo.effectSpotLight.position = lightpos;
    sceneInfo.effectSpotLight.direction = lightdir;
    sceneInfo.effectSpotLight.angle = lightangle;
    sceneInfo.effectSpotLight.exponent = lightexp;
    sceneInfo.effectSpotLight.shadowEnabled = true;
    //animation
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getBone("Bip01_Spine2"), [animShoot_spine2], ()=>{sceneInfo.turn_system.enemy_done(sceneInfo);});
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getBone("Bip01_L_UpperArm"), [animShoot_L_upperarm]);
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getBone("Bip01_L_Forearm"), [animShoot_L_forearm]);
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getBone("Bip01_R_UpperArm"), [animShoot_R_upperarm]);
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getBone("Bip01_R_Forearm"), [animShoot_R_forearm]);
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getBone("b_l_mantFRONT_00"), [animShoot_L_mantfront_lv1]);
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getBone("b_l_mantFRONT_01"), [animShoot_L_mantfront_lv2]);
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getBone("b_r_mantFRONT_00"), [animShoot_R_mantfront_lv1]);
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getBone("b_r_mantFRONT_01"), [animShoot_R_mantfront_lv2]);
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getBone("b_l_mantSIDEBACK_00"), [animShoot_L_mantsideback_lv1]);
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getBone("b_l_mantSIDEBACK_02"), [animShoot_L_mantsideback_lv2]);
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getBone("b_r_mantSIDEBACK_00"), [animShoot_R_mantsideback_lv1]);
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getBone("b_r_mantSIDEBACK_02"), [animShoot_R_mantsideback_lv2]);
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getBone("b_mantBACK_00"), [animShoot_mantback_lv1]);
    MYANIM.directAnimation(sceneInfo.scene, phantomMaster.meshdata.getBone("b_mantBACK_02"), [animShoot_mantback_lv2]);
    MYANIM.directAnimation(sceneInfo.scene, sceneInfo.ambientLight, [animAmbientEmphasis]);
}

/**
 * The exported object.
 */
const laser = {
    perform,
    makeEvents,
    initParams,
    initParticles,
    initAuxMeshes,
    animations: {
        animShoot_spine2,
        animShoot_L_upperarm,
        animShoot_L_forearm,
        animShoot_R_upperarm,
        animShoot_R_forearm,
        animShoot_L_mantfront_lv1,
        animShoot_L_mantfront_lv2,
        animShoot_R_mantfront_lv1,
        animShoot_R_mantfront_lv2,
        animShoot_L_mantsideback_lv1,
        animShoot_L_mantsideback_lv2,
        animShoot_R_mantsideback_lv1,
        animShoot_R_mantsideback_lv2,
        animShoot_mantback_lv1,
        animShoot_mantback_lv2,
        animAmbientEmphasis,
        animBeam,
        animSpot,
    },
    rollDamage
};

export default laser;