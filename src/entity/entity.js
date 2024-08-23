/*
 *	Entity class
 *	@class
 */
export class Entity {
    scale = [1,1]
    angle = 0
    alpha = 1
    active = 1
    events = []
    game = window.game
	/*
	 * Entity constructor
	 * @constructor
	 * 
	 * @param {number} x X coordinate
	 * @param {number} y Y coordinate
	 * @param {number} width
	 * @param {number} height
	*/
	constructor(args) {
        let t = this;
        t.x = args.x ?? 0;
        t.y = args.y ?? 0;
        t.width = args.width ?? 0;
        t.height = args.height ?? 0;
        t.background = args.background ?? 0;
    }

     _drawTransform() {
        let t = this,
            matrix = [1,0,0,1,0,0],
            rad = t.angle * Math.PI / 180,
            x = t.x - t.width / 2,
            y = t.y - t.height / 2;

        //translate
        matrix[4] += matrix[0] * x + matrix[2] * y;
        matrix[5] += matrix[1] * x + matrix[3] * y;
        //scale
        matrix[0] *= t.scale[0];
        matrix[1] *= t.scale[0];
        matrix[2] *= t.scale[1];
        matrix[3] *= t.scale[1];
        //rotate
        let cos = Math.cos(rad),
        sin = Math.sin(rad),
        m11 = matrix[0] * cos + matrix[2] * sin,
        m12 = matrix[1] * cos + matrix[3] * sin,
        m21 = -matrix[0] * sin + matrix[2] * cos,
        m22 = -matrix[1] * sin + matrix[3] * cos

        matrix[0] = m11;
        matrix[1] = m12;
        matrix[2] = m21;
        matrix[3] = m22;

        t.game.ctx.transform(matrix[0],matrix[1],matrix[2],matrix[3],matrix[4],matrix[5]);
    }

    draw() {
        let t = this;
        if(!t.active || !t.alpha || t.background == '')
            return;

        t.game.ctx.save();

        t._drawTransform();

        t.game.ctx.beginPath();
        t.game.ctx.globalAlpha = t.alpha;
        t.game.ctx.fillStyle = t.background;
        t.game.ctx.rect(-t.width/2,  -t.height/2, t.width, t.height);
        t.game.ctx.fill();
        t.game.ctx.restore();
    }

    /**
     * Checks if point is within entity.
     *
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @return {boolean}
     */
    contain(x, y) {
        let t = this;
        return (t.x <= x &&
            (t.x + t.width) >= x &&
            t.y <= y &&
            (t.y  + t.height) >= y);
    }

    /**
     * Adds event listener
     *
     * @param {string} event Event name
     * @param {function} callback Callback function
     * @param {object} [ctx=this]  The context used to call callback function
     * @return {this}
     */
    on(event, callback, ctx = this) {
    	this.events[event].push([
    		callback,
    		ctx
    	]);

        return this;
    }

    /**
     * Emit event and call listeners
     *
     * @param {string} event Event name
     * @param {Object[]} args Array of arguments passed to listener
     * @return {this}
     */
    emit(event, args) {
        let t = this;
        if(!t.active || !t.events[event])
            return;

        for(let listener of t.events[event]) {
            listener[0].call(listener[1], ...args);
        }

        return this;
    }
}

export default Entity;