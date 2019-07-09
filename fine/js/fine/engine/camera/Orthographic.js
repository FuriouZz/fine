import { Lens } from "./Lens";
import { mat4 } from "gl-matrix";
export class Orthographic extends Lens {
    constructor(left = -1, right = 1, bottom = -1, top = 1, _near = 1.0, _far = 100.0) {
        super();
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.top = top;
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
    setBounds(_left, _right, _bottom, _top) {
        this.left = _left;
        this.right = _right;
        this.bottom = _bottom;
        this.top = _top;
        this.invalidate();
    }
    _updateProjection() {
        if (this.invalidProjection) {
            mat4.ortho(this.projection, this.left, this.right, this.bottom, this.top, this._near, this._far);
            this.invalidProjection = false;
        }
    }
}
