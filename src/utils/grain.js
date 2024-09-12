/**
 * @function
 * @name grain
 * 
 * Generate a random grain on canvas
 * 
 * @param {object} ctx - Canvas 2D context
 */
export function grain(ctx) {
	let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),
		data = imgData.data;
	
	for(let i = 0; i < data.length; i += 4) {
	    let grain = Math.floor(Math.random() * 8) - 4;
	    data[i] += grain; // red
	    data[i + 1] += grain; // green
	    data[i + 2] += grain; // blue
	    //data[i + 3];//alpha
	}
	ctx.putImageData(imgData, 0, 0);
}