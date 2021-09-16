/// <reference path="../../libs/babylon.d.ts"/>
/**
 * Base file for the scene of the initial and "hub" part of the dungeon.
 * 
 * EXPORTS a JS object containing the function to create the scene.
 */

import dungeonBlueSceneBuilder from "./dungeon-blue.js";
import dungeonGreenSceneBuilder from "./dungeon-green.js";
import dungeonYellowSceneBuilder from "./dungeon-yellow.js";
import dungeonRedSceneBuilder from "./dungeon-red.js";

import floor from "../models/floor/floor.js";
import wall from "../models/wall/wall.js";
import { addBlock } from "../utils/dungeon-block.js";
import arch from "../models/arch/arch.js";
import door from "../models/door/door.js";
import bars from "../models/bars/bars.js";
import key1 from "../models/keys/key1.js";
import key2 from "../models/keys/key2.js";
import padlock from "../models/padlock/padlock.js";
import banner_wall from "../models/props/banner-wall.js";
import skull from "../models/props/skull.js";
import cobweb from "../models/props/cobweb.js";
import * as DUNGEON_CAMERA from "../cameras/dungeon-camera.js";

import { theGameState, KEYSTATE } from "../utils/game-state.js";
import  {RotationFromDegrees } from "../utils/angles.js";

import * as STORY_UI from "../user-interfaces/story-ui.js";

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
    await bars.loadAsync(scene);

    await key1.loadAsync(scene);
    await key2.loadAsync(scene);
    await padlock.loadAsync(scene);
    await banner_wall.loadAsync(scene);
    await skull.loadAsync(scene);
    await cobweb.loadAsync(scene);

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


    ///////////
    //dungeon//
    ///////////


    var tpDest;
    var latestBars;   // store the latest bars object created, each will be associated to the corresponding lock before the next one is created

    /////////////////////////// DOORS, ARCHES, BARS ETC.//////////////////////////////////

    //door red
    tpDest = {
        sceneBuilder: dungeonRedSceneBuilder,
        position: new BABYLON.Vector3(24*6, 2, 21*6),
        target: new BABYLON.Vector3(100, 0, 10000*6),
    };
    door.addInstance([24,0,21.5], tpDest, "N", true, scene);
    arch.addInstance([24,0,21.5], false, true, scene);  //door arch
    arch.addInstance([24,0,20.5], false, true, scene); //bars arch
    if (theGameState.keyState.red != KEYSTATE.DONE) {
        latestBars = bars.addInstance([24,0,20.5], "N", true, scene);
        padlock.addClone([24,0,20.5], "red", latestBars, false, scene);
    }
    DGLIB.addDarkness(new BABYLON.Vector3(24,0,21.5), "N", scene);

    //door yellow
    tpDest = {
        sceneBuilder: dungeonYellowSceneBuilder,
        position: new BABYLON.Vector3(22*6, 2, 17*6),
        target: new BABYLON.Vector3(0, 0, 17*6),
    };
    door.addInstance([21.5,0,17], tpDest, "W", true, scene);
    arch.addInstance([21.5,0,17], true, true, scene);   //door arch
    arch.addInstance([22.5,0,17], true, true, scene);  //bars arch
    if (theGameState.keyState.yellow != KEYSTATE.DONE) {
        latestBars = bars.addInstance([22.5,0,17], "W", true, scene);
        padlock.addClone([22.5,0,17], "yellow", latestBars, false, scene);
    }
    DGLIB.addDarkness(new BABYLON.Vector3(21.5,0,17), "W", scene);

    //door blue
    tpDest = {
        sceneBuilder: dungeonBlueSceneBuilder,
        position: new BABYLON.Vector3(22*6, 2, 19*6),
        target: new BABYLON.Vector3(0, 0, 19*6),
    };
    door.addInstance([21.5,0,19], tpDest, "W", true, scene);
    arch.addInstance([21.5,0,19], true, true, scene);   //door arch
    arch.addInstance([22.5,0,19], true, true, scene);  //bars arch
    if (theGameState.keyState.blue != KEYSTATE.DONE) {
        latestBars = bars.addInstance([22.5,0,19], "W", true, scene);
        padlock.addClone([22.5,0,19], "blue", latestBars, false, scene);
    }
    DGLIB.addDarkness(new BABYLON.Vector3(21.5,0,19), "W", scene);

    //door green
    tpDest = {
        sceneBuilder: dungeonGreenSceneBuilder,
        position: new BABYLON.Vector3(26*6, 2, 18*6),
        target: new BABYLON.Vector3(100000, 0, 0),
    };
    door.addInstance([26.5,0,18], tpDest, "E", true, scene);
    arch.addInstance([26.5,0,18], true, true, scene);   //door arch
    arch.addInstance([25.5,0,18], true, true, scene);  //bars arch
    if (theGameState.keyState.green != KEYSTATE.DONE) {
        latestBars = bars.addInstance([25.5,0,18], "E", true, scene);
        padlock.addClone([25.5,0,18], "green", latestBars, false, scene);
    }
    DGLIB.addDarkness(new BABYLON.Vector3(26.5,0,18), "E", scene);

    /////////////////////////////// BLOCKS ///////////////////////////////////////////////

    //start
    addBlock(floor, wall, [29,0,11], ["S", "E"], true, scene);
    addBlock(floor, wall, [29,0,12], ["E"], true, scene);
    addBlock(floor, wall, [29,0,13], ["N", "E"], true, scene);
    addBlock(floor, wall, [28,0,11], ["S"], true, scene);
    addBlock(floor, wall, [28,0,12], [], true, scene);
    addBlock(floor, wall, [28,0,13], ["N"], true, scene);
    addBlock(floor, wall, [27,0,11], ["S", "W"], true, scene);
    addBlock(floor, wall, [27,0,12], [], true, scene);
    addBlock(floor, wall, [27,0,13], ["N", "W"], true, scene);

    addBlock(floor, wall, [26,0,12], ["N", "S"], true, scene);
    addBlock(floor, wall, [25,0,12], ["N", "S"], true, scene);
    addBlock(floor, wall, [24,0,12], ["S", "W"], true, scene);
    addBlock(floor, wall, [24,0,13], ["E", "W"], true, scene);
    addBlock(floor, wall, [24,0,14], ["E", "W"], true, scene);
    addBlock(floor, wall, [24,0,15], ["E", "W"], true, scene);

    arch.addInstance([24,0,15.5], false, true, scene);

    //grey
    addBlock(floor, wall, [23,0,16], ["S","W"], true, scene);
    addBlock(floor, wall, [23,0,17], [], true, scene);
    addBlock(floor, wall, [23,0,18], ["W"], true, scene);
    addBlock(floor, wall, [23,0,19], [], true, scene);
    addBlock(floor, wall, [23,0,20], ["N","W"], true, scene);
    addBlock(floor, wall, [24,0,16], [], true, scene);
    addBlock(floor, wall, [24,0,17], [], true, scene);
    addBlock(floor, wall, [24,0,18], [], true, scene);
    addBlock(floor, wall, [24,0,19], [], true, scene);
    addBlock(floor, wall, [24,0,20], [], true, scene);
    addBlock(floor, wall, [25,0,16], ["S","E"], true, scene);
    addBlock(floor, wall, [25,0,17], ["E"], true, scene);
    addBlock(floor, wall, [25,0,18], [], true, scene);
    addBlock(floor, wall, [25,0,19], ["E"], true, scene);
    addBlock(floor, wall, [25,0,20], ["N","E"], true, scene);

    addBlock(floor, wall, [24,0,22], ["E","W",], true, scene);
    addBlock(floor, wall, [24,0,21], ["E","W",], true, scene);
    addBlock(floor, wall, [22,0,17], ["N","S",], true, scene);
    addBlock(floor, wall, [21,0,17], ["N","S",], true, scene);
    addBlock(floor, wall, [22,0,19], ["N","S",], true, scene);
    addBlock(floor, wall, [21,0,19], ["N","S",], true, scene);
    addBlock(floor, wall, [26,0,18], ["N","S",], true, scene);
    addBlock(floor, wall, [27,0,18], ["N","S",], true, scene);

    //////////////////////////////////////////////////////////////////////////////////////

    banner_wall.addInstanceStreamlined([27,2.95,11.25], "W", "dkgray");
    banner_wall.addInstanceStreamlined([27,2.95,12.75], "W", "dkgray");
    banner_wall.addInstanceStreamlined([23,2.95,16.5], "W", "yellow");
    banner_wall.addInstanceStreamlined([23,2.95,17.5], "W", "yellow");
    banner_wall.addInstanceStreamlined([23,2.95,18.5], "W", "blue");
    banner_wall.addInstanceStreamlined([23,2.95,19.5], "W", "blue");
    banner_wall.addInstanceStreamlined([23.5,2.95,20], "N", "red");
    banner_wall.addInstanceStreamlined([24.5,2.95,20], "N", "red");
    banner_wall.addInstanceStreamlined([25,2.95,17.5], "E", "green");
    banner_wall.addInstanceStreamlined([25,2.95,18.5], "E", "green");

    skull.addInstance(new BABYLON.Vector3(23*6+4, 0, 20*6+1.75), RotationFromDegrees(0, -90-25, 0), BABYLON.Vector3.One().scale(1.5), true, scene);
    skull.addInstance(new BABYLON.Vector3(25*6-4, 0, 20*6+1.75), RotationFromDegrees(0, -90+25, 0), BABYLON.Vector3.One().scale(1.5), true, scene);

    cobweb.addInstance(new BABYLON.Vector3(24*6-2.5, 2, 12*6-2.5), RotationFromDegrees(0, 0, -90), BABYLON.Vector3.One().scale(2));

    //////////////////////////////////////////////////////////////////////////////////////

    if (theGameState.keyState.yellow == KEYSTATE.INITIAL) {
        key1.addClone([24,0,17], "yellow", false, scene);
    }

    scene.onPointerObservable.add(DGLIB.pickingObserverFunction);


    //////////////////////////////////////////////////////////////////////////////////////

    GLOBLIB.createAmbientLight(scene);
    const dl = GLOBLIB.createDirectionalLight(scene, [
        ...banner_wall.instances,
        ...bars.instances,
        ...padlock.clones,
        ...key1.clones,
        ...key2.clones,
        ...skull.instances,
        ...cobweb.instances,
    ]);
    // dungeon areas are too large and winding for any one light position to encompass one completely to project all shadows
    scene.onBeforeRenderObservable.add(() => {
        dl.position = camera.position;
    })



    /////////////////////////////////////////////////////////////////////////////////////
    //////////////////////  SHOW STORY THE FIRST TIME  //////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////

    if (!theGameState.storySeen) {
        camera.detachControl(canvas);
        STORY_UI.createUI(scene).waitFadeAsync().then(() => {
            theGameState.storySeen = true;
            camera.attachControl(canvas, true);
        });
    }

    /////////////////////////////////////////////////////////////

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