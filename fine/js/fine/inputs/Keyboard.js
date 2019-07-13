import { bind } from "lol/js/function";
import { Key } from "./Key";
import { Dispatcher } from "../utils/Dispatcher";
import { List } from "lol/js/list";
import { toIterable } from "lol/js/list/utils";
export class KeyboardInput {
    constructor() {
        this._downPool = new List();
        this._keys = {};
        this.up = new Dispatcher();
        this.down = new Dispatcher();
        this.pressed = new Dispatcher();
        bind(this, '_onKey');
    }
    enable($el) {
        $el.addEventListener('keyup', this._onKey);
        $el.addEventListener('keydown', this._onKey);
    }
    disable($el) {
        $el.removeEventListener('keyup', this._onKey);
        $el.removeEventListener('keydown', this._onKey);
    }
    getKey(key) {
        return this._keys[key] = this._keys[key] || {
            code: key,
            key: Key[key],
            up: true,
            down: false,
            pressed: false
        };
    }
    _onKey(e) {
        const key = this.getKey(e.keyCode);
        if (e.type == "keyup") {
            key.up = true;
            key.down = false;
            key.pressed = false;
            this.up.dispatch(key);
            this._downPool.remove(key.code);
        }
        else if (e.type == "keydown" && !key.down) {
            key.up = false;
            key.down = true;
            key.pressed = true;
            this.pressed.dispatch(key);
            this._downPool.push(key.code);
        }
    }
    update() {
        for (const key of toIterable(this._downPool)) {
            const keyObject = this.getKey(key);
            if (keyObject) {
                keyObject.pressed = false;
                this.down.dispatch(keyObject);
            }
        }
    }
}
