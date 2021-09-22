/**
 * Small library of functions and constants useful to all scenes.
 */

import { theOptions } from "../utils/options.js"

const DEFAULT_AMBIENT_INTENSITY = 0.6;
const SPATK_AMBIENT_INTENSITY = 0.2;   // "SPATK" is for "SPecial ATTack", this will be used in battle by actions such as the player's Fireball

const SCENETYPE = {
    DUNGEON: 0,
    BATTLE: 1,
    ENDING: 2,
}

function createAmbientLight(scene) {
    // create an hemispheric light
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0.5, 1, 0.3), scene);
    // these ruins aren't brightly lit: set a lower intensity...
    light.intensity = DEFAULT_AMBIENT_INTENSITY;
    // ...and a dimmer diffuse color, so we can darken the dungeon a bit further w/o dimming specular reflections too much
    light.diffuse = new BABYLON.Color3(0.6, 0.6, 0.6);

    // return the light for future use
    return light;
}

function createDirectionalLight(scene, shadowcasters=[], sceneType=SCENETYPE.DUNGEON) {
    // create a directional light
    var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(-0.5, -1, -0.3), scene);
    // these ruins aren't brightly lit: set a lower intensity...
    light.intensity = DEFAULT_AMBIENT_INTENSITY;
    // ...and a dimmer diffuse color, so we can darken the dungeon a bit further w/o dimming specular reflections too much
    light.diffuse = new BABYLON.Color3(0.8, 0.8, 0.8);

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
        const shadowgen = new BABYLON.ShadowGenerator(resolution, light);
        shadowcasters.forEach(element => {
            shadowgen.addShadowCaster(element, true);
        });
        if (sceneType == SCENETYPE.ENDING) {
            shadowgen.useBlurCloseExponentialShadowMap = true;
        }
        else if (theOptions.shadows == 2 && sceneType == SCENETYPE.BATTLE) {
            shadowgen.useBlurCloseExponentialShadowMap = true;
        }
        else if (theOptions.shadows == 2 && sceneType == SCENETYPE.DUNGEON) {
            shadowgen.usePercentageCloserFiltering = true;
        }
    
        light.shadowMinZ = -9;
        light.shadowMaxZ = 6;
    }

    // return the light for future use
    return light;
}

export {
    DEFAULT_AMBIENT_INTENSITY,
    SPATK_AMBIENT_INTENSITY,
    SCENETYPE,
    createAmbientLight,
    createDirectionalLight,
}