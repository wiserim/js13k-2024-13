import {File} from './file';
import {Text} from './text';
import {personData} from '../person-data';

export class PersonalFile extends File {
	_person;

	constructor(args) {
		super(args);
		let t = this;
		
		t.personName = new Text({x: 100, y: 28, origin: {x: 0, y: 0 }, size: 2 });
		t.personBio = new Text({x: 100, y: 46, origin: {x: 0, y: 0 }});
		t.personInfo = new Text({x: 20, y: 110, origin: {x: 0, y: 0 }});
		t.closeBtn = new Text({x: 280, y: 225, origin: {x: 1, y: 1}, padding: { x: 3, y: 3 }, text: 'close', color: '#fff', background: '#000'});

		t.closeBtn.on('hover', () => {t.game.cursor('pointer');});
		t.closeBtn.on('click', () => {t.hide();});

		t.add(t.personName);
		t.add(t.personInfo);
		t.add(t.personBio);
		t.add(t.closeBtn);

		Object.assign(this, args);
	}

	set person(person) {
		let t = this,
			pd = person.portraitData,
			p = personData,
			info = [...person.info];

		t._person = person;
		t.personName.text = person.name;
		t.personBio.text = person.bio;

		if(pd.length) {
			info = info.concat([
				'',
				'Appearance:',
				`- ${p.eyes[pd[1]][1]} eyes,`,
				(pd[0] == 0 && pd[2] == 2 ? `- ${p.hair[pd[0]][pd[2]][1]},` : `- ${p.hairColor[pd[3]][1]}, ${p.hair[pd[0]][pd[2]][1]},`),
				`- ${p.nose[pd[4]][1]} nose,`,
				`- wears a ${p.clothesColor[pd[6]][1]} ${p.clothes[pd[5]][2]}.`,
			]);
		}

		t.personInfo.text = info;
	}

	get person() {
		return this._person;
	}

	draw() {
		let t = this;

		if(!t._beforeDraw())
            return;

		t.game.ctx.drawImage(t._img, t.x, t.y, t.width, t.height);
		t.game.ctx.drawImage(t.person.image, t.x + 20, t.y + 28, 72, 72);

		for(let item of t.items) {
            item.draw();
        }

        this.closeBtn.alpha = 1;
	}
}