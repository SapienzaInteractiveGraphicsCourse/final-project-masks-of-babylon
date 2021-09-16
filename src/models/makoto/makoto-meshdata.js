/**
 * Contains the instructions to load the mesh for Makoto.
 * Usable in both battle and dungeon.
 */

import { RotationFromDegrees } from "../../utils/angles.js";

// list of bones to save in the bonesDict.
const bonesOfInterest = [
    // root (feet)
    "rot",
    // root (~center)
    "Bip01",
    // spine
    "Bip01_Spine",
    "Bip01_Spine1",
    // head
    "Bip01_Neck",
    "Bip01_Head",
    // the trinket around his neck
    "lettore01",
    "lettore02",
    // left arm
    "Bip01_L_Clavicle",
    "Bip01_L_UpperArm",
    "Bip01_L_Forearm",
    "Bip01_L_Hand",
    // right arm (+ sword)
    "Bip01_R_Clavicle",
    "Bip01_R_UpperArm",
    "Bip01_R_Forearm",
    "Bip01_R_Hand",
    "weapon",
    // left leg
    "Bip01_L_Thigh",
    "Bip01_L_Calf",
    "Bip01_L_Foot",
    // right leg
    "Bip01_R_Thigh",
    "Bip01_R_Calf",
    "Bip01_R_Foot",
];

/**
 * Asynchronously loads this character's mesh,
 * positions it for the battle it's going to appear in,
 * and adds the relevant information to the exported object.
 * @param {BABYLON.Scene} scene The scene to associate the loaded mesh to.
 * @returns A promise that resolves when loading and initialization is complete.
 */
function _loadMesh(scene) {
    let makoto = {};
    // Second argument: the path is relative to the HTML file
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Makoto/", "makoto.gltf", scene).then((result) => {
        let mesh = result.meshes[0];
        let skeleton = result.skeletons[0];

        makoto.meshes = result.meshes;
        makoto.mesh = mesh;
        makoto.skeleton = skeleton;

        // set characters non-pickable by default, to avoid accidental issues.
        // individual instances can be set pickable anyway.
        makoto.meshes.forEach((mesh, index) => {
            mesh.isPickable = false;
        });

        return makoto;
    });
}

/**
 * Set some parameters that can only be set after the mesh and skeketon have been loaded.
 */
function _initMeshDependent(makoto) {
    let bonesDict = {};

    // Prepare dictionaries for bones and nodes of interest for the animations,
    // in order to get easy access
    bonesOfInterest.forEach((name) => {
        bonesDict[name] = makoto.skeleton.bones[makoto.skeleton.getBoneIndexByName(name)];
        if (!bonesDict[name]) {
            console.error("Node "+name+" not found")
        }
    })

    makoto.bonesDict = bonesDict;
    makoto.getBone = (name) => {
        return bonesDict[name];
    }
    makoto.getNode = (name) => {
        return bonesDict[name].getTransformNode();
    }

    // Set the initial pose of the character
    makoto.getNode("Bip01_L_UpperArm").rotation = RotationFromDegrees(0, -32.7, -17);
    makoto.getNode("Bip01_L_Forearm").rotation = RotationFromDegrees(0, -50.5, 17.6);
    makoto.getNode("Bip01_R_UpperArm").rotation = RotationFromDegrees(0, -20.3, 0);
    makoto.getNode("Bip01_R_Forearm").rotation = RotationFromDegrees(0, 41.6, 0);
    makoto.getNode("Bip01_L_Thigh").rotation = RotationFromDegrees(-24.3, 23.5, 7.93);
    makoto.getNode("Bip01_L_Calf").rotation = RotationFromDegrees(24, 23, 8);
    makoto.getNode("Bip01_R_Thigh").rotation = RotationFromDegrees(-22.8, -33, -11.9);
    makoto.getNode("Bip01_R_Calf").rotation = RotationFromDegrees(22.4, -33, -12);

    /**
     * Stops all animations on this character.
     * @param {BABYLON.Scene} scene The current scene
     */
    makoto.stopAllAnimations = function(scene) {
        scene.stopAnimation(makoto.mesh);
        scene.stopAnimation(makoto.skeleton);
        makoto.skeleton.bones.forEach((item, index)=>{scene.stopAnimation(item)});
        makoto.mesh.getChildTransformNodes(false).forEach((item, index)=>{scene.stopAnimation(item)});
    }
}

async function loadMakotoAsync(scene) {
    let makoto = await _loadMesh(scene);
    _initMeshDependent(makoto);
    return makoto;
}






export {
    loadMakotoAsync,
}