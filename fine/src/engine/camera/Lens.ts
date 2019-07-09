import { mat4 } from "gl-matrix";

export class Lens {

  projection = mat4.identity(mat4.create())
  invalidProjection = true

  constructor() {}

  getProjection() {
    if (this.invalidProjection) {
      this._updateProjection()
    }

    return this.projection
  }

  protected _updateProjection() {
    this.invalidProjection = false
  }

  public invalidate() {
    this.invalidProjection = true
  }

}