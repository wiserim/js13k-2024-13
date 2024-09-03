import {File} from './file';
import {Text} from './text';

export class PersonalFile extends File {
	_person;

	constructor(args) {
		super(args);
		let t = this;
		t.personName = new Text({x: 120, y: 40, origin: {x: 0, y: 0 }, size: 2 });
		t.personInfo = new Text({x: 120, y: 60, origin: {x: 0, y: 0 }});
		t.personBio = new Text({x: 30, y: 122, origin: {x: 0, y: 0 }});
		t.closeBtn = new Text({x: 280, y: 220, origin: {x: 1, y: .5}, padding: { x: 3, y: 3 }, text: 'close', color: '#fff', background: '#000'});

		t.closeBtn.on('hover', () => {t.closeBtn.alpha = .8; t.game.cursor('pointer');});
		t.closeBtn.on('click', () => {t.hide();});

		t.add(t.personName);
		t.add(t.personInfo);
		t.add(t.personBio);
		t.add(t.closeBtn);

		Object.assign(this, args);
	}

	set person(person) {
		let t = this;
		t._person = person;
		t.personName.text = person.name;
		t.personInfo.text = person.info;
		t.personBio.text = person.bio;
	}

	get person() {
		return this._person;
	}

	draw() {
		let t = this;

		if(!t._beforeDraw())
            return;

		t.game.ctx.drawImage(t._img, t.x, t.y, t.width, t.height);
		t.game.ctx.drawImage(t.person.portrait, t.x + 20, t.y + 28, 72, 72);

		for(let item of t.items) {
            item.draw();
        }

        this.closeBtn.alpha = 1;
	}
}