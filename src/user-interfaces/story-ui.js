/**
 * This file contains instructions to build the UI for the (very simple) story introduction
 * that appears at the very beginning of the game, when the player first enters the dungeon.
 */

/**
 * Creates a story introduction screen for the given scene.
 * @param {*} scene Current scene
 * @returns The UI object (i.e. a BABYLON.GUI.AdvancedDynamicTexture)
 */
function createUI(scene) {
    //create the UI
    const ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

    // background rectangle
    const rect_bg = new BABYLON.GUI.Rectangle("rect_bg");
    rect_bg.width = "100%";
    rect_bg.height = "100%";
    rect_bg.cornerRadius = 30;
    rect_bg.color = "white";
    rect_bg.thickness = 0;
    rect_bg.background = "#202020E0";
    ui.addControl(rect_bg);

    // add some text explaining the player the very simple premise of the game
    const text_story = new BABYLON.GUI.TextBlock("text_story");
    text_story.text = theStoryText;
    text_story.top = "-40px";
    text_story.fontSize = 30;
    rect_bg.addControl(text_story);

    // add button to retry
    const btn_ok = BABYLON.GUI.Button.CreateSimpleButton("btn_ok", "OK");
    btn_ok.hoverCursor = "pointer";
    btn_ok.top = "-40px";
    btn_ok.width = "270px"
    btn_ok.height = "100px";
    btn_ok.color = "black";
    btn_ok.cornerRadius = 20;
    btn_ok.background = "white";
    btn_ok.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    btn_ok.textBlock.fontSize = 40;
    rect_bg.addControl(btn_ok);

    const fadedPromise = new Promise((resolve, reject) => {
        btn_ok.onPointerClickObservable.add(function() {
            // disable the button before the player tries to click again
            btn_ok.isEnabled = false;
            // fade out this screen
            const animFade = new BABYLON.Animation("animFade", "alpha", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
            animFade.setEasingFunction(new BABYLON.SineEase())
            BABYLON.Animation.TransitionTo(
                "alpha",
                0,
                rect_bg,
                scene,
                30,
                animFade,
                1500
            ).waitAsync().then(() => {
                // then destroy this UI
                ui.dispose();
                // and notify anyone awaiting this promise that we're done
                resolve();
            })
        });
    });

    ui.waitFadeAsync = function() {
        return fadedPromise;
    }

    return ui;
}

// the text for the story is defined here where it won't break any indentation
const theStoryText = "\
You are MAKOTO YUKI, a young adventurer.\n\
\n\
Your quest is to recover the CUBE OF BABYLON, a powerful artifact\n\
currently in the hands of a demon known only as the EVIL LORD OF SHADOWS.\n\
\n\
You have just arrived to the fiend's lair, but be careful:\n\
the Evil Lord's SAMURAI MINIONS guard these halls,\n\
and they will not let you through unless you defeat them in battle.\n\
You also recall that the demon is known to lock most doors in its castle:\n\
you'll have to find the KEYS to proceed.\n\
\n\
Armed with your sword and your magic, you take your first steps into these ruins,\n\
determined to slay the Lord of Shadows before it's too late...\
"

export {
    createUI,
}