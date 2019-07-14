import { Pipeline } from "../Pipeline";
import { State } from "../State";
import { Color } from "../../engine/Color";
export declare class Debug {
    static pipeline(state?: State, type?: "Color" | "UV" | "Normal" | "WorldNormal", color?: Color): Promise<Pipeline>;
}
