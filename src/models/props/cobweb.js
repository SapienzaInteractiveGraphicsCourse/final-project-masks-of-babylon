// Asset: a web. Purely decorative.

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Cobweb/", "Cobweb.gltf", scene).then((result) => {
        cobweb.meshes = result.meshes;
        cobweb.mesh = result.meshes[1];
        cobweb.mesh.setEnabled(false);
        cobweb.mesh.setParent(null);
        cobweb.mesh.material.backFaceCulling = true;
        cobweb.instances = [];
        return result;
    });
}

function addInstance(position, rotation, scaling) {

    let mesh = cobweb.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newInstance = mesh.createInstance("cobweb");
    
    newInstance.position = position;
    newInstance.rotation = rotation;
    newInstance.scaling = scaling;

    newInstance.isPickable = false;

    cobweb.instances.push(newInstance);
}

const cobweb = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addInstance,
    instances: [],
};

export default cobweb;