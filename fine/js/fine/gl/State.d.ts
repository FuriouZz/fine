import { StateConfig } from "./StateConfig";
import { GLContext } from "./constants/Types";
export declare class State {
    gl: GLContext;
    config: StateConfig;
    constructor(gl: GLContext);
    from_context(): void;
    apply(c?: StateConfig): void;
}
