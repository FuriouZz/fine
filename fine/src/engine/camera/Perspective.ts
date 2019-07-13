import { Lens } from "./Lens";
import { mat4 } from "gl-matrix";
import { DEG2RAD } from "lol/js/math"

export class Perspective extends Lens {

  constructor(
    public _fovy: number = -1,
    public _aspect: number = 1,
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

  set fovy(_fovy: number) {
    this._fovy = _fovy;
    this.invalidate();
  }

  get fovy() {
    return this._fovy
  }

  set aspect(_aspect: number) {
    this._aspect = _aspect;
    this.invalidate();
  }

  get aspect() {
    return this._aspect
  }

  protected _updateProjection() {
    if (this.invalidProjection) {
      mat4.perspective( this.projection, this._fovy * DEG2RAD, this._aspect, this._near, this._far )
      this.invalidProjection = false;
    }
  }

}