import {Group} from './group';
import {grain} from '../utils/grain';
import {createCanvas} from '../utils/create-canvas';

/*
 *	File class
 *	@class
 *	@extends Group
 */
export class File extends Group {
	/*
	 * File constructor
	 * @constructor
	*/
	constructor() {
		super({x: 160, y: 123, width: 300, height: 234 });
        let t = this,
        c = createCanvas(t.width, t.height);
		t._img = c.canvas;
        t._ctx = c.ctx;

        t._generateImage();
	}

	/**
     * Generate image
	 * 
	 * @private
     */
	_generateImage() {
		let t = this;
        t._ctx.clearRect(0, 0, t.width, t.height);

        let folder = new Path2D("M0 234 L 0 10 10 0 90 0 100 10 298 10 300 12 300 234 Z");
        t._ctx.fillStyle = '#dd8';
        t._ctx.fill(folder);

        t._ctx.filter = "drop-shadow(0px 0px 2px #0004)";

        let paper = new Path2D("M15 250 L 15 14 295 14 295 250 Z");
        t._ctx.fillStyle = '#f0f0f0';
        t._ctx.rotate((2 * Math.PI) / 180);
        t._ctx.fill(paper);
        t._ctx.setTransform(1, 0, 0, 1, 0, 0);

        paper = new Path2D("M10 234 L 10 20 20 15 290 15 290 234 Z");
        t._ctx.fill(paper);

        grain(t._ctx);
	}

	/**
     * Draw file and it's children
     */
	draw() {
		let t = this;

		if(!t._beforeDraw())
            return;

		t.game.ctx.drawImage(t._img, t.x, t.y, t.width, t.height);

		for(let item of t.items) {
            item.draw();
        }
	}

	/**
     * Show file and set as active
     */
	show() {
		this.active = 1;
		this.emit('show');
	}

	/**
     * Hide file and set as inactive
     */
	hide() {
		this.emit('hide');
		this.active = 0;
	}
}