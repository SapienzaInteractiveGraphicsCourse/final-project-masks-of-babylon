/**
 * File for a pedestal object which will hold the Babylon Cube.
 * Since this object appears in a single copy in one scene, it won't be instanceable,
 * unlike many other objects in this project.
 */

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Pedestal/", "Pedestal.gltf", scene).then((result) => {
        pedestal.meshes = result.meshes;
        pedestal.mesh = result.meshes[1];
        pedestal.mesh.material.backFaceCulling = true;
        pedestal.mesh.receiveShadows = true;
        return result;
    });
}

function setup(position, scene) {

    if (!pedestal.mesh) {
        console.error("You have to load first!");
    }

    let root = pedestal.meshes[0];

    root.position = position;
    pedestal.mesh.scaling = new BABYLON.Vector3(0.45, 0.3, 0.45);
}

const pedestal = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    setup,
};

export default pedestal;