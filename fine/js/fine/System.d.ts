import { Dispatcher } from "./utils/Dispatcher";
export declare class System {
    static time: number;
    static delta: number;
    static resize: Dispatcher<unknown>;
    static render: Dispatcher<unknown>;
    static init(): void;
    static getTime(): number;
    static onRequestAnimationFrame(): void;
    static onResize(): void;
}
