/**
 * A singleton object that stores a persistent state for information
 * that needs to be carried over between different parts of the dungeon,
 * or need to be remembered through a battle.
 * Examples include: defeated enemies, object carried by the player,
 * player position in the dungeon at the start of a fight, ...
 */

import dungeonSceneBuilder from "../scenes/dungeon.js";

const CARRIEDOBJECT = {
    NONE: 0,
    KEY_YELLOW: 1,
    KEY_GREEN: 2,
    KEY_BLUE: 3,
    KEY_RED: 4,
}

const KEYSTATE = {
    INITIAL: 0,
    TAKEN: 1,
    DONE: 2,
}

const SPIKESTATE = {
    DOWN: 0,
    UP: 1,
    OFF: 2,
}

var theGameState;

function initGameState() {
    theGameState = {
        playerInDungeon: {
            currentSceneBuilder: dungeonSceneBuilder,
            currentPositionInScene: new BABYLON.Vector3(28*6, 2, 12*6),
            currentCameraTarget: new BABYLON.Vector3(10*6, 0, 12*6),
            carriedObject: CARRIEDOBJECT.NONE,
        },
        enemiesEncountered: {
            green: false,
            blue: false,
        },
        keyState: {
            yellow: KEYSTATE.INITIAL,
            green: KEYSTATE.INITIAL,
            blue: KEYSTATE.INITIAL,
            red: KEYSTATE.INITIAL,
        },
        spikeState: {
            spike1: SPIKESTATE.DOWN,
            spike2: SPIKESTATE.DOWN,
            spike3: SPIKESTATE.DOWN,
        },
        storySeen: false,
    };
}

export {
    theGameState,
    initGameState,
    CARRIEDOBJECT,
    KEYSTATE,
    SPIKESTATE,
}
