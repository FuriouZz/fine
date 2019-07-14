import { Camera } from "../engine/camera/Camera";
import { Uniform } from "./Uniform";
import { mat4 } from "gl-matrix";
import { Transform } from "../engine/Transform";
import { Geometry } from "./Geometry";
import { Pipeline } from "./Pipeline";

export class Mesh {

  transform = new Transform()
  modelViewProjectionMatrix = mat4.identity(mat4.create())

  constructor(public geometry: Geometry, public pipeline: Pipeline) {
    this.onUpdateUniforms = this.onUpdateUniforms.bind(this)
    this.pipeline.onUpdateUniforms.on(this.onUpdateUniforms)
  }

  computeModelViewProjection( camera: Camera ) {
    camera.model_view_projection_matrix( this.transform.getWorldMatrix(), this.modelViewProjectionMatrix )
  }

  protected onUpdateUniforms(uniforms: Record<string, Uniform>) {
    if (uniforms.uMVPMatrix) uniforms.uMVPMatrix.matrix4( this.modelViewProjectionMatrix )
    if (uniforms.uWorldMatrix) uniforms.uWorldMatrix.matrix4( this.transform.getWorldMatrix() )
  }

  render() {
    this.pipeline.use()
    this.pipeline.applyState()
    this.geometry.draw(this.pipeline)
    this.pipeline.popState()
  }

  dispose() {
    this.pipeline.onUpdateUniforms.off(this.onUpdateUniforms)
    this.pipeline.dispose()
    this.geometry.dispose()
  }

}