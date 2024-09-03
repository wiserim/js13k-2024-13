import {Entity} from './entity';

export class Person extends Entity {
	name = '';
	info = [];
	bio = [];
	portraitHash;
	alive = 1;

	constructor(args) {
		super(args);
        let t = this;
        t.width = 32;
        t.height = 32;
		t.portrait = document.createElement('canvas');
		t.portrait.width = 128;
		t.portrait.height = 128;
        t._ctx = t.portrait.getContext('2d');
        t._ctx.translate(0.5, 0.5);
		t._ctx.lineWidth = 1;
        t._ctx.imageSmoothingEnabled = false;

        Object.assign(t, args);

        //events
        t.on('hover', () => {
        	t.alpha = .8;
        	t.game.cursor('pointer');
        });

        t.on('click', () => {
        	console.log('click')
        });
	}

	generatePortrait() {
		let t = this;
        t._ctx.clearRect(0, 0, 128, 128);
        t._ctx.fillStyle = '#fff';
        t._ctx.fillRect(0,0,128,128);
        let p = new Path2D("M0 128 L 40 108 L 20 88 L 20 58 L 40 38 L 88 38 L 108 58 L 108 88 L 88 108 L 128 128 Z");
        t._ctx.fillStyle = '#666';
        t._ctx.fill(p);
	}

	draw() {
		let t = this;

		if(!t._beforeDraw())
            return;

		t.game.ctx.drawImage(t.portrait, t.x, t.y, t.width, t.height);

		t.alpha = 1;
	}
}