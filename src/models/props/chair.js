// Asset: a wooden chair. Purely decorative.

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Chair/", "Chair.gltf", scene).then((result) => {
        chair.meshes = result.meshes;
        chair.mesh = result.meshes[1];
        chair.mesh.setEnabled(false);
        chair.mesh.setParent(null);
        chair.mesh.material.backFaceCulling = true;
        chair.instances = [];
        return result;
    });
}

function addInstance(position, rotation, scaling, check_collisions=false, scene=undefined) {

    let mesh = chair.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newInstance = mesh.createInstance("chair");
    
    newInstance.position = position;
    newInstance.rotation = rotation;
    newInstance.scaling = scaling;

    newInstance.isPickable = false;

    if (check_collisions) {
        createCollisionBox(scene, newInstance);
    }

    chair.instances.push(newInstance);
}

function createCollisionBox(scene, newInstance) {
    var cube = new BABYLON.MeshBuilder.CreateBox("box", {
        width: 0.65,
        height: 1.2,
        depth: 0.75,
    }, scene);
    cube.isVisible = false;
    cube.isPickable = false;
    cube.setParent(newInstance);
    cube.position = BABYLON.Vector3.Zero().add(new BABYLON.Vector3(0, 1.2/2, 0));
    cube.rotation = BABYLON.Vector3.Zero();
    cube.scaling = BABYLON.Vector3.One();
    cube.checkCollisions = true;
}

const chair = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addInstance,
    instances: [],
};

export default chair;