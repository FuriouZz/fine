import { Dispatcher } from "../utils/Dispatcher";
interface IKey {
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
    up: Dispatcher<IKey>;
    down: Dispatcher<IKey>;
    pressed: Dispatcher<IKey>;
    move: Dispatcher<IKey>;
    constructor();
    enable($el: Element | Window): void;
    disable($el: Element | Window): void;
    getKey(identifier: number): IKey;
    private _onTouches;
    private _onTouch;
    update(): void;
    resize(width: number, height: number): void;
    computeNormalizedPosition(key: IKey): void;
}
export {};
