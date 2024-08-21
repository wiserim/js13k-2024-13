class Game {
	constructor() {
		this.delta = 1/60000; // 1/60s in ms
        this.deltaT = 0;
        //this.canvas = o.canvas
        this.ctx = c2d.getContext('2d');
        //this.canvasSize = new Smol.Vector(o.width ?? 0, o.height ?? 0)
        //this.responsive = o.responsive ?? 0
        //this.camera = new Smol.Camera(0,0,t.canvasSize.x, t.canvasSize.y)
        //this.controls = new Smol.Controls()
        this.scenes = {};
        //this.events = new Smol.Events(t)
        //this.assets = new Smol.Assets(o.assets ?? [])
        this.paused = false;
	}

	init() {

	}

	render() {
        for(const key in this.scenes) {
            this.scenes[key].draw();
        }
    }
}

export default Game;