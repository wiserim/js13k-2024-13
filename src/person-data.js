import {decode2d} from './utils/decoder';

/*
* Personal data used to generate persons
*/
const personData = {
	firstName: [
		//male names
		['Adam', 'Bob', 'Charles', 'Dennis', 'Earl', 'Frank', 'George', 'Hugh', 'Ian', 'James', 'Kevin', 'Leo', 'Martin', 'Norman', 'Oscar', 'Peter', 'Quentin', 'Robert', 'Steven', 'Tobias', 'Victor', 'Wade', 'Xavier', 'Zachary'],
		//female names
		['Ana', 'Betty', 'Cindy', 'Diana', 'Ellizabeth', 'Franny', 'Holly', 'Ivy', 'Jenny', 'Kate', 'Laura', 'Mary', 'Nora', 'Octavia', 'Page', 'Rose', 'Sarah', 'Taylor', 'Vicky', 'Whitney', 'Xena', 'Zelda']
	],
	lastName: ['Allen', 'Baker', 'Cooper', 'Davis', 'Evans', 'Fisher', 'Hill', 'Irvin', 'Johnson', 'Kelly', 'Luther', 'Miller', 'Nelson', 'Parker', 'Robinson', 'Smith', 'Tailor', 'Valentino', 'Walker', 'Zimmer'],
	job: [
		//job name, description, clue
		['cashier', 'a cashier in a local store', 'a receipt'],
		['taxi driver', 'a taxi driver at a taxi corporation.', 'a toy car'],
		['truck driver', 'a independent truck driver', 'a package'],
		['fisherman', 'a fisherman on \'Juliette 2\' fishing boat', 'a tuna can'],
		['farmer', 'a farmer at a local market', 'a carrot'],
		['gardener', 'a gardener at city park', 'a pruner'],
		['butcher', 'a butcher at a deli shop', 'a cleaver'],
		['hairdresser', 'a haidressen in a hair saloon', 'a pair of scissors'],
		['office worker', 'a office worker in an accounting firm', 'a stampler'],
		['secretary', ' a secretary at a law firm', 'a meeting schedule'],
		['waiter', 'a waiter at a local restaurant', 'a restaurant menu'],
		['firefighter', 'a firefighter in the fire department', 'matches'],
		['referee', 'a referee at a football stadium', 'a whistle'],
		['doctor', 'a doctor at a local clinic', 'a drug prescription'],
		['pharmacist', 'a pharmacist at a mall pharmacy', 'a drug prescription'],
		['writer', 'a writer checked into the hotel', 'a book'],
		['cook', 'a cook at a local restaurant', 'a spatula'],
		['graphic designer', 'a graphic designer at an advertising agency', 'advertising leaflet'],
		['painter', 'a interior painter', 'a brush'],
		['construction worker', 'a construction worker at a construction company', 'a hardhat'],
		['car mechanic', 'a car mechanic in his own workshop', 'a wrench'],
		['teacher', 'a teacher at elementary school', 'an apple'],
		['librarian', 'a librarian at school library', 'a book'],
		['babysitter', 'a babysitter', 'a pacifier'],
		['psychiatrist', 'a psychiatrist', 'a drug prescription'],
		['storekeeper', 'a storekeeper in the docks', 'product stock report'],
		['salesman', 'a salesman at a car dealership', 'a car catalogue'],
		['customer service', 'a call center customer service', 'a phone headset'],
		['mailman', 'a carrier at the post office', 'an envelope'],
		['photographer', 'a wedding photographer', 'a photograph of a wedding'],
		['journalist', 'a journalist at a local newspaper', 'a notepad'],
		['janitor', 'a janitor at elementary school', 'a broom']
	],
	hobby: [
		//hobby name, description, clue
		['', '', ''],
	],
	silhuette : `M 0 72 L 0 65 L 2 62 L 5 60 L 25 55 L 20 50 L 17 45 L 17 25 L 20 20 L 25 15 L 30 13
L 42 13 L 47 15 L 52 20 L 55 25 L 55 45 L 52 50 L 45 55 L 67 60 L 70 62 L 72 65 L 72 72
Z`,
	eyes: [
		['#884848', 'brown'],
		['#6888b8', 'blue'],
		['#386858', 'green'],
		['#281828', 'dark']
	],
	hair: [
		//male
		[
			[`M 17 40 L 16 30 L 16 25 L 18 20 L 25 13 L 30 12
			L 42 12 L 47 13 L 54 20 L 56 25 L 56 30 L 55 40
			L 54 35 L 50 25 L 45 21 L 42 20 
			L 40 20 L 27 24 L 22 25 L 18 35
			Z`, 'short hair'],
			[`M 13 58 L 14 40 L 15 30 16 25 18 20 25 13  30 12
			42 12 47 13 54 20 56 25 57 30 58 40 59 58
			45 55 52 50 55 45 54 35 50 25 45 21 42 20 
			40 20 27 24 22 25 18 35 17 45 20 50 27 55
			Z`, 'long hair'],
			['', 'shaved head']
		],
		//female
		[
			['M 13 40 L 14 30 16 25 18 20 25 13 30 12 42 12 47 13 54 20 56 25 58 30 58 40 55 40 50 25 45 21 42 20 40 20 27 24 22 25 17 40 Z', 'short hair'],
			[`M 13 58 L 14 40 L 15 30 16 25 18 20 25 13  30 12
			42 12 47 13 54 20 56 25 57 30 58 40 59 58
			45 55 52 50 55 45 54 35 50 25 45 21 42 20 
			40 20 27 24 22 25 18 35 17 45 20 50 27 55
			Z`, 'long hair'],
			[`M 17 40 16 30 16 25 18 20 25 13 30 12
			42 12 47 13 54 20 56 25 56 30 56 40
			58 45 57 50 56 60 54 59 53 50 55 42
			54 35 50 25 45 21 42 20 
			30 20 27 21 22 25 18 35
			Z`, 'ponytail']
		]
	],
	hairColor: [
		['#884848', 'brown'],
		['#281828', 'black'],
		['#d8b868', 'blonde'],
		['#d86858', 'red']

	],
	nose: [
		['M 34 40 L 35 41 37 41 38 40', 'small'],
		['M 33 40 L 34 42 38 42 39 40', 'average'],
		['M 32 40 L 34 42 38 42 40 40', 'large'],
	],
	lips: [
		['M 31 48 L 34 47 35 48 37 48 38 47 41 48 37 49 36 49 Z', 'normal']
	],
	clothes: [
		['M 0 72 L 0 65 2 62 5 59 20 56 30 61 42 61 52 56 67 59 70 62 72 65 72 72 Z', 'M 20 56 L 30 61 42 61 52 56', 't-shirt'],
		['M 0 72 L 0 65 2 62 5 59 18 56 22 52 28 56 32 61 36 63 40 61 44 56 50 52 54 56 67 59 70 62 72 65 72 72 Z', 'M 18 56 L 26 61 28 56 M 54 56 L 46 61 44 56 M 38 62 L 38 72 M 34 65 L 36 66 M 34 70 L 36 70', 'shirt'],
		['M 0 72 L 0 65 2 62 5 59 18 56 20 50 28 54 30 61 42 61 44 54 52 50 54 56 67 59 70 62 72 65 72 72 Z', 'M 18 56 L 26 61 28 54 M 54 56 L 46 61 44 54 M 40 61 L 40 72', 'jacket']
	],
	clothesColor: [
		['#281828', 'black'],
		['#686878', 'gray'],
		['#d8d8d8', 'white'],
		['#a83848', 'red'],
		['#689858', 'green'],
		['#6888b8', 'blue'],
		['#d8b868', 'yellow'],
		['#584878', 'purple']
	]
};

export {personData};

