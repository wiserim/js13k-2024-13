import {Entity} from './entity';

export class Group extends Entity {
	constructor(args) {
        super(args);
        let t = this;
        t.items = args.items ?? [];
    }

    add(item) {
        let t = this;
        if(!t.has(item)) {
            t.items.push(item);
            item.parent = t;
        }
    }

    remove(item) {
        let t = this,
        index = t.items.indexOf(item)

        if(index !== -1) {
            t.items.splice(index,1);
            item.parent = 0;
        }
    }

    has(item) {
        return this.items.includes(item)
    }

    getAll() {
        return this.items
    }

    update() {
        let t = this;

        if(!t.active)
            return;

        super.update();

        for(let item of t.items) {
            item.update();
        }
    }

    draw() {
        let t = this;

        if(!t._beforeDraw())
            return;

        t.game.ctx.beginPath();
        t.game.ctx.globalAlpha = t.alpha;
        t.game.ctx.fillStyle = t.background;
        t.game.ctx.fillRect(t.x - t.width * t.origin[0], t.y - t.height * t.origin[1], t.width, t.height);

        t._afterDraw();

        for(let item of t.items) {
            t._beforeDraw()
            item.draw();
            t._afterDraw();

            let px =  t.x - t.width * t.origin[0],
            py =  t.y - t.height * t.origin[1];

            t.game.ctx.strokeStyle = '#f00';
            t.game.ctx.strokeRect(item.x - item.width * item.origin[0] + px, item.y + py - item.height * item.origin[1], item.width, item.height);
        /*
        
        return (t.x - t.width * t.origin[0] + px <= x &&
            (t.x - t.width * t.origin[0] + px + t.width) >= x &&
            t.y - t.height * t.origin[1] + py <= y &&
            (t.y - t.height * t.origin[1] + py + t.height) >= y);
        */
        }
    }
}