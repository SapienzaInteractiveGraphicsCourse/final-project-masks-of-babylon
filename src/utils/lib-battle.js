/**
 * Small library of functions useful to all battle scenes, mostly for scene building.
 */

import { theOptions } from "../utils/options.js"

import { addBlock } from "../utils/dungeon-block.js"

import floor from "../models/floor/floor.js"
import wall from "../models/wall/wall.js"
import banner_wall from "../models/props/banner-wall.js"
import table from "../models/props/table-big.js"
import skull from "../models/props/skull.js"

/**
 * Instantiates floor, walls, and extra scenery objects for the given battle scene.
 * REQUISITE: loadAsync needs to have terminated for each object used here *ahead of time*,
 * so use .then or await before calling this.
 * @param {BABYLON.Scene} scene The current scene
 */
function createScenery(scene) {
    addBlock(floor, wall, [-0.5, 0, -0.5], ["S", "W"]);
    addBlock(floor, wall, [-0.5, 0, 0.5], ["N", "W"]);
    addBlock(floor, wall, [0.5, 0, -0.5], ["S", "E"]);
    addBlock(floor, wall, [0.5, 0, 0.5], ["N", "E"]);

    banner_wall.addInstanceStreamlined([-0.5, 2.95, -0.5], "S", "dkgray");
    banner_wall.addInstanceStreamlined([-0.5, 2.95, -0.5], "W", "dkgray");
    banner_wall.addInstanceStreamlined([-0.5, 2.95, 0.5], "N", "dkgray");
    banner_wall.addInstanceStreamlined([-0.5, 2.95, 0.5], "W", "dkgray");
    banner_wall.addInstanceStreamlined([0.5, 2.95, -0.5], "S", "dkgray");
    banner_wall.addInstanceStreamlined([0.5, 2.95, -0.5], "E", "dkgray");
    banner_wall.addInstanceStreamlined([0.5, 2.95, 0.5], "N", "dkgray");
    banner_wall.addInstanceStreamlined([0.5, 2.95, 0.5], "E", "dkgray");

    table.addInstance(new BABYLON.Vector3(-0.65*6, 0, 0.65*6), new BABYLON.Vector3(0, Math.PI/3, 0), BABYLON.Vector3.One().scale(0.8));

    skull.addInstance(new BABYLON.Vector3(0.8*6, 0, 0.8*6), new BABYLON.Vector3(0, -Math.PI/6, 0), BABYLON.Vector3.One().scale(0.7));
    skull.addInstance(new BABYLON.Vector3(-0.8*6, 0, -0.8*6), new BABYLON.Vector3(0, Math.PI-Math.PI/6, 0), BABYLON.Vector3.One().scale(0.7)); //t
}

/**
 * Creates three light sources that will be used by the special attacks
 * to create lighting effects.
 * REQUIREMENT: loadAsync needs to have terminated for player and enemy
 * *ahead of time*, so use .then or await before calling this.
 * @param {BABYLON.Scene} scene The current scene
 * @param {*} player The player in the current scene.
 * @param {*} enemy The enemy in the current scene.
 * @returns The three lights in a destructuring-assignment-friendly object.
 */
function createEffectLights(scene, player, enemy) {
    const effectPointLight = new BABYLON.PointLight("effectPointLight", new BABYLON.Vector3(0.6, 0.5, -0.4), scene);
    const effectSpotLight = new BABYLON.SpotLight("effectSpotLight", BABYLON.Vector3.Zero(), BABYLON.Vector3.Down(), Math.PI/3, 2, scene);
    const effectHemiLight = new BABYLON.HemisphericLight("effectHemiLight", new BABYLON.Vector3(-1, 0, -1), scene);
    // The parameters of these lights will be set by the special attack currently in execution,
    // but right now they have to be turned off and do nothing
    effectPointLight.intensity = 0;
    effectPointLight.setEnabled(false);
    effectSpotLight.intensity = 0;
    effectSpotLight.setEnabled(false);
    effectHemiLight.intensity = 0;
    effectHemiLight.setEnabled(false);

    // Create shadows for these effect lights
    if (theOptions.shadows != 0) {
        let resolution;
        switch (theOptions.shadows) {
            case 2:
                resolution = 4096;
                break;
            case 1:
            default:
                resolution = 1024;
        }
        const pointShadowGen = new BABYLON.ShadowGenerator(resolution, effectPointLight);
        pointShadowGen.addShadowCaster(player.meshdata.mesh, true);
        pointShadowGen.addShadowCaster(enemy.meshdata.mesh, true);
        effectPointLight.shadowMinZ = 0.1;
        effectPointLight.shadowMaxZ = 3;
        effectPointLight.shadowAngle = Math.PI*0.5;
        const spotShadowGen = new BABYLON.ShadowGenerator(resolution, effectSpotLight);
        spotShadowGen.addShadowCaster(player.meshdata.mesh, true);
        spotShadowGen.addShadowCaster(enemy.meshdata.mesh, true);
        effectSpotLight.shadowMinZ = 0.5;
        effectSpotLight.shadowMaxZ = 3;
        if (theOptions.shadows == 2) {
            pointShadowGen.usePercentageCloserFiltering = true;   // only for point/dir lights
            spotShadowGen.useBlurCloseExponentialShadowMap = true;   // not for point lights
        }
    }

    return {effectPointLight, effectSpotLight, effectHemiLight};
}

export {
    createScenery,
    createEffectLights,
}