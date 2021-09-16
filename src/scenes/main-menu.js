/**
 * File for the main menu of the game.
 */

import { theSceneManager } from "../utils/scene-manager.js";
import { initGameState } from "../utils/game-state.js";
import dungeonSceneBuilder from "../scenes/dungeon.js";
import { theOptions } from "../utils/options.js";

async function createScene(canvas, engine) {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("...", 0, 0, 1, BABYLON.Vector3.Zero(), scene);

    scene.clearColor = BABYLON.Color3.Purple();

    const ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

    const img_title = new BABYLON.GUI.Image("img_title", "assets/logo.svg");
    img_title.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    img_title.top = "20px";
    img_title.widthInPixels = 385;
    img_title.heightInPixels = 170;
    ui.addControl(img_title);
    const _titleLoadedPromise = new Promise((resolve, reject)=>{
        img_title.onImageLoadedObservable.add(()=>{
            resolve();
        })
        img_title.domImage.onerror = () => {
            reject();
        }
        // safety in case the observable has somehow been notified before this Promise even started
        if (img_title.isLoaded) {
            resolve();
        }
    });

    const btn_play = BABYLON.GUI.Button.CreateSimpleButton("btn_play", "Play!");
    btn_play.hoverCursor = "pointer";
    btn_play.zIndex = 1000;
    btn_play.alpha = 0.8;
    btn_play.width = "440px"
    btn_play.height = "180px";
    btn_play.color = "black";
    btn_play.cornerRadius = 20;
    btn_play.thickness = 3;
    btn_play.background = "white";
    btn_play.paddingTop = "10px";
    btn_play.paddingBottom = "10px";
    btn_play.textBlock.fontSize = "100pt"
    btn_play.onPointerClickObservable.add(function() {
        // initialize the persistent state of the whole game now
        initGameState();
        // go to the starting area of the game
        theSceneManager.gotoSceneForDungeon({
            sceneBuilder: dungeonSceneBuilder,
            position: new BABYLON.Vector3(28*6, 2, 12*6),
            target: new BABYLON.Vector3(10*6, 0, 12*6),
        });
    });
    ui.addControl(btn_play);

    const img_makoto = new BABYLON.GUI.Image("img_makoto", "assets/protagonist-portrait.png");
    img_makoto.widthInPixels = 329*0.8;
    img_makoto.heightInPixels = 727*0.8;
    ui.addControl(img_makoto);
    const _makotoLoadedPromise = new Promise((resolve, reject)=>{
        img_makoto.onImageLoadedObservable.add(()=>{
            resolve();
        })
        img_makoto.domImage.onerror = () => {
            reject();
        }
        // safety in case the observable has somehow been notified before this Promise even started
        if (img_makoto.isLoaded) {
            resolve();
        }
    });

    const text_authors = new BABYLON.GUI.TextBlock("text_authors");
    text_authors.text = "IG Project by (in alphabetical order)\nGiovanni Pecorelli, Francesco Petri, Jacopo Rossi, Giacomo Venneri";
    text_authors.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    text_authors.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    text_authors.top = "-15px";
    ui.addControl(text_authors);

    // Add controls descriptions

    const pnl_controls = new BABYLON.GUI.StackPanel();
    pnl_controls.left = "20px";
    pnl_controls.width = "33%";
    pnl_controls.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    ui.addControl(pnl_controls);

    const rect_controls_exploration_bg = new BABYLON.GUI.Rectangle("rect_controls_exploration_bg");
    rect_controls_exploration_bg.adaptWidthToChildren = true;
    rect_controls_exploration_bg.adaptHeightToChildren = true
    rect_controls_exploration_bg.cornerRadius = 20;
    rect_controls_exploration_bg.color = "black";
    rect_controls_exploration_bg.thickness = 3;
    rect_controls_exploration_bg.background = "#C0C0C0D8";
    rect_controls_exploration_bg.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    rect_controls_exploration_bg.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    rect_controls_exploration_bg.paddingTop = "20px";
    rect_controls_exploration_bg.paddingBottom = "20px";
    pnl_controls.addControl(rect_controls_exploration_bg);

    const text_controls_exploration = new BABYLON.GUI.TextBlock("text_controls_exploration");
    text_controls_exploration.text = theControlsExplorationText;   // see below
    text_controls_exploration.resizeToFit = true;
    text_controls_exploration.textWrapping = true;
    text_controls_exploration.height = "300px"
    text_controls_exploration.paddingBottom = "20px";
    text_controls_exploration.paddingTop = "20px";
    text_controls_exploration.paddingLeft = "20px";
    text_controls_exploration.paddingRight = "20px";
    text_controls_exploration.lineSpacing = 3;
    text_controls_exploration.top = "-15px"
    text_controls_exploration.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    rect_controls_exploration_bg.addControl(text_controls_exploration);

    const rect_controls_battle_bg = new BABYLON.GUI.Rectangle("rect_controls_battle_bg");
    rect_controls_battle_bg.adaptWidthToChildren = true;
    rect_controls_battle_bg.adaptHeightToChildren = true
    rect_controls_battle_bg.cornerRadius = 20;
    rect_controls_battle_bg.color = "black";
    rect_controls_battle_bg.thickness = 3;
    rect_controls_battle_bg.background = "#C0C0C0D8";
    rect_controls_battle_bg.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    rect_controls_battle_bg.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    rect_controls_battle_bg.paddingTop = "20px";
    rect_controls_battle_bg.paddingBottom = "20px";
    pnl_controls.addControl(rect_controls_battle_bg);

    const text_controls_battle = new BABYLON.GUI.TextBlock("text_controls_battle");
    text_controls_battle.text = theControlsBattleText;   // see below
    text_controls_battle.resizeToFit = true;
    text_controls_battle.textWrapping = true;
    text_controls_battle.height = "300px"
    text_controls_battle.paddingBottom = "20px";
    text_controls_battle.paddingTop = "20px";
    text_controls_battle.paddingLeft = "20px";
    text_controls_battle.paddingRight = "20px";
    text_controls_battle.lineSpacing = 3;
    text_controls_battle.top = "-15px"
    text_controls_battle.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    rect_controls_battle_bg.addControl(text_controls_battle);


    // Add options screen

    const rect_options_bg = new BABYLON.GUI.Rectangle("rect_options_bg");
    rect_options_bg.paddingRight = "20px";
    rect_options_bg.width = "33%";
    rect_options_bg.height = "90%";
    rect_options_bg.cornerRadius = 20;
    rect_options_bg.color = "black";
    rect_options_bg.thickness = 3;
    rect_options_bg.background = "#C0C0C0D8";
    rect_options_bg.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    ui.addControl(rect_options_bg);

    const pnl_options = new BABYLON.GUI.StackPanel();
    rect_options_bg.addControl(pnl_options);

    const text_options_title = new BABYLON.GUI.TextBlock("text_options_title");
    text_options_title.text = "OPTIONS";
    text_options_title.fontSize = "35px";
    text_options_title.resizeToFit = true;
    text_options_title.height = "30px";
    text_options_title.paddingBottom = "15%";
    pnl_options.addControl(text_options_title);

    const text_options_difficulty = new BABYLON.GUI.TextBlock("text_options_difficulty");
    text_options_difficulty.text = "Difficulty";
    text_options_difficulty.resizeToFit = true;
    text_options_difficulty.fontSize = "25px";
    text_options_difficulty.height = "30px";
    text_options_difficulty.paddingBottom = "10px";
    pnl_options.addControl(text_options_difficulty);


    /////////////   PANEL DIFFICULTY  /////////////
    const pnl_difficulty = new BABYLON.GUI.StackPanel("pnl_difficulty");
    pnl_difficulty.width = "100%";
    pnl_difficulty.HORIZONTAL_ALIGNMENT_CENTER = true;
    pnl_options.addControl(pnl_difficulty);


    
    const btn_difficulty_hard = BABYLON.GUI.Button.CreateSimpleButton("btn_difficulty_hard", "Hard");
    const btn_difficulty_normal = BABYLON.GUI.Button.CreateSimpleButton("btn_difficulty_normal", "Normal");
    
    btn_difficulty_normal.color = "black";
    btn_difficulty_normal.hoverCursor = "pointer";
    btn_difficulty_normal.cornerRadius = 20;
    btn_difficulty_normal.background = "yellow"
    btn_difficulty_normal.width = 0.6;
    btn_difficulty_normal.height = "40px";
    btn_difficulty_normal.onPointerClickObservable.add(function() {
        theOptions.hardMode = false;
    });
    pnl_difficulty.addControl(btn_difficulty_normal);

    

    btn_difficulty_hard.color = "black";
    btn_difficulty_hard.hoverCursor = "pointer";
    btn_difficulty_hard.cornerRadius = 20;
    btn_difficulty_hard.background = "white";
    btn_difficulty_hard.width = 0.6;
    btn_difficulty_hard.height = "40px";
    btn_difficulty_hard.onPointerClickObservable.add(function() {
        theOptions.hardMode = true;
    });
    pnl_difficulty.addControl(btn_difficulty_hard);
    /////////////   END PANEL DIFFICULTY  /////////////



    

    /////////////   PANEL SENSIBILITY  /////////////
    const text_options_sensibility = new BABYLON.GUI.TextBlock("text_options_sensibility");
    text_options_sensibility.text = "Sensibility";
    text_options_sensibility.resizeToFit = true;
    text_options_sensibility.fontSize = "25px";
    text_options_sensibility.height = "30px";
    text_options_sensibility.paddingTop = "20px";
    text_options_sensibility.paddingBottom = "10px";
    pnl_options.addControl(text_options_sensibility)




    const btn_sensibility_low = BABYLON.GUI.Button.CreateSimpleButton("btn_sensibility_low", "Low");

    btn_sensibility_low.color = "black";
    btn_sensibility_low.hoverCursor = "pointer";
    btn_sensibility_low.cornerRadius = 20;
    btn_sensibility_low.background = "white";
    btn_sensibility_low.width = 0.6;
    btn_sensibility_low.height = "40px";
    btn_sensibility_low.onPointerClickObservable.add(function() {
        theOptions.sensibility = 1;
    });
    pnl_options.addControl(btn_sensibility_low);


    const btn_sensibility_normal = BABYLON.GUI.Button.CreateSimpleButton("btn_sensibility_normal", "Normal");

    btn_sensibility_normal.color = "black";
    btn_sensibility_normal.hoverCursor = "pointer";
    btn_sensibility_normal.cornerRadius = 20;
    btn_sensibility_normal.background = "yellow";
    btn_sensibility_normal.width = 0.6;
    btn_sensibility_normal.height = "40px";
    btn_sensibility_normal.onPointerClickObservable.add(function() {
        theOptions.sensibility = 2;
    });
    pnl_options.addControl(btn_sensibility_normal);



    const btn_sensibility_high = BABYLON.GUI.Button.CreateSimpleButton("btn_sensibility_high", "High");

    btn_sensibility_high.color = "black";
    btn_sensibility_high.hoverCursor = "pointer";
    btn_sensibility_high.cornerRadius = 20;
    btn_sensibility_high.background = "white";
    btn_sensibility_high.width = 0.6;
    btn_sensibility_high.height = "40px";
    btn_sensibility_high.onPointerClickObservable.add(function() {
        theOptions.sensibility = 3;
    });
    pnl_options.addControl(btn_sensibility_high);
    /////////////  END PANEL SENSIBILITY  /////////////



    /////////////   PANEL SHADOWS  /////////////
    const text_options_shadows = new BABYLON.GUI.TextBlock("text_options_shadows");
    text_options_shadows.text = "Shadows";
    text_options_shadows.resizeToFit = true;
    text_options_shadows.fontSize = "25px";
    text_options_shadows.height = "30px";
    text_options_shadows.paddingTop = "20px";
    text_options_shadows.paddingBottom = "10px";
    pnl_options.addControl(text_options_shadows)



    const btn_shadows_off = BABYLON.GUI.Button.CreateSimpleButton("btn_shadows_off", "Off");

    btn_shadows_off.color = "black";
    btn_shadows_off.hoverCursor = "pointer";
    btn_shadows_off.cornerRadius = 20;
    btn_shadows_off.background = "yellow";
    btn_shadows_off.width = 0.6;
    btn_shadows_off.height = "40px";
    btn_shadows_off.onPointerClickObservable.add(function() {
        theOptions.shadows = 0;
    });
    pnl_options.addControl(btn_shadows_off);


    const btn_shadows_low = BABYLON.GUI.Button.CreateSimpleButton("btn_shadows_low", "Low Quality");

    btn_shadows_low.color = "black";
    btn_shadows_low.hoverCursor = "pointer";
    btn_shadows_low.cornerRadius = 20;
    btn_shadows_low.background = "white";
    btn_shadows_low.width = 0.6;
    btn_shadows_low.height = "40px";
    btn_shadows_low.onPointerClickObservable.add(function() {
        theOptions.shadows = 1;
    });
    pnl_options.addControl(btn_shadows_low);



    const btn_shadows_high = BABYLON.GUI.Button.CreateSimpleButton("btn_shadows_high", "High Quality");

    btn_shadows_high.color = "black";
    btn_shadows_high.hoverCursor = "pointer";
    btn_shadows_high.cornerRadius = 20;
    btn_shadows_high.background = "white";
    btn_shadows_high.width = 0.6;
    btn_shadows_high.height = "40px";
    btn_shadows_high.onPointerClickObservable.add(function() {
        theOptions.shadows = 2;
    });
    pnl_options.addControl(btn_shadows_high);
    /////////////  END PANEL SHADOWS  /////////////




    // update button colors based on option choice
    scene.onBeforeRenderObservable.add(() => {
        btn_difficulty_normal.background = theOptions.hardMode ? "white" : "yellow";
        btn_difficulty_hard.background = theOptions.hardMode ? "yellow" : "white";

        btn_sensibility_low.background = theOptions.sensibility==1 ? "yellow" : "white";
        btn_sensibility_normal.background = theOptions.sensibility==2 ? "yellow" : "white";
        btn_sensibility_high.background = theOptions.sensibility==3 ? "yellow" : "white";

        btn_shadows_off.background = theOptions.shadows==0 ? "yellow" : "white";
        btn_shadows_low.background = theOptions.shadows==1 ? "yellow" : "white";
        btn_shadows_high.background = theOptions.shadows==2 ? "yellow" : "white";
    })

    // NEW ATTRIBUTE
    // A Promise that resolves when everything in the scene has been loaded properly,
    // meaning that the SceneManager is free to remove any loading screens it may have activated.
    scene.loadedPromise = Promise.all([
        _titleLoadedPromise,
        _makotoLoadedPromise,
    ]);

    return scene;
}

// the text for the control descriptions is defined here where it won't break any indentation
const theControlsExplorationText = "\
EXPLORATION PHASE CONTROLS\n\
\n\
In this phase you can explore the dungeon in first person, finding keys and challenging enemies in order to proceed.\n\
Nothing will actively come after you while exploring: you can take all the time you want.\n\
\n\
WASD: Walk (side: strafe)\n\
Arrows: Walk (side: turn)\n\
Shift: Hold to run\n\
Mouse Left Drag: Look around\n\
Mouse Left Click: Interact with objects\n\
Interactable objects include: keys, locks, doors, and enemies.\n\
"

const theControlsBattleText = "\
BATTLE PHASE CONTROLS\n\
\n\
In this phase you have to fight the enemy in front of you.\n\
The battle is turn-based, i.e. you and the enemy will alternate taking actions until one's HP is brought to zero.\n\
On each of your turns, you can select an action for that turn via the buttons on the bottom left corner of the screen.\n\
\n\
Mouse Left Drag: Rotate camera\n\
Mouse Left Click: Select an attack or lock the camera\n\
Mouse Hover on an action button: Display a description of that action\n\
"

const sceneBuilder = {
    createScene,
}

export default sceneBuilder;