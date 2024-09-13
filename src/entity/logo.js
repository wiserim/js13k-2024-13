import {Entity} from './entity';

export class Logo extends Entity {
	constructor(args) {
		super(args);
        let t = this,
        	path = '';
        t.path = '';

        for(let i = 0; i<2; i++) {
        	for(let j = 0; j<4; j++) {
		  		t.path += ` M ${t.x + 30 * i + 5 * j} ${t.y} q -4 12 -3 24`;
		  	}

		  	t.path += ` M ${t.x + 30 * i - 5} ${t.y + 10} q 15 -6 22 -3`;
		}

		for(let i = 0; i<3; i++) {
	  		t.path += ` M ${t.x + 60 + 5 * i} ${t.y} q -4 12 -3 24`;
	  	}
        /*
        t.width = 36;
        t.height = 36;
        let c = createCanvas(72, 72);
        t.image = c.canvas;
        t._ctx = c.ctx;
        t._ctx.translate(0.5, 0.5);
		t._ctx.lineWidth = 1;
        t._ctx.imageSmoothingEnabled = false;

        Object.assign(t, args);

        //events
        t.on('hover', () => {
        	t.alpha = .8;
        	t.game.cursor('pointer');
        });
        */
    }

	draw() {
		let t = this;
		if(!t._beforeDraw())
            return;

		t.game.ctx.beginPath();
		t.game.ctx.lineWidth = 3;
		t.game.ctx.lineCap = 'round';
		t.game.ctx.strokeStyle = '#000';

		t.game.ctx.stroke(new Path2D(t.path));

		t.alpha = 1;
	}
}