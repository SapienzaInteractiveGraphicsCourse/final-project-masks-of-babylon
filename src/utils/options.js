/**
 * A singleton object that stores a persistent state for
 * the options set by the player in the main menu.
 * Examples include: difficulty, mouse sensitivity, shadow enabling/quality, ...
 */

const theOptions = {
    hardMode: false,   // boolean for hard/normal
    sensibility: 2,   // scale from 1 to 3
    shadows: 2,      // scale from 0 to 2, where 0 is OFF
}

export {
    theOptions,
}