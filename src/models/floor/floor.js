// Asset: one floor tile. By instantiation, it can cover the whole floor of any scene.

/**
 * Asynchronously load this mesh and set it up for instancing, shadows, etc.
 */
function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Floor/", "Floor_Modular.gltf", scene).then((result) => {
        // register loaded objects
        floor.meshes = result.meshes;
        floor.mesh = result.meshes[1];
        // for instancing: disable the master mesh and undo its parenting (per the Babylon guide)
        floor.mesh.setEnabled(false);
        floor.mesh.setParent(null);
        floor.mesh.material.backFaceCulling = true;
        floor.mesh.freezeWorldMatrix();   // Prevents pos/rot/scale from changing. Should help w/ performance. (Undo w/ .unfreezeWorldMatrix)
        floor.mesh.receiveShadows = true;
        return result;
    });
}

/**
 * Create a new instance of this mesh at the specified coordinates.
 * offset_x and offset_z are in "block coordinates": a block is 6 units long and wide.
 */
function addInstance(offset_x, offset_y, offset_z, check_collisions=false, scene=undefined) {

    let mesh = floor.mesh;

    // check if mesh has been loaded (w/ loadAsync)
    if (!mesh) {
        console.error("You have to load first!");
    }
        
    mesh.isVisible = false;
    
    let instances_per_side = 3;
    let offset = 2;   //depends on the dimension of the specific gltf object, and any scaling
    let y = -0.12;

    for (let x=0; x<instances_per_side; x++) {
        for (let z=0; z<instances_per_side; z++) {

            // create instance
            var newInstance = mesh.createInstance("i_" + x + "_" + z);

            // compute centered position
            let x_centered = x - Math.floor(instances_per_side/2) + 0.5*(1-instances_per_side%2) + offset_x*3;
            let z_centered = z - Math.floor(instances_per_side/2) + 0.5*(1-instances_per_side%2) + offset_z*3;

            newInstance.position.x = x_centered*offset;
            newInstance.position.y = y;
            newInstance.position.z = z_centered*offset;

            newInstance.isPickable = false;

            newInstance.freezeWorldMatrix();

            // a box is much easier to collide with and move on, rather than the irregularly-tiled mesh
            if (check_collisions) {
                var cube = new BABYLON.MeshBuilder.CreateBox("box", {
                    width: 2,
                    height: 0.4,
                    depth: 2,
                }, scene);
                cube.isVisible = false;
                cube.isPickable = false;
                cube.setParent(newInstance);
                // NOT default, apparently. Need to specify this.
                cube.position = BABYLON.Vector3.Zero();
                cube.rotation = BABYLON.Vector3.Zero();
                cube.checkCollisions = true;
                cube.freezeWorldMatrix();
            }
        }
    }

    // add a plane to cover some holes
    const plane = BABYLON.MeshBuilder.CreateGround("patch", {
        width: instances_per_side*offset,
        height: instances_per_side*offset,
    }, scene);
    plane.position = new BABYLON.Vector3(offset_x*6, -0.12, offset_z*6);
    plane.material = newInstance.material;    // newInstance holds the last instance created now, it's still in scope b/c it's declared as var
}

const floor = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addInstance,
};

export default floor;