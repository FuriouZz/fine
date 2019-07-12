import { bind } from "lol/js/function";
import { Dispatcher } from "../utils/Dispatcher";
import { List } from "lol/js/list";
import { toIterable } from "lol/js/list/utils";
export class TouchInput {
    constructor() {
        this._downPool = new List();
        this._keys = {};
        this.width = 1;
        this.height = 1;
        this.up = new Dispatcher();
        this.down = new Dispatcher();
        this.pressed = new Dispatcher();
        this.move = new Dispatcher();
        bind(this, 'onTouch', 'onTouches');
    }
    enable($el) {
        $el.addEventListener('touchstart', this._onTouches);
        $el.addEventListener('touchend', this._onTouches);
        $el.addEventListener('touchmove', this._onTouches);
    }
    disable($el) {
        $el.removeEventListener('touchstart', this._onTouches);
        $el.removeEventListener('touchend', this._onTouches);
        $el.removeEventListener('touchmove', this._onTouches);
    }
    getKey(identifier) {
        return this._keys[identifier] = this._keys[identifier] || {
            identifier: identifier,
            up: true,
            down: false,
            pressed: false,
            pixels: new Float32Array([0, 0]),
            normalized: new Float32Array([0, 0])
        };
    }
    _onTouches(e) {
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            this._onTouch(e, touch);
        }
    }
    _onTouch(e, _touch) {
        const touch = this.getKey(_touch.identifier);
        touch.pixels[0] = _touch.clientX;
        touch.pixels[1] = _touch.clientY;
        this.computeNormalizedPosition(touch);
        if (e.type == "touchend") {
            touch.up = true;
            touch.down = false;
            touch.pressed = false;
            this.up.dispatch(touch);
            this._downPool.remove(touch.identifier);
        }
        else if (e.type == "touchstart") {
            touch.up = false;
            touch.down = true;
            touch.pressed = true;
            this.pressed.dispatch(touch);
            this._downPool.push(touch.identifier);
        }
        else if (e.type == "touchmove") {
            this.move.dispatch(touch);
        }
    }
    update() {
        for (const key of toIterable(this._downPool)) {
            const keyObject = this._keys[key];
            if (keyObject) {
                keyObject.pressed = false;
                this.down.dispatch(keyObject);
            }
        }
    }
    resize(width, height) {
        this.width = width || 1;
        this.height = height || 1;
    }
    computeNormalizedPosition(key) {
        key.normalized[0] = key.pixels[0] / this.width;
        key.normalized[1] = key.pixels[1] / this.height;
    }
}
