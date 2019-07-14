import { Key } from "./Key";
import { Dispatcher } from "../utils/Dispatcher";
export interface KeyboardKey {
    code: Key;
    key: string;
    down: boolean;
    up: boolean;
    pressed: boolean;
}
export declare class KeyboardInput {
    private _downPool;
    private _keys;
    up: Dispatcher<KeyboardKey>;
    down: Dispatcher<KeyboardKey>;
    pressed: Dispatcher<KeyboardKey>;
    constructor();
    enable($el: Element | Window): void;
    disable($el: Element | Window): void;
    getKey(key: Key): KeyboardKey;
    private _onKey;
    update(): void;
}
