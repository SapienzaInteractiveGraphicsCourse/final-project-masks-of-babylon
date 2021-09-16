/**
 * Contains the instructions to load the mesh for the Samurai.
 * Usable in both battle and dungeon.
 */

import { RotationFromDegrees } from "../../utils/angles.js";

// list of bones to save in the bonesDict.
const bonesOfInterest = [
    // root (feet)
    "move",    // "root" also exists, but it starts w/ -90 on X and a gimbal lock. "move" is basically the same but has no such problems.
    // root (~center)
    "Bip01",
    // body segments
    // "Bip01_Pelvis",   // exists in theory, but may not be so good as it also moves the waist armor
    "Bip01_Spine",
    "Bip01_Spine1",
    // head
    "Bip01_Neck",
    "Bip01_Head",
    // left arm
    "Bip01_L_Clavicle",
    "Bip01_L_UpperArm",
    "Bip01_L_Forearm",
    "Bip01_L_Hand",
    "Bip01_L_Finger0",
    // right arm
    "Bip01_R_Clavicle",
    "Bip01_R_UpperArm",
    "Bip01_R_Forearm",
    "Bip01_R_Hand",
    "Bip01_R_Finger0",
    // sword
    "ken_move01",  // root
    // left leg
    "Bip01_L_Thigh",
    "Bip01_L_Calf",
    "Bip01_L_Foot",
    "Bip01_L_Toe0",
    // right leg
    "Bip01_R_Thigh",
    "Bip01_R_Calf",
    "Bip01_R_Foot",
    "Bip01_R_Toe0",
    // waist armor
    "b_L_maekake_01",   // left
    "b_F_maekake_01",   // front
    "b_R_maekake_01",   // right
    "b_B_maekake_01",   // back
    // cape: lv1
    "b_L_mant_01",   // left
    "b_F_mant_01",   // mid
    "b_R_mant_01",   // right
    // cape: lv2
    "b_L_mant_02",   // left
    "b_F_mant_02",   // mid
    "b_R_mant_02",   // right
];

/**
 * Asynchronously loads this character's mesh
 * and returns an object with basic info.
 * @param {BABYLON.Scene} scene The scene to associate the loaded mesh to.
 * @returns A promise that resolves when loading and initialization is complete.
 */
function _loadMesh(scene) {
    let samurai = {}
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Samurai/", "samurai.gltf", scene).then((result) => {
        let mesh = result.meshes[0];
        let skeleton = result.skeletons[0];

        samurai.meshes = result.meshes;
        samurai.mesh = mesh;
        samurai.skeleton = skeleton;

        // set characters non-pickable by default, to avoid accidental issues.
        // individual instances can be set pickable anyway.
        samurai.meshes.forEach((mesh, index) => {
            mesh.isPickable = false;
        });

        // this part of the Samurai has the material regarding the sword and the gold ornament on the helmet.
        // such material was given an emissive texture so it can "glow in the dark" during the special attack
        // (and only at that time).
        // so we save this material for future use...
        samurai.theMaterialWithEmission = result.meshes[1].material;
        // ...and turn the emission off for now
        samurai.theMaterialWithEmission.emissiveColor = BABYLON.Color3.Black();

        return samurai;
    });
}

/**
 * Set some parameters that can only be set after the mesh and skeketon have been loaded.
 */
function _initMeshDependent(samurai) {
    let bonesDict = {};

    // Prepare dictionaries for bones and nodes of interest for the animations,
    // in order to get easy access
    bonesOfInterest.forEach((name) => {
        bonesDict[name] = samurai.skeleton.bones[samurai.skeleton.getBoneIndexByName(name)];
        if (!bonesDict[name]) {
            console.error("Node "+name+" not found")
        }
    })

    samurai.bonesDict = bonesDict;
    samurai.getBone = (name) => {
        return bonesDict[name];
    }
    samurai.getNode = (name) => {
        return bonesDict[name].getTransformNode();
    }

    // Set the initial pose of the character
    samurai.getNode("Bip01_L_UpperArm").rotation = RotationFromDegrees(-71.8, 35.6, 0);
    samurai.getNode("Bip01_L_Forearm").rotation = RotationFromDegrees(-0.0076, -0.535, -91.6);
    samurai.getNode("Bip01_L_Hand").rotation = RotationFromDegrees(0, 0, 0);
    samurai.getNode("Bip01_R_UpperArm").rotation = RotationFromDegrees(-90, 0, 37.8);
    samurai.getNode("Bip01_R_Forearm").rotation = RotationFromDegrees(0, 0, 50.2);
    samurai.getNode("Bip01_R_Hand").rotation = RotationFromDegrees(0, 0, -31.7);


    /**
     * Stops all animations on this character.
     * @param {BABYLON.Scene} scene The current scene
     */
    samurai.stopAllAnimations = function(scene) {
        scene.stopAnimation(samurai.mesh);
        scene.stopAnimation(samurai.skeleton);
        samurai.skeleton.bones.forEach((item, index)=>{scene.stopAnimation(item)});
        samurai.mesh.getChildTransformNodes(false).forEach((item, index)=>{scene.stopAnimation(item)});
    }
}

async function loadSamuraiAsync(scene) {
    let samurai = await _loadMesh(scene);
    _initMeshDependent(samurai);
    return samurai;
}






export {
    loadSamuraiAsync,
}