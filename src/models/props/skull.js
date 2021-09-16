// Asset: a skull. Purely decorative.

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Skull/", "Skull.gltf", scene).then((result) => {
        skull.meshes = result.meshes;
        skull.mesh = result.meshes[1];
        skull.mesh.setEnabled(false);
        skull.mesh.setParent(null);
        skull.mesh.material.backFaceCulling = true;
        skull.instances = [];
        return result;
    });
}

function addInstance(position, rotation, scaling, check_collisions=false, scene=undefined, collisionbox_disp=undefined) {

    let mesh = skull.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }

    var newInstance = mesh.createInstance("skull");
    
    newInstance.position = position;
    newInstance.rotation = rotation;
    newInstance.scaling = scaling;

    newInstance.isPickable = false;

    if (check_collisions) {
        createCollisionBox(scene, newInstance, collisionbox_disp);
    }

    skull.instances.push(newInstance);
}

function createCollisionBox(scene, newInstance, collisionbox_disp) {
    var cube = new BABYLON.MeshBuilder.CreateBox("box", {
        width: 0.65,
        height: 2,
        depth: 0.47,
    }, scene);
    cube.isVisible = false;
    cube.isPickable = false;
    if (!collisionbox_disp) {
        // if we don't have particular needs, parenting is best...
        cube.setParent(newInstance);
        cube.position = BABYLON.Vector3.Zero().add(new BABYLON.Vector3(0, 1, 0));
        cube.rotation = BABYLON.Vector3.Zero();
        cube.scaling = BABYLON.Vector3.One();
    }
    else {
        // ...but for certain poses we need a more direct control
        cube.position = newInstance.position.add(new BABYLON.Vector3(0, 1, 0)).add(collisionbox_disp);
        cube.rotation = newInstance.rotation.multiply(new BABYLON.Vector3(0, 1, 0));
        cube.scaling = newInstance.scaling;
    }
    cube.checkCollisions = true;
}

const skull = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addInstance,
    instances: [],
};

export default skull;