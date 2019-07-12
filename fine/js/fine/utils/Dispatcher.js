import { List } from "lol/js/list";
import { toIterable } from "lol/js/list/utils";
export class Dispatcher {
    constructor() {
        this.listeners = new List();
    }
    on(listener) {
        this.listeners.add({ once: false, fn: listener });
    }
    once(listener) {
        this.listeners.add({ once: true, fn: listener });
    }
    off(listener) {
        let curr;
        for (const l of toIterable(this.listeners)) {
            if (l.fn == listener) {
                curr = l;
                break;
            }
        }
        if (curr)
            this.listeners.remove(curr);
    }
    dispatch(data) {
        for (const listener of toIterable(this.listeners)) {
            listener.fn(data);
            if (listener.once) {
                this.listeners.remove(listener);
            }
        }
    }
}
