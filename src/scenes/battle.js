/**
 * Base file for the scene of the normal battle.
 * 
 * EXPORTS a JS object containing the function to create the scene.
 */

import player from "../models/makoto/makoto.js"
import enemy from "../models/samurai/samurai.js"
import floor from "../models/floor/floor.js"
import wall from "../models/wall/wall.js"
import banner_wall from "../models/props/banner-wall.js"
import table from "../models/props/table-big.js"
import skull from "../models/props/skull.js"

import * as BATTLE_UI from "../user-interfaces/battle-ui.js"
import * as GAMEOVER_UI from "../user-interfaces/gameover-ui.js"
import * as VICTORY_UI from "../user-interfaces/victory-ui.js"
import { TurnSystem } from "../utils/turn-system.js"
import * as BATTLE_CAMERA from "../cameras/battle-camera.js"

import { theSceneManager } from "../utils/scene-manager.js";
import { theGameState } from "../utils/game-state.js";

import * as GLOBLIB from "../utils/lib-global.js";
import * as BTLIB from "../utils/lib-battle.js";

/**
 * Creates this scene.
 * @param {*} canvas The HTML canvas used for rendering
 * @param {BABYLON.Engine} engine The Babylon.js engine
 * @returns A promise that resolves with the BABYLON.Scene
 */
async function createScene(canvas, engine) {
    // Create Babylon Scene object
    const scene = new BABYLON.Scene(engine);

    // Create main camera
    const camera = BATTLE_CAMERA.createCamera("camera", -Math.PI / 2, Math.PI / 2.1, 3, new BABYLON.Vector3(0, 0.9, 0), scene, canvas, false);

    // Load all meshes
    await Promise.all([
        player.loadAsync(scene),
        enemy.loadAsync(scene),
        floor.loadAsync(scene),
        wall.loadAsync(scene),
        banner_wall.loadAsync(scene),
        table.loadAsync(scene),
        skull.loadAsync(scene),
    ]);

    // Create scenery
    BTLIB.createScenery(scene);

    // Add a dome to serve as the skybox
    var photoDome = new BABYLON.PhotoDome("battledome", "assets/skybox-dungeon.png", {}, scene);
    const _photoDomeLoadedPromise = new Promise((resolve, reject) => {
        photoDome.onReady = () => {
            resolve();
        }
        photoDome.onLoadErrorObservable.add(()=>{
            reject();
        })
        // safety in case the texture has somehow become ready before this Promise even started
        if (photoDome.isReady()) {
            resolve();
        }
    });

    // Create lights:

    // An ambient light
    const ambientLight = GLOBLIB.createAmbientLight(scene);
    ambientLight.direction.multiplyInPlace(new BABYLON.Vector3(1, 1, -1))  // choose the direction that looks best with the default camera
    // A directional light to cast shadows
    const directionalLight = GLOBLIB.createDirectionalLight(scene, [
        player.meshdata.mesh,
        enemy.meshdata.mesh,
        ...banner_wall.instances,
        ...table.instances,
        ...skull.instances,
    ], GLOBLIB.SCENETYPE.BATTLE);
    directionalLight.direction.multiplyInPlace(new BABYLON.Vector3(1, 1, -1))  // choose the direction that looks best with the default camera

    // sync the lights
    scene.onBeforeRenderObservable.add(() => {
        directionalLight.intensity = ambientLight.intensity;
    })

    // Three "effect lights" to be used for the special effects of the special attacks
    const {effectPointLight, effectSpotLight, effectHemiLight} = BTLIB.createEffectLights(scene, player, enemy);

    // Create the turn system for this battle
    const turn_system = new TurnSystem();


    // CREATE THE "SCENE INFO" OBJECT,
    // which contains the scene itself and all the relevant objects within it
    // to be targeted by events, animations and such in the following lines.

    const sceneInfo = {
        scene,
        player,
        enemy,
        ambientLight,
        effectPointLight,
        effectSpotLight,
        effectHemiLight,
        turn_system,
        camera,
        // ui,                  // added later since it needs battleUI and sceneInfo itself
        // onPlayerVictory,     // added later since it needs battleUI and sceneInfo itself
        // onPlayerDefeat,      // added later since it needs battleUI and sceneInfo itself
        // gotoNextScene,       // added later for coherence w/ the above
    }

    // Initialize any character attributes that depend on objects in the current scene
    player.sceneSpecificInit(sceneInfo);
    enemy.sceneSpecificInit(sceneInfo);

    // Have the turn system constantly watch for the condition to pass turn
    turn_system.addTurnObserver(sceneInfo);

    // Create the GUI for this scene
    var battleUI = BATTLE_UI.createUI(sceneInfo);
    sceneInfo.ui = battleUI;

    // Define what will happen when the player wins or loses the battle
    // These functions are called by the TurnSystem,
    // which checks win/loss conditions between turns.

    sceneInfo.onPlayerVictory = function() {
        // have the enemy perform their death animation,
        // then remove the battle UI and show a victory screen
        enemy.death(sceneInfo, () => {
            battleUI.dispose();
            VICTORY_UI.createUI(sceneInfo);
            player.victory(sceneInfo);
        });
    }

    sceneInfo.onPlayerDefeat = function() {
        // have the player perform their death animation,
        // then remove the battle UI and show a game over screen
        player.death(sceneInfo, () => {
            battleUI.dispose();
            camera.detachControl(canvas);
            GAMEOVER_UI.createUI(sceneInfo);
        });
    }

    sceneInfo.gotoNextScene = function() {
        theSceneManager.gotoSceneForDungeon({
            sceneBuilder: theGameState.playerInDungeon.currentSceneBuilder,
            position: theGameState.playerInDungeon.currentPositionInScene,
            target: theGameState.playerInDungeon.currentCameraTarget,
        });
    }

    scene.loadedPromise = Promise.all([
        _photoDomeLoadedPromise,
        battleUI.loadedPromise,
    ]);

    return scene;
}



const sceneBuilder = {
    createScene,
}

export default sceneBuilder;