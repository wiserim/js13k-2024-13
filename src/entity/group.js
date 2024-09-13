import {Entity} from './entity';

/*
 *  Group class
 *  @class
 *  @extends Entity
 */
export class Group extends Entity {
    /*
     * Group constructor
     * @constructor
     * 
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @param {number} width
     * @param {number} height
     * @param {Array} [items] Items to add to group
    */
	constructor(args) {
        super(args);
        let t = this;
        t.items = args.items ?? [];
    }

    /**
     * Add item to group
     *
     * @param {Object} item Item to add
     */
    add(item) {
        let t = this;
        if(!t.has(item)) {
            t.items.push(item);
            item.parent = t;
        }
    }

    /**
     * Removes item from group
     *
     * @param {Object} item Item to remove
     */
    remove(item) {
        let t = this,
        index = t.items.indexOf(item)

        if(index !== -1) {
            t.items.splice(index,1);
            item.parent = 0;
        }
    }

    /**
     * Checks if group has item
     *
     * @param {Object} item Item to check
     * 
     * @return {boolean}
     */
    has(item) {
        return this.items.includes(item);
    }

    /**
     * Returns all items from the group
     * 
     * @return {Array}
     */
    getAll() {
        return this.items;
    }

    /**
     * Update group and it's items
     */
    update() {
        let t = this;

        if(!t.active)
            return;

        super.update();

        for(let item of t.items) {
            item.update();
        }
    }

    /**
     * Draw group and it's items
     */
    draw() {
        let t = this;

        if(!t._beforeDraw())
            return;

        t.game.ctx.beginPath();
        t.game.ctx.globalAlpha = t.alpha;
        t.game.ctx.fillStyle = t.background;
        t.game.ctx.fillRect(t.x, t.y, t.width, t.height);

        for(let item of t.items) {
            item.draw();
        }
    }
}