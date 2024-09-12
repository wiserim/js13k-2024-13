import {rand} from '../utils/rand';
import {shuffle} from '../utils/shuffle';
import {personData} from '../person-data';

export function nextTurn() {
	game.scenes.board.interactive = 0;
	game.data.turn++;

	let killer = game.scenes.killerFile.person,
		crimeType = 'Homicide',
		kl1a = '';
	killer.name = `Case no. 20240913/00${game.data.turn}`;
	killer.bio[0] = `Date: 09/${(13 + game.data.turn)}/2024`;
	killer.bio[2] = `Victim: ${game.data.victim.name}`;
	/*
	  [
		`Date: 09/13/2024`,
		'Type: Homicide',
		'Victim: Joe Doe',
		'Culprit: unknown'
	];
	*/
	killer.info = [];
	/*
	[
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

	//check if killer is arrested
	if(game.data.killer.arrested) {
		console.log('killer arrested');
		return;
	}

	if(game.data.victim.protected) {
		crimeType = 'Attempted homicide';
		killer.info = [
			`On September ${12 + game.data.turn}, 2024 unidentified perpetrator committed`,
			`attempted murder of ${game.data.victim.name}.`,
			'The attempt was prevented by officer deployed to protect victim.',
			'Officer began pursuit after the suspect, which managed to escape.'
		];
	}
	else {
		game.data.victim.alive = 0;
		game.data.victim.interactive = 0;
		game.data.victimCount++;killer.info.push();

		killer.info = [
			`On September ${12 + game.data.turn}, 2024 a body of another homicide victim was found.`,
			'Crime scene analysys indicates that victim was killed by',
			'the same person as previous ones.'
		];
	}

	if(game.data.turn > 13) {
		console.log('game over');
		game.scenes.menu.show();
	}

	game.data.victim = game.data.potentialVictims.pop();
	killer.info.push(`${game.data.victim.clues[rand(0,game.data.victim.clues.length - 1)]} was found in the victim's house.`);
	killer.info.push('It may be another clue left by the killer about the next victim.');

	if(game.data.turn%2 == 0) {
		killer.info.push(`According to witness testimonies suspect ${game.data.killerClues.pop()}.`);
	}

	killer.bio[1] = `Type: ${crimeType}`;

	game.scenes.killerFile.person = killer;
	setTimeout(() => {game.scenes.killerFile.show()}, 100);
}