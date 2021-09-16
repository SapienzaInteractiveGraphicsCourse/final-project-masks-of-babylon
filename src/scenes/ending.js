/**
 * File for the ending scene.
 */

import floor from "../models/floor/floor.js";
import wall from "../models/wall/wall.js";
import babyloncube from "../models/props/babylon-cube.js";
import pedestal from "../models/props/pedestal.js";
import { addBlock } from "../utils/dungeon-block.js";

import { theSceneManager } from "../utils/scene-manager.js";
import menuSceneBuilder from "../scenes/main-menu.js";

import * as GLOBLIB from "../utils/lib-global.js";

// technically not a battle, but we prefer an ArcRotateCamera for a scene
// where the player can't move, and the BattleCamera actually has nothing
// tying it to battle use alone.
import * as BATTLE_CAMERA from "../cameras/battle-camera.js"

import {loadMakotoAsync} from "../models/makoto/makoto-meshdata.js";
import mak_miscanims from "../models/makoto/mak-miscanims.js";

async function createScene(canvas, engine) {
    const scene = new BABYLON.Scene(engine);

    // Create main camera
    const camera = BATTLE_CAMERA.createCamera("camera", 0, Math.PI / 2.1, 3, new BABYLON.Vector3(24*6, 0.9, 29*6), scene, canvas, false);
    camera.upperBetaLimit = Math.PI/1.9;
    camera.lowerBetaLimit = Math.PI/2.6;
    camera.upperAlphaLimit = Math.PI/6;
    camera.lowerAlphaLimit = -Math.PI/6;

    await floor.loadAsync(scene);
    await wall.loadAsync(scene);
    await babyloncube.loadAsync(scene);
    await pedestal.loadAsync(scene);

    // recreate the boss room since the ending takes place there
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

    // Add a dome to serve as the skybox
    var photoDome = new BABYLON.PhotoDome("battledome", "assets/skybox-boss.png", {}, scene);
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

    const makoto = await loadMakotoAsync(scene);
    makoto.mesh.position.x = 24*6;
    makoto.mesh.position.y = -0.04;
    makoto.mesh.position.z = 29*6 - 1;
    makoto.mesh.rotation = BABYLON.Vector3.Zero();
    makoto.mesh.scaling = new BABYLON.Vector3(0.006, 0.006, 0.006);
    makoto.getNode("weapon").scaling = BABYLON.Vector3.Zero();   // hide the sword
    mak_miscanims.ending(makoto, scene);

    babyloncube.setup(new BABYLON.Vector3(24*6, 1, 29*6+1), scene);

    pedestal.setup(new BABYLON.Vector3(24*6, 0, 29*6+1), scene);
    pedestal.mesh.rotation = new BABYLON.Vector3(0, Math.PI/6 + Math.PI, 0);


    // An ambient light
    const ambientLight = GLOBLIB.createAmbientLight(scene);
    // A directional light to cast shadows
    const dirlight = GLOBLIB.createDirectionalLight(scene, [
        makoto.mesh,
        ...babyloncube.meshes,
        pedestal.mesh
    ], GLOBLIB.SCENETYPE.ENDING);
    dirlight.position = new BABYLON.Vector3(24*6, 1, 29*6);



    // Build the UI for this scene

    const ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

    // Add a background box

    const rect_bg = new BABYLON.GUI.Rectangle("rect_bg");
    rect_bg.width = "100%";
    rect_bg.adaptHeightToChildren = true;
    rect_bg.cornerRadius = 0;
    rect_bg.color = "black";
    rect_bg.thickness = 0;
    rect_bg.background = "#C0C0C0D8";
    rect_bg.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    ui.addControl(rect_bg);

    // Display an ending message
    const text_ending = new BABYLON.GUI.TextBlock("text_ending");
    text_ending.text = "You have recovered the Cube of Babylon.\nNow the world is safe once more.\n\nTHE END.";
    text_ending.fontSize = "35pt";
    text_ending.resizeToFit = true;
    text_ending.paddingBottom = "20px";
    text_ending.paddingTop = "20px";
    rect_bg.addControl(text_ending);

    // Add a button to end the game and return to the main menu
    const btn_menu = BABYLON.GUI.Button.CreateSimpleButton("btn_menu", "Back to the\nMain Menu");
    btn_menu.width = "300px"
    btn_menu.height = "100px";
    btn_menu.color = "black";
    btn_menu.hoverCursor = "pointer";
    btn_menu.cornerRadius = 20;
    btn_menu.background = "purple";
    btn_menu.paddingTop = "10px";
    btn_menu.paddingBottom = "10px";
    btn_menu.paddingLeft = "10px";
    btn_menu.paddingRight = "10px";
    btn_menu.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    btn_menu.textBlock.fontSize = 25;
    btn_menu.textBlock.color = "white"
    btn_menu.onPointerClickObservable.add(function() {
        theSceneManager.gotoScene(menuSceneBuilder);
    });
    rect_bg.addControl(btn_menu);

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