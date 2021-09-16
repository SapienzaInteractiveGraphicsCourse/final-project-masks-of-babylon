/**
 * This file contains instructions to build the UI for a given battle scene.
 * Requires the Scene Info for that scene.
 * A part of that interface,
 * i.e. the command buttons the user can click to select which action to perform in a turn,
 * will be provided and built by the player character's module,
 * which knows which actions are available to that character.
 */

/**
 * Creates a battle UI for the given battle scene.
 * @param {*} sceneInfo Scene Info object for the current scene
 * @returns The UI object (i.e. a BABYLON.GUI.AdvancedDynamicTexture)
 */
function createUI(sceneInfo) {
    //create the UI
    const ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, sceneInfo.scene);

    //define color of the status rectangles
    const blackHue = "30";  //hex
    const rect_bg_color = "#"+blackHue+blackHue+blackHue+"B0";  //last hex is alpha

    //create status rectangle of the player
    const rect_player = new BABYLON.GUI.Rectangle("rect_player");
    rect_player.width = "280px";
    rect_player.height = "80px";
    rect_player.cornerRadius = 15;
    rect_player.color = "white";
    rect_player.thickness = 0;
    rect_player.background = rect_bg_color;
    rect_player.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    rect_player.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    ui.addControl(rect_player);

    //fill it with information
    const text_player_name = new BABYLON.GUI.TextBlock("text_player_name");
    text_player_name.text = sceneInfo.player.name;
    text_player_name.top = "-15px";
    rect_player.addControl(text_player_name);

    const text_player_hp = new BABYLON.GUI.TextBlock("text_player_hp");
    text_player_hp.text = "HP: ??/??";
    text_player_hp.top = "15px";
    rect_player.addControl(text_player_hp);

    // create a basic container for the charge images, so they automatically have the same placement and dimensions
    const cont_player_charge = new BABYLON.GUI.Container("cont_player_charge");
    cont_player_charge.width="50px";
    cont_player_charge.height="50px";
    cont_player_charge.left = "35%";
    rect_player.addControl(cont_player_charge);

    const img_player_charge_off = new BABYLON.GUI.Image("img_player_charge_off", "assets/GUI/Battle/charge_sprsht.svg#off");
    const _chargeLoadedPromise = new Promise((resolve, reject) => {
        img_player_charge_off.onSVGAttributesComputedObservable.add(() => {
            resolve();
        })
        img_player_charge_off.domImage.onerror = () => {
            reject();
        }
        // safety in case the observable has somehow been already notified before this Promise even started
        if (img_player_charge_off.svgAttributesComputationCompleted) {
            resolve();
        }
    })
    img_player_charge_off.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    cont_player_charge.addControl(img_player_charge_off);

    const img_player_charge_on = new BABYLON.GUI.Image("img_player_charge_on", "assets/GUI/Battle/charge_sprsht.svg#on");
    img_player_charge_on.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    cont_player_charge.addControl(img_player_charge_on);

    //create status rectangle for the enemy
    const rect_enemy = new BABYLON.GUI.Rectangle("rect_enemy");
    rect_enemy.width = "280px";
    rect_enemy.height = "80px";
    rect_enemy.cornerRadius = 15;
    rect_enemy.color = "white";
    rect_enemy.thickness = 0;
    rect_enemy.background = rect_bg_color;
    rect_enemy.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    rect_enemy.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    ui.addControl(rect_enemy);

    //fill it with information
    const text_enemy_name = new BABYLON.GUI.TextBlock("text_enemy_name");
    text_enemy_name.text = sceneInfo.enemy.name;
    text_enemy_name.top = "-15px";
    rect_enemy.addControl(text_enemy_name);

    const text_enemy_hp = new BABYLON.GUI.TextBlock("text_enemy_hp");
    text_enemy_hp.text = "HP: ??/??";
    text_enemy_hp.top = "15px";
    rect_enemy.addControl(text_enemy_hp);

    // create buttons to lock and unlock the camera
    const cont_camera_lock = new BABYLON.GUI.Container("cont_camera_lock");
    cont_camera_lock.width = "165px"
    cont_camera_lock.height = "165px";
    cont_camera_lock.paddingTop = "10px";
    cont_camera_lock.paddingBottom = "10px";
    cont_camera_lock.paddingLeft = "10px";
    cont_camera_lock.paddingRight = "10px";
    cont_camera_lock.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    cont_camera_lock.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    cont_camera_lock.zIndex = 100;    // place this in front so it's not blocked by other elements
    ui.addControl(cont_camera_lock);

    const btn_camera_locked = BABYLON.GUI.Button.CreateImageWithCenterTextButton("btn_camera_locked", "", "assets/GUI/Battle/cameralock-icons.svg#locked");
    btn_camera_locked.isVisible = false;
    btn_camera_locked.background = "black";
    btn_camera_locked.hoverCursor = "pointer";
    btn_camera_locked.cornerRadius = 20;
    btn_camera_locked.image.width = "90%";
    btn_camera_locked.image.height = "90%";
    btn_camera_locked.onPointerClickObservable.add(function() {
        sceneInfo.camera.unlock();
    });
    cont_camera_lock.addControl(btn_camera_locked);

    const btn_camera_unlocked = BABYLON.GUI.Button.CreateImageWithCenterTextButton("btn_camera_unlocked", "", "assets/GUI/Battle/cameralock-icons.svg#unlocked");
    const _cameraUnlockedLoadedPromise = new Promise((resolve, reject) => {
        btn_camera_unlocked.image.onSVGAttributesComputedObservable.add(() => {
            resolve();
        })
        btn_camera_unlocked.image.domImage.onerror = () => {
            reject();
        }
        // safety in case the observable has somehow been already notified before this Promise even started
        if (btn_camera_unlocked.image.svgAttributesComputationCompleted) {
            resolve();
        }
    })
    btn_camera_unlocked.isVisible = false;
    btn_camera_unlocked.background = "black";
    btn_camera_unlocked.hoverCursor = "pointer";
    btn_camera_unlocked.cornerRadius = 20;
    btn_camera_unlocked.image.width = "90%";
    btn_camera_unlocked.image.height = "90%";
    btn_camera_unlocked.onPointerClickObservable.add(function() {
        sceneInfo.camera.lock();
    });
    cont_camera_lock.addControl(btn_camera_unlocked);

    //create the container for the command buttons
    const pnl_command = new BABYLON.GUI.StackPanel();
    pnl_command.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    ui.addControl(pnl_command);

    //have the player character fill it with its own moves
    const _commandLoadedPromise = sceneInfo.player.createBattleCommandUI(pnl_command, sceneInfo);




    // NEW METHODS
    // Creates a temporary UI element that shows the damage dealt to a character when they are hit,
    // or the HP regained when healing, or the fact that charge was turned on.
    // First, a generic function will be defined,
    // then all the specific ones for each use case.

    ui._showMovingRectangle = function(startPos, endPos, dimension, text, bgCol, fgCol) {
        // create a containing rectangle
        const rect_damage = new BABYLON.GUI.Rectangle("rect_damage");
        rect_damage.widthInPixels = dimension[0];
        rect_damage.heightInPixels = dimension[1];
        rect_damage.cornerRadius = 15;
        rect_damage.color = fgCol;
        rect_damage.thickness = 0;
        rect_damage.background = bgCol;
        // choose this alignment so we can control the position with the origin in a corner of the screen (as opposed to the center),
        // but the origin of the rectangle will also be in a corner, so we'll have to correct positions in order to center the rectangle again.
        rect_damage.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        rect_damage.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        rect_damage.leftInPixels = startPos[0] - rect_damage.widthInPixels/2;
        rect_damage.topInPixels = startPos[1] - rect_damage.heightInPixels/2;
        ui.addControl(rect_damage);
    
    
        // create damage text
        const text_damage = new BABYLON.GUI.TextBlock("text_damage");
        text_damage.text = text;
        rect_damage.addControl(text_damage);
    
        // Start the following animation (implemented as elementary transitions and timers):
        // Move to below the target's status rectangle, wait there a little, then disappear and destroy self.
    
        const animXY_duration = 1000;
        const xyEase = new BABYLON.SineEase();
        xyEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
    
        const animX = new BABYLON.Animation("animX", "leftInPixels", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
        animX.setEasingFunction(xyEase);
        BABYLON.Animation.TransitionTo(
            "leftInPixels",
            endPos[0] - rect_damage.widthInPixels/2,
            rect_damage,
            sceneInfo.scene,
            30,
            animX,
            animXY_duration,
        )
    
        const animY = new BABYLON.Animation("animY", "topInPixels", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
        animY.setEasingFunction(xyEase);
        BABYLON.Animation.TransitionTo(
            "topInPixels",
            endPos[1] - rect_damage.heightInPixels/2,
            rect_damage,
            sceneInfo.scene,
            30,
            animY,
            animXY_duration,
        ).waitAsync().then(() => {
    
            BABYLON.setAndStartTimer({
                timeout: 2000,
                contextObservable: sceneInfo.scene.onBeforeRenderObservable,
                onEnded: () => {
                    // clear animations array, or it will replay the previous TransitionTo because of how that function works.
                    rect_damage.animations = [];
    
                    const animAlpha = new BABYLON.Animation("animAlpha", "alpha", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
                    animAlpha.setEasingFunction(new BABYLON.QuadraticEase());
                    BABYLON.Animation.TransitionTo(
                        "alpha",
                        0,
                        rect_damage,
                        sceneInfo.scene,
                        30,
                        animAlpha,
                        500,
                    ).waitAsync().then(() => {
                        text_damage.dispose();
                        rect_damage.dispose();
                    })
                },
            });
        })
    }

    ui.showDamage = function(amount, target) {
        // the initial position of the rectangle is a target-specific point
        // (located approx. at the center of its mesh)
        // projected onto screen space,
        // with a correction in order to center it
        const startVec_view = BABYLON.Vector3.Project(
            target.damageTextSpawnPoint_world,
            BABYLON.Matrix.Identity(),
            sceneInfo.scene.getTransformMatrix(),
            sceneInfo.camera.viewport.toGlobal(sceneInfo.scene.getEngine().getRenderWidth(), sceneInfo.scene.getEngine().getRenderHeight())
        );
        const startPos_view = [startVec_view.x, startVec_view.y];

        // select the status rectangle of the taret of the action
        const rect_target = target.isPlayer ? rect_player : rect_enemy;
        const endPos = [rect_target.centerX, rect_target.centerY + rect_target.heightInPixels - 15]

        // if the target is defending, use a different color to convey the reduced damage
        const dmgcolor = target.guarding ? "#EE8888" : "red";

        ui._showMovingRectangle(startPos_view, endPos, [100, 40], "-"+amount+" HP", rect_bg_color, dmgcolor);
    }

    ui.showHealing = function(amount, target) {
        // the initial position of the rectangle is a target-specific point
        // (located approx. at the center of its mesh)
        // projected onto screen space,
        // with a correction in order to center it
        const startVec_view = BABYLON.Vector3.Project(
            target.damageTextSpawnPoint_world,
            BABYLON.Matrix.Identity(),
            sceneInfo.scene.getTransformMatrix(),
            sceneInfo.camera.viewport.toGlobal(sceneInfo.scene.getEngine().getRenderWidth(), sceneInfo.scene.getEngine().getRenderHeight())
        );
        const startPos_view = [startVec_view.x, startVec_view.y];

        // select the status rectangle of the taret of the action
        const rect_target = target.isPlayer ? rect_player : rect_enemy;
        const endPos = [rect_target.centerX, rect_target.centerY + rect_target.heightInPixels - 15]

        ui._showMovingRectangle(startPos_view, endPos, [100, 40], "+"+amount+" HP", rect_bg_color, "green");
    }

    ui.showCharged = function(target) {
        // the initial position of the rectangle is a target-specific point
        // (located approx. at the center of its mesh)
        // projected onto screen space,
        // with a correction in order to center it
        const startVec_view = BABYLON.Vector3.Project(
            target.damageTextSpawnPoint_world,
            BABYLON.Matrix.Identity(),
            sceneInfo.scene.getTransformMatrix(),
            sceneInfo.camera.viewport.toGlobal(sceneInfo.scene.getEngine().getRenderWidth(), sceneInfo.scene.getEngine().getRenderHeight())
        );
        const startPos_view = [startVec_view.x, startVec_view.y];

        // select the status rectangle of the taret of the action
        const rect_target = target.isPlayer ? rect_player : rect_enemy;
        const xDispSign = target.isPlayer ? 1 : -1;
        const endPos = [rect_target.centerX + xDispSign*100, rect_target.centerY + rect_target.heightInPixels - 15]

        // if the target is already charged (so call this function before setting the charge!),
        // use a different color to convey that the second charge didn't have as much effect.
        const crgcolor = target.charged ? "#AAAA99" : "yellow";

        ui._showMovingRectangle(startPos_view, endPos, [100, 40], "Charged!", rect_bg_color, crgcolor);
    }


    // NEW ATTRIBUTE
    // A Promise that resolves when everything in the UI has been loaded properly,
    // meaning that the scene can consider it loaded.
    ui.loadedPromise = Promise.all([
        _chargeLoadedPromise,
        _cameraUnlockedLoadedPromise,
        _commandLoadedPromise,
    ]);





    //add an update event that updates the UI
    sceneInfo.scene.onBeforeRenderObservable.add(() => {
        //update HP and charge of the characters
        text_player_hp.text = "HP: "+sceneInfo.player.hp+"/"+sceneInfo.player.maxhp;
        img_player_charge_off.isVisible = !sceneInfo.player.charged;
        img_player_charge_on.isVisible = sceneInfo.player.charged;
        text_enemy_hp.text = "HP: "+sceneInfo.enemy.hp+"/"+sceneInfo.enemy.maxhp;
        //show/hide command panel depending on whether it's the player's turn
        pnl_command.isVisible = sceneInfo.turn_system.player_can_select;
        pnl_command.isEnabled = sceneInfo.turn_system.player_can_select;

        // Charge cost handling is added in player.createBattleCommandUI

        //update camera based on its state
        btn_camera_locked.isVisible = sceneInfo.camera.locked;
        btn_camera_unlocked.isVisible = !sceneInfo.camera.locked;
    });

    return ui;
}

export {
    createUI,
}