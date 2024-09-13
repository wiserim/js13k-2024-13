/**
 * @function
 * @name createCanvas
 * 
 * Creates canvas element and it's 2d context
 * 
 * @return {Object} Pair {canvas, ctx}
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