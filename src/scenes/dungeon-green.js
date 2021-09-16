/// <reference path="../../libs/babylon.d.ts"/>
/**
 * Base file for the scene of the second section of the dungeon.
 * The color-themed names of these files refer to the key color required
 * to unlock it, as well as the color of the banners that identify the section.
 * The specific choice of these colors is arbitrary.
 * 
 * EXPORTS a JS object containing the function to create the scene.
 */

import { theSceneManager } from "../utils/scene-manager.js";
import battleSceneBuilder from "./battle.js";
import dungeonSceneBuilder from "./dungeon.js";
import { theGameState, KEYSTATE, SPIKESTATE, CARRIEDOBJECT } from "../utils/game-state.js";

import floor from "../models/floor/floor.js";
import wall from "../models/wall/wall.js";
import { addBlock } from "../utils/dungeon-block.js";
import arch from "../models/arch/arch.js";
import door from "../models/door/door.js";
import key1 from "../models/keys/key1.js";
import key2 from "../models/keys/key2.js";
import spiketrap from "../models/spiketrap/spiketrap.js";
import skull from "../models/props/skull.js";
import banner_wall from "../models/props/banner-wall.js";
import cobweb from "../models/props/cobweb.js";
import chest from "../models/props/chest.js";
import * as DUNGEON_CAMERA from "../cameras/dungeon-camera.js";

import * as DGLIB from "../utils/lib-dungeon.js";
import * as GLOBLIB from "../utils/lib-global.js";

import { loadSamuraiAsync } from "../models/samurai/samurai-meshdata.js";
import sam_miscanims from "../models/samurai/sam-miscanims.js"
import { RotationFromDegrees } from "../utils/angles.js";

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
    await spiketrap.loadAsync(scene);

    await skull.loadAsync(scene);
    await banner_wall.loadAsync(scene);
    await cobweb.loadAsync(scene);
    await chest.loadAsync(scene);

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

    //door green
    var tpDest = {
        sceneBuilder: dungeonSceneBuilder,
        position: new BABYLON.Vector3(25*6, 2, 18*6),
        target: new BABYLON.Vector3(10*6, 0, 18*6),
    };
    door.addInstance([25.5,0,18], tpDest, "W", true, scene);
    arch.addInstance([25.5,0,18], true, false, scene);
    addBlock(floor, wall, [25,0,18], ["N","S",], true, scene);
    DGLIB.addDarkness(new BABYLON.Vector3(25.5,0,18), "W", scene);

    //////////////////
    //GREEN
    //////////////////

    addBlock(floor, wall, [26,0,18], ["N", "S"], true, scene);
    addBlock(floor, wall, [27,0,18], ["N", "S"], true, scene);
    addBlock(floor, wall, [28,0,18], ["N", "S"], true, scene);

    // green room 1
    addBlock(floor, wall, [29,0,17], ["S", "W"], true, scene);
    addBlock(floor, wall, [29,0,18], [], true, scene);
    addBlock(floor, wall, [29,0,19], ["N", "W"], true, scene);
    addBlock(floor, wall, [30,0,17], ["S"], true, scene);
    addBlock(floor, wall, [30,0,18], [], true, scene);
    addBlock(floor, wall, [30,0,19], [], true, scene);
    addBlock(floor, wall, [31,0,17], ["S", "E"], true, scene);
    addBlock(floor, wall, [31,0,18], [], true, scene);
    addBlock(floor, wall, [31,0,19], ["N", "E"], true, scene);

    addBlock(floor, wall, [32,0,18], ["N", "S"], true, scene);
    addBlock(floor, wall, [33,0,18], ["N", "S"], true, scene);
    addBlock(floor, wall, [34,0,18], ["N", "S"], true, scene);

    // green room 2
    addBlock(floor, wall, [35,0,17], ["S", "W"], true, scene);
    addBlock(floor, wall, [35,0,18], [], true, scene);
    addBlock(floor, wall, [35,0,19], ["N", "W"], true, scene);
    addBlock(floor, wall, [36,0,17], ["S"], true, scene);
    addBlock(floor, wall, [36,0,18], [], true, scene);
    addBlock(floor, wall, [36,0,19], [], true, scene);
    addBlock(floor, wall, [37,0,17], ["S", "E"], true, scene);
    addBlock(floor, wall, [37,0,18], ["E"], true, scene);
    addBlock(floor, wall, [37,0,19], ["N", "E"], true, scene);

    // green detour
    addBlock(floor, wall, [30,0,20], ["W", "E"], true, scene);
    addBlock(floor, wall, [30,0,21], ["W", "E"], true, scene);
    addBlock(floor, wall, [30,0,22], ["N", "W"], true, scene);
    addBlock(floor, wall, [31,0,22], ["N", "S"], true, scene);
    addBlock(floor, wall, [32,0,22], ["N", "S"], true, scene);
    addBlock(floor, wall, [33,0,22], ["N", "S"], true, scene);
    addBlock(floor, wall, [34,0,22], ["N", "S"], true, scene);
    addBlock(floor, wall, [35,0,22], ["N", "S"], true, scene);
    addBlock(floor, wall, [36,0,22], ["N", "E"], true, scene);
    addBlock(floor, wall, [36,0,21], ["W", "E"], true, scene);
    addBlock(floor, wall, [36,0,20], ["W", "E"], true, scene);
    
    const centerSpiketrapOffset = [33,0,18];
    var [spikes1, _] = spiketrap.addInstance(centerSpiketrapOffset, true, scene);
    var [spikes2, _] = spiketrap.addInstance([33,0,18.333], true, scene);
    var [spikes3, _] = spiketrap.addInstance([33,0,17.666], true, scene);

    // set spikes to their "up" state directly when returning to this scene
    // if the GameState remembers they were up before
    if (theGameState.spikeState.spike1 == SPIKESTATE.UP) {
        spikes1.setUp(scene);
        spikes2.setUp(scene);
        spikes3.setUp(scene);
    }

    var spikeUpObserver, spikeDownObserver;
    spikeUpObserver = scene.onBeforeRenderObservable.add(() => {
        if (theGameState.spikeState.spike1 == SPIKESTATE.DOWN) {
            let sqrdist = BABYLON.Vector3.DistanceSquared(
                camera.position,
                new BABYLON.Vector3(centerSpiketrapOffset[0]*6, centerSpiketrapOffset[1], centerSpiketrapOffset[2]*6)
            );
            let triggerDist = 5;
            if (sqrdist < triggerDist*triggerDist) {
                spikes1.goUp(scene);
                spikes2.goUp(scene);
                spikes3.goUp(scene);
                scene.onBeforeRenderObservable.remove(spikeUpObserver);
                
                theGameState.spikeState.spike1 = SPIKESTATE.UP;
                theGameState.spikeState.spike2 = SPIKESTATE.UP;
                theGameState.spikeState.spike3 = SPIKESTATE.UP;
            }
        }
    });
    spikeDownObserver = scene.onBeforeRenderObservable.add(() => {
        if (theGameState.playerInDungeon.carriedObject == CARRIEDOBJECT.KEY_BLUE) {
            if (theGameState.spikeState.spike1 == SPIKESTATE.UP) {
                spikes1.goDown(scene);
                spikes2.goDown(scene);
                spikes3.goDown(scene);
                scene.onBeforeRenderObservable.remove(spikeDownObserver);
                
                theGameState.spikeState.spike1 = SPIKESTATE.OFF;
                theGameState.spikeState.spike2 = SPIKESTATE.OFF;
                theGameState.spikeState.spike3 = SPIKESTATE.OFF;
            }
        }
    });

    banner_wall.addInstanceStreamlined([28,2.95,18], "N", "green");
    banner_wall.addInstanceStreamlined([28,2.95,18], "S", "green");
    banner_wall.addInstanceStreamlined([29,2.95,17], "W", "green");
    banner_wall.addInstanceStreamlined([29,2.95,19], "W", "green");

    const spiketrapCenterVector = new BABYLON.Vector3(centerSpiketrapOffset[0]*6, centerSpiketrapOffset[1]+0.1, centerSpiketrapOffset[2]*6);
    skull.addInstance(spiketrapCenterVector.add(new BABYLON.Vector3(-0.48, 0.175, 1.34)), RotationFromDegrees(74.8, 0, 0), BABYLON.Vector3.One().scale(1.5), true, scene, new BABYLON.Vector3(0, -0.1, 0.2));
    skull.addInstance(spiketrapCenterVector.add(new BABYLON.Vector3(0, 0.175, -2)), RotationFromDegrees(-74.8, -90, 0), BABYLON.Vector3.One().scale(1.5), true, scene, new BABYLON.Vector3(0.2, -0.1, 0));

    cobweb.addInstance(new BABYLON.Vector3(31*6+2.5, 2, 19*6+2.5), RotationFromDegrees(0, 180, -90), BABYLON.Vector3.One().scale(2));

    chest.addInstanceStreamlined([37,0,18+0.3], -Math.PI/2, true, scene);
    chest.addInstanceStreamlined([37,0,18-0.3], -Math.PI/2, true, scene);

    let samurai;
    if (!theGameState.enemiesEncountered.green) {
        samurai = await loadSamuraiAsync(scene);
        samurai.mesh.position.x = 33*6;
        samurai.mesh.position.y = 0.0;
        samurai.mesh.position.z = 22*6;
        samurai.mesh.rotation = new BABYLON.Vector3(0, -Math.PI/2, 0);
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
                theGameState.enemiesEncountered.green = true;
                theSceneManager.gotoScene(battleSceneBuilder, "BATTLE START!");
            }
        })
        let roadblockBox = BABYLON.MeshBuilder.CreateBox("roadblockBox", {
            size: 6,
        }, scene);
        roadblockBox.position.x = 33*6;
        roadblockBox.position.y = 3;
        roadblockBox.position.z = 22*6;
        roadblockBox.isVisible = false;
        roadblockBox.checkCollisions = true;
    }
    else {
        samurai = undefined;   // nothing to load if enemy already encountered
    }

    if (theGameState.keyState.blue == KEYSTATE.INITIAL) {
        key1.addClone([34,0,18], "blue", false, scene);
    }

    scene.onPointerObservable.add(DGLIB.pickingObserverFunction);

    ////////////////////////////////////////////////////////////

    GLOBLIB.createAmbientLight(scene);
    const shadowcasters = [
        ...key1.clones,
        ...key2.clones,
        ...spiketrap.spikesInstances,
        ...skull.instances,
        ...banner_wall.instances,
        ...cobweb.instances,
        ...chest.instances,
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