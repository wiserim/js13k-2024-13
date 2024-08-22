import {decode2d} from './codec/array/decoder';

const letters = {
	"0": "31urf",
	"1": "11v",
	"2": "31sv7",
	"3": "31suf",
	"4": "31mu9",
	"5": "31uef",
	"6": "31uff",
	"7": "31si9",
	"8": "31uvf",
	"9": "31uuf",
	"A": "31art",
	"B": "31qve",
	"C": "31u97",
	"D": "31qre",
	"E": "31uf7",
	"F": "31ud4",
	"G": "41d2sm",
	"H": "31mvd",
	"I": "31t4n",
	"J": "31sjf",
	"K": "41jb59",
	"L": "31i97",
	"M": "51rllhh",
	"N": "41jmsp",
	"O": "31urf",
	"P": "31uv4",
	"Q": "41d6dn",
	"R": "31qrl",
	"S": "31uef",
	"T": "31t4i",
	"U": "31mrf",
	"V": "51hhaa4",
	"W": "51hhllr",
	"X": "51ha4ah",
	"Y": "31mki",
	"Z": "51v248v",
	" ": "31000",
	".": "2102",
	"!": "21l2",
	"?": "31sk2",
	"'": "21k0",
	",": "2106",
	"-": "310e0"
};

for(let key in letters) {
	letters[key] = decode2d(letters[key]);
}

export { letters };