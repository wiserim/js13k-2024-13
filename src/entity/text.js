import {Entity} from './entity';
import {letters} from '../letters';

export class Text extends Entity {
	constructor(args) {
		super(args.x, args.y);
        let t = this;
        t.color = args.color ?? '#000';
        t.background = args.background ?? 0;
        t.size = args.size || 1;
        t.padding = args.padding || [0, 0];
        t._text = [''];
        t.text = args.text ?? '';
	}

	set text(text) {
		let t = this,
			maxLength = 0;

		if(!Array.isArray(text)) {
            t._text = [text.toUpperCase()]
        }
        else {
            for(let i in text) {
                text[i] = text[i].toUpperCase();
            }
            t._text = text;
        }

        //calculate text dimensions
        for(let i in text) {
            let line = [],
                length = 0;

            for(let j in text[i]) {
            	//if letter found
                let letter = letters[text[i].charAt(j)];
                if(letter) {
                    line.push(letter);
                    length += letter[0].length;
                }
            }
            
            length += line.length - 1
            maxLength = Math.max(maxLength, length)
            t._text[i] = line;
        }

        t.width = maxLength * t.size + t.padding[0] * 2;
        t.height = (text.length * 6 - 1) * t.size + t.padding[1] * 2;
	}

	get text() {
		return this._text;
	}
}