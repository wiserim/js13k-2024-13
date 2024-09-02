import {Entity} from './entity';
import {letters} from '../letters';

export class Text extends Entity {
    _text = [''];

	constructor(args) {
		super(args);
        let t = this;
        t.color = args.color ?? '#000';
        t.size = args.size ?? 1;
        t.lineMargin = args.lineMargin ?? 2;
        t.padding = args.padding ?? [0, 0];
        t.text = args.text ?? '';
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

        //calculate text dimensions
        for(let i in t._text) {
            let line = [],
                length = 0;

            for(let j in t._text[i]) {
            	//if letter found
                let letter = letters[t._text[i].charAt(j)];
                if(letter) {
                    line.push(letter);
                    length += letter[0].length;
                }
            }
            
            length += line.length - 1;
            maxLength = Math.max(maxLength, length);
            t._text[i] = line;
        }

        t.width = maxLength * t.size + t.padding[0] * 2;
        t.height = (t._text.length * (6 + t.lineMargin) - 1 * t.size) * t.size - t.lineMargin + t.padding[1] * 2;
	}

	get text() {
		return this._text;
	}

    draw() {
        let t = this,
            needed = [],
            pX = t.x - t.width * t.origin[0],
            pY = t.y - t.height * t.origin[1];
        
        if(!t._beforeDraw())
            return;
        
        if(t.background) {
            t.game.ctx.fillStyle = t.background;
            //t.game.ctx.fillRect(pX, pY, t.width, t.height);
            t.game.ctx.fillRect(t.x - t.width * t.origin[0], t.y - t.height * t.origin[1], t.width, t.height);
        }

        t.game.ctx.fillStyle = t.color;        

        for(let i in t._text) {
            let curX = t.padding[0];

            for(let j in t._text[i]) {
                let letter = t._text[i][j],
                    curY = t.padding[1],
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

        //t.game.ctx.restore();
        t._afterDraw();
    }
}