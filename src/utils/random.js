/**
 * A small library for randomness-related functions.
 * EXPORTS a few randomness-related functions.
 */

/**
 * Rolls an N-sided die. "d" is indeed short for "die".
 * @param {number} n The number of sides of the die
 * @returns A random integer in [1,n]
 */
function d(n) {
    return Math.ceil(Math.random() * n)
}

export {d};