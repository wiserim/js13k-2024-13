/**
 * @function
 * @name shuffle
 * 
 * Returns array with elements in random order.
 * 
 * @param {array} min - array to shuffle
 * 
 * @return {array} - Array with elements in random order
 */
export function shuffle(a) {
    return a.sort((a, b) => 0.5 - Math.random())
}