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
        return this.items.includes(item);
    }

    getAll() {
        return this.items;
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
        t.game.ctx.fillRect(t.x, t.y, t.width, t.height);

        for(let item of t.items) {
            item.draw();
        }
    }
}