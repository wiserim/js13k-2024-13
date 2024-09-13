import {TransformMatrix} from '../utils/transform-matrix';
/*
 *	Entity class
 *	@class
 */
export class Entity {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    scale = {x: 1, y: 1};
    origin = {x: .5, y: .5};
    angle = 0;
    matrix = new TransformMatrix();
    background = 0;
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
	 * @param {number} [x] X coordinate
	 * @param {number} [y] Y coordinate
	 * @param {number} [width]
	 * @param {number} [height]
     * @param {Object} [scale] Scale
     * @param {Object} [origin] Object's origin point in relation to it's coordinates
     * @param {number} [angle] Object's angle
     * @param {string} [background] Object's background color
     * @param {number} [alpha] Object's alpha (opacity)
     * @param {boolean} [active] Determines if object is active
     * @param {boolean} [interactive] Determines if object is interactive
     * 
	*/
	constructor(args = {}) {
        let t = this;
        Object.assign(t, args);
        t.updateTransform();
    }

    /**
     * Update transformation according to parent
     */
    updateTransform() {
        let t = this;
        t.matrix.reset();

        if(t.parent) {
            t.matrix.multiply(t.parent.matrix.m);
            t.matrix.translate(t.parent.x, t.parent.y);
        }

        t.matrix
            .rotate(t.angle)
            .translate(-t.width * t.origin.x, -t.height * t.origin.y)
            .scale(t.scale.x, t.scale.y);
    }

    /**
     * Update entity
     */
    update() {
        let t = this,
            m = game.mouse;
            
        if(!t.active)
            return;

        t.updateTransform();

        if((!t.parent || t.parent.interactive) && t.interactive && t.contain(m.x, m.y)) {
            t.emit('hover');

            if(m.down) {
                t.emit('click');
            }
        }
    }

    /**
     * Perform operations before draw
     * 
     * @private
     */
    _beforeDraw() {
        let t = this;

        if(!t.active || !t.alpha)
            return 0;

        t.game.ctx.setTransform(...t.matrix.m);
        t.game.ctx.globalAlpha = t.alpha;

        return 1;
    }

    /**
     * Draw entity
     */
    draw() {
        let t = this;
        
        if(!t._beforeDraw())
            return;

        if(t.background) {
            t.game.ctx.fillStyle = t.background;
            t.game.ctx.fillRect(t.x, t.y, t.width, t.height);
        }
    }

    /**
     * Checks if point is within entity.
     *
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * 
     * @return {boolean}
     */
    contain(x, y) {
        let t = this,
            p = t.matrix.reverseTransform(x, y);
        return(p.x > t.x && p.x < t.x + t.width && p.y > t.y && p.y < t.y + t.height);
    }

    /**
     * Adds event listener
     *
     * @param {string} event Event name
     * @param {function} callback Callback function
     * 
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
     * 
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