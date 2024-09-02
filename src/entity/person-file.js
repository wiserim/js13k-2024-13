import {File} from './file';
import {Text} from './text';

export class PersonFile extends File {
	_person;

	constructor() {
		super();
		let t = this;
		t.personName = new Text({x: 120, y: 40});
		t.personInfo = new Text({x: 120, y: 60});
		t.personBio = new Text({x: 30, y: 122});
		t.arrestBtn = new Text({x: 200, y: 220, padding: [3,3], color: '#fff', background: '#d33'});
		t.protectBtn = new Text({x: 240, y: 220, padding: [3,3], color: '#fff', background: '#33c'});
		t.closeBtn = new Text({x: 280, y: 220, padding: [3,3], color: '#fff', background: '#000'});

		t.personName.origin = [0,0];
		t.personName.size = 2;
		t.personInfo.origin = [0,0];
		t.personBio.origin = [0,0];

		t.closeBtn.text = 'close';
		t.arrestBtn.text = 'arrest';
		t.protectBtn.text = 'protect';

		t.closeBtn.on('hover', () => {console.log('hover'); t.closeBtn.alpha = .6;});
		t.closeBtn.on('click', () => {t.hide();});

		t.add(t.personName);
		t.add(t.personInfo);
		t.add(t.personBio);
		t.add(t.closeBtn);
		t.add(t.arrestBtn);
		t.add(t.protectBtn);
	}

	set person(person) {
		let t = this;
		t._person = person;
		console.log(person)
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

		t.game.ctx.drawImage(t._image, t.x - t.width * t.origin[0], t.y - t.height * t.origin[1], t.width, t.height);
		t.game.ctx.drawImage(t.person.portrait, t.x + 20 - t.width * t.origin[0], t.y + 28 - t.height * t.origin[1], 72, 72);

		t._afterDraw();

		for(let item of t.items) {
            t._beforeDraw()
            item.draw();

            let px =  t.x - t.width * t.origin[0],
            py =  t.y - t.height * t.origin[1];

            t.game.ctx.strokeStyle = '#f00';
            t.game.ctx.strokeRect(item.x - item.width * item.origin[0] + px, item.y + py - item.height * item.origin[1], item.width, item.height);
        /*
        
        return (t.x - t.width * t.origin[0] + px <= x &&
            (t.x - t.width * t.origin[0] + px + t.width) >= x &&
            t.y - t.height * t.origin[1] + py <= y &&
            (t.y - t.height * t.origin[1] + py + t.height) >= y);
        */
            t._afterDraw();
        }
	}

	update() {
		super.update();
		this.closeBtn.alpha = 1;
	}

	show() {
		this.active = 1;
	}

	hide() {
		this.active = 0;
	}
}