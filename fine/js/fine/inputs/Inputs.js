import { KeyboardInput } from "./Keyboard";
import { MouseInput } from "./Mouse";
import { TouchInput } from "./Touch";
export class Inputs {
    constructor() {
        this.key = new KeyboardInput();
        this.mouse = new MouseInput();
        this.touch = new TouchInput();
    }
    enable($el) {
        this.key.enable($el);
        this.mouse.enable($el);
        this.touch.enable($el);
    }
    disable($el) {
        this.key.disable($el);
        this.mouse.disable($el);
        this.touch.disable($el);
    }
    update() {
        this.key.update();
        this.mouse.update();
        this.touch.update();
    }
    resize(width, height) {
        this.mouse.resize(width, height);
        this.touch.resize(width, height);
    }
}
