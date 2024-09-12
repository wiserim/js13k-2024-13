import {Text} from '../entity/text';
import {Person} from '../entity/person';
import {Board} from '../entity/board';
import {File} from '../entity/file';
import {PersonalFile} from '../entity/personal-file';
import {decode2d} from '../utils/decoder';
import {start} from './start';

export function init() {
	for(let key in game.letters) {
        game.letters[key] = decode2d(game.letters[key]);
    }

	let board =  game.scenes.board = new Board({ interactive: 0 }),
		suspectFile = game.scenes.suspectFile = new PersonalFile({ active: 0 }),
		killerFile = game.scenes.killerFile = new PersonalFile({ active: 0 }),
		menu = game.scenes.menu = new File(),
		arrestBtn = new Text({x: 212, y: 220, origin: {x: 1, y: .5}, padding: { x: 3, y: 3 }, text: 'arrest', color: '#fff', background: '#c22'}),
		protectBtn = new Text({x: 250, y: 220, origin: {x: 1, y: .5}, padding: { x: 3, y: 3 }, text: 'protect', color: '#fff', background: '#22c'}),
		menuStartBtn = new Text({x: 150, y: 117, padding: { x: 3, y: 3 }, text: 'start', color: '#fff', background: '#000'});

		board.interactive = 0;

		//add elements to menu
		menu.add(menuStartBtn);
		menu.add(new Text({x: 150, y: 30, size: 3, text: 'Thirteen'}));
		menu.add(new Text({x: 150, y: 220, text: 'Js13kGames 2024 game by Wiserim'}));
		//bind menu
		menuStartBtn.on('hover', () => game.cursor('pointer'));
		menuStartBtn.on('click', () => {
			start();
		});

	//create killer portrait
	let killerPortrait = new Person({ 
		x: 160,
		y: 46
	});
	killerPortrait.generateImage();
	killerPortrait.on('click', () => {
        killerFile.show();
        board.interactive = 0;
    });
    killerFile.person = killerPortrait;
	game.data.killerPortrait = killerPortrait;
	board.add(killerPortrait);

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

		board.add(suspect);
		game.data.suspects.push(suspect);
	}

	//bind suspect file
	suspectFile.on('hide', () => setTimeout(board.interactive = 1, 100));
	//bind suspect file buttons
	arrestBtn.on('hover', () => game.cursor('pointer'));
	arrestBtn.on('click', () => {
		suspectFile.person.arrested = 1;
		suspectFile.person.interactive = 0;
		game.data.arrested = suspectFile.person;
		suspectFile.hide();
	});
	suspectFile.add(arrestBtn);

	protectBtn.on('hover', () => game.cursor('pointer'));
	protectBtn.on('click', () => {
		suspectFile.person.protected = 1;
		suspectFile.person.interactive = 0;
		game.data.protected = suspectFile.person;
		suspectFile.hide();
	});

	suspectFile.add(protectBtn);

	//bind killer file
	killerFile.on('hide', () => setTimeout(board.interactive = 1, 100));
}