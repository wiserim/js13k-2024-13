import Game from './game';
import {encode} from './codec/array/encoder';
import {decode} from './codec/array/decoder';
import {encode1d, encode2d, decode1d} from './coder';

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

/*
const e = [
	[ 1, 1, 1 ],
	[ 1, 0, 1 ],
	[ 1, 0, 1 ],
	[ 1, 0, 1 ],
	[ 1, 1, 1 ]
];
console.log(e);
console.log(encode2d(e));
console.log(decode1d(encode1d(e)));
console.log('-------------');
//31715151517
//0x3575557

*/
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