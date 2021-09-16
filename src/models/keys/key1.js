// Asset: simple key. Opens a lock of the corresponding color.

import { addCloneGenericKey } from "./keys-common.js";

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Key1/", "Key1.gltf", scene).then((result) => {
        key1.meshes = result.meshes;
        key1.mesh = result.meshes[1];
        key1.mesh.setEnabled(false);
        key1.mesh.setParent(null);
        key1.mesh.material.backFaceCulling = true;
        key1.clones = [];
        return result;
    });
}

function addClone(offset, color, check_collisions=false, scene=undefined) {
    let clone = addCloneGenericKey(
        key1.mesh,
        new BABYLON.Vector3(offset[0]*6, offset[1]*6 + 0.5, offset[2]*6),
        new BABYLON.Vector3(1.3, 1.3, 1),
        color,
        check_collisions,
        scene
    );
    key1.clones.push(clone);
    return clone;
}

const key1 = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addClone,
    clones: [],
};

export default key1;