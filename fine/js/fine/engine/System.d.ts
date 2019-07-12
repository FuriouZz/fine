import { Dispatcher } from "../utils/Dispatcher";
import { Inputs } from "../inputs/Inputs";
export declare class System {
    size: Float32Array;
    pixelRatio: number;
    resize: Dispatcher<Float32Array>;
    paused: boolean;
    update: Dispatcher<unknown>;
    render: Dispatcher<unknown>;
    deltaTime: number;
    playTime: number;
    previousTime: number;
    timeScale: number;
    inputs: Inputs;
    constructor();
    readonly currentTime: number;
    enable(): void;
    disable(): void;
    private _onResize;
    private _RAF;
}
