import { Key } from "./Key";
import { Dispatcher } from "../utils/Dispatcher";
import { vec2 } from "gl-matrix";
export interface MouseKey {
    code: Key;
    key: string;
    down: boolean;
    up: boolean;
    pressed: boolean;
    pixels: vec2;
    normalized: vec2;
}
export declare class MouseInput {
    private _downPool;
    private _keys;
    private width;
    private height;
    position: {
        pixels: vec2;
        normalized: vec2;
    };
    up: Dispatcher<MouseKey>;
    down: Dispatcher<MouseKey>;
    pressed: Dispatcher<MouseKey>;
    move: Dispatcher<MouseKey>;
    constructor();
    enable($el: Element | Window): void;
    disable($el: Element | Window): void;
    getKey(key: Key): MouseKey;
    private _onMouse;
    update(): void;
    resize(width: number, height: number): void;
    computeNormalizedPosition(): void;
}
