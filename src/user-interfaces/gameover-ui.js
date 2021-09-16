/**
 * This file contains instructions to build the UI for the game over screen
 * that appears if the player loses a battle.
 * Requires the Scene Info for the current scene.
 */

import { theSceneManager } from "../utils/scene-manager.js"
import menuSceneBuilder from "../scenes/main-menu.js";

/**
 * Creates a game over screen for the given battle scene.
 * @param {*} sceneInfo Scene Info object for the current scene
 * @returns The UI object (i.e. a BABYLON.GUI.AdvancedDynamicTexture)
 */
function createUI(sceneInfo) {
    //create the UI
    const ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, sceneInfo.scene);

    // background rectangle
    const rect_bg = new BABYLON.GUI.Rectangle("rect_bg");
    rect_bg.width = "100%";
    rect_bg.height = "100%";
    rect_bg.cornerRadius = 0;
    rect_bg.color = "white";
    rect_bg.thickness = 0;
    rect_bg.background = "#702020C0";
    ui.addControl(rect_bg);

    // add some text explaining the player they lost
    const text_gameover = new BABYLON.GUI.TextBlock("text_gameover");
    text_gameover.text = "GAME OVER\nDeath is not a hunter unbeknownst to its prey...";
    text_gameover.top = "-30%"
    text_gameover.fontSize = 30;
    rect_bg.addControl(text_gameover);

    // Offer the player a choice: retry this battle from the beginning,
    // or skip it as though they had won, or end the game
    const pnl_choice = new BABYLON.GUI.StackPanel();
    pnl_choice.paddingLeft = "10px";
    pnl_choice.paddingBottom = "10px";
    rect_bg.addControl(pnl_choice);

    // add button to retry
    const btn_retry = BABYLON.GUI.Button.CreateSimpleButton("btn_retry", "Retry the fight");
    btn_retry.width = "200px"
    btn_retry.height = "60px";
    btn_retry.color = "black";
    btn_retry.hoverCursor = "pointer";
    btn_retry.cornerRadius = 20;
    btn_retry.background = "white";
    btn_retry.paddingTop = "10px";
    btn_retry.paddingBottom = "10px";
    btn_retry.onPointerClickObservable.add(function() {
        // To retry a battle from the start, just reload the scene from scratch
        theSceneManager.reloadActiveScene();
    });
    pnl_choice.addControl(btn_retry);

    // add button to skip
    const btn_skip = BABYLON.GUI.Button.CreateSimpleButton("btn_skip", "Skip this battle");
    btn_skip.width = "200px"
    btn_skip.height = "60px";
    btn_skip.color = "black";
    btn_skip.hoverCursor = "pointer";
    btn_skip.cornerRadius = 20;
    btn_skip.background = "white";
    btn_skip.paddingTop = "10px";
    btn_skip.paddingBottom = "10px";
    btn_skip.onPointerClickObservable.add(function() {
        // go on by loading the next scene.
        // the specific battle scene knows how, since the normal battles and the final battle actually use different mechanisms
        sceneInfo.gotoNextScene();
    });
    pnl_choice.addControl(btn_skip);

    // add button to quit
    const btn_quit = BABYLON.GUI.Button.CreateSimpleButton("btn_quit", "Quit to main menu");
    btn_quit.width = "200px"
    btn_quit.height = "60px";
    btn_quit.color = "black";
    btn_quit.hoverCursor = "pointer";
    btn_quit.cornerRadius = 20;
    btn_quit.background = "white";
    btn_quit.paddingTop = "10px";
    btn_quit.paddingBottom = "10px";
    btn_quit.onPointerClickObservable.add(function() {
        // Go back to the main menu
        theSceneManager.gotoScene(menuSceneBuilder);
    });
    pnl_choice.addControl(btn_quit);

    return ui;
}

export {
    createUI,
}