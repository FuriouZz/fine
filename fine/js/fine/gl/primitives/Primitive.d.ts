import { GLType, GLContext } from "../constants/Types";
import { Mesh } from "../Mesh";
import { Pipeline } from "../Pipeline";
export interface PrimitiveDescriptor {
    attribute: string;
    type: GLType;
    size: number;
}
export declare class PrimitiveGeometry {
    static triangle(gl: GLContext, size?: number): import("../Geometry").Geometry;
    static circle(gl: GLContext, radius_top?: number, segment?: number, height?: number, thethaStart?: number, thethaLength?: number): import("../Geometry").Geometry;
    static rectangle(gl: GLContext, width?: number, height?: number, width_segment?: number, height_segment?: number): import("../Geometry").Geometry;
    static cylinder(gl: GLContext, radius_top?: number, radius_bottom?: number, segment?: number, height_segment?: number, height?: number, thethaStart?: number, thethaLength?: number): import("../Geometry").Geometry;
    static sphere(gl: GLContext, radius?: number, width_segment?: number, height_segment?: number, thethaStart?: number, thethaLength?: number): import("../Geometry").Geometry;
}
export declare class PrimitiveMesh {
    static triangle(pipeline: Pipeline, size?: number): Mesh;
    static circle(pipeline: Pipeline, radius_top?: number, segment?: number, height?: number, thethaStart?: number, thethaLength?: number): Mesh;
    static rectangle(pipeline: Pipeline, width?: number, height?: number, width_segment?: number, height_segment?: number): Mesh;
    static cylinder(pipeline: Pipeline, radius_top?: number, radius_bottom?: number, segment?: number, height_segment?: number, height?: number, thethaStart?: number, thethaLength?: number): Mesh;
    static sphere(pipeline: Pipeline, radius?: number, width_segment?: number, height_segment?: number, thethaStart?: number, thethaLength?: number): Mesh;
}
