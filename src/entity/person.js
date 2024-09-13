import {Entity} from './entity';
import {createCanvas} from '../utils/create-canvas';
import {rand} from '../utils/rand';
import {personData} from '../person-data';
import {grain} from '../utils/grain';

/*
 *	Person class
 *	@class
 *	@extends Entity
 */
export class Person extends Entity {
	name = '';
	info = [];
	bio = [];
	portraitData = [];
	clues = [];
	arrested = 0;
	protected = 0;
	alive = 1;

	/*
	 * Person constructor
	 * @constructor
	 * 
	 * @param {number} [x] X coordinate
	 * @param {number} [y] Y coordinate
     * @param {Object} [scale] Scale
     * @param {Object} [origin] Object's origin point in relation to it's coordinates
     * @param {number} [angle] Object's angle
     * @param {string} [background] Object's background color
     * @param {number} [alpha] Object's alpha (opacity)
     * @param {boolean} [active] Determines if object is active
     * @param {boolean} [interactive] Determines if object is interactive
	 * @param {string} name Person's name
	 * @param {string} info Person's information displayed in lower section of PersonalFile class
	 * @param {string} bio Person's information displayed next to portrait by PersonalFile class
	 * @param {Array} portraitData Person's portrait data as keys to parameters in personData object
	 * @param {Array} clues Clues about person
	 * @param {boolean} arrested Determines if person is arrested
	 * @param {boolean} protected Determines if person is protected
	 * @param {boolean} alive Determines if person is alive
	 * 
	*/
	constructor(args) {
		super(args);
        let t = this,
        	c = createCanvas(72, 72);
        t.width = 36;
        t.height = 36;
        t.image = c.canvas;
        t._ctx = c.ctx;

        Object.assign(t, args);

        //events
        t.on('hover', () => {
        	t.alpha = .8;
        	t.game.cursor('pointer');
        });
    }

    /**
     * Draw person
     */
	draw() {
		let t = this;
		if(!t._beforeDraw())
            return;

		t.game.ctx.drawImage(t.image, t.x, t.y, t.width, t.height);
		
		//if not alive cross portrait
		if(!t.alive) {
			t.game.ctx.beginPath();
			t.game.ctx.lineWidth = 3;
			t.game.ctx.lineCap = 'round';
			t.game.ctx.strokeStyle = '#c44';
			t.game.ctx.stroke(new Path2D(`
				M ${t.x + 3} ${t.y + 3} Q ${t.x + 18} ${t.y + 12} ${t.x + 33} ${t.y + 33}
				M ${t.x + 3} ${t.y + 33} Q ${t.x + 12} ${t.y + 18} ${t.x + 33} ${t.y + 3}
			`));
		}

		t.alpha = 1;
	}

	/**
     * Generate image
     */
	generateImage() {
		let t = this,
			pd = t.portraitData,
			p = personData;

        t._ctx.clearRect(0, 0, 72, 72);
        t._ctx.fillStyle = '#fff';
        t._ctx.fillRect(0,0,72,72);
        
		//draw silhuette
        t._ctx.fillStyle = '#a8a8b8';
        t._ctx.fill(new Path2D(p.silhuette));

        if(!pd.length) {
        	return;
        }

        //draw eyes
        t._ctx.fillStyle = '#fff';
        let eyesCoords = [
        	[26, 32, 5, 3],
			[25, 33, 1, 1],
			[31, 33, 1, 1],

			[42, 32, 5, 3],
			[41, 33, 1, 1],
			[47, 33, 1, 1]
        ],
        irisCoords = [
        	[28, 32, 2, 1],
        	[27, 33, 3, 2],
        	[44, 32, 2, 1],
        	[43, 33, 3, 2]
        ];
        for(let i in eyesCoords) {
        	t._ctx.fillRect(...eyesCoords[i]);
        }
        t._ctx.fillStyle = p.eyes[pd[1]][0];

        for(let i in irisCoords) {
        	t._ctx.fillRect(...irisCoords[i]);
        }

        //hair
        t._ctx.fillStyle = p.hairColor[pd[3]][0];
        t._ctx.fill(new Path2D(p.hair[pd[0]][pd[2]][0]));

        //draw nose
        t._ctx.strokeStyle = '#0006';
        t._ctx.stroke(new Path2D(p.nose[pd[4]][0]));
        //draw lips
        t._ctx.fillStyle = '#0006';
        t._ctx.fill(new Path2D(p.lips[0][0]));
        
        //draw clothes
        t._ctx.fillStyle = p.clothesColor[pd[6]][0];
        t._ctx.strokeStyle = pd[6] ? '#000' : '#fff6';
        t._ctx.fill(new Path2D(p.clothes[pd[5]][0]));
        t._ctx.stroke(new Path2D(p.clothes[pd[5]][1]));
        grain(t._ctx);
	}

	/**
     * Generate person's data
     */
	generate() {
		let t = this,
		p = personData,
		pd = [];

		//sex (0 - male, 1 - female)
		pd.push(rand(0, 1));
		//name
		t.name = `${p.firstName[pd[0]][rand(0, p.firstName[pd[0]].length - 1)]} ${p.lastName[rand(0, p.lastName.length - 1)]}`;
		//eye color
		pd.push(rand(0, p.eyes.length - 1));
		//hair
		pd.push(rand(0, p.hair[pd[0]].length - 1));
		//hair color
		pd.push(rand(0, p.hairColor.length - 1));
		//nose
		pd.push(rand(0, p.nose.length - 1));
		//clothes
		pd.push(rand(0, p.clothes.length - 1));
		//clothes color
		pd.push(rand(0, p.clothesColor.length - 1));

		t.portraitData = pd;
	}
	
}