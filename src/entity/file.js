import {Group} from './group';

export class File extends Group {
	constructor() {
		super({x: 160, y: 123, width: 300, height: 234 });
        let t = this;
		t._image = document.createElement('canvas');
		t._image.width = t.width;
		t._image.height = t.height;
        t._ctx = t._image.getContext('2d');
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

        let imageData = t._ctx.getImageData(0, 0, t.width, t.height);
  		let data = imageData.data;
  		
  		for(let i = 0; i < data.length; i += 4) {
		    let grain = Math.floor(Math.random() * 8) - 4;
		    data[i] += grain; // red
		    data[i + 1] += grain; // green
		    data[i + 2] += grain; // blue
		    //data[i + 3];//alpha
  		}
  		t._ctx.putImageData(imageData, 0, 0);
	}

	draw() {
		let t = this;

		if(!t._beforeDraw())
            return;

		t.game.ctx.drawImage(t._image, t.x - t.width * t.origin[0], t.y - t.height * t.origin[1], t.width, t.height);

		t._afterDraw();

		for(let item of t.items) {
            t._beforeDraw()
            item.draw();
            t._afterDraw();
        }
	}
}