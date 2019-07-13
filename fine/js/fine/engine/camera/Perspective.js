import { Lens } from "./Lens";
import { mat4 } from "gl-matrix";
import { DEG2RAD } from "lol/js/math";
export class Perspective extends Lens {
    constructor(_fovy = -1, _aspect = 1, _near = 1.0, _far = 100.0) {
        super();
        this._fovy = _fovy;
        this._aspect = _aspect;
        this._near = _near;
        this._far = _far;
    }
    set near(_near) {
        this._near = _near;
        this.invalidate();
    }
    get near() {
        return this._near;
    }
    set far(_far) {
        this._far = _far;
        this.invalidate();
    }
    get far() {
        return this._far;
    }
    set fovy(_fovy) {
        this._fovy = _fovy;
        this.invalidate();
    }
    get fovy() {
        return this._fovy;
    }
    set aspect(_aspect) {
        this._aspect = _aspect;
        this.invalidate();
    }
    get aspect() {
        return this._aspect;
    }
    _updateProjection() {
        if (this.invalidProjection) {
            mat4.perspective(this.projection, this._fovy * DEG2RAD, this._aspect, this._near, this._far);
            this.invalidProjection = false;
        }
    }
}
