/**
 * Base file for the "Phantom Master", a boss enemy, when it appears in battle.
 * (It is given a more appropriate name in the UI.)
 * Loads its model and manages a few more things about it.
 * 
 * EXPORTS a JS object with all the necessary info about it,
 * some of which will only be filled once the loading is complete.
 */


// IMPORTS

import attack from "./pm-attack.js"
import laser from "./pm-laser.js";
import miscanims from "./pm-miscanims.js";
import { loadPhantomMasterAsync } from "./phantom-master-meshdata.js";
import { theOptions } from "../../utils/options.js";




// CONSTANTS & PARAMETERS

/*
 * General attributes
 */
// this name has the only purpose of unequivocally conveying the malignant nature of this boss monster.
// which is the reason why such an extremely generic name was chosen, rather than a proper or evocative one.
const name = "Evil Lord of Shadows";
const isPlayer = false;


/**
 * The position where this character usually is.
 * Used as reference to position or point other objects or effects.
 */
const defaultPosition = new BABYLON.Vector3(1,0,0);

/**
 * The position used as the target for projectile- or explosion-based attacks,
 * such as Makoto's Fireball
 */
const projectileTarget = defaultPosition.add(new BABYLON.Vector3(-0.3, 1.2, 0));

/**
 * The position in world space where the text (a UI element) showing the damage taken from attacks will first appear.
 * (will need to be projected to view space before each use, since it positions a UI element)
 */
// var damageTextSpawnPoint_world;   // declared in the object, left here for documentation purposes
// Depends on one of its nodes, so it's defined upon loading








// LOADING & INITIALIZATIONS

/**
 * Initializes the RPG parameters for this character.
 */
function _initRPG() {
    phantomMaster.maxhp = 80;
    if (theOptions.hardMode) {
        phantomMaster.maxhp += 20;
    }
    phantomMaster.hp = phantomMaster.maxhp;
    phantomMaster.charged = false;
    phantomMaster.guarding = false;
}

/**
 * Full initial loading: loads mesh and initializes RPG stats.
 * @param {BABYLON.Scene} scene The scene to associate this model to.
 * @returns A promise that resolves when loading and initialization is complete.
 */
async function loadAsync(scene) {
    _initRPG();
    phantomMaster.meshdata = await loadPhantomMasterAsync(scene);

    phantomMaster.meshdata.mesh.position = defaultPosition;
    phantomMaster.meshdata.mesh.rotation = new BABYLON.Vector3(0, -Math.PI*0.5, 0);
    phantomMaster.meshdata.mesh.scaling = new BABYLON.Vector3(-0.006, 0.006, 0.006);

    // This bone was provided in the hierarchy of the model.
    // It is located approximately at the center of the body.
    phantomMaster.damageTextSpawnPoint_world = defaultPosition.add(
        phantomMaster.meshdata.skeleton.bones[phantomMaster.meshdata.skeleton.getBoneIndexByName("h_center")].getTransformNode().absolutePosition.multiply(phantomMaster.meshdata.mesh.scaling)
    );
}


/**
 * Perform a number of initializations that require scene-specific
 * information or objects. Examples include animation event setup
 * (which need to target the characters and/or lights present in the scene)
 * and certain properties of some special attacks (which may target an
 * opponent-dependent position).
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function sceneSpecificInit(sceneInfo) {
    attack.makeEvents(sceneInfo);
    laser.initParams(sceneInfo);
    laser.initParticles(sceneInfo);
    laser.initAuxMeshes(sceneInfo);
    laser.makeEvents(sceneInfo);

    // animation
    phantomMaster.idle(sceneInfo);
}

// wrap the miscanims animations to refer to the loaded meshdata object

function idle(sceneInfo) {
    // small touch: if the character has no HP left it can't idle as strength leaves it and it prepares to die.
    if (phantomMaster.hp > 0) {
        miscanims.idle(phantomMaster.meshdata, sceneInfo.scene);
    }
}

function flinch(sceneInfo, onAnimationEnd) {
    miscanims.flinch(phantomMaster.meshdata, sceneInfo.scene, onAnimationEnd);
}

function death(sceneInfo, onAnimationEnd) {
    miscanims.death(phantomMaster.meshdata, sceneInfo.scene, onAnimationEnd);
}

function stopAllAnimations(scene) {
    phantomMaster.meshdata.stopAllAnimations(scene);
}





// TURN ACTIONS

/**
 * When called, instructs this enemy to take its turn,
 * choosing one of its available actions.
 * This function is specific for each enemy.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function act(sceneInfo) {
    phantomMaster.guarding=false;

    // probability of special attack depends on how hard the player just hit:
    var laserProb;
    switch (sceneInfo.player.lastActionType) {
        case 0:   // non-damaging action (e.g. Prayer, Charge)
            laserProb = 0.3;
            break;
        case 1:   // standard attack
            laserProb = 0.5;
            break;
        case 2:   // special attack (e.g. Fireball)
            laserProb = 0.7;
            break;
    
        default:
            laserProb = 0.5;
            break;
    }

    miscanims.endIdleGracefully().then(() => {
        // randomly choose an attack
        if (Math.random() < laserProb) {
            laser.perform(sceneInfo);
        }
        else {
            attack.perform(sceneInfo);
        }
    })
}




// EXPORT

/**
 * The object to be exported.
 */
const phantomMaster = {
    name,
    isPlayer,
    meshdata: {},
    maxhp: undefined,
    hp: undefined,
    charged: undefined,
    guarding: undefined,
    loadAsync,
    sceneSpecificInit,
    defaultPosition,
    projectileTarget,
    act,
    stopAllAnimations,
    flinch,
    death,
    idle,
};

export default phantomMaster;