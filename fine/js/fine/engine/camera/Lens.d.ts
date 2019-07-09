import { mat4 } from "gl-matrix";
export declare class Lens {
    projection: mat4;
    invalidProjection: boolean;
    constructor();
    getProjection(): mat4;
    protected _updateProjection(): void;
    invalidate(): void;
}
