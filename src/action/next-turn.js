import {rand} from '../utils/rand';
import {shuffle} from '../utils/shuffle';
import {personData} from '../person-data';

/**
 * @function
 * @name nextTurn
 * 
 * Update game and start next turn
 */
export function nextTurn() {
	game.scenes.board.interactive = 0;
	game.data.turn++;

	let killer = game.scenes.killerFile.person,
		crimeType = 'Homicide',
		kl1a = '';
	killer.name = `Case no. 20240913/00${game.data.turn}`;
	killer.bio[0] = `Date: 09/${(13 + game.data.turn)}/2024`;
	killer.bio[2] = `Victim: ${game.data.victim.name}`;

	killer.info = [];

	if(game.data.victim.protected) {
		crimeType = 'Attempted homicide';
		killer.info = [
			`On September ${12 + game.data.turn}, 2024 unidentified perpetrator committed`,
			`attempted murder of ${game.data.victim.name}.`,
			'The attempt was prevented by officer deployed to protect victim.',
			`Officer began pursuit after the suspect, which ${game.data.killer.arrested ? 'was arrested' : 'managed to escape'}.`
		];
	}
	else {
		game.data.victim.alive = 0;
		game.data.victim.interactive = 0;
		game.data.victimCount++;

		killer.info = [
			`On September ${12 + game.data.turn}, 2024 a body of another homicide victim was found.`,
			'Crime scene analysys indicates that victim was killed by',
			'the same serial killer as the previous one.'
		];
	}

	//check if killer is arrested
	if(game.data.killer.arrested) {
		killer.bio[3] = `Culprit: ${game.data.killer.name}`;
		killer.info = killer.info.concat([
			`${game.data.killer.name} was arrested and charged with murder of ${game.data.victimCount} people.`,
			'',
			'Summary:',
			`- Investigation time: ${game.data.turn} days,`,
			`- Victims: ${game.data.victimCount}`,
			`- Prevented murders: ${game.data.turn - game.data.victimCount}`,
			'',
			'Case closed'
		]);

		game.scenes.summary.person = killer;
		game.scenes.summary.show();
		return;
	}

	if(game.data.turn > 12) {
		killer.info = killer.info.concat([
			'The investigation failed to determine the identity of',
			'the serial killer.',
			'',
			'Summary:',
			`- Investigation time: ${game.data.turn} days`,
			`- Victims: ${game.data.victimCount}`,
			`- Prevented murders: ${game.data.turn - game.data.victimCount}`,
			'',
			'Case suspended'
		]);
		game.scenes.summary.person = killer;
		game.scenes.summary.show();
		return;
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