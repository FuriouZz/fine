import { Key } from "./Key";
import { Dispatcher } from "../utils/Dispatcher";
interface IKey {
    code: Key;
    key: string;
    down: boolean;
    up: boolean;
    pressed: boolean;
    pixels: Float32Array;
    normalized: Float32Array;
}
export declare class MouseInput {
    private _downPool;
    private _keys;
    private width;
    private height;
    position: {
        pixels: Float32Array;
        normalized: Float32Array;
    };
    up: Dispatcher<IKey>;
    down: Dispatcher<IKey>;
    pressed: Dispatcher<IKey>;
    move: Dispatcher<IKey>;
    constructor();
    enable($el: Element | Window): void;
    disable($el: Element | Window): void;
    getKey(key: Key): IKey;
    private _onMouse;
    update(): void;
    resize(width: number, height: number): void;
    computeNormalizedPosition(): void;
}
export {};
