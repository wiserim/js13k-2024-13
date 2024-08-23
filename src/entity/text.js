import {Entity} from './entity';
import {letters} from '../letters';

export class Text extends Entity {
    _text = ['']

	constructor(args) {
		super(args);
        let t = this;
        t.color = args.color ?? '#000';
        t.size = args.size ?? 1;
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
            for(let i in text) {
                text[i] = text[i].toUpperCase();
            }
            t._text = text;
        }

        console.log(t._text)
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

            console.log(length, maxLength)
        }

        t.width = maxLength * t.size + t.padding[0] * 2;
        t.height = (t._text.length * 6 - 1) * t.size + t.padding[1] * 2;
	}

	get text() {
		return this._text;
	}

    draw() {
        let t = this,
            needed = [],
            pX = -t.width/2,
            pY = -t.height/2;

        if(!t.active || !t.alpha)
            return;

        t.game.ctx.save();

        t._drawTransform();

        t.game.ctx.globalAlpha = t.alpha;
        
        if(t.background) {
            t.game.ctx.fillStyle = t.background;
            t.game.ctx.fillRect(pX, pY, t.width, t.height);
        }

        t.game.ctx.fillStyle = t.color;        

        for(let i in t._text) {
            let curX = t.padding[0];

            for(let j in t._text[i]) {
                let letter = t._text[i][j],
                    curY = t.padding[1],
                    addX = 0;

                console.log(letter)

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

            pY += t.size * 6;
        }

        t.game.ctx.restore();
    }
}