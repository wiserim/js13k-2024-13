import {Group} from './group';

export class File extends Group {
	constructor() {
		super({x: 160, y: 123, width: 300, height: 234 });
        let t = this;
		t._img = document.createElement('canvas');
		t._img.width = t.width;
		t._img.height = t.height;
        t._ctx = t._img.getContext('2d');
        t._ctx.imageSmoothingEnabled = false;

        t._generateImage();
	}

	_generateImage() {
		let t = this;
        t._ctx.clearRect(0, 0, t.width, t.height);

        let folder = new Path2D("M0 234 L 0 10 L 10 0 L 90 0 L 100 10 L 298 10 L 300 12 L 300 234 Z");
        t._ctx.fillStyle = '#dd8';
        t._ctx.fill(folder);

        t._ctx.filter = "drop-shadow(0px 0px 2px #0004)";

        let paper = new Path2D("M15 250 L 15 14 L 295 14 L 295 250 Z");
        t._ctx.fillStyle = '#f0f0f0';
        t._ctx.rotate((2 * Math.PI) / 180);
        t._ctx.fill(paper);
        t._ctx.setTransform(1, 0, 0, 1, 0, 0);

        paper = new Path2D("M10 234 L 10 20 L 20 15 L 290 15 L 290 234 Z");
        t._ctx.fill(paper);

        let imgData = t._ctx.getImageData(0, 0, t.width, t.height),
  			data = imgData.data;
  		
  		for(let i = 0; i < data.length; i += 4) {
		    let grain = Math.floor(Math.random() * 8) - 4;
		    data[i] += grain; // red
		    data[i + 1] += grain; // green
		    data[i + 2] += grain; // blue
		    //data[i + 3];//alpha
  		}
  		t._ctx.putImageData(imgData, 0, 0);
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

	show() {
		this.active = 1;
		this.emit('show');
	}

	hide() {
		this.emit('hide');
		this.active = 0;
	}
}