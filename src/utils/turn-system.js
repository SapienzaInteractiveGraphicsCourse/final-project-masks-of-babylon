/**
 * This file contains an object that keeps track of whose turn it is during
 * a battle and of the conditions to switch turns.
 * Also handles a number of events that happen between turns,
 * including ending the "defending" state for characters
 * and triggering a "battle end" event for the scene when a combatant runs out of HP.
 */

/**
 * A developer cheat, which gives infinite charge for quick attack previewing.
 * Will be false in production.
 */
const CHEAT_ALWAYS_CHARGE = false;

/**
 * A class of objects that keep track of whose turn it is during a battle.
 */
class TurnSystem {
    /**
     * Creates a new turn system.
     */
    constructor() {
        this.reset();  // <- see this for info about this object's attributes.

        /**
         * Checks the victory condition of the player for the battle.
         * @param {*} sceneInfo Scene Info object for the current scene
         * @returns true if the player won the battle, false otherwise
         */
        this.checkVictory = function(sceneInfo) {
            return sceneInfo.enemy.hp <= 0;  // default: enemy out of HP
        }

        /**
         * Checks the defeat condition of the player for the battle.
         * @param {*} sceneInfo Scene Info object for the current scene
         * @returns true if the player lost the battle, false otherwise
         */
        this.checkDefeat = function(sceneInfo) {
            return sceneInfo.player.hp <= 0;  // default: player out of HP
        }
    }

    /**
     * Resets the state of this turn system.
     */
    reset() {
        this.player_turn = true;  // is it the player's turn? or the enemy's?
        this.player_can_select = true;  // can the player choose an action? or have they already chosen, and the action is resolving?
        this.player_anim_done = false;  // is the player's animation done? a turn ends when both characters are done.
        this.enemy_anim_done = false;  // is the enemy's animation done? a turn ends when both characters are done.
    }

    /**
     * Sets player_anim_done to true.
     * If sceneInfo is given, automatically starts the idle animation of the player.
     */
    player_done(sceneInfo) {
        this.player_anim_done = true;
        if (sceneInfo) {
            sceneInfo.player.idle(sceneInfo);
        }
    }
    /**
     * Sets enemy_anim_done to true.
     * If sceneInfo is given, automatically starts the idle animation of the player.
     */
    enemy_done(sceneInfo) {
        this.enemy_anim_done = true;
        if (sceneInfo) {
            sceneInfo.enemy.idle(sceneInfo);
        }
    }

    /**
     * The attributes of this object can be accessed directly.
     * So for example other modules can check whose turn it is,
     * or some hypothetic special battle scene could alter the victory condition,
     * just by directly reading/writing the attributes, no getters/setters required.
     */

    /**
     * Adds an update event that passes the turn in the given scene if the condition applies,
     * and triggers some events happening between turns.
     * @param {*} sceneInfo Scene Info object for the current scene
     */
    addTurnObserver(sceneInfo) {
        sceneInfo.scene.onBeforeRenderObservable.add(() => {
            // change turn if both characters are done with their animations for the turn
            if (this.player_anim_done && this.enemy_anim_done) {
                // reset that condition
                this.player_anim_done = false;
                this.enemy_anim_done = false;
                // first, check if the battle should end
                if (this.checkDefeat(sceneInfo)) {
                    sceneInfo.onPlayerDefeat();
                    return;
                }
                else if (this.checkVictory(sceneInfo)) {
                    sceneInfo.onPlayerVictory();
                    return;
                }
                // pass turn
                this.player_turn = !this.player_turn;
                // begin player turn...
                if (this.player_turn) {
                    sceneInfo.player.startTurn(sceneInfo);
                    // player_can_select will be activated by the player with the timing it sees fit
                }
                // ...or begin enemy turn
                else {
                    sceneInfo.enemy.act(sceneInfo);
                }
            }


            //DEBUG
            if (CHEAT_ALWAYS_CHARGE) sceneInfo.player.charged=true;

        });
    }

}

export {TurnSystem};
