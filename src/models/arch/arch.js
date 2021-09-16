// Asset: an architectural element representing an arch. Most will host doors or bars.

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Arch/", "Arch.gltf", scene).then((result) => {
        arch.meshes = result.meshes;
        arch.mesh = result.meshes[1];
        arch.mesh.setEnabled(false);
        arch.mesh.setParent(null);
        arch.mesh.material.backFaceCulling = true;
        return result;
    });
}

function addInstance(offset, ninetyDegRot=false, check_collisions=false, scene=undefined) {

    let mesh = arch.mesh;
    let wall_thickness = 0.4;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newInstance = mesh.createInstance("arch");
    if (ninetyDegRot) {
        newInstance.rotation = new BABYLON.Vector3(0, Math.PI/2, 0);
        newInstance.scaling.y = 1; // Seems trivial, but explicitly defining this actually avoids a strange flipping. So don't remove this.
    }
    newInstance.position.x = offset[0]*6;
    newInstance.position.y = offset[1]*6;
    newInstance.position.z = offset[2]*6;

    newInstance.scaling.x = 1.5;

    newInstance.isPickable = false;

    if (check_collisions) {
        createCollisionBoxes(scene, newInstance, wall_thickness);
    }
}

function createCollisionBoxes(scene, newInstance, wall_thickness) {
    var cube = new BABYLON.Mesh.CreateBox("boxL", 2, scene);
    cube.isVisible = false;
    cube.isPickable = false;
    cube.setParent(newInstance);
    cube.position = BABYLON.Vector3.Zero();
    cube.position = cube.position.add(new BABYLON.Vector3(1.5, 0, 0));
    cube.rotation = BABYLON.Vector3.Zero();
    cube.scaling = newInstance.scaling.multiply(new BABYLON.Vector3(0.25, 2, 1.1*wall_thickness));
    cube.checkCollisions = true;

    var cube = new BABYLON.Mesh.CreateBox("boxR", 2, scene);
    cube.isVisible = false;
    cube.isPickable = false;
    cube.setParent(newInstance);
    cube.position = BABYLON.Vector3.Zero();
    cube.position = cube.position.add(new BABYLON.Vector3(-1.5, 0, 0));
    cube.rotation = BABYLON.Vector3.Zero();
    cube.scaling = newInstance.scaling.multiply(new BABYLON.Vector3(0.25, 2, 1.1*wall_thickness));
    cube.checkCollisions = true;
}

const arch = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addInstance,
};

export default arch;