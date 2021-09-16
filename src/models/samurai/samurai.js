/**
 * Base file for the "Samurai", a common enemy, when it appears in battle.
 * (It is given a more appropriate name in the UI.)
 * Loads its model and manages a few more things about it.
 * 
 * EXPORTS a JS object with all the necessary info about it,
 * some of which will only be filled once the loading is complete.
 */


// IMPORTS

import attack from "./sam-attack.js";
import luna from "./sam-luna.js";
import miscanims from "./sam-miscanims.js";
import { loadSamuraiAsync } from "./samurai-meshdata.js";
import { theOptions } from "../../utils/options.js";




// CONSTANTS & PARAMETERS

/*
 * General attributes
 */
// a lunar-feeling name to contextualize the special attack,
// which also includes a "bad"-sounding word to remind the user it's an enemy
const name = "Moon-Cursed Samurai";
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
const projectileTarget = defaultPosition.add(new BABYLON.Vector3(-0.3, 0.8, 0));

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
    samurai.maxhp = 35;
    if (theOptions.hardMode) {
        samurai.maxhp += 15;
    }
    samurai.hp = samurai.maxhp;
    samurai.charged = false;
    samurai.guarding = false;
}

/**
 * Full initial loading: loads mesh and initializes RPG stats.
 * @param {BABYLON.Scene} scene The scene to associate this model to.
 * @returns A promise that resolves when loading and initialization is complete.
 */
async function loadAsync(scene) {
    _initRPG();
    samurai.meshdata = await loadSamuraiAsync(scene);

    samurai.meshdata.mesh.position = defaultPosition;
    samurai.meshdata.mesh.rotation = new BABYLON.Vector3(0, -Math.PI*0.5, 0);
    samurai.meshdata.mesh.scaling = new BABYLON.Vector3(-0.0045, 0.0045, 0.0045);

    // This bone was provided in the hierarchy of the model.
    // It is located approximately in the middle of the chest.
    samurai.damageTextSpawnPoint_world = defaultPosition.add(
        samurai.meshdata.skeleton.bones[samurai.meshdata.skeleton.getBoneIndexByName("h_oneshot")].getTransformNode().absolutePosition.multiply(samurai.meshdata.mesh.scaling)
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
    luna.initParams(sceneInfo);
    luna.initParticles(sceneInfo);
    luna.initAuxMeshes(sceneInfo);
    luna.makeEvents(sceneInfo);

    // animation
    samurai.idle(sceneInfo);
}

// wrap the miscanims animations to refer to the loaded meshdata object

function idle(sceneInfo) {
    // small touch: if the character has no HP left it can't idle as strength leaves it and it prepares to die.
    if (samurai.hp > 0) {
        miscanims.idle(samurai.meshdata, sceneInfo.scene);
    }
}

function flinch(sceneInfo, onAnimationEnd) {
    miscanims.flinch(samurai.meshdata, sceneInfo.scene, onAnimationEnd);
}

function death(sceneInfo, onAnimationEnd) {
    miscanims.death(samurai.meshdata, sceneInfo.scene, onAnimationEnd);
}

function stopAllAnimations(scene) {
    samurai.meshdata.stopAllAnimations(scene);
}









// TURN ACTIONS

/**
 * When called, instructs this enemy to take its turn,
 * choosing one of its available actions.
 * This function is specific for each enemy.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
function act(sceneInfo) {
    samurai.guarding=false;

    // probability of special attack depends on how hard the player just hit:
    var lunaProb;
    switch (sceneInfo.player.lastActionType) {
        case 0:   // non-damaging action (e.g. Prayer, Charge)
            lunaProb = 0.3;
            break;
        case 1:   // standard attack
            lunaProb = 0.5;
            break;
        case 2:   // special attack (e.g. Fireball)
            lunaProb = 0.7;
            break;

        default:
            lunaProb = 0.5;
            break;
    }

    miscanims.endIdleGracefully().then(() => {
        // randomly choose an attack
        if (Math.random() < lunaProb) {
            luna.perform(sceneInfo);
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
const samurai = {
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

export default samurai;