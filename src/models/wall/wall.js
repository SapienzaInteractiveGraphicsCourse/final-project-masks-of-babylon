// Asset: one wall tile. By instantiation, it can make up all walls of any scene.

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Wall/", "Wall_Modular.gltf", scene).then((result) => {
        wall.meshes = result.meshes;
        wall.mesh = result.meshes[1];
        wall.mesh.setEnabled(false);
        wall.mesh.setParent(null);
        wall.mesh.material.backFaceCulling = true;
        wall.mesh.freezeWorldMatrix();   // Prevents pos/rot/scale from changing. Should help w/ performance. (Undo w/ .unfreezeWorldMatrix)
        wall.mesh.receiveShadows = true;
        return result;
    });
}

/**
 * Creates up to four blocks of walls (one per cardinal direction) around the floor block at the specified "block coordinates".
 * A block is 6x4x6 units, i.e. 3x3 floor tiles wide and deep, and 3x2 wall tiles wide and high.
 */
function addInstance(offset_x, offset_y, offset_z, n, e, s, w, check_collisions=false, scene=undefined) {

    let mesh = wall.mesh;

    if (!mesh) {
        console.error("You have to load first!");
    }

    mesh.isVisible = false;
    
    let wall_thickness = 0.4;
    let instances_x = 3;
    let instances_y = 2;
    let offset = 2;   //depends on the dimension of the specific gltf object, and any scaling
    let z = -3.20;

    const space = 2;
    for (let y=0; y < instances_y; y++) {
        for (let x=0; x < instances_x; x++) {
            if (n) {
                var newInstance = mesh.createInstance("i" + x+y);
                newInstance.position.z = -z + offset_z*6 - wall_thickness;
                newInstance.position.y = (y+wall_thickness)*(offset) + offset_y*3 + 0.17;
                newInstance.position.x = x;
                if(x%2 != 0){
                    newInstance.position.x = newInstance.position.x * -space;
                }
                newInstance.position.x += offset_x*6;
                newInstance.scaling.x = 1.1;
                newInstance.isPickable = false;
                newInstance.freezeWorldMatrix();

                if (check_collisions && y==0) {
                    createCollisionBox(scene, newInstance, wall_thickness);
                }
            }
            if (e) {
                var newInstance = mesh.createInstance("i" + x+y);
                newInstance.rotation = new BABYLON.Vector3(0, Math.PI/2, 0);
                newInstance.position.x = -z + offset_x*6 - wall_thickness;
                newInstance.position.y = (y+wall_thickness)*(offset) + offset_y*3 + 0.17;
                newInstance.position.z = x;
                if(x%2 != 0){ 
                    newInstance.position.z = newInstance.position.z * -space;
                }
                newInstance.position.z += offset_z*6;
                newInstance.scaling.x = 1.1;
                newInstance.isPickable = false;
                newInstance.freezeWorldMatrix();

                if (check_collisions && y==0) {
                    createCollisionBox(scene, newInstance, wall_thickness);
                }
            }
            if (s) {
                var newInstance = mesh.createInstance("i" + x+y);
                newInstance.rotation = new BABYLON.Vector3(0, Math.PI, 0);
                newInstance.position.z = -z + offset_z*6 - 6;
                newInstance.position.y = (y+wall_thickness)*(offset) + offset_y*3 + 0.17;
                newInstance.position.x = x;
                if(x%2 != 0){ 
                    newInstance.position.x = newInstance.position.x * -space;
                }
                newInstance.position.x += offset_x*6;
                newInstance.scaling.x = 1.1;
                newInstance.isPickable = false;
                newInstance.freezeWorldMatrix();

                if (check_collisions && y==0) {
                    createCollisionBox(scene, newInstance, wall_thickness);
                }
            }
            if (w) {
                var newInstance = mesh.createInstance("i" + x+y);
                newInstance.rotation = new BABYLON.Vector3(0, 3*Math.PI/2, 0);
                newInstance.position.x = -z + offset_x*6 - 6;
                newInstance.position.y = (y+wall_thickness)*(offset) + offset_y*3 + 0.17;
                newInstance.position.z = x;
                if(x%2 != 0){ 
                    newInstance.position.z = newInstance.position.z * -space;
                }
                newInstance.position.z += offset_z*6;
                newInstance.scaling.x = 1.1;
                newInstance.isPickable = false;
                newInstance.freezeWorldMatrix();

                if (check_collisions && y==0) {
                    createCollisionBox(scene, newInstance, wall_thickness);
                }
            }
        }
    }

    // add a plane to cover some holes
    if (n) {
        const plane = BABYLON.MeshBuilder.CreatePlane("patch", {
            width: instances_x*offset,
            height: instances_y*offset,
        }, scene);
        plane.position = new BABYLON.Vector3(offset_x*6, instances_y*offset/2, offset_z*6 + 3);
        plane.material = newInstance.material;    // newInstance holds the last instance created now, it's still in scope b/c it's declared as var
    }
    if (e) {
        const plane = BABYLON.MeshBuilder.CreatePlane("patch", {
            width: instances_x*offset,
            height: instances_y*offset,
        }, scene);
        plane.position = new BABYLON.Vector3(offset_x*6 + 3, instances_y*offset/2, offset_z*6);
        plane.rotation.y = Math.PI/2;
        plane.material = newInstance.material;    // newInstance holds the last instance created now, it's still in scope b/c it's declared as var
    }
    if (s) {
        const plane = BABYLON.MeshBuilder.CreatePlane("patch", {
            width: instances_x*offset,
            height: instances_y*offset,
        }, scene);
        plane.position = new BABYLON.Vector3(offset_x*6, instances_y*offset/2, offset_z*6 - 3);
        plane.rotation.y = Math.PI;
        plane.material = newInstance.material;    // newInstance holds the last instance created now, it's still in scope b/c it's declared as var
    }
    if (w) {
        const plane = BABYLON.MeshBuilder.CreatePlane("patch", {
            width: instances_x*offset,
            height: instances_y*offset,
        }, scene);
        plane.position = new BABYLON.Vector3(offset_x*6 - 3, instances_y*offset/2, offset_z*6);
        plane.rotation.y = -Math.PI/2;
        plane.material = newInstance.material;    // newInstance holds the last instance created now, it's still in scope b/c it's declared as var
    }
}

function createCollisionBox(scene, newInstance, wall_thickness) {
    var cube = new BABYLON.Mesh.CreateBox("box", 2, scene);
    cube.isVisible = false;
    cube.isPickable = false;
    cube.setParent(newInstance);
    cube.position = BABYLON.Vector3.Zero();
    cube.rotation = BABYLON.Vector3.Zero();
    cube.scaling = newInstance.scaling.multiply(new BABYLON.Vector3(1.1, 1.1, 1.1*wall_thickness));
    cube.checkCollisions = true;
    cube.freezeWorldMatrix();
}

const wall = {
    meshes: undefined,
    mesh: undefined,
    loadAsync,
    addInstance,
};

export default wall;