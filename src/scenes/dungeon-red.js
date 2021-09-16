/// <reference path="../../libs/babylon.d.ts"/>
/**
 * Base file for the scene of the final section of the dungeon,
 * and the lair of the boss.
 * The color-themed names of these files refer to the key color required
 * to unlock it, as well as the color of the banners that identify the section.
 * The specific choice of these colors is arbitrary, except for this room,
 * which is red for danger.
 * 
 * EXPORTS a JS object containing the function to create the scene.
 */

import { theSceneManager } from "../utils/scene-manager.js";
import dungeonSceneBuilder from "./dungeon.js";
import bossfightSceneBuilder from "./bossfight.js";

import floor from "../models/floor/floor.js";
import wall from "../models/wall/wall.js";
import { addBlock } from "../utils/dungeon-block.js";
import arch from "../models/arch/arch.js";
import door from "../models/door/door.js";

import banner_wall from "../models/props/banner-wall.js";
import skull from "../models/props/skull.js";

import * as DUNGEON_CAMERA from "../cameras/dungeon-camera.js";
import * as DGLIB from "../utils/lib-dungeon.js";
import * as GLOBLIB from "../utils/lib-global.js";

import { loadPhantomMasterAsync } from "../models/phantom-master/phantom-master-meshdata.js";
import pm_miscanims from "../models/phantom-master/pm-miscanims.js";
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

    await banner_wall.loadAsync(scene);
    await skull.loadAsync(scene);

    // This creates and positions a camera
    const camera = DUNGEON_CAMERA.createCamera("dungeon-camera", position, target, scene, canvas);

    var photoDome = new BABYLON.PhotoDome("dungeondome", "assets/skybox-boss.png", {}, scene);
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

    var tpDest;

    //arch red
    arch.addInstance([24,0,20.5], false, false, scene);
    //door red
    tpDest = {
        sceneBuilder: dungeonSceneBuilder,
        position: new BABYLON.Vector3(24*6, 2, 20*6),
        target:  new BABYLON.Vector3(-10*6, 0, -10000*6),
    };
    door.addInstance([24,0,20.5], tpDest, "S", true, scene);
    addBlock(floor, wall, [24,0,20], ["W","E"], true, scene);
    DGLIB.addDarkness(new BABYLON.Vector3(24,0,20.5), "S", scene);

    //red room
    addBlock(floor, wall, [24,0,21], ["W","E"], true, scene);
    addBlock(floor, wall, [24,0,22], ["W","E"], true, scene);
    addBlock(floor, wall, [24,0,23], ["W","E"], true, scene);
    addBlock(floor, wall, [24,0,24], ["W","E"], true, scene);
    addBlock(floor, wall, [24,0,25], ["W","E"], true, scene);
    addBlock(floor, wall, [24,0,26], ["W","E"], true, scene);
    addBlock(floor, wall, [24,0,27], [], true, scene);
    addBlock(floor, wall, [24,0,28], [], true, scene);
    addBlock(floor, wall, [24,0,29], [], true, scene);
    addBlock(floor, wall, [24,0,30], [], true, scene);
    addBlock(floor, wall, [24,0,31], ["N"], true, scene);

    addBlock(floor, wall, [23,0,27], ["S","W"], true, scene);
    addBlock(floor, wall, [23,0,28], [], true, scene);
    addBlock(floor, wall, [23,0,29], [], true, scene);
    addBlock(floor, wall, [23,0,30], [], true, scene);
    addBlock(floor, wall, [23,0,31], ["N","W"], true, scene);

    addBlock(floor, wall, [25,0,27], ["S","E"], true, scene);
    addBlock(floor, wall, [25,0,28], [], true, scene);
    addBlock(floor, wall, [25,0,29], [], true, scene);
    addBlock(floor, wall, [25,0,30], [], true, scene);
    addBlock(floor, wall, [25,0,31], ["N","E"], true, scene);

    addBlock(floor, wall, [22,0,28], ["S","W"], true, scene);
    addBlock(floor, wall, [22,0,29], ["W"], true, scene);
    addBlock(floor, wall, [22,0,30], ["N","W"], true, scene);

    addBlock(floor, wall, [26,0,28], ["S","E"], true, scene);
    addBlock(floor, wall, [26,0,29], ["E"], true, scene);
    addBlock(floor, wall, [26,0,30], ["N","E"], true, scene);

    banner_wall.addInstanceStreamlined([24,2.95,21], "W", "red");
    banner_wall.addInstanceStreamlined([24,2.95,21], "E", "red");
    banner_wall.addInstanceStreamlined([24,2.95,22], "W", "red");
    banner_wall.addInstanceStreamlined([24,2.95,22], "E", "red");
    banner_wall.addInstanceStreamlined([24,2.95,23], "W", "red");
    banner_wall.addInstanceStreamlined([24,2.95,23], "E", "red");
    banner_wall.addInstanceStreamlined([24,2.95,24], "W", "red");
    banner_wall.addInstanceStreamlined([24,2.95,24], "E", "red");
    banner_wall.addInstanceStreamlined([24,2.95,25], "W", "red");
    banner_wall.addInstanceStreamlined([24,2.95,25], "E", "red");
    banner_wall.addInstanceStreamlined([24,2.95,26], "W", "red");
    banner_wall.addInstanceStreamlined([24,2.95,26], "E", "red");

    skull.addInstance(new BABYLON.Vector3(23*6-2, 0, 27*6-2), RotationFromDegrees(0, 135, 0), BABYLON.Vector3.One().scale(1.5), true, scene);
    skull.addInstance(new BABYLON.Vector3(23*6-2, 0, 28*6-2), RotationFromDegrees(0, 135, 0), BABYLON.Vector3.One().scale(1.5), true, scene);
    skull.addInstance(new BABYLON.Vector3(22*6-2, 0, 28*6-2), RotationFromDegrees(0, 135, 0), BABYLON.Vector3.One().scale(1.5), true, scene);
    skull.addInstance(new BABYLON.Vector3(25*6+2, 0, 31*6+2), RotationFromDegrees(0, -45, 0), BABYLON.Vector3.One().scale(1.5), true, scene);
    skull.addInstance(new BABYLON.Vector3(25*6+2, 0, 30*6+2), RotationFromDegrees(0, -45, 0), BABYLON.Vector3.One().scale(1.5), true, scene);
    skull.addInstance(new BABYLON.Vector3(26*6+2, 0, 30*6+2), RotationFromDegrees(0, -45, 0), BABYLON.Vector3.One().scale(1.5), true, scene);
    skull.addInstance(new BABYLON.Vector3(22*6-2, 0, 30*6+2), RotationFromDegrees(0, -135, 0), BABYLON.Vector3.One().scale(1.5), true, scene);
    skull.addInstance(new BABYLON.Vector3(23*6-2, 0, 30*6+2), RotationFromDegrees(0, -135, 0), BABYLON.Vector3.One().scale(1.5), true, scene);
    skull.addInstance(new BABYLON.Vector3(23*6-2, 0, 31*6+2), RotationFromDegrees(0, -135, 0), BABYLON.Vector3.One().scale(1.5), true, scene);
    skull.addInstance(new BABYLON.Vector3(25*6+2, 0, 27*6-2), RotationFromDegrees(0, 45, 0), BABYLON.Vector3.One().scale(1.5), true, scene);
    skull.addInstance(new BABYLON.Vector3(25*6+2, 0, 28*6-2), RotationFromDegrees(0, 45, 0), BABYLON.Vector3.One().scale(1.5), true, scene);
    skull.addInstance(new BABYLON.Vector3(26*6+2, 0, 28*6-2), RotationFromDegrees(0, 45, 0), BABYLON.Vector3.One().scale(1.5), true, scene);


    
    let boss = await loadPhantomMasterAsync(scene);
    boss.mesh.position.x = 24*6;
    boss.mesh.position.y = 0;
    boss.mesh.position.z = 29*6;
    boss.mesh.rotation = new BABYLON.Vector3(0, Math.PI, 0);
    boss.mesh.scaling = new BABYLON.Vector3(-0.015, 0.015, 0.015);
    pm_miscanims.idle(boss, scene);
    boss.meshes.forEach((mesh, index) => {
        mesh.isPickable = true;

        // add an action manager to change the cursor on hover
        mesh.actionManager = new BABYLON.ActionManager(scene);
        mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){
            // project positions on the XZ plane to ignore vertical distances
            let playerpos = scene.activeCamera.position.multiply(new BABYLON.Vector3(1, 0, 1));
            let objectpos = boss.mesh.position;
            let sqrdist = BABYLON.Vector3.DistanceSquared(playerpos, objectpos);
            if (sqrdist < DGLIB.PICK_DISTANCE_LIMIT*DGLIB.PICK_DISTANCE_LIMIT) {
                mesh.actionManager.hoverCursor = "pointer";
            }
            else {
                mesh.actionManager.hoverCursor = "default";
            }
        }));

        mesh.onPicked = function() {
            theSceneManager.gotoScene(bossfightSceneBuilder, "BATTLE START!");
        }
    })
    let roadblockBox = BABYLON.MeshBuilder.CreateBox("roadblockBox", {
        size: 6,
    }, scene);
    roadblockBox.position.x = 24*6;
    roadblockBox.position.y = 0;
    roadblockBox.position.z = 29*6;
    roadblockBox.isVisible = false;
    roadblockBox.checkCollisions = true;

    scene.onPointerObservable.add(DGLIB.pickingObserverFunction);

    /////////////////////////////////////////////////////////////

    var light = GLOBLIB.createAmbientLight(scene);
    var dirlight = GLOBLIB.createDirectionalLight(scene, [
        boss.mesh,
        ...banner_wall.instances,
        ...skull.instances,
    ]);
    scene.onBeforeRenderObservable.add(() => {
        dirlight.position = camera.position;
    });
    
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