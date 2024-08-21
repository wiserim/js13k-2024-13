/*
 * Decode encoded array.
 * 
 * @param {string} encoded
 * @returns {number[]}
*/
export function decode(encoded) {
    //get binary values length
    let binLength = parseInt(encoded[0], 36),
        //prepare regex
        regex = new RegExp(`.{1,${binLength}}`, 'g'),
        //split values, encode into binary and join
        //ignore first value (it encodes binary values length)
        //ensure that all encoded, binary values but first has 5 bits
        encodedBinaries = encoded
            .slice(2)
            .split('')
            .reduce((acc, val) => acc + (parseInt(val, 36).toString(2).padStart(5, 0)), parseInt(encoded[1], 36).toString(2)),
        //optionally pad string with '0'
        modulo = encodedBinaries.length % binLength;
        
    if(modulo) {
        encodedBinaries = encodedBinaries.padStart(encodedBinaries.length + (binLength - modulo), 0);
    }

    //split encoded biniaries into binary values and parse to integers
    return encodedBinaries
        .match(regex)
        .map(val => parseInt(val, 2));
}

export function decode2d(encoded) {
    //get array columns length
    let arrWidth = parseInt(encoded[0], 36),
        //decode 1d array
        arr1d = decode(encoded.slice(1));
        //split array into columns
        return Array.from({ length: Math.ceil(arr1d.length / arrWidth) }, (val, i) => arr1d.slice(i * arrWidth, i * arrWidth + arrWidth));
}

export default decode;