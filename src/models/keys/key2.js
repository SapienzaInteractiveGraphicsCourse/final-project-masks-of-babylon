// Asset: elaborate key. Functionally identical to key1, used for the final lock for aesthetic purposes only.

import { addCloneGenericKey } from "./keys-common.js";

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Key2/", "Key2.gltf", scene).then((result) => {
        key2.meshes = result.meshes;
        key2.mesh = result.meshes[1];
        key2.mesh.setEnabled(false);
        key2.mesh.setParent(null);
        key2.mesh.material.backFaceCulling = true;
        key2.clones = [];
        return result;
    });
}

function addClone(offset, color, check_collisions=false, scene=undefined) {
    let clone =  addCloneGenericKey(
        key2.mesh,
        new BABYLON.Vector3(offset[0]*6, offset[1]*6 + 1, offset[2]*6),
        new BABYLON.Vector3(1.3, 1.3, 1),
        color,
        check_collisions,
        scene
    );
    key2.clones.push(clone);
    return clone;
}

const key2 = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addClone,
    clones: [],
};

export default key2;