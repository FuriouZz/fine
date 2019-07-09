import { mat4 } from "gl-matrix";
export class Lens {
    constructor() {
        this.projection = mat4.identity(mat4.create());
        this.invalidProjection = true;
    }
    getProjection() {
        if (this.invalidProjection) {
            this._updateProjection();
        }
        return this.projection;
    }
    _updateProjection() {
        this.invalidProjection = false;
    }
    invalidate() {
        this.invalidProjection = true;
    }
}
