class Events {
    constructor(parent) {
        this.parent = parent;
        this.events = [];
    }

    on(event, callback, target = false) {
        let t = this;
        t.events[event].push({
            callback: callback.bind(t.parent),
            target: target
        });
    }

    emit(event, target = false) {
        let t = this, listener
        if(!t.events[event])
            return;

        for(let listener of t.events[event]) {
            if(listener.target && listener.target !== target)
                continue;
            
            listener.callback(target);
        }
    }
}

export default Events;
