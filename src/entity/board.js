import {Group} from './group';
import {Person} from './person';
import {Text} from './text';
import {grain} from '../utils/grain';
import {nextTurn} from '../action/next-turn';

export class Board extends Group {
	constructor() {
		super({x: 160, y: 120, width: 320, height: 240 });
		let t = this,
			nextTurnBtn = new Text({
				x: 160,
				y: 235,
				origin: {x: .5, y: 1},
				padding: { x: 3, y: 3 },
				text: 'End day',
				color: '#fff',
				background: '#000'
			});
		
		t._img = document.createElement('canvas');
		t._img.width = t.width;
		t._img.height = t.height;
        t._ctx = t._img.getContext('2d');
        t._ctx.translate(0.5, 0.5);
		t._ctx.lineWidth = 1;
        t._ctx.imageSmoothingEnabled = false;

        t._generateImage();

        nextTurnBtn.on('hover', () => t.game.cursor('pointer'));
        nextTurnBtn.on('click', () => nextTurn());
        
        t.add(nextTurnBtn);
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

        grain(t._ctx);
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