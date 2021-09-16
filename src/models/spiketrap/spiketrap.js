// Asset: a trap with spikes that rise from the ground.
// It serves only as an obstacle, not as a danger: the spikes appear when the player gets close,
// and all they do is to prevent passage, forcing the player to take the other route.
// The spikes retract when the player gets the key.

function loadAsync(scene) {
    return BABYLON.SceneLoader.ImportMeshAsync("", "assets/Spiketrap/", "spiketrap.gltf", scene).then((result) => {
        spiketrap.meshes = result.meshes;
        spiketrap.spikesMesh = result.meshes[1];
        spiketrap.trapMesh = result.meshes[2];
        spiketrap.spikesMesh.setEnabled(false);
        spiketrap.trapMesh.setEnabled(false);
        spiketrap.spikesMesh.setParent(null);
        spiketrap.trapMesh.setParent(null);
        spiketrap.spikesMesh.material.backFaceCulling = true;
        spiketrap.trapMesh.material.backFaceCulling = true;

        spiketrap.trapMesh.receiveShadows = true;
        spiketrap.spikesInstances = [];
        return result;
    });
}

function addInstance(offset, check_collisions=false, scene=undefined) {

    if (!spiketrap.spikesMesh || !spiketrap.trapMesh) {
        console.error("You have to load first!");
    }

    var spikesInstance = spiketrap.spikesMesh.createInstance("spiketrap_spikes");
    var trapInstance = spiketrap.trapMesh.createInstance("spiketrap_trap");

    // setup that affects both parts equally goes here
    [spikesInstance, trapInstance].forEach((instance, index) => {
        instance.position.x = offset[0]*6;
        instance.position.y = offset[1]*6;
        instance.position.z = offset[2]*6;

        instance.isPickable = false;
    })

    spikesInstance.position.y -= 1.5;
    spikesInstance.goUp = goUpFactory(spikesInstance, trapInstance);
    spikesInstance.goDown = goDownFactory(spikesInstance, trapInstance);
    spikesInstance.setUp = function() {spikesInstance.position.y = trapInstance.position.y;}

    if (check_collisions) {
        createCollisionBox(scene, spikesInstance);
    }

    spiketrap.spikesInstances.push(spikesInstance)

    return [spikesInstance, trapInstance];
}

function goUpFactory(spikes, trap) {
    // generate a function that relates to the specific spike and trap instances
    return function(scene) {
        const _animUp = new BABYLON.Animation("animUp", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
    
        const ease = new BABYLON.QuinticEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        _animUp.setEasingFunction(ease);
    
        BABYLON.Animation.TransitionTo(
            "position",
            trap.position,
            spikes,
            scene,
            30,  // framerate
            _animUp,
            50,  // duration in milliseconds
        );
    }
}

function goDownFactory(spikes, trap) {
    // generate a function that relates to the specific spike and trap instances
    return function(scene) {
        const _animDown = new BABYLON.Animation("animDown", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
    
        const ease = new BABYLON.QuinticEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        _animDown.setEasingFunction(ease);
    
        BABYLON.Animation.TransitionTo(
            "position",
            spikes.position.add(new BABYLON.Vector3(0, -1.5, 0)),
            spikes,
            scene,
            30,  // framerate
            _animDown,
            4000,  // duration in milliseconds
        );
    }
}

function createCollisionBox(scene, instance) {
    var cube = new BABYLON.Mesh.CreateBox("box", 2, scene);
    cube.isVisible = false;
    cube.isPickable = false;
    cube.setParent(instance);  // parenting is especially important here, since the spikes are moving
    cube.position = BABYLON.Vector3.Zero();
    cube.position = cube.position.add(new BABYLON.Vector3(0, 0, 0));
    cube.rotation = BABYLON.Vector3.Zero();
    cube.scaling = instance.scaling.multiply(new BABYLON.Vector3(1.1, 1.1, 1.1));
    cube.checkCollisions = true;
}

const spiketrap = {
    meshes: undefined,
    spikesMesh: undefined,
    trapMesh: undefined,
    loadAsync,
    addInstance,
    spikesInstances: [],
};

export default spiketrap;