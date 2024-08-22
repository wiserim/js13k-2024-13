/*
 *	Entity class
 *	@class
 */
export class Entity {
	/*
	 * Entity constructor
	 * @constructor
	 * 
	 * @param {number} x X coordinate
	 * @param {number} y Y coordinate
	 * @param {number} width
	 * @param {number} height
	*/
	constructor(x = 0, y = 0, width = 0, height = 0) {
        let t = this;
        t.x = x;
        t.y = y;
        t.width = width;
        t.height = height;
        t.active = 1;
        t.events = [];
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