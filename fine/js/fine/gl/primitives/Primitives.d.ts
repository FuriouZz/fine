import { GLContext, GLType } from "../constants/Types";
import { Geometry } from "../Geometry";
export interface PrimitiveDescriptor {
    attribute: string;
    type: GLType;
    size: number;
}
export declare type TPrimitive = [Float32Array, Uint16Array, PrimitiveDescriptor[]];
export declare function geometry_from_primitive(gl: GLContext, primitive: TPrimitive): Geometry;
export declare function concat_primitives(...primitives: TPrimitive[]): TPrimitive;
export declare function triangle(size?: number): TPrimitive;
export declare function circle(radius_top?: number, radius_bottom?: number, segment?: number, height_segment?: number, height?: number, thethaStart?: number, thethaLength?: number): TPrimitive;
export declare function rectangle(width?: number, height?: number, width_segment?: number, height_segment?: number): TPrimitive;
export declare function sphere(radius?: number, width_segment?: number, height_segment?: number, thethaStart?: number, thethaLength?: number): TPrimitive;
