/**
 * File for a "singleton" object that keeps track of which scene is active
 * and of loading and unloading scenes when passing from one to another.
 * Does NOT directly take care of rendering, although it does expose a wrapper
 * for the ease of whatever does render.
 */

/**
 * Definition of the SceneManager class.
 */
class SceneManager {
    /**
     * Creates a new SceneManager for this context.
     * @param {*} canvas HTML canvas.
     * @param {BABYLON.Engine} engine babylon engine
     */
    constructor(canvas, engine) {
        // HTML5 canvas
        this.canvas = canvas;
        // engine for rendering
        this.engine = engine;
        // active babylon scene, the one to render
        this.activeScene = undefined;
        // the object exported by the module for the active scene,
        // in particular it contains the instructions to reload it
        this.activeSceneBuilder = undefined;
    }

    /**
     * Unloads current scene and loads a new one.
     * @param {*} sceneBuilder The object exported from one of our JS modules representing a scene. NOT a BABYLON.Scene.
     */
    gotoScene(sceneBuilder, loadingText="Now Loading...") {
        if (this.activeScene) {
            this.activeScene.dispose();
            this.activeScene = undefined;
            this.activeSceneBuilder = undefined;
        }
        this.engine.loadingUIText = loadingText;
        this.engine.displayLoadingUI();
        sceneBuilder.createScene(this.canvas, this.engine).then((scene) => {
            this.activeScene = scene;
            this.activeSceneBuilder = sceneBuilder;
            scene.loadedPromise.then(() => {
                this.engine.hideLoadingUI();
            }).catch(()=>{
                // make sure that even on an error the game doesn't get stuck on the loading screen forever
                console.log("Something happened while loading, the console should have reported the error on its own")
                this.engine.hideLoadingUI();
            })
        })
    }

    /**
     * Unloads current scene and loads a Dungeon scene.
     * Requires an object containing:
     *  - sceneBuilder: as gotoScene. NOT a BABYLON.Scene.
     *  - position: where in the scene the player should spawn
     *  - target: which point the camera should look ai initially
     * @param {*} tpDest The above-described object.
     */
    gotoSceneForDungeon(tpDest, loadingText="Now Loading...") {
        if (this.activeScene) {
            this.activeScene.dispose();
            this.activeScene = undefined;
            this.activeSceneBuilder = undefined;
        }
        this.engine.loadingUIText = loadingText;
        this.engine.displayLoadingUI();
        tpDest.sceneBuilder.createScene(this.canvas, this.engine, tpDest.position, tpDest.target).then((scene) => {
            this.activeScene = scene;
            this.activeSceneBuilder = tpDest.sceneBuilder;
            scene.loadedPromise.then(() => {
                this.engine.hideLoadingUI();
            }).catch(()=>{
                // make sure that even on an error the game doesn't get stuck on the loading screen forever
                console.log("Something happened while loading, the console should have reported the error on its own")
                this.engine.hideLoadingUI();
            })
        })
    }

    /**
     * Wrapper for scene rendering.
     */
    render() {
        if (this.activeScene) {
            this.activeScene.render();
        }
    }

    /**
     * Reloads the current scene from scratch.
     */
    reloadActiveScene() {
        this.gotoScene(this.activeSceneBuilder);
    }
}

/**
 * Access to the singleton SceneManager.
 */
var theSceneManager;

/**
 * Creates a new SceneManager for this context.
 * @param {*} canvas HTML canvas.
 * @param {BABYLON.Engine} engine babylon engine
 * @returns The SceneManager object
 */
function makeSceneManager(canvas, engine) {
    if (theSceneManager) {
        console.warn("A SceneManager already exists, it will be replaced!");
    }
    theSceneManager = new SceneManager(canvas, engine);
    return theSceneManager;
}

// export default SceneManager;
export {theSceneManager, makeSceneManager};