import {Text} from './entity/text';
import {Person} from './entity/person';
import {Board} from './entity/board';
import {File} from './entity/file';
import {PersonalFile} from './entity/personal-file';

export function init() {
	let board =  game.scenes.board = new Board(),
		suspectFile = game.scenes.suspectFile = new PersonalFile({ active: 0 }),
		killerFile = game.scenes.killerFile = new PersonalFile({ active: 0 }),
		arrestBtn = new Text({x: 212, y: 220, origin: {x: 1, y: .5}, padding: { x: 3, y: 3 }, text: 'arrest', color: '#fff', background: '#c22'}),
		protectBtn = new Text({x: 250, y: 220, origin: {x: 1, y: .5}, padding: { x: 3, y: 3 }, text: 'protect', color: '#fff', background: '#22c'});

	//create killer
	let killer = new Person({ 
		x: 160,
		y: 46,
		name: '' 
	});
	killer.generatePortrait();
	killer.on('click', () => {
        killerFile.show();
        board.interactive = 0;
    });
    killerFile.person = killer;
	game.data.killer = killer;
	board.add(killer);

	//create suspects
	game.data.suspects = [];
	for(let i =0; i < 32; i++) {
		let suspect = new Person({
			x: 30 + 37 * (i % 8),
			y: 46 + 37 + (37 * Math.floor(i / 8))
		});

		suspect.on('click', () => {
	        suspectFile.person = suspect;
	        suspectFile.show();
	        board.interactive = 0;
	    });

		//tmp
		suspect.name = 'Person ' + (i+1),
		suspect.info = [
			'Lorem ipsum dolor sit amte',
			'- consectetur adipiscing elit',
			'- sed do eiusmod tempor incididunt,',
			'- ut labore et dolore magna aliqua'
		];
		suspect.bio = [
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
			'eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
			'laboris nisi ut aliquip ex ea commodo consequat. Duis aute ',
			'irure dolor in reprehenderit in voluptate velit esse cillum ', 
			'dolore eu fugiat nulla pariatur. Excepteur sint occaecat ',
			'cupidatat non proident, sunt in culpa qui officia deserunt ',
			'mollit anim id est laborum.'
		];
		suspect.generatePortrait();
		//tmp end

		board.add(suspect);
		game.data.suspects.push(suspect);
	}

	//bind suspect file
	suspectFile.on('hide', () => board.interactive = 1);
	//bind suspect file buttons
	arrestBtn.on('hover', () => arrestBtn.alpha = .8);
	suspectFile.add(arrestBtn);

	protectBtn.on('hover', () => protectBtn.alpha = .8);
	suspectFile.add(protectBtn);

	//bind killer file
	killerFile.on('hide', () => board.interactive = 1);
}