import { mat4, vec4 } from "gl-matrix";
import { Transform } from "../Transform";
import { Lens } from "./Lens";
import { Orthographic } from "./Orthographic";
import { Perspective } from "./Perspective";

const IMVP: mat4 = mat4.identity(mat4.create())

export class Camera {

  lens: Lens;

  view = mat4.identity(mat4.create())
  viewProjection = mat4.identity(mat4.create())
  transform = new Transform()

  constructor() {}

  model_view_projection_matrix( modelMatrix: mat4, output: mat4 ) {
    mat4.mul( output, this.viewProjection, modelMatrix )
  }

  model_view_matrix( modelMatrix: mat4, output: mat4 ) {
    mat4.mul( output, this.view, modelMatrix )
  }

  unproject( v: vec4, output: vec4 ) {
    mat4.copy(IMVP, this.viewProjection)
    mat4.invert( IMVP, IMVP )
    vec4.transformMat4( output, v, IMVP )
  }

  update_view_matrix( transform: Transform = this.transform ) {
    mat4.invert( this.view, transform.getWorldMatrix() )
  }

  update_view_projection_matrix() {
    mat4.mul( this.viewProjection, this.lens.getProjection(), this.view )
  }

  static Orthographic(left: number = -1, right: number = 1, bottom: number = -1, top: number = 1, near: number = 1.0, far: number = 100.0) {
    const camera = new Camera()
    camera.lens = new Orthographic( left, right, bottom, top, near, far )
    camera.update_view_projection_matrix()
    return camera
  }

  static Perspective(fovy: number = 1, aspect: number = 1, near: number = 1.0, far: number = 100.0) {
    const camera = new Camera()
    camera.lens = new Perspective( fovy, aspect, near, far )
    camera.update_view_projection_matrix()
    return camera
  }

}