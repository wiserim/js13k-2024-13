import {Entity} from './entity';

/*
 *  Logo class
 *  @class
 *  @extends Entity
 */
export class Logo extends Entity {
	/*
	 * Logo constructor
	 * @constructor
	 * 
	 * @param {number} x X coordinate
	 * @param {number} y Y coordinate
	 * @param {number} width
	 * @param {number} height
	*/
	constructor(args) {
		super(args);
        let t = this,
        	path = '';

        for(let i = 0; i<2; i++) {
        	for(let j = 0; j<4; j++) {
		  		path += ` M ${t.x + 30 * i + 5 * j} ${t.y} q -4 12 -3 24`;
		  	}

		  	path += ` M ${t.x + 30 * i - 5} ${t.y + 10} q 15 -6 22 -3`;
		}

		for(let i = 0; i<3; i++) {
	  		path += ` M ${t.x + 60 + 5 * i} ${t.y} q -4 12 -3 24`;
	  	}

	  	t.path = new Path2D(path);
    }

    /**
     * Draw logo
     */
	draw() {
		let t = this;
		if(!t._beforeDraw())
            return;

		t.game.ctx.beginPath();
		t.game.ctx.lineWidth = 3;
		t.game.ctx.lineCap = 'round';
		t.game.ctx.strokeStyle = '#000';

		t.game.ctx.stroke(t.path);

		t.alpha = 1;
	}
}