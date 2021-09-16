/**
 * A small library to manage animations at a slightly higher level than Babylon.
 * In particular, we automatically save the length of the animation
 * and equally automatically uses it when performing one
 * to automatically make sure any animation is always run to the end.
 * 
 * EXPORTS a wrapper object for Babylon animations and some other functions
 * to use those wrappers.
 */

/**
 * Returns the length of the animation.
 * @param {Array} keys Array of keyframes as per the Babylon specification
 * @returns The highest frame in the array, i.e. the length of the animation.
 */
function _highestFrame(keys) {
    let max = 0;
    for (let i=0; i<keys.length; i++) {
        if (keys[i].frame > max) {
            max = keys[i].frame;
        }
    }
    return max;
}

/**
 * Litle more than a wrapper object for a Babylon animation
 * that also stores its length.
 */
class Animation {
    /**
     * Creates a new animation-wrapper object.
     * @param {BABYLON.Animation} BabylonAnim A Babylon animation
     * @param {Array} keys Array of keyframes (see Babylon specification) to be assigned to BabylonAnim
     */
    constructor(BabylonAnim, keys) {
        this.anim = BabylonAnim;
        this.anim.setKeys(keys);
        this.length = _highestFrame(keys);
    }
}

/**
 * Wrapper for BABYLON.Scene.beginDirectAnimation, but automatically fetches
 * the given animations' length and uses it to determine the frame interval to play.
 * The animation will NOT loop.
 * @param {BABYLON.Scene} scene The current scene
 * @param {any} target The target of the animation (see BABYLON.Scene.beginDirectAnimation)
 * @param {Animation[]} animations List of animations to start (use the Animation wrapper, NOT BABYLON.Animation)
 * @param {() => void} onAnimationEnd Callback called when the animation ends (optional)
 * @param {number} speedRatio Speed ratio to apply to all animations (optional) (see BABYLON.Scene.beginDirectAnimation)
 * @param {boolean} isAdditive Whether animation is additive (optional, false by default) (see BABYLON.Scene.beginDirectAnimation)
 * @returns the BABYLON.Animatable for the animation just started
 */
function directAnimation(scene, target, animations, onAnimationEnd=undefined, speedRatio=1, isAdditive=false) {
    let babylonAnimations = [];
    let maxlen = 0;
    for (let i=0; i<animations.length; i++) {
        babylonAnimations.push(animations[i].anim);
        if (animations[i].length > maxlen) {
            maxlen = animations[i].length;
        }
    }
    return scene.beginDirectAnimation(target, babylonAnimations, 0, maxlen, false, speedRatio, onAnimationEnd, undefined, isAdditive);
}

/**
 * Wrapper for BABYLON.Scene.beginDirectAnimation, but automatically fetches
 * the given animations' length and uses it to determine the frame interval to play.
 * The animation WILL loop.
 * @param {BABYLON.Scene} scene The current scene
 * @param {any} target The target of the animation (see BABYLON.Scene.beginDirectAnimation)
 * @param {Animation[]} animations List of animations to start (use the Animation wrapper, NOT BABYLON.Animation)
 * @param {() => void} onAnimationLoop Callback called when the animation loops (optional)
 * @param {number} speedRatio Speed ratio to apply to all animations (optional) (see BABYLON.Scene.beginDirectAnimation)
 * @param {boolean} isAdditive Whether animation is additive (optional, false by default) (see BABYLON.Scene.beginDirectAnimation)
 * @returns the BABYLON.Animatable for the animation just started
 */
function directAnimationLoop(scene, target, animations, onAnimationLoop=undefined, speedRatio=1, isAdditive=false) {
    let babylonAnimations = [];
    let maxlen = 0;
    for (let i=0; i<animations.length; i++) {
        babylonAnimations.push(animations[i].anim);
        if (animations[i].length > maxlen) {
            maxlen = animations[i].length;
        }
    }
    return scene.beginDirectAnimation(target, babylonAnimations, 0, maxlen, true, speedRatio, undefined, onAnimationLoop, isAdditive);
}

/**
 * Plays the given animation(s) in reverse, with all the usual benefits of this library.
 * The animation will NOT loop.
 * @param {BABYLON.Scene} scene The current scene
 * @param {any} target The target of the animation (see BABYLON.Scene.beginDirectAnimation)
 * @param {Animation[]} animations List of animations to start (use the Animation wrapper, NOT BABYLON.Animation)
 * @param {() => void} onAnimationEnd Callback called when the animation ends (optional)
 * @param {number} speedRatio Speed ratio to apply to all animations (optional) (see BABYLON.Scene.beginDirectAnimation)
 * @param {boolean} isAdditive Whether animation is additive (optional, false by default) (see BABYLON.Scene.beginDirectAnimation)
 * @returns the BABYLON.Animatable for the animation just started
 */
 function directAnimationReverse(scene, target, animations, onAnimationEnd=undefined, speedRatio=1, isAdditive=false) {
    let babylonAnimations = [];
    let maxlen = 0;
    for (let i=0; i<animations.length; i++) {
        babylonAnimations.push(animations[i].anim);
        if (animations[i].length > maxlen) {
            maxlen = animations[i].length;
        }
    }
    return scene.beginDirectAnimation(target, babylonAnimations, maxlen, 0, false, speedRatio, onAnimationEnd, undefined, isAdditive);
}

export {Animation, directAnimation, directAnimationLoop, directAnimationReverse};