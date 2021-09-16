/// <reference path="../../libs/babylon.d.ts"/>
/**
 * Base file for the scene of the third section of the dungeon.
 * The color-themed names of these files refer to the key color required
 * to unlock it, as well as the color of the banners that identify the section.
 * The specific choice of these colors is arbitrary.
 * 
 * EXPORTS a JS object containing the function to create the scene.
 */

import { theGameState, KEYSTATE } from "../utils/game-state.js";
import { theSceneManager } from "../utils/scene-manager.js";
import dungeonSceneBuilder from "./dungeon.js";
import battleSceneBuilder from "./battle.js";

import floor from "../models/floor/floor.js";
import wall from "../models/wall/wall.js";
import { addBlock } from "../utils/dungeon-block.js";
import arch from "../models/arch/arch.js";
import door from "../models/door/door.js";
import key1 from "../models/keys/key1.js";
import key2 from "../models/keys/key2.js";
import banner_wall from "../models/props/banner-wall.js";
import swords_wall from "../models/props/swords-wall.js";
import table from "../models/props/table-big.js"
import chair from "../models/props/chair.js"
import skull from "../models/props/skull.js"
import * as DUNGEON_CAMERA from "../cameras/dungeon-camera.js";

import * as DGLIB from "../utils/lib-dungeon.js";
import * as GLOBLIB from "../utils/lib-global.js";

import { loadSamuraiAsync } from "../models/samurai/samurai-meshdata.js";
import sam_miscanims from "../models/samurai/sam-miscanims.js"

/**
 * Creates this scene.
 * @param {*} canvas The HTML canvas used for rendering
 * @param {BABYLON.Engine} engine The Babylon.js engine
 * @returns A promise that resolves with the BABYLON.Scene
 */
async function createScene(canvas, engine, position, target) {
    // This creates a basic Babylon Scene object
    var scene = new BABYLON.Scene(engine);
    
    await floor.loadAsync(scene);
    await wall.loadAsync(scene);

    await arch.loadAsync(scene);
    await door.loadAsync(scene);

    await key1.loadAsync(scene);
    await key2.loadAsync(scene);
    await banner_wall.loadAsync(scene);
    await swords_wall.loadAsync(scene);
    await table.loadAsync(scene);
    await chair.loadAsync(scene);
    await skull.loadAsync(scene);

    // This creates and positions a camera
    const camera = DUNGEON_CAMERA.createCamera("dungeon-camera", position, target, scene, canvas);

    var photoDome = new BABYLON.PhotoDome("dungeondome", "assets/skybox-dungeon.png", {}, scene);
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

    //door blue
    var tpDest = {
        sceneBuilder: dungeonSceneBuilder,
        position: new BABYLON.Vector3(23*6, 2, 19*6),
        target: new BABYLON.Vector3(100000, 0, 0),
    };
    door.addInstance([22.5,0,19], tpDest, "E", true, scene);
    arch.addInstance([22.5,0,19], true, false, scene);
    addBlock(floor, wall, [23,0,19], ["N","S",], true, scene);
    DGLIB.addDarkness(new BABYLON.Vector3(22.5,0,19), "E", scene);

    //////////////////
    //BLUE
    //////////////////

    addBlock(floor, wall, [22,0,19], ["N","S",], true, scene);
    addBlock(floor, wall, [21,0,19], ["N","S",], true, scene);
    addBlock(floor, wall, [20,0,19], ["N","S",], true, scene);
    addBlock(floor, wall, [19,0,19], ["N","S",], true, scene);
    addBlock(floor, wall, [18,0,19], ["S",], true, scene);
    addBlock(floor, wall, [17,0,19], ["N","S",], true, scene);
    addBlock(floor, wall, [16,0,19], ["N","S",], true, scene);
    addBlock(floor, wall, [15,0,19], ["N","S",], true, scene);
    addBlock(floor, wall, [14,0,19], ["N","S",], true, scene);
    addBlock(floor, wall, [13,0,19], ["S","W"], true, scene);

    addBlock(floor, wall, [18,0,20], ["E","W"], true, scene);
    addBlock(floor, wall, [18,0,21], ["E","W"], true, scene);

    //small blue
    addBlock(floor, wall, [17,0,22], ["S","W",], true, scene);
    addBlock(floor, wall, [17,0,23], ["N","W",], true, scene);
    addBlock(floor, wall, [18,0,22], ["E",], true, scene);
    addBlock(floor, wall, [18,0,23], ["N","E",], true, scene);

    addBlock(floor, wall, [13,0,20], ["E","W"], true, scene);
    addBlock(floor, wall, [13,0,21], ["E","W"], true, scene);
    addBlock(floor, wall, [13,0,22], ["E","W"], true, scene);
    addBlock(floor, wall, [13,0,23], ["E","W"], true, scene);
    addBlock(floor, wall, [13,0,24], ["E","W"], true, scene);

    addBlock(floor, wall, [14,0,25], ["E","S"], true, scene);
    addBlock(floor, wall, [14,0,26], ["E",], true, scene);
    addBlock(floor, wall, [14,0,27], ["N","E",], true, scene);
    addBlock(floor, wall, [13,0,25], [], true, scene);
    addBlock(floor, wall, [13,0,26], [], true, scene);
    addBlock(floor, wall, [13,0,27], ["N",], true, scene);
    addBlock(floor, wall, [12,0,25], ["W","S",], true, scene);
    addBlock(floor, wall, [12,0,26], ["W"], true, scene);
    addBlock(floor, wall, [12,0,27], ["N","W",], true, scene);

    banner_wall.addInstanceStreamlined([19,2.95,19], "N", "blue");
    banner_wall.addInstanceStreamlined([19,2.95,19], "S", "blue");

    swords_wall.addInstanceStreamlined([17.5, 2.7, 23], "N");

    table.addInstance(new BABYLON.Vector3(17*6+3, 0, 22*6+3), BABYLON.Vector3.Zero(), BABYLON.Vector3.One().scale(1.5), true, scene);
    chair.addInstance(new BABYLON.Vector3(17*6+2, 0, 22*6+3), new BABYLON.Vector3(0, Math.PI/2, 0), new BABYLON.Vector3(1.75, 1.5, 1.75), true, scene);
    chair.addInstance(new BABYLON.Vector3(18*6-2, 0, 22*6+3), new BABYLON.Vector3(0, -Math.PI/2, 0), new BABYLON.Vector3(1.75, 1.5, 1.75), true, scene);

    skull.addInstance(new BABYLON.Vector3(13*6-2, 0, 22*6-2), new BABYLON.Vector3(0, Math.PI, 0), BABYLON.Vector3.One().scale(1.5), true, scene);

    let samurai;
    if (!theGameState.enemiesEncountered.blue) {
        samurai = await loadSamuraiAsync(scene)
        samurai.mesh.position.x = 13*6;
        samurai.mesh.position.y = 0.5;
        samurai.mesh.position.z = 22*6;
        // no need for rotation, it's already good
        samurai.mesh.scaling = new BABYLON.Vector3(-0.01, 0.01, 0.01);
        sam_miscanims.idle_customY(samurai, -0.18, -0.24, scene);
        samurai.meshes.forEach((mesh, index) => {
            mesh.isPickable = true;
            
            // add an action manager to change the cursor on hover
            mesh.actionManager = new BABYLON.ActionManager(scene);
            mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){
                // project positions on the XZ plane to ignore vertical distances
                let playerpos = scene.activeCamera.position.multiply(new BABYLON.Vector3(1, 0, 1));
                let objectpos = samurai.mesh.position;
                let sqrdist = BABYLON.Vector3.DistanceSquared(playerpos, objectpos);
                if (sqrdist < DGLIB.PICK_DISTANCE_LIMIT*DGLIB.PICK_DISTANCE_LIMIT) {
                    mesh.actionManager.hoverCursor = "pointer";
                }
                else {
                    mesh.actionManager.hoverCursor = "default";
                }
            }));

            mesh.onPicked = function() {
                theGameState.playerInDungeon.currentSceneBuilder = sceneBuilder;
                theGameState.playerInDungeon.currentPositionInScene = camera.position;
                theGameState.playerInDungeon.currentCameraTarget = camera.target;
                theGameState.enemiesEncountered.blue = true;
                theSceneManager.gotoScene(battleSceneBuilder, "BATTLE START!");
            }
        })
        let roadblockBox = BABYLON.MeshBuilder.CreateBox("roadblockBox", {
            size: 6,
        }, scene);
        roadblockBox.position.x = 13*6;
        roadblockBox.position.y = 3;
        roadblockBox.position.z = 22*6;
        roadblockBox.isVisible = false;
        roadblockBox.checkCollisions = true;
    }
    else {
        samurai = undefined;   // nothing to load if enemy already encountered
    }

    if (theGameState.keyState.red == KEYSTATE.INITIAL) {
        key2.addClone([13,0,26], "red", false, scene);
    }

    scene.onPointerObservable.add(DGLIB.pickingObserverFunction);

    /////////////////////////////////////////////////////////////

    GLOBLIB.createAmbientLight(scene);
    const shadowcasters = [
        ...key1.clones,
        ...key2.clones,
        ...banner_wall.instances,
        ...swords_wall.instances,
        ...table.instances,
        ...chair.instances,
        ...skull.instances,
    ];
    if (samurai) {
        shadowcasters.push(samurai.mesh);
    }
    const dl = GLOBLIB.createDirectionalLight(scene, shadowcasters);
    // dungeon areas are too large and winding for any one light position to encompass one completely to project all shadows
    scene.onBeforeRenderObservable.add(() => {
        dl.position = camera.position;
    })

    // NEW ATTRIBUTE
    // A Promise that resolves when everything in the scene has been loaded properly,
    // meaning that the SceneManager is free to remove any loading screens it may have activated.
    scene.loadedPromise = Promise.all([
        _photoDomeLoadedPromise,
    ]);

    

    return scene;
}

const sceneBuilder = {
    createScene,
}

export default sceneBuilder;