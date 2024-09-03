import {Group} from './group';
import {Person} from './person';

export class Board extends Group {
	constructor() {
		super({x: 160, y: 120, width: 320, height: 240 });
		let t = this;
		
		t._img = document.createElement('canvas');
		t._img.width = t.width;
		t._img.height = t.height;
        t._ctx = t._img.getContext('2d');
        t._ctx.translate(0.5, 0.5);
		t._ctx.lineWidth = 1;
        t._ctx.imageSmoothingEnabled = false;

        t._generateImage();

		/*
		//fill with people
		for(let i =0; i < 32; i++) {
			let person = new Person({
				x: 30 + 37 * (i % 8),
				y: 30 + (37 * Math.floor(i / 8))
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
		*/
	}

	_generateImage() {
		let t = this;
        t._ctx.clearRect(0, 0, t.width, t.height);
        t._ctx.fillStyle = '#aaa';
        t._ctx.fillRect(0, 0, t.width, t.height);

        t._ctx.fillStyle = '#a50';
        t._ctx.lineWidth = 6;
        t._ctx.strokeStyle = '#d84';
        t._ctx.rect(2, 20, t.width - 6, t.height - 40);
        t._ctx.fill();
        t._ctx.filter = "drop-shadow(2px 2px 2px #0004)";
        t._ctx.stroke();

        let imgData = t._ctx.getImageData(0, 0, t.width, t.height),
  			data = imgData.data;
  		
  		for(let i = 0; i < data.length; i += 4) {
		    let grain = Math.floor(Math.random() * 8) - 4;
		    data[i] += grain; // red
		    data[i + 1] += grain; // green
		    data[i + 2] += grain; // blue
		    //data[i + 3];//alpha
  		}
  		t._ctx.putImageData(imgData, 0, 0);
	}

	draw() {
		let t = this;

		if(!t._beforeDraw())
            return;

		t.game.ctx.drawImage(t._img, t.x, t.y, t.width, t.height);

		for(let item of t.items) {
            item.draw();
        }
	}
}