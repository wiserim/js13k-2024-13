import {rand} from '../utils/rand';
import {shuffle} from '../utils/shuffle';
import {personData} from '../person-data';
import {play} from '../utils/music';

export function start() {
	for(let scene of game.scenes) {
		scene.active = 0;
	}
	
	shuffle(personData['job']);

	//generate suspects
	for(let i in game.data.suspects) {
		let suspect = game.data.suspects[i],
			pd = suspect.portraitData;
		
		suspect.generate();

		suspect.bio = [
			`Sex: ${suspect.portraitData[0] ? 'F' : 'M'}`,
			`Age: ${rand(20, 50)}`,
			`Occupation: ${personData['job'][i][0]}`
		];
		suspect.info = [
			`Person works as ${personData['job'][i][1]}.`
		];
		suspect.clues = [
			personData['job'][i][2]
		];
		suspect.alive = 1;
		suspect.interactive = 1;
		suspect.arrested = 0;
		suspect.protected = 0;
		suspect.generateImage();
	}

	game.data.potentialVictims = shuffle([...game.data.suspects]);
	//choose killer
	game.data.killer = game.data.potentialVictims.pop();
	//choose next victim
	game.data.victim = game.data.potentialVictims.pop();

	//set game data
	game.data.victimCount = 1;
	game.data.turn = 1;
	game.data.arrested = 0;
	game.data.protected = 0;

	//fill killer clues
	let klr = game.data.killer,
		kpd = klr.portraitData,
		pd = personData;
	game.data.killerClues = [
		`is a ${ kpd[0] ? 'male' : 'female' }`,
		`has ${pd.eyes[kpd[1]][1]} eyes`,
		`has ${pd.hair[kpd[0]][kpd[2]][1]} hair`,
		`has ${pd.hairColor[kpd[3]][1]} hair`,
		`has ${pd.nose[kpd[4]][1]} nose`,
		`wears a ${pd.clothes[kpd[5]][2]}`,
		`wears ${pd.clothesColor[kpd[6]][1]} clothes`
	];

	game.data.killerClues = shuffle(game.data.killerClues);

	//update killer file
	let killer = game.scenes.killerFile.person;
	killer.name = 'Case no. 20240913/001';
	killer.bio =  [
		'Date: 09/13/2024',
		'Type: Homicide',
		'Victim: Joe Doe',
		'Culprit: unknown'
	];
	/*
	killer.info = [
		'On September 13, 2024 a body was found of a homicide victim.',
		'The victim was killed in a similar way to the method used in',
		'a series of murders commited 13 years ago by unidentified',
		'serial killer: see case no. 20110913/013.',
		'We don\'t know if they\'re commited by the same person, copycat',
		'or it\'s just a coincidence.',
		`We\'ve also found ${game.data.victim.clues[rand(0,game.data.victim.clues.length - 1)]} on a crime scene.`,
		'It may be a clue about the next victim.'
	];
	*/
	killer.info = [
		'On September 13, 2024 a body of a homicide victim was found.',
		'Crime scene analysis suggests odd similarities to series',
		'of 13 murders commited 13 years ago by unidentified',
		'serial killer: see case no. 20110913/013.',
		'We don\'t know if we\'re dealing with the same killer, copycat',
		'or it\'s just a coincidence.',
		'What we know is that killer won\'t stop on only one victim.',
		`We\'ve found ${game.data.victim.clues[rand(0,game.data.victim.clues.length - 1)]} on a crime scene.`,
		'It may be a clue about the next victim.'
	];


	game.scenes.killerFile.person = killer;
	game.scenes.summary.person = killer;

	game.scenes.menu.hide();
	game.scenes.killerFile.active = 1;

	//play music
	if(!game.data.music) {
		play();
		game.data.music = 1;
	}
}