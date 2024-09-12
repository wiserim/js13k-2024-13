/**
 * @function
 * @name createCanvas
 * 
 * Generate a random grain on canvas
 * 
 * @param {object} ctx - Canvas 2D context
 */
export function createCanvas(width, height) {
	let c = document.createElement('canvas'),
		ctx = c.getContext('2d');
	c.width = width;
	c.height = height;
    ctx.translate(0.5, 0.5);
	ctx.lineWidth = 1;
    ctx.imageSmoothingEnabled = false;

    return {canvas: c, ctx: ctx};
}