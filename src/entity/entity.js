/*
 *	Entity class
 *	@class
 */
export class Entity {
    scale = [1,1];
    origin = [.5,.5];
    angle = 0;
    alpha = 1;
    active = 1;
    interactive = 1;
    parent = 0;
    events = [];
    game = window.game;
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
            x = t.x + t.width * t.origin[0],
            y = t.y + t.height * t.origin[1];

        //translate
        matrix[4] += matrix[0] * x + matrix[2] * y;
        matrix[5] += matrix[1] * x + matrix[3] * y;
        //scale
        matrix[0] *= t.scale.x;
        matrix[1] *= t.scale.x;
        matrix[2] *= t.scale.y;
        matrix[3] *= t.scale.y;
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
        t.game.ctx.globalAlpha = t.alpha;

        /*
        let t = this,
            r = t.angle * Math.PI / 180,
            x = -t.width * t.origin[0],
            y = -t.height * t.origin[1],
            scale = 1,
            xx=Math.cos(r)*scale,
            xy=Math.sin(r)*scale;

        t.game.ctx.setTransform(xx,xy,-xy,xx,x,y);
        t.game.ctx.globalAlpha = t.alpha;
        */
    }

    update() {
        let t = this,
            m =game.mouse;
            
        if(!t.active)
            return;

        if(t.interactive && t.contain(m.x, m.y)) {
            t.emit('hover');

            if(m.down) {
                t.emit('click');
            }
        }

    }

    _beforeDraw() {
        let t = this;

        if(!t.active || !t.alpha)
            return 0;

        if(!t.parent)
            t.game.ctx.save();

        t._drawTransform();

        return 1;
    }

    _afterDraw() {
        if(this.parent) 
            return;
            this.game.ctx.restore();

        this.game.ctx.strokeStyle = '#f00';
        this.game.ctx.strokeRect(this.x - this.width * this.origin[0], this.y - this.height * this.origin[1], this.width, this.height);
    }

    draw() {
        let t = this;
        
        if(!t._beforeDraw())
            return;

        t.game.ctx.beginPath();
        t.game.ctx.fillStyle = t.background ?? '#00000000';
        t.game.ctx.fillRect(-t.width * t.origin[0], -t.height * t.origin[1], t.width, t.height);
        
        t._afterDraw();
    }

    /**
     * Checks if point is within entity.
     *
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @return {boolean}
     */
    contain(x, y) {
        let t = this,
        px = 0,
        py = 0;

        if(t.parent) {
            px =  t.parent.x - t.parent.width * t.parent.origin[0],
            py =  t.parent.y - t.parent.height * t.parent.origin[1];
        }
        
        return (t.x + px <= x &&
            (t.x + px + t.width) >= x &&
            t.y + py <= y &&
            (t.y + py + t.height) >= y);
        /*
        
        return (t.x - t.width * t.origin[0] + px <= x &&
            (t.x - t.width * t.origin[0] + px + t.width) >= x &&
            t.y - t.height * t.origin[1] + py <= y &&
            (t.y - t.height * t.origin[1] + py + t.height) >= y);
        */
    }

    /**
     * Adds event listener
     *
     * @param {string} event Event name
     * @param {function} callback Callback function
     * @param {object} [ctx=this]  The context used to call callback function
     * @return {this}
     */
    on(event, callback) {
        let t = this;
        t.events[event] = t.events[event] || [];
    	t.events[event].push([
    		callback
    	]);

        return t;
    }

    /**
     * Emit event and call listeners
     *
     * @param {string} event Event name
     * @param {Object[]} args Array of arguments passed to listener
     * @return {this}
     */
    emit(event, args = []) {
        let t = this;
        if(!t.active || !t.events[event])
            return;

        for(let listener of t.events[event]) {
            listener[0].call(listener[1], ...args);
        }

        return t;
    }
}

export default Entity;