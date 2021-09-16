// Asset: a banner mounted on a wall. Purely decorative.

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Banner_wall/", "Banner_wall.gltf", scene).then((result) => {
        banner_wall.meshes = result.meshes;
        banner_wall.baseMesh = result.meshes[1];
        banner_wall.bannerMesh = result.meshes[2];
        banner_wall.baseMesh.setEnabled(false);
        banner_wall.bannerMesh.setEnabled(false);
        banner_wall.baseMesh.setParent(null);
        banner_wall.bannerMesh.setParent(null);
        banner_wall.baseMesh.material.backFaceCulling = true;
        banner_wall.bannerMesh.material.backFaceCulling = true;
        banner_wall.instances = [];
        return result;
    });
}

/**
 * Adds an instance with full control over its position etc.
 */
function addInstance(position, rotation=BABYLON.Vector3.Zero(), scaling=BABYLON.Vector3.One(), color=undefined) {

    let baseMesh = banner_wall.baseMesh;
    let bannerMesh = banner_wall.bannerMesh;

    if (!baseMesh || !bannerMesh) {
        console.error("You have to load first!");
    }


    var baseInstance = baseMesh.createInstance("i_"+position.x+"_"+position.y+"_"+position.z);

    baseInstance.position = position;
    baseInstance.rotation = rotation;
    baseInstance.scaling = scaling;
    baseInstance.isPickable = false;

    var bannerClone = bannerMesh.clone("c_"+position.x+"_"+position.y+"_"+position.z);
    bannerClone.setEnabled(true);
    bannerClone.material = banner_wall.bannerMesh.material.clone("bannerMaterial");
    color = color || new BABYLON.Color3(0.01, 0.01, 0.01);
    bannerClone.material.albedoColor = color;

    bannerClone.setParent(baseInstance);
    bannerClone.position = BABYLON.Vector3.Zero();
    bannerClone.rotation = BABYLON.Vector3.Zero();
    bannerClone.scaling = BABYLON.Vector3.One();
    bannerClone.isPickable = false;

    banner_wall.instances.push(baseInstance);
}

/**
 * A simpler way to add an instance by specifying the position in "block coordinates" (1 block = 6 units)
 * ad the direction of the wall it should be mounted on.
 */
function addInstanceStreamlined(offset, dir, color) {
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
    let scl = BABYLON.Vector3.One().scale(0.7);
    let col = new BABYLON.Color3(0.01, 0.01, 0.01);
    switch (color) {
        case "yellow":
            col = BABYLON.Color3.Yellow();
            break;
        case "green":
            col = BABYLON.Color3.Green();
            break;
        case "blue":
            col = BABYLON.Color3.Blue();
            break;
        case "red":
            col = BABYLON.Color3.Red();
            break;
    }
    return addInstance(pos, rot, scl, col);
}

const banner_wall = {
    meshes: undefined,
    baseMesh: undefined,
    bannerMesh: undefined,
    loadAsync,
    addInstance,
    addInstanceStreamlined,
    instances: [],
};

export default banner_wall;