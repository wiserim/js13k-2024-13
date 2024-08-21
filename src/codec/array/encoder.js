/*
 * Encode array of integers to string.
 * Array values must be natural numbers (>= 0). 
 * 
 * @param {number[]} arr
 * @returns {string}
*/
export function encode(arr) {
    let binMaxlength = 0,
        //get binary values and their max length
        binaries = arr.map(val => {
            let bin = val.toString(2);
            binMaxlength = Math.max(binMaxlength, bin.length);
            return bin;
        }),
        //join binary values and ensure they're the same length
        encoded = binaries.reduce((acc, val) => acc + val.padStart(binMaxlength, 0));

    //encode 5 bit chunks in base36
    //used regex to make sure only first chunk has 5 bits or less
    //add binary values length as first value
    return encoded
        .match(/.{1,5}(?=(.{5})*$)/g)
        .reduce((acc, val) => acc + parseInt(val, 2).toString(36), binMaxlength.toString(36));
}

export function encode2d(arr) {
    let arrWidth = arr[0].length.toString(36)

    return arrWidth + encode([].concat(...arr));

}

export default encode;