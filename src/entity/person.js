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

        //events
        t.on('hover', () => {
        	t.alpha = .6;
        });

        t.on('click', () => {
        	console.log('click')
        });
	}

	generatePortrait() {
		let t = this;
		/*
        t._portraitSmallCtx.clearRect(0, 0, 32,32);
        t._portraitSmallCtx.fillStyle = '#fff';
        t._portraitSmallCtx.fillRect(0,0,32,32);
        let p = new Path2D("M0 32 L 10 27 L 5 22 L 5 17 L 10 12 L 22 12 L 27 17 L 27 22 L 22 27 L 32 32 Z");
        t._portraitSmallCtx.fillStyle = '#666';
        t._portraitSmallCtx.fill(p);
        */
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

		t._afterDraw();
	}

	update() {
		let t = this,
			m = t.game.mouse;
			/*
		console.log('update person', t.x <= m.x &&
            t.x + t.width >= m.x &&
            t.y <= m.y &&
            t.y + t.height >= m.y, t.x, t.y)
            */
		super.update()
	}
}