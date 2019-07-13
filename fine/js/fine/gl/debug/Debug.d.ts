import { Pipeline } from "../Pipeline";
import { State } from "../State";
export declare class Debug {
    static pipeline(state?: State, type?: "Color" | "UV" | "Normal"): Promise<Pipeline>;
}
