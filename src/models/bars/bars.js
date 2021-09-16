// Asset: one set of grid-like metal bars. Block the way until the corresponding lock is opened.

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Bars/", "Bars.gltf", scene).then((result) => {
        bars.meshes = result.meshes;
        bars.mesh = result.meshes[1];
        bars.mesh.setEnabled(false);
        bars.mesh.setParent(null);
        bars.mesh.material.albedoColor = new BABYLON.Color3(0.25, 0.25, 0.35);
        bars.mesh.material.backFaceCulling = true;
        bars.instances = [];
        return result;
    });
}

function addInstance(offset, dir, check_collisions=false, scene=undefined) {

    dir = dir.toLowerCase();

    let mesh = bars.mesh;
    let wall_thickness = 0.4;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newInstance = mesh.createInstance("bars");

    newInstance.position.x = offset[0]*6;
    newInstance.position.y = offset[1]*6 - 1.5;
    newInstance.position.z = offset[2]*6;

    switch (dir) {
        case "e":
            newInstance.rotation = new BABYLON.Vector3(0, Math.PI/2, 0);
            break;
        case "w":
            newInstance.rotation = new BABYLON.Vector3(0, -Math.PI/2, 0);
            break;
        case "n":
            newInstance.rotation = new BABYLON.Vector3(0, 0, 0);
            break;
        case "s":
            newInstance.rotation = new BABYLON.Vector3(0, Math.PI, 0);
            break;
    }

    newInstance.scaling.x = 1.5;
    newInstance.scaling.y = 1.5;

    if (check_collisions) {
        createCollisionBox(scene, newInstance, wall_thickness);
    }
    
    bars.instances.push(newInstance);

    return newInstance;
}

function createCollisionBox(scene, newInstance, wall_thickness) {
    var cube = new BABYLON.Mesh.CreateBox("box", 2, scene);
    cube.isVisible = false;
    cube.isPickable = false;
    cube.setParent(newInstance);
    cube.position = new BABYLON.Vector3(0, 1, 0);
    cube.rotation = BABYLON.Vector3.Zero();
    cube.scaling = newInstance.scaling.multiply(new BABYLON.Vector3(1.1, 1.1, 0.1*wall_thickness));
    cube.checkCollisions = true;
}

const bars = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addInstance,
    instances: [],
};

export default bars;