export class Dispatcher {
    constructor() {
        this.listeners = [];
    }
    on(listener) {
        this.listeners.push({ once: false, fn: listener });
    }
    once(listener) {
        this.listeners.push({ once: true, fn: listener });
    }
    off(listener) {
        let i = 0;
        let len = this.listeners.length;
        while (i < len) {
            if (this.listeners[i]) {
                if (this.listeners[i].fn == listener) {
                    break;
                }
            }
            i++;
        }
        if (i < len && i >= 0) {
            this.listeners.splice(i, 1);
        }
    }
    dispatch(data) {
        let i = 0;
        let len = this.listeners.length;
        while (i < len) {
            if (this.listeners[i]) {
                this.listeners[i].fn(data);
                if (this.listeners[i].once) {
                    this.off(this.listeners[i].fn);
                }
            }
            i++;
        }
    }
}
