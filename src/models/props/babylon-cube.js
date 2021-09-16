/**
 * File for an object resembling the current Babylon.js logo.
 * Such object will appear in the ending as the objective of the player's quest through the dungeon.
 * Since this object appears in a single copy in one scene, it won't be instanceable,
 * unlike many other objects in this project.
 */

import * as MYANIM from "../../utils/animation.js";
import { RotationFromDegrees } from "../../utils/angles.js";

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/BabylonCube/", "BabylonCube.gltf", scene).then((result) => {
        babyloncube.meshes = result.meshes;
        babyloncube.meshes.forEach((mesh, index) => {
            if (mesh.material) {
                mesh.material.backFaceCulling = true;
            }
        });
        return result;
    });
}

function setup(position, scene) {

    if (!babyloncube.meshes) {
        console.error("You have to load first!");
    }

    let root = babyloncube.meshes[0];

    root.position = position;
    root.scaling = new BABYLON.Vector3(1, 1, -1).scale(0.4);

    root.rotation = RotationFromDegrees(-26, -22, -33);


    const quadEase = new BABYLON.SineEase();
    quadEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    
    // begin floating animation
    const _animFloat_bab = new BABYLON.Animation("animFloat", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
    _animFloat_bab.setEasingFunction(quadEase);
    const _animFloat_keys = [
        {
            frame:0,
            value:root.position
        }, {
            frame:30,
            value:root.position.add(new BABYLON.Vector3(0, 0.25, 0))
        }, {
            frame:60,
            value:root.position
        }
    ];
    const animFloat = new MYANIM.Animation(_animFloat_bab, _animFloat_keys);

    MYANIM.directAnimationLoop(scene, root, [animFloat])
}

const babyloncube = {
    meshes: undefined,
    loadAsync,
    setup,
};

export default babyloncube;