import {letters} from './letters';

let game = {
    time: 0,
	delta: 1/60000, // 1/60s in ms
    deltaT: 0,
    width: c1.width,
    height: c1.height,
    canvas: c1,
    letters: letters,
    ctx: c1.getContext('2d'),
    assets: {}, 
    scenes: [],
    //paused: false,
    mouse: {
        x: 0,
        y: 0,
        down: 0
    },
    data: {},

	init: () => {
        let t = game;
        window.game = t;
        t.ctx.translate(0.5, 0.5);
        t.ctx.lineWidth = 1;
        t.ctx.imageSmoothingEnabled = false;
        
        //mouse events
        c1.addEventListener('mousedown', (e) => {
            let box = c1.getBoundingClientRect();    
            t.mouse.x = (e.pageX - box.x) / box.width * 320;
            t.mouse.y = (e.pageY - box.y) / box.height * 240;
            t.mouse.down = 1;
        });

        c1.addEventListener('mousemove', (e) => {
            let box = c1.getBoundingClientRect();
            t.mouse.x = (e.pageX - box.x) / box.width * 320;
            t.mouse.y = (e.pageY - box.y) / box.height * 240;
        });

        t.time = performance.now();

        t.update();
	},

	render() {
        for(let key in this.scenes) {
            this.scenes[key].draw();
        }
    },

    update() {
        let t = this;
        //frame
        let dt = performance.now() - t.time;
        t.cursor('default');
        
        if(dt < t.delta || t.paused) {
            requestAnimationFrame(t.update.bind(t));
            return;
        }
        t.ctx.clearRect(0,0,320,240);
        t.ctx.imageSmoothingEnabled = false;
        
        t.time += dt
        t.deltaT = dt

        for(let key in t.scenes) {
            t.scenes[key].update()
        }

        t.render();
        t.mouse.down = 0;
        requestAnimationFrame(t.update.bind(t));
    },

    cursor(cursor) {
        this.canvas.style.cursor = cursor;
    }
}

window.game = game;

export default game;