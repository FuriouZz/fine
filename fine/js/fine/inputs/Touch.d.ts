import { Dispatcher } from "../utils/Dispatcher";
export interface TouchKey {
    identifier: number;
    down: boolean;
    up: boolean;
    pressed: boolean;
    pixels: Float32Array;
    normalized: Float32Array;
}
export declare class TouchInput {
    private _downPool;
    private _keys;
    private width;
    private height;
    up: Dispatcher<TouchKey>;
    down: Dispatcher<TouchKey>;
    pressed: Dispatcher<TouchKey>;
    move: Dispatcher<TouchKey>;
    constructor();
    enable($el: Element | Window): void;
    disable($el: Element | Window): void;
    getKey(identifier: number): TouchKey;
    private _onTouches;
    private _onTouch;
    update(): void;
    resize(width: number, height: number): void;
    computeNormalizedPosition(key: TouchKey): void;
}
