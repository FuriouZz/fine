import { KeyboardInput } from "./Keyboard";
import { MouseInput } from "./Mouse";
import { TouchInput } from "./Touch";
export declare class Inputs {
    key: KeyboardInput;
    mouse: MouseInput;
    touch: TouchInput;
    constructor();
    enable($el: Element | Window): void;
    disable($el: Element | Window): void;
    update(): void;
    resize(width: number, height: number): void;
}
