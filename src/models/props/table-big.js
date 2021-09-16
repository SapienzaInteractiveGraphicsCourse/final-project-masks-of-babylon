// Asset: a table. Purely decorative.

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Table_Big/", "Table_Big.gltf", scene).then((result) => {
        table.meshes = result.meshes;
        table.mesh = result.meshes[1];
        table.mesh.setEnabled(false);
        table.mesh.setParent(null);
        table.mesh.material.backFaceCulling = true;
        table.instances = [];
        return result;
    });
}

function addInstance(position, rotation, scaling, check_collisions=false, scene=undefined) {

    let mesh = table.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newInstance = mesh.createInstance("table");
    
    newInstance.position = position;
    newInstance.rotation = rotation;
    newInstance.scaling = scaling;

    newInstance.isPickable = false;

    if (check_collisions) {
        createCollisionBox(scene, newInstance);
    }

    table.instances.push(newInstance);
}

function createCollisionBox(scene, newInstance) {
    var cube = new BABYLON.MeshBuilder.CreateBox("box", {
        width: 1.65,
        height: 0.85,
        depth: 3.4,
    }, scene);
    cube.isVisible = false;
    cube.isPickable = false;
    cube.setParent(newInstance);
    cube.position = BABYLON.Vector3.Zero().add(new BABYLON.Vector3(0, 0.8/2, -0.04));
    cube.rotation = BABYLON.Vector3.Zero();
    cube.scaling = BABYLON.Vector3.One();
    cube.checkCollisions = true;
}

const table = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addInstance,
    instances: [],
};

export default table;