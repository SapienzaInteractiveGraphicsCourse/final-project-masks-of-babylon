// Asset: a rectangular chest. Purely decorative, which is why it's already open and empty.

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Chest/", "Chest.gltf", scene).then((result) => {
        chest.meshes = result.meshes;
        chest.mesh = result.meshes[1];
        chest.mesh.setEnabled(false);
        chest.mesh.setParent(null);
        chest.mesh.material.backFaceCulling = true;
        chest.instances = [];
        return result;
    });
}

function addInstance(position, rotation=BABYLON.Vector3.Zero(), scaling=BABYLON.Vector3.One(), check_collisions=false, scene=undefined) {

    let mesh = chest.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }


    var newInstance = mesh.createInstance("i_"+position.x+"_"+position.y+"_"+position.z);

    newInstance.position = position;
    newInstance.rotation = rotation;
    newInstance.scaling = scaling;
    newInstance.isPickable = false;

    if (check_collisions) {
        createCollisionBox(scene, newInstance);
    }

    chest.instances.push(newInstance);
}

function addInstanceStreamlined(offset, rotY, check_collisions=false, scene=undefined) {
    return addInstance(
        new BABYLON.Vector3(offset[0]*6, offset[1], offset[2]*6),
        BABYLON.Vector3.Up().scale(rotY),
        BABYLON.Vector3.One(),
        check_collisions,
        scene
    );
}

function createCollisionBox(scene, newInstance) {
    var cube = new BABYLON.MeshBuilder.CreateBox("box", {
        width: 1.20,
        height: 2,
        depth: 0.8,
    }, scene);
    cube.isVisible = false;
    cube.isPickable = false;
    cube.setParent(newInstance);
    cube.position = BABYLON.Vector3.Zero().add(new BABYLON.Vector3(0, 1, 0));
    cube.rotation = BABYLON.Vector3.Zero();
    cube.scaling = BABYLON.Vector3.One();
    cube.checkCollisions = true;
}

const chest = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addInstance,
    addInstanceStreamlined,
    instances: [],
};

export default chest;