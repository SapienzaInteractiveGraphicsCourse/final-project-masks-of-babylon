/**
 * Performs the initial project-wide configuration,
 * which essentially consists in setting up the Babylon Engine,
 * its loading screen, and our own SceneManager,
 * and then loading up the initial scene, i.e. the main menu.
 */

import { theSceneManager, makeSceneManager } from "./utils/scene-manager.js";

import menuSceneBuilder from "./scenes/main-menu.js";

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Configure the loading screen
engine.loadingUIText = "Now Loading...";
engine.loadingUIBackgroundColor = "purple";
BABYLON.DefaultLoadingScreen.DefaultLogoUrl = "assets/logo.svg";

// initialize our SceneManager
makeSceneManager(canvas, engine);

theSceneManager.gotoScene(menuSceneBuilder);

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    theSceneManager.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});