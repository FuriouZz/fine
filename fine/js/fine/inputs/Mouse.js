import { bind } from "lol/js/function";
import { Key } from "./Key";
import { Dispatcher } from "../utils/Dispatcher";
import { List } from "lol/js/list";
import { toIterable } from "lol/js/list/utils";
export class MouseInput {
    constructor() {
        this._downPool = new List();
        this._keys = {};
        this.width = 1;
        this.height = 1;
        this.position = {
            pixels: new Float32Array([0, 0]),
            normalized: new Float32Array([0, 0])
        };
        this.up = new Dispatcher();
        this.down = new Dispatcher();
        this.pressed = new Dispatcher();
        this.move = new Dispatcher();
        bind(this, '_onMouse');
    }
    enable($el) {
        $el.addEventListener('mouseup', this._onMouse);
        $el.addEventListener('mousedown', this._onMouse);
        $el.addEventListener('mousemove', this._onMouse);
    }
    disable($el) {
        $el.removeEventListener('mouseup', this._onMouse);
        $el.removeEventListener('mousedown', this._onMouse);
        $el.removeEventListener('mousemove', this._onMouse);
    }
    getKey(key) {
        return this._keys[key] = this._keys[key] || {
            code: key,
            key: Key[key],
            up: true,
            down: false,
            pressed: false,
            pixels: this.position.pixels,
            normalized: this.position.normalized
        };
    }
    _onMouse(e) {
        const mouse = this.getKey(e.button);
        this.position.pixels[0] = e.clientX;
        this.position.pixels[1] = e.clientY;
        this.computeNormalizedPosition();
        mouse.pixels = this.position.pixels;
        mouse.normalized = this.position.normalized;
        if (e.type == "mouseup") {
            mouse.up = true;
            mouse.down = false;
            mouse.pressed = false;
            this.up.dispatch(mouse);
            this._downPool.remove(mouse.code);
        }
        else if (e.type == "mousedown") {
            mouse.up = false;
            mouse.down = true;
            mouse.pressed = true;
            this.pressed.dispatch(mouse);
            this._downPool.push(mouse.code);
        }
        else if (e.type == "mousemove") {
            this.move.dispatch(mouse);
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
    computeNormalizedPosition() {
        this.position.normalized[0] = this.position.pixels[0] / this.width;
        this.position.normalized[1] = this.position.pixels[1] / this.height;
    }
}
