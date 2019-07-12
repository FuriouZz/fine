import { Key } from "./Key";
import { Dispatcher } from "../utils/Dispatcher";
interface IKey {
    code: Key;
    key: string;
    down: boolean;
    up: boolean;
    pressed: boolean;
}
export declare class KeyboardInput {
    private _downPool;
    private _keys;
    up: Dispatcher<IKey>;
    down: Dispatcher<IKey>;
    pressed: Dispatcher<IKey>;
    constructor();
    enable($el: Element | Window): void;
    disable($el: Element | Window): void;
    getKey(key: Key): IKey;
    private _onKey;
    update(): void;
}
export {};
