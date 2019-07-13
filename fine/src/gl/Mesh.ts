import { Camera } from "../engine/camera/Camera";
import { Uniform } from "./Uniform";
import { mat4 } from "gl-matrix";
import { Transform } from "../engine/Transform";
import { Geometry } from "./Geometry";
import { Pipeline } from "./Pipeline";

const M4 = mat4.identity(mat4.create())

export class Mesh {

  transform = new Transform()

  constructor(public geometry: Geometry, public pipeline: Pipeline) {
    this.onUpdateUniforms = this.onUpdateUniforms.bind(this)
    this.pipeline.onUpdateUniforms.on(this.onUpdateUniforms)
  }

  computeModelViewProjection( camera: Camera ) {
    camera.model_view_projection_matrix( this.transform.getMatrix(), M4 )
  }

  protected onUpdateUniforms(uniforms: Record<string, Uniform>) {
    if (uniforms.uMVPMatrix) uniforms.uMVPMatrix.matrix4( M4 )
    if (uniforms.uWorldMatrix) uniforms.uWorldMatrix.matrix4( this.transform.getWorldMatrix() )
  }

  render() {
    this.pipeline.use()
    this.geometry.draw(this.pipeline)
  }

  dispose() {
    this.pipeline.onUpdateUniforms.off(this.onUpdateUniforms)
    this.pipeline.dispose()
    this.geometry.dispose()
  }

}