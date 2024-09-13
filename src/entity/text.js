import {Entity} from './entity';

/*
 *  Text class
 *  @class
 *  @extends entity
 */
export class Text extends Entity {
    color = '#000';
    size = 1;
    lineMargin = 2;
    padding = {x: 0, y: 0};
    _text = [''];

    /*
     * Text constructor
     * @constructor
     * 
     * @param {number} [x] X coordinate
     * @param {number} [y] Y coordinate
     * @param {number} [width]
     * @param {number} [height]
     * @param {Object} [scale] Scale
     * @param {Object} [origin] Object's origin point in relation to it's coordinates
     * @param {number} [angle] Object's angle
     * @param {string} [background] Object's background color
     * @param {number} [alpha] Object's alpha (opacity)
     * @param {boolean} [active] Determines if object is active
     * @param {boolean} [interactive] Determines if object is interactive
     * @param {string} [color] Text color
     * @param {Array|string} [text] Object's text. If passed as array, each row is treated as new line of text
     * @param {Number} [size] Text size (multiply text size by 5)
     * @param {Object} [padding] Text padding from edge. Visible when background color is set
     * 
    */
    constructor(args) {
        super(args);

        Object.assign(this, args);
    }
    
	set text(text) {
		let t = this,
			maxLength = 0;

		if(!Array.isArray(text)) {
            t._text = [text.toUpperCase()];
        }
        else {
            t._text = Array.from(text);
            for(let i in t._text) {
                t._text[i] = t._text[i].toUpperCase();
            }
        }

        if(!t.padding) {
            t.padding = {x: 0, y: 0};
        }

        //calculate text dimensions
        for(let i in t._text) {
            let line = [],
                length = 0;

            for(let j in t._text[i]) {
            	//if letter found
                let letter = game.letters[t._text[i].charAt(j)];
                if(letter) {
                    line.push(letter);
                    length += letter[0].length;
                }
            }
            
            length += line.length - 1;
            maxLength = Math.max(maxLength, length);
            t._text[i] = line;
        }

        t.width = maxLength * t.size + t.padding.x * 2;
        t.height = (t._text.length * (6 * t.size + t.lineMargin) - t.size) - t.lineMargin + t.padding.y * 2;
	}

	get text() {
		return this._text;
	}

    /**
     * Draw text
     */
    draw() {
        let t = this,
            needed = [],
            pX = t.x,
            pY = t.y;
        
        if(!t._beforeDraw())
            return;
        
        if(t.background) {
            t.game.ctx.fillStyle = t.background;
            t.game.ctx.fillRect(t.x, t.y, t.width, t.height);
        }

        t.game.ctx.fillStyle = t.color;

        for(let i in t._text) {
            let curX = t.padding.x;

            for(let j in t._text[i]) {
                let letter = t._text[i][j],
                    curY = t.padding.y,
                    addX = 0;

                for (let y in letter) {
                    let row = letter[y];
                    for (let x in row) {
                        if (row[x]) {
                            t.game.ctx.fillRect(pX + curX + x * t.size, pY + curY, t.size, t.size);
                        }
                    }
                    curY += t.size;
                }
                curX += (letter[0].length + 1) * t.size;
            }

            pY += t.size * 6 + t.lineMargin;
        }
    }
}