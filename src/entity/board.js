import {Group} from './group';
import {Person} from './person';

export class Board extends Group {

	constructor() {
		super({x: 160, y: 120, width: 320, height: 200 });
		let t = this;
		t.background = '#a50';

		//fill with people
		for(let i =0; i < 32; i++) {
			let person = new Person({
				x: 14 + 37 * (i % 8),
				y: 14 + 16 + (37 * Math.floor(i / 8))
			});

			person.name = 'Person ' + (i+1),
			person.info = [
				'Lorem ipsum dolor sit amte',
				'- consectetur adipiscing elit',
				'- sed do eiusmod tempor incididunt,',
				'- ut labore et dolore magna aliqua'
			];
			person.bio = [
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
				'eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				'Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
				'laboris nisi ut aliquip ex ea commodo consequat. Duis aute ',
				'irure dolor in reprehenderit in voluptate velit esse cillum ', 
				'dolore eu fugiat nulla pariatur. Excepteur sint occaecat ',
				'cupidatat non proident, sunt in culpa qui officia deserunt ',
				'mollit anim id est laborum.'
			];
			t.add(person);
		}
	}
}