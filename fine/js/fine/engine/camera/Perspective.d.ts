import { Lens } from "./Lens";
export declare class Perspective extends Lens {
    _fovy: number;
    _aspect: number;
    private _near;
    private _far;
    constructor(_fovy?: number, _aspect?: number, _near?: number, _far?: number);
    near: number;
    far: number;
    fovy: number;
    aspect: number;
    protected _updateProjection(): void;
}
