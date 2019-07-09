import { Lens } from "./Lens";
export declare class Orthographic extends Lens {
    left: number;
    right: number;
    bottom: number;
    top: number;
    private _near;
    private _far;
    constructor(left?: number, right?: number, bottom?: number, top?: number, _near?: number, _far?: number);
    near: number;
    far: number;
    setBounds(_left: number, _right: number, _bottom: number, _top: number): void;
    protected _updateProjection(): void;
}
