/// <reference path="../../libs/babylon.d.ts"/>
/**
 * Base file for the scene of the first section of the dungeon.
 * The color-themed names of these files refer to the key color required
 * to unlock it, as well as the color of the banners that identify the section.
 * The specific choice of these colors is arbitrary.
 * 
 * EXPORTS a JS object containing the function to create the scene.
 */

import dungeonSceneBuilder from "./dungeon.js";

import floor from "../models/floor/floor.js";
import wall from "../models/wall/wall.js";
import { addBlock } from "../utils/dungeon-block.js";
import arch from "../models/arch/arch.js";
import door from "../models/door/door.js";
import key1 from "../models/keys/key1.js";
import key2 from "../models/keys/key2.js";
import banner_wall from "../models/props/banner-wall.js";
import chest from "../models/props/chest.js";
import chair from "../models/props/chair.js";
import * as DUNGEON_CAMERA from "../cameras/dungeon-camera.js";

import { theGameState, KEYSTATE } from "../utils/game-state.js";

import * as DGLIB from "../utils/lib-dungeon.js";
import * as GLOBLIB from "../utils/lib-global.js";

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
    await chest.loadAsync(scene);
    await chair.loadAsync(scene);

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

    //door yellow
    var tpDest = {
        sceneBuilder: dungeonSceneBuilder,
        position: new BABYLON.Vector3(23*6, 2, 17*6),
        target: new BABYLON.Vector3(100000, 0, 0),
    };
    door.addInstance([22.5,0,17], tpDest, "E", true, scene);
    arch.addInstance([22.5,0,17], true, false, scene);
    addBlock(floor, wall, [23,0,17], ["N","S",], true, scene);
    DGLIB.addDarkness(new BABYLON.Vector3(22.5,0,17), "E", scene);

    //////////////////
    //YELLOW
    //////////////////

    addBlock(floor, wall, [22,0,17], ["N","S"], true, scene);
    addBlock(floor, wall, [21,0,17], ["N","S"], true, scene);
    addBlock(floor, wall, [20,0,17], ["N","S"], true, scene);
    addBlock(floor, wall, [19,0,17], ["N","W"], true, scene);
    addBlock(floor, wall, [19,0,16], ["E","W"], true, scene);
    addBlock(floor, wall, [18,0,13], ["S"], true, scene);
    addBlock(floor, wall, [18,0,14], ["W"], true, scene);
    addBlock(floor, wall, [18,0,15], ["W", "N"], true, scene);
    addBlock(floor, wall, [19,0,13], [], true, scene);
    addBlock(floor, wall, [19,0,14], [], true, scene);
    addBlock(floor, wall, [19,0,15], [], true, scene);
    addBlock(floor, wall, [20,0,13], ["E", "S"], true, scene);
    addBlock(floor, wall, [20,0,14], ["E"], true, scene);
    addBlock(floor, wall, [20,0,15], ["E", "N"], true, scene);

    addBlock(floor, wall, [17,0,13], ["N", "S"], true, scene);
    addBlock(floor, wall, [16,0,13], ["N", "S"], true, scene);
    addBlock(floor, wall, [15,0,13], ["N", "S"], true, scene);
    addBlock(floor, wall, [14,0,13], ["N"], true, scene);
    addBlock(floor, wall, [13,0,13], ["N", "S"], true, scene);
    addBlock(floor, wall, [12,0,13], ["N", "S"], true, scene);
    addBlock(floor, wall, [11,0,13], ["N", "W"], true, scene);
    addBlock(floor, wall, [11,0,12], ["E", "W"], true, scene);
    addBlock(floor, wall, [11,0,11], ["E", "S", "W"], true, scene);

    addBlock(floor, wall, [14,0,12], ["E", "W"], true, scene);
    addBlock(floor, wall, [14,0,11], ["E", "W"], true, scene);
    addBlock(floor, wall, [14,0,10], ["E", "W"], true, scene);

    //small yellow
    addBlock(floor, wall, [14,0,8], ["W", "S"], true, scene);
    addBlock(floor, wall, [14,0,9], ["W"], true, scene);
    addBlock(floor, wall, [15,0,8], ["S"], true, scene);
    addBlock(floor, wall, [15,0,9], ["N", "E"], true, scene);

    addBlock(floor, wall, [19,0,12], ["E", "W"], true, scene);
    addBlock(floor, wall, [19,0,11], ["E", "W"], true, scene);
    addBlock(floor, wall, [19,0,10], ["E", "W"], true, scene);
    addBlock(floor, wall, [19,0,9], ["E", "W"], true, scene);
    addBlock(floor, wall, [19,0,8], ["E"], true, scene);
    addBlock(floor, wall, [19,0,7], ["E", "W"], true, scene);
    addBlock(floor, wall, [19,0,6], ["E", "W", "S"], true, scene);
    addBlock(floor, wall, [18,0,8], ["N", "S"], true, scene);
    addBlock(floor, wall, [17,0,8], ["N", "S"], true, scene);
    addBlock(floor, wall, [16,0,8], ["N", "S"], true, scene);

    banner_wall.addInstanceStreamlined([19,2.95,16], "W", "yellow");
    banner_wall.addInstanceStreamlined([19,2.95,16], "E", "yellow");
    banner_wall.addInstanceStreamlined([18,2.95,15], "N", "yellow");
    banner_wall.addInstanceStreamlined([20,2.95,15], "N", "yellow");
    chest.addInstanceStreamlined([17,0,13-0.25], 0, true, scene);
    chest.addInstanceStreamlined([15-0.4,0,9+0.25], Math.PI, true, scene);
    chair.addInstance(new BABYLON.Vector3(20*6-2.5, 0, 13*6-1.9), new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(1.75, 1.5, 1.75), true, scene);
    chair.addInstance(new BABYLON.Vector3(15*6, 0, 8*6-1.9), new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(1.75, 1.5, 1.75), true, scene);


    if (theGameState.keyState.green == KEYSTATE.INITIAL) {
        key1.addClone([14.5,0,8.5], "green", false, scene);
    }

    scene.onPointerObservable.add(DGLIB.pickingObserverFunction);

    /////////////////////////////////////////////////////////////

    GLOBLIB.createAmbientLight(scene);
    const dl = GLOBLIB.createDirectionalLight(scene, [
        ...key1.clones,
        ...key2.clones,
        ...banner_wall.instances,
        ...chest.instances,
        ...chair.instances,
    ]);
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