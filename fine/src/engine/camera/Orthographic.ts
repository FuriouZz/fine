import { Lens } from "./Lens";
import { mat4 } from "gl-matrix";

export class Orthographic extends Lens {

  constructor(
    public left: number = -1,
    public right: number = 1,
    public bottom: number = -1,
    public top: number = 1,
    private _near: number = 1.0,
    private _far: number = 100.0) {
    super();
  }

  set near(_near: number) {
    this._near = _near;
    this.invalidate();
  }

  get near() {
    return this._near
  }

  set far(_far: number) {
    this._far = _far;
    this.invalidate();
  }

  get far() {
    return this._far
  }

  setBounds(_left: number, _right: number, _bottom: number, _top: number) {
    this.left = _left;
    this.right = _right;
    this.bottom = _bottom;
    this.top = _top;
    this.invalidate();
  }

  protected _updateProjection() {
    if (this.invalidProjection) {
      mat4.ortho(this.projection, this.left, this.right, this.bottom, this.top, this._near, this._far)
      this.invalidProjection = false;
    }
  }

}