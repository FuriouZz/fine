import { Camera } from "../engine/camera/Camera";
import { Uniform } from "./Uniform";
import { mat4 } from "gl-matrix";
import { Transform } from "../engine/Transform";
import { Geometry } from "./Geometry";
import { Pipeline } from "./Pipeline";
export declare class Mesh {
    geometry: Geometry;
    pipeline: Pipeline;
    transform: Transform;
    modelViewProjectionMatrix: mat4;
    constructor(geometry: Geometry, pipeline: Pipeline);
    computeModelViewProjection(camera: Camera): void;
    protected onUpdateUniforms(uniforms: Record<string, Uniform>): void;
    render(): void;
    dispose(): void;
}
