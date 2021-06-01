import { mat3, mat4, vec3, vec4 } from "gl-matrix";
import Transform from "engine/Transform";
import Camera from "engine/Camera";
import Geometry from "gl/Geometry";
import Pipeline from "gl/Pipeline";
import { LightsData } from "engine/Types";

export default class Mesh {
  transform = new Transform()
  modelViewMatrix = mat4.identity(mat4.create())
  normalMatrix = mat3.identity(mat3.create())

  morph = {
    enabled: false,
    weight: 0,
  }

  constructor(
    public geometry?: Geometry,
    public pipeline?: Pipeline,
  ) {}

  get name() {
    return this.transform.name
  }

  set name(value: string) {
    this.transform.name = value
  }

  protected onUpdateUniforms(camera?: Camera, lights?: LightsData) {
    const u = this.pipeline.uniforms

    u.uWorldMatrix = this.transform.worldMatrix
    u.uWeight = this.morph.weight

    if (camera) {
      camera.modelViewMatrix(this.modelViewMatrix, this.transform.worldMatrix)
      mat3.normalFromMat4(this.normalMatrix, this.transform.worldMatrix)
      u.uEyePosition = camera.transform.worldPosition
      u.uViewMatrix = camera.view
      u.uNormalMatrix = this.normalMatrix
      u.uModelViewMatrix = this.modelViewMatrix
      u.uProjectionMatrix = camera.projection
    }

    if (lights) {
      if (lights.points.count > 0) {
        u.uPointLightPositions = lights.points.positions
        u.uPointLightColors = lights.points.colors
        u.uPointLightParameters = lights.points.parameters
      }
    }
  }

  getBounds(camera: Camera) {
    const g = this.geometry
    if (!g) return true
    if (!g.bounds) g.computeBoundingSphere()
    if (!g.bounds) return true

    const _min = vec3.create()
    vec3.copy(_min, g.bounds.min)
    vec3.transformMat4(_min, _min, this.transform.worldMatrix)

    const _max = vec3.create()
    vec3.copy(_max, g.bounds.max)
    vec3.transformMat4(_max, _max, this.transform.worldMatrix)

    const min = vec4.fromValues(_min[0], _min[1], _min[2], 1)
    camera.unproject(min, min)

    const max = vec4.fromValues(_max[0], _max[1], _max[2], 1)
    camera.unproject(max, max)
    max[0] *= max[2]
    max[1] *= max[2]
    min[0] *= min[2]
    min[1] *= min[2]

    return { min, max }
  }

  render(camera?: Camera, lights?: LightsData) {
    if (lights) {
      if (lights.points.count > 0 && !this.pipeline.defines['POINT_LIGHT_COUNT']) {
        this.pipeline.defines['POINT_LIGHT_COUNT'] = lights.points.count.toString()
      }
    }
    this.pipeline.use()
    this.onUpdateUniforms(camera, lights)
    this.pipeline.applyState()
    this.geometry.draw(this.pipeline)
    this.pipeline.popState()
  }

  dispose() {
    this.geometry.dispose()
    this.pipeline.dispose()
  }
}