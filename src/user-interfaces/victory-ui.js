/**
 * This file contains instructions to build the UI that
 * tells the player they won a battle.
 * Requires the Scene Info for the current scene.
 */

/**
 * Creates a victory UI for the given battle scene.
 * @param {*} sceneInfo Scene Info object for the current scene
 * @returns The UI object (i.e. a BABYLON.GUI.AdvancedDynamicTexture)
 */
 function createUI(sceneInfo) {
    //create the UI
    const ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, sceneInfo.scene);

    // background rectangle
    const rect_bg = new BABYLON.GUI.Rectangle("rect_bg");
    rect_bg.width = "100%";
    rect_bg.height = "200px";
    rect_bg.cornerRadius = 0;
    rect_bg.color = "white";
    rect_bg.thickness = 0;
    rect_bg.background = "#207020C0";
    rect_bg.top = "-30%"
    ui.addControl(rect_bg);

    // add some text explaining the player they won
    const text_victory = new BABYLON.GUI.TextBlock("text_victory");
    text_victory.text = "VICTORY\nThe enemy has been defeated, you can proceed.";
    text_victory.fontSize = 30;
    rect_bg.addControl(text_victory);

    // add button to proceed the game by going to the next scene
    const btn_continue = BABYLON.GUI.Button.CreateImageWithCenterTextButton("btn_continue", "Next", "assets/GUI/Battle/next-icon.svg");
    btn_continue.width = "300px"
    btn_continue.height = "100px";
    btn_continue.color = "black";
    btn_continue.hoverCursor = "pointer";
    btn_continue.cornerRadius = 20;
    btn_continue.background = "white";
    btn_continue.paddingTop = "10px";
    btn_continue.paddingBottom = "10px";
    btn_continue.paddingLeft = "10px";
    btn_continue.paddingRight = "10px";
    btn_continue.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    btn_continue.textBlock.fontSize = 25;
    btn_continue.image.left = "32%";
    btn_continue.image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;   // Necessary for Chrome
    btn_continue.onPointerClickObservable.add(function() {
        // go on by loading the next scene.
        // the specific battle scene knows how, since the normal battles and the final battle actually use different mechanisms
        sceneInfo.gotoNextScene();
    });
    rect_bg.addControl(btn_continue);

    return ui;
}

export {
    createUI,
}