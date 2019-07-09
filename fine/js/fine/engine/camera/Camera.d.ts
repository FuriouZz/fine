import { mat4, vec4 } from "gl-matrix";
import { Transform } from "../Transform";
import { Lens } from "./Lens";
export declare class Camera {
    lens: Lens;
    view: mat4;
    viewProjection: mat4;
    transform: Transform;
    constructor();
    model_view_projection_matrix(modelMatrix: mat4, output: mat4): void;
    model_view_matrix(modelMatrix: mat4, output: mat4): void;
    unproject(v: vec4, output: vec4): void;
    update_view_matrix(transform?: Transform): void;
    update_view_projection_matrix(): void;
    static Orthographic(left?: number, right?: number, bottom?: number, top?: number, near?: number, far?: number): Camera;
    static Perspective(fovy?: number, aspect?: number, near?: number, far?: number): Camera;
}
