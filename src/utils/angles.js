/**
 * A small library for managing angles.
 * EXPORTS some useful functions.
 */

/**
 * Degree-to-radians conversion.
 * Babylon always uses radians.
 * @param {number} alpha An angle in degrees
 * @returns The corresponding angle in radians
 */
function deg2rad(alpha) {
    return alpha*Math.PI/180.0;
}

/**
 * Radians-to-degrees conversion.
 * Babylon always uses radians.
 * @param {number} alpha An angle in radians
 * @returns The corresponding angle in degrees
 */
function rad2deg(alpha) {
    return alpha*180.0/Math.PI;
}

/**
 * Generates a rotation vector given three Euler angles in degrees.
 * @param {number} x X-angle in degrees
 * @param {number} y Y-angle in degrees
 * @param {number} z Z-angle in degrees
 * @returns A BABYLON.Vector3 containing the corresponding Euler rotation in radians.
 */
function RotationFromDegrees(x,y,z) {
    return new BABYLON.Vector3(deg2rad(x), deg2rad(y), deg2rad(z))
}

export {
    deg2rad,
    rad2deg,
    RotationFromDegrees,
};