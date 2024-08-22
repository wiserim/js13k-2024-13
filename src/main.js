import Game from './game';
import {encode, encode2d} from './codec/array/encoder';
import {decode, decode2d} from './codec/array/decoder';

//import {letters, decodeLetters} from './letters';
import {Text} from './entity/text';

console.log('hello world');
const bbb = 'aa';

const g = new Game();
g.init();
g.render();

/*
const a = [
	[1,2,3,4,5,6,7,8,9,10]
];

console.log(a);
const b = encode(a);
console.log(b);

console.log(decode(b));
*/

const a = [1,2,3,4,5,6,7,8,9];
console.log(a);
const aEn = encode(a);
console.log(aEn);
const aDec = decode(aEn);
console.log(aDec);
console.log('-------------');
//12fjbmgjryt3a3pcm4g
//4zb11n62rdo379q8
//44zb11n62rdo379q8
//4h8421
//1101110010111011110001001
//
//428q5cu41
//0001 0010 0011 0100 0101 0110 0111 1000 1001
//000100100011010001010110011110001001
//0001001000110100010101100111100010000001
//0001 0010 0011 0100 0101 0110 0111 1000 10000 001

const b = [1,2,3,1,2,3,2,3,1,2,3,2,3,1,2,3,2,3,1,2,3];
console.log(b);
console.log(encode(b));
console.log(decode(encode(b)));
console.log('-------------');
//1rk4a3nrtxne0z2jwzgld534
//21rk4a3nrtxne0z2jwzgld534
//21izeveyj

const c = [1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1];
console.log(c);
console.log(encode(c));
console.log(decode(encode(c)));
console.log('-------------');
//1rk4a3nrtxne0z2jwzgld534
//11rk4a3nrtxne0z2jwzgld534
//11izeveyj

const d = [1,1,1];
console.log(d);
console.log(encode(d));
console.log(decode(encode(d)));
console.log('-------------');
//1rk4a3nrtxne0z2jwzgld534
//133
//17
//


const e = [
	[ 1, 1, 1 ],
	[ 1, 0, 1 ],
	[ 1, 0, 1 ],
	[ 1, 0, 1 ],
	[ 1, 1, 1 ]
];
console.log(e);
console.log(encode2d(e));
console.log(decode2d(encode2d(e)));
console.log('-------------');
//31715151517
//0x3575557


console.log('encode / decode "M" path');
const f = [90,130,95,25,150,80,205,25,210,130];
console.log(f);
const fEn = encode(f);
console.log(fEn);
const fDec = decode(fEn);
console.log(fDec);
//[90,130,95,25,150,80,205,25,210,130]
//'81xlncx8qgn47dhc0'
//

//generate array with 100 random binary values and encode
let binArr = [];
for(let i = 0; i < 100; i++) {
	binArr.push(Math.floor(Math.random() * Math.floor(2)));
}
console.log('binArr', binArr);
let encodedBinArr = encode(binArr);
console.log('encodedBinArr', encodedBinArr);

//generate array with 100 random values 0-100 and encode
let nArr = [];
for(let i = 0; i < 100; i++) {
	nArr.push(Math.floor(Math.random() * Math.floor(100)));
}
console.log('nArr', nArr);
let encodedNArr = encode(nArr);
console.log('encodedNArr', encodedNArr);

//generate array with 100 random values 0-1000 and encode
let tArr = [];
for(let i = 0; i < 100; i++) {
	tArr.push(Math.floor(Math.random() * Math.floor(1000)));
}
console.log('tArr', tArr);
let encodedTArr = encode(tArr);
console.log('encodedTArr', encodedTArr);

//decode letters
/*
let letters = {
    '0': 0x3575557,
    '1': 0x1511111,
    '2': 0x3571747,
    '3': 0x3571717,
    '4': 0x3555711,
    '5': 0x3574717,
    '6': 0x3574757,
    '7': 0x3571111,
    '8': 0x3575757,
    '9': 0x3575717,
    'A': 0x3525575,
    'B': 0x3565756,
    'C': 0x3574447,
    'D': 0x3565556,
    'E': 0x3574747,
    'F': 0x3574644,
    'G': 0x4568b96,
    'H': 0x3555755,
    'I': 0x3572227,
    'J': 0x3571157,
    'K': 0x459aca9,
    'L': 0x3544447,
    'M': 0x551b15151111,
    'N': 0x459db99,
    'O': 0x3575557,
    'P': 0x3575744,
    'Q': 0x45699b7,
    'R': 0x3565565,
    'S': 0x3574717,
    'T': 0x3572222,
    'U': 0x3555557,
    'V': 0x5511110a0a04,
    'W': 0x55111115151b,
    'X': 0x55110a040a11,
    'Y': 0x3555222,
    'Z': 0x551f0204081f,            
    ' ': 0x3500000,
    '.': 0x2500002,
    '!': 0x2522202,
    '?': 0x3571202,
    ',': 0x2500012,
    '\'': 0x2522000,
    '-': 0x3500f00   
};

function decodeLetter(hex) {
    let split = hex.toString(16).split(''),
        width = parseInt(split[0], 16),
        height = parseInt(split[1], 16),
        valLength = Math.ceil(width / 4),
        decoded = [];

    for(let i = 2; i < split.length; i++) {
        let val = split[i];
        for(let j = 1; j < valLength; j++) {
            i++;
            val += split[i];
        }

        let hexRow = parseInt(val, 16);
        let binary = hexRow.toString(2).padStart(width,0);
        decoded.push(binary.split('').map(Number));
    }

    return {
        width: width,
        height: height,
        map: decoded
    };
}
/*
for(let letter in letters) {
	let decoded = decodeLetter(letters[letter]);
	let arr = '[';
	for(let i of decoded.map) {
		arr += '[';
		arr += i.join(',');
		arr += '],';
	}
	arr += ']';

	console.log(letter, arr);
	//console.table(decoded.map);
}
*/
/*
console.log(encode2d([
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0]
]),
decode2d('31000'))

console.log(letters);
decodeLetters();
console.log(letters);
*/
//decodeLetters();
//window.letters = letters;

let text = new Text({
	x: 100,
	text:['aaa', 'bbb', 'co a robię ze swoim życiem?']
});
console.log(text);