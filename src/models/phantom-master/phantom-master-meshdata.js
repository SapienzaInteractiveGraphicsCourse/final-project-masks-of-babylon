/**
 * Contains the instructions to load the mesh for the Phantom Master.
 * Usable in both battle and dungeon.
 */

import { RotationFromDegrees } from "../../utils/angles.js";

// list of bones to save in the bonesDict.
const bonesOfInterest = [
    // root (feet)
    "root",
    // root (~center)
    "Bip01",
    // body segments
    "Bip01_Spine2",
    "Bip01_Spine3",
    // head
    "Bip01_Neck1",
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
    // legs
    "b_pelvis",
    "b_l_leg_00",
    // cape: root
    "mant_root",
    // cape: hood
    "b_hood_0",
    "b_hood_1",
    // cape: level 1
    "b_l_mantFRONT_00",
    "b_l_mantSIDEBACK_00",
    "b_mantBACK_00",
    "b_r_mantSIDEBACK_00",
    "b_r_mantFRONT_00",
    // cape_ level 2
    "b_l_mantFRONT_01",
    "b_l_mantSIDEBACK_02",
    "b_mantBACK_02",
    "b_r_mantSIDEBACK_02",
    "b_r_mantFRONT_01",
    // lantern
    "rantan_helper",
    "fire",
    "rantan",
];

/**
 * Asynchronously loads this character's mesh
 * and returns an object with basic info.
 * @param {BABYLON.Scene} scene The scene to associate the loaded mesh to.
 * @returns A promise that resolves when loading and initialization is complete.
 */
function _loadMesh(scene) {
    let phantomMaster = {};
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Phantom Master/", "phantom-master.gltf", scene).then((result) => {
        let mesh = result.meshes[0];
        let skeleton = result.skeletons[0];

        phantomMaster.meshes = result.meshes;
        phantomMaster.mesh = mesh;
        phantomMaster.skeleton = skeleton;

        // set characters non-pickable by default, to avoid accidental issues.
        // individual instances can be set ickable anyway.
        phantomMaster.meshes.forEach((mesh, index) => {
            mesh.isPickable = false;
        });

        return phantomMaster;
    });
}

/**
 * Set some parameters that can only be set after the mesh and skeketon have been loaded.
 */
function _initMeshDependent(phantomMaster) {
    let bonesDict = {};

    // Prepare dictionaries for bones and nodes of interest for the animations,
    // in order to get easy access
    bonesOfInterest.forEach((name) => {
        bonesDict[name] = phantomMaster.skeleton.bones[phantomMaster.skeleton.getBoneIndexByName(name)];
        if (!bonesDict[name]) {
            console.error("Node "+name+" not found")
        }
    })

    phantomMaster.bonesDict = bonesDict;
    phantomMaster.getBone = (name) => {
        return bonesDict[name];
    }
    phantomMaster.getNode = (name) => {
        return bonesDict[name].getTransformNode();
    }

    // Set the initial pose of the character
    phantomMaster.getNode("Bip01_L_UpperArm").rotation = RotationFromDegrees(0, 0, -30);
    phantomMaster.getNode("Bip01_R_UpperArm").rotation = RotationFromDegrees(0, 0, 30);
    phantomMaster.getNode("b_l_mantFRONT_00").rotation = RotationFromDegrees(0, 0, -23.7);
    phantomMaster.getNode("b_r_mantFRONT_00").rotation = RotationFromDegrees(0, 0, 23.7);

    /**
     * Stops all animations on this character.
     * @param {BABYLON.Scene} scene The current scene
     */
    phantomMaster.stopAllAnimations = function(scene) {
        scene.stopAnimation(phantomMaster.mesh);
        scene.stopAnimation(phantomMaster.skeleton);
        phantomMaster.skeleton.bones.forEach((item, index)=>{scene.stopAnimation(item)});
        phantomMaster.mesh.getChildTransformNodes(false).forEach((item, index)=>{scene.stopAnimation(item)});
    }
}

async function loadPhantomMasterAsync(scene) {
    let phantomMaster = await _loadMesh(scene);
    _initMeshDependent(phantomMaster);
    return phantomMaster;
}






export {
    loadPhantomMasterAsync,
}