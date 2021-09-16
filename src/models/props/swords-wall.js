// Asset: a set of swords mounted on a wall. Purely decorative.

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Swords_wall/", "Swords_wall.gltf", scene).then((result) => {
        swords_wall.meshes = result.meshes;
        swords_wall.mesh = result.meshes[1];
        swords_wall.mesh.setEnabled(false);
        swords_wall.mesh.setParent(null);
        swords_wall.mesh.material.backFaceCulling = true;
        swords_wall.instances = [];
        return result;
    });
}

function addInstance(position, rotation=BABYLON.Vector3.Zero(), scaling=BABYLON.Vector3.One()) {

    let mesh = swords_wall.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }


    var newInstance = mesh.createInstance("i_"+position.x+"_"+position.y+"_"+position.z);

    newInstance.position = position;
    newInstance.rotation = rotation;
    newInstance.scaling = scaling;
    newInstance.isPickable = false;

    swords_wall.instances.push(newInstance);
}

function addInstanceStreamlined(offset, dir) {
    let pos = new BABYLON.Vector3(offset[0]*6, offset[1], offset[2]*6);
    let rot = new BABYLON.Vector3();
    switch (dir.toLowerCase()) {
        case "n":
            rot.y = Math.PI;
            pos.z += 2.5;
            break;
        case "s":
            rot.y = 0;
            pos.z -= 2.5;
            break;
        case "w":
            rot.y = Math.PI/2;
            pos.x -= 2.5;
            break;
        case "e":
            rot.y = -Math.PI/2;
            pos.x += 2.5;
            break;
    }
    let scl = BABYLON.Vector3.One().scale(2.25);
    return addInstance(pos, rot, scl);
}

const swords_wall = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addInstance,
    addInstanceStreamlined,
    instances: [],
};

export default swords_wall;