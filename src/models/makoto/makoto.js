/**
 * Base file for "Makoto", the player character, when he appears in battle.
 * Loads its model and manages a few more things about it.
 * 
 * EXPORTS a JS object with all the necessary info about it,
 * some of which will only be filled once the loading is complete.
 */

//IMPORTS

import { loadMakotoAsync } from "./makoto-meshdata.js";
import attack from "./mak-attack.js";
import charge from "./mak-charge.js";
import agi from "./mak-agi.js";
import dia from "./mak-dia.js";
import miscanims from "./mak-miscanims.js";




// CONSTANTS & PARAMETERS

/*
 * General attributes
 */
// this name will be displayed in the game's UI
const name = "Makoto";
const isPlayer = true;

/**
 * The position where this character usually is.
 * Used as reference to position or point other objects or effects.
 */
var defaultPosition = new BABYLON.Vector3(-1,0,0);

/**
 * The position used as the target for piercing attacks,
 * such as Phantom Master's Laser
 */
// var pierceTarget;   // declared in the object, left here for documentation purposes
// Depends on one of its nodes, so it's defined upon loading

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
    // RPG MECHANICS //
    makoto.maxhp = 50;
    makoto.hp = makoto.maxhp;
    makoto.charged = false;
    makoto.guarding = false;
    makoto.lastActionType = 0;  // 0=non-damaging, 1=normal-attack, 2=special-attack
}

/**
 * Full initial loading: loads mesh and initializes RPG stats.
 * @param {BABYLON.Scene} scene The scene to associate this model to.
 * @returns A promise that resolves when loading and initialization is complete.
 */
async function loadAsync(scene) {
    _initRPG();
    makoto.meshdata = await loadMakotoAsync(scene);

    makoto.meshdata.mesh.position = defaultPosition;
    makoto.meshdata.mesh.rotation = new BABYLON.Vector3(0, Math.PI*0.5, 0);
    makoto.meshdata.mesh.scaling = new BABYLON.Vector3(0.006, 0.006, 0.006);

    // This bone was provided in the hierarchy of the model.
    // It is located approximately in the middle of the chest.
    makoto.pierceTarget = defaultPosition.add(
        makoto.meshdata.skeleton.bones[makoto.meshdata.skeleton.getBoneIndexByName("h_oneshot")].getTransformNode().absolutePosition.multiply(makoto.meshdata.mesh.scaling)
    );
    // (actually, we have two possibilities: h_oneshot in the chest, and h_center in the stomach)
    // Once taken, the target seems to stay fixed, and it's better that way.

    makoto.damageTextSpawnPoint_world = makoto.pierceTarget;
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
    agi.initParams(sceneInfo);
    agi.initParticles(sceneInfo);
    agi.initAuxMeshes(sceneInfo);
    agi.makeEvents(sceneInfo);
    dia.initParams(sceneInfo);
    dia.initParticles(sceneInfo);
    dia.makeEvents(sceneInfo);

    // start animation
    makoto.idle(sceneInfo);
}

// wrap the miscanims animations to refer to the loaded meshdata object

function idle(sceneInfo) {
    // small touch: if the character has no HP left it can't idle as strength leaves him and he prepares to die.
    if (makoto.hp > 0) {
        miscanims.idle(makoto.meshdata, sceneInfo.scene);
    }
}

function flinch(sceneInfo, onAnimationEnd) {
    miscanims.flinch(makoto.meshdata, makoto.guarding, makoto.hp, sceneInfo.scene, onAnimationEnd);
}

function death(sceneInfo, onAnimationEnd) {
    miscanims.death(makoto.meshdata, sceneInfo.scene, onAnimationEnd);
}

function victory(sceneInfo, onAnimationEnd) {
    miscanims.endIdleGracefully(sceneInfo.scene).then(()=>{
        miscanims.victory(makoto.meshdata, sceneInfo.scene, onAnimationEnd);
    });
}

function stopAllAnimations(scene) {
    makoto.meshdata.stopAllAnimations(scene);
}


// BEGINNING-OF-TURN ACTIONS

/**
 * Start the character's turn, performing all relevant actions.
 * Called by the TurnSystem.
 * @param {*} sceneInfo Scene Info object for the current scene
 */
 function startTurn(sceneInfo) {
    if (makoto.guarding) {
        // then he has to leave the guard pose before the user can issue a command
        charge.revertAsync(sceneInfo.scene).then(()=>{
            sceneInfo.turn_system.player_can_select = true;
        })
    }
    else {
        // otherwise player turn can start immediately
        sceneInfo.turn_system.player_can_select = true;
    }
    //in any case, Makoto isn't defending anymore
    makoto.guarding = false;
}







// BATTLE COMMAND UI CONSTRUCTION

/**
 * Completes the battle UI by adding the buttons corresponding to the actions available to this character.
 * @param {BABYLON.GUI.StackPanel} pnl_command The panel that will contain the buttons
 * @param {*} sceneInfo Scene Info object for the current scene
 * @returns A Promise that resolves when all icons of the buttons have been loaded successfully.
 */
function createBattleCommandUI(pnl_command, sceneInfo) {
    // useful observables example for the description: https://playground.babylonjs.com/#XCPP9Y#121

    // global description of the buttons
    const button_width = "170px";
    const button_height = "64px";
    const button_cornerRadius = 20;
    const button_paddingTop = "10px";
    const button_paddingBottom = "10px";
    const button_paddingLeft = "10px";
    const button_horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    const button_image_left = "34%";
    const button_image_width = "85%";
    const button_image_height = "85%";

    const default_desc_text = "What will you do?";
    // keep the state of each button separately and update the desc_text in the update cycle to avoid concurrency issues
    var hover_attack = false;
    var hover_charge = false;
    var hover_agi = false;
    var hover_dia = false;
    // wait a little before returning text_desc to the default, so the player can move from a button to anothr smoothly
    const desc_timeout = 400;   // in ms
    var desc_countdown = -1;

    const btn_attack = BABYLON.GUI.Button.CreateImageWithCenterTextButton("btn_attack", "Attack", "assets/GUI/Battle/button-icons.svg#attack");
    const _attackLoadedPromise = new Promise((resolve, reject) => {
        btn_attack.image.onSVGAttributesComputedObservable.add(() => {
            resolve();
        })
        btn_attack.image.domImage.onerror = () => {
            reject();
        }
        // safety in case the observable has somehow been already notified before this Promise even started
        if (btn_attack.image.svgAttributesComputationCompleted) {
            resolve();
        }
    })
    btn_attack.width = button_width;
    btn_attack.height = button_height;
    btn_attack.color = "black";
    btn_attack.hoverCursor = "pointer";
    btn_attack.cornerRadius = button_cornerRadius;
    btn_attack.background = "white";
    btn_attack.paddingTop = button_paddingTop;
    btn_attack.paddingBottom = button_paddingBottom;
    btn_attack.paddingLeft = button_paddingLeft;
    btn_attack.horizontalAlignment = button_horizontalAlignment;
    btn_attack.image.left = button_image_left;
    btn_attack.image.width = button_image_width;
    btn_attack.image.height = button_image_height;
    btn_attack.image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;   // Necessary for Chrome
    btn_attack.onPointerMoveObservable.add(() => {
        desc_countdown = desc_timeout;
        hover_attack = true;
    });
    btn_attack.onPointerOutObservable.add(() => {
        desc_countdown = desc_timeout;
        hover_attack = false;
    });
    btn_attack.onPointerClickObservable.add(function() {
        if (!sceneInfo.turn_system.player_can_select) return;
        sceneInfo.turn_system.player_can_select = false;
        miscanims.endIdleGracefully(sceneInfo.scene).then(() => {
            attack.perform(sceneInfo);
        });
        makoto.lastActionType = 1;
    });
    pnl_command.addControl(btn_attack);

    const btn_charge = BABYLON.GUI.Button.CreateImageWithCenterTextButton("btn_charge", "Charge", "assets/GUI/Battle/button-icons.svg#charge");
    const _chargeLoadedPromise = new Promise((resolve, reject) => {
        btn_charge.image.onSVGAttributesComputedObservable.add(() => {
            resolve();
        })
        btn_charge.image.domImage.onerror = () => {
            reject();
        }
        // safety in case the observable has somehow been already notified before this Promise even started
        if (btn_charge.image.svgAttributesComputationCompleted) {
            resolve();
        }
    })
    btn_charge.width = button_width;
    btn_charge.height = button_height;
    btn_charge.color = "black";
    btn_charge.hoverCursor = "pointer";
    btn_charge.background = "gray"
    btn_charge.cornerRadius = button_cornerRadius;
    btn_charge.paddingTop = button_paddingTop;
    btn_charge.paddingBottom = button_paddingBottom;
    btn_charge.paddingLeft = button_paddingLeft;
    btn_charge.horizontalAlignment = button_horizontalAlignment;
    btn_charge.image.left = button_image_left;
    btn_charge.image.width = button_image_width;
    btn_charge.image.height = button_image_height;
    btn_charge.image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;   // Necessary for Chrome
    btn_charge.onPointerMoveObservable.add(() => {
        desc_countdown = desc_timeout;
        hover_charge = true;
    });
    btn_charge.onPointerOutObservable.add(() => {
        desc_countdown = desc_timeout;
        hover_charge = false;
    });
    btn_charge.onPointerClickObservable.add(function() {
        if (!sceneInfo.turn_system.player_can_select) return;
        sceneInfo.turn_system.player_can_select = false;
        miscanims.endIdleGracefully(sceneInfo.scene).then(() => {
            charge.perform(sceneInfo);
        });
        makoto.lastActionType = 0;
    });
    pnl_command.addControl(btn_charge);

    const btn_agi = BABYLON.GUI.Button.CreateImageWithCenterTextButton("btn_agi", "Fireball", "assets/GUI/Battle/button-icons.svg#agi");
    const _agiLoadedPromise = new Promise((resolve, reject) => {
        btn_agi.image.onSVGAttributesComputedObservable.add(() => {
            resolve();
        })
        btn_agi.image.domImage.onerror = () => {
            reject();
        }
        // safety in case the observable has somehow been already notified before this Promise even started
        if (btn_agi.image.svgAttributesComputationCompleted) {
            resolve();
        }
    })
    btn_agi.width = button_width;
    btn_agi.height = button_height;
    btn_agi.color = "black";
    btn_agi.hoverCursor = "pointer";
    btn_agi.cornerRadius = button_cornerRadius;
    btn_agi.background = "red";
    btn_agi.paddingTop = button_paddingTop;
    btn_agi.paddingBottom = button_paddingBottom;
    btn_agi.paddingLeft = button_paddingLeft;
    btn_agi.horizontalAlignment = button_horizontalAlignment;
    btn_agi.image.left = button_image_left;
    btn_agi.image.width = button_image_width;
    btn_agi.image.height = button_image_height;
    btn_agi.image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;   // Necessary for Chrome
    btn_agi.onPointerMoveObservable.add(() => {
        desc_countdown = desc_timeout;
        hover_agi = true;
    });
    btn_agi.onPointerOutObservable.add(() => {
        desc_countdown = desc_timeout;
        hover_agi = false;
    });
    btn_agi.onPointerClickObservable.add(function() {
        if (!sceneInfo.turn_system.player_can_select || !makoto.charged) return;
        sceneInfo.turn_system.player_can_select = false;
        miscanims.endIdleGracefully(sceneInfo.scene).then(() => {
            makoto.charged = false;
            agi.perform(sceneInfo);
        });
        makoto.lastActionType = 2;
    });
    pnl_command.addControl(btn_agi);

    const btn_dia = BABYLON.GUI.Button.CreateImageWithCenterTextButton("btn_dia", "Prayer", "assets/GUI/Battle/button-icons.svg#dia");
    const _diaLoadedPromise = new Promise((resolve, reject) => {
        btn_dia.image.onSVGAttributesComputedObservable.add(() => {
            resolve();
        })
        btn_dia.image.domImage.onerror = () => {
            reject();
        }
        // safety in case the observable has somehow been already notified before this Promise even started
        if (btn_dia.image.svgAttributesComputationCompleted) {
            resolve();
        }
    })
    btn_dia.width = button_width;
    btn_dia.height = button_height;
    btn_dia.color = "black";
    btn_dia.hoverCursor = "pointer";
    btn_dia.background = "green"
    btn_dia.cornerRadius = button_cornerRadius;
    btn_dia.paddingTop = button_paddingTop;
    btn_dia.paddingBottom = button_paddingBottom;
    btn_dia.paddingLeft = button_paddingLeft;
    btn_dia.horizontalAlignment = button_horizontalAlignment;
    btn_dia.image.left = button_image_left;
    btn_dia.image.width = button_image_width;
    btn_dia.image.height = button_image_height;
    btn_dia.image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;   // Necessary for Chrome
    btn_dia.onPointerMoveObservable.add(() => {
        desc_countdown = desc_timeout;
        hover_dia = true;
    });
    btn_dia.onPointerOutObservable.add(() => {
        desc_countdown = desc_timeout;
        hover_dia = false;
    });
    btn_dia.onPointerClickObservable.add(function() {
        if (!sceneInfo.turn_system.player_can_select || !makoto.charged) return;
        sceneInfo.turn_system.player_can_select = false;
        miscanims.endIdleGracefully(sceneInfo.scene).then(() => {
            makoto.charged = false;
            dia.perform(sceneInfo);
        });
        makoto.lastActionType = 0;
    });
    pnl_command.addControl(btn_dia);

    //create text box to show attack description
    const rect_desc = new BABYLON.GUI.Rectangle("rect_desc");
    rect_desc.width = "500px";
    rect_desc.height = "80px";
    rect_desc.cornerRadius = 0;
    rect_desc.color = "white";
    rect_desc.thickness = 0;
    rect_desc.background = "#303030B0";
    rect_desc.paddingTop = "10px";
    rect_desc.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    pnl_command.addControl(rect_desc);

    const text_desc = new BABYLON.GUI.TextBlock("text_desc");
    text_desc.text = default_desc_text;
    rect_desc.addControl(text_desc);

    // save engine, to get deltatime in the update
    var engine = sceneInfo.scene.getEngine();

    //add un update event that updates the UI
    sceneInfo.scene.onBeforeRenderObservable.add(() => {
        // Handle charge costs, deactivating buttons corresponding to special moves if the player is not charged
        if (makoto.charged) {
            btn_agi.alpha = 1;
            btn_dia.alpha = 1;
        }
        else {
            btn_agi.alpha = 0.5;
            btn_dia.alpha = 0.5;
        }
        //handle description
        if (hover_attack) {
            text_desc.text = "A basic attack with your sword.\nDeals a little damage to the enemy."
        }
        else if (hover_charge) {
            text_desc.text = "Take on a defensive stance and store up your energy.\nYou GET A CHARGE and halve the damage taken this turn.";
        }
        else if (hover_agi) {
            text_desc.text = "An elaborate fire magic that hurls a ball of flame at the enemy.\nDeals heavy damage. REQUIRES AND USES CHARGE.";
        }
        else if (hover_dia) {
            text_desc.text = "A simple light magic that heals your wounds.\nRestores some HP. REQUIRES AND USES CHARGE.";
        }
        else {
            if (desc_countdown >= 0) {
                desc_countdown -= engine.getDeltaTime();
            }
            if (desc_countdown <= 0) {
                text_desc.text = default_desc_text;
            }
        }
    });

    
    // return a promise that resolves when all SVG icons are loaded
    return Promise.all([
        _attackLoadedPromise,
        _chargeLoadedPromise,
        _agiLoadedPromise,
        _diaLoadedPromise,
    ])
}



// EXPORT

/**
 * The object to be exported.
 */
const makoto = {
    name,
    isPlayer,
    meshdata: {},
    maxhp: undefined,
    hp: undefined,
    charged: undefined,
    guarding: undefined,
    lastActionType: undefined,
    loadAsync,
    sceneSpecificInit,
    defaultPosition,
    pierceTarget: undefined,
    stopAllAnimations,
    flinch,
    death,
    victory,
    idle,
    createBattleCommandUI,
    startTurn,
};

export default makoto;