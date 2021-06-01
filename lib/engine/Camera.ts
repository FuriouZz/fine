import { mat4, vec3, vec4 } from "gl-matrix";
import { DEG2RAD } from "lol/js/math";
import Mesh from "engine/Mesh";
import Transform from "engine/Transform";
import { getMaxScaleOnAxis } from "engine/utils/math";
import { CameraPerspectiveOptions, CameraOrthographicOptions } from "engine/Types";

const IMVP: mat4 = mat4.identity(mat4.create())

export default class Camera {

  view = mat4.identity(mat4.create())
  projection = mat4.identity(mat4.create())
  projectionView = mat4.identity(mat4.create())
  transform = new Transform()
  type = "perspective" as "perspective" | "orthographic"
  frustum: [vec3, vec3, vec3, vec3, vec3, vec3]
  frustumConstants: [number, number, number, number, number, number] = [0,0,0,0,0,0,]

  get name() {
    return this.transform.name
  }

  constructor() {
    this.transform.name = "Camera"
    this.perspective()
  }

  modelViewProjectionMatrix(out: mat4, modelMatrix: mat4) {
    mat4.mul(out, this.projectionView, modelMatrix)
  }

  modelViewMatrix(out: mat4, modelMatrix: mat4) {
    mat4.mul(out, this.view, modelMatrix)
  }

  project(out: vec4, v: vec4) {
    vec4.transformMat4(out, v, this.view)
    vec4.transformMat4(out, v, this.projection)
  }

  unproject(out: vec4, v: vec4) {
    mat4.copy(IMVP, this.projectionView)
    mat4.invert(IMVP, IMVP)
    vec4.transformMat4(out, v, IMVP)
  }

  updateWorldMatrix() {
    this.transform.updateWorldMatrix()
    mat4.invert(this.view, this.transform.worldMatrix)
    mat4.mul(this.projectionView, this.projection, this.view)
  }

  perspective(options?: Partial<CameraPerspectiveOptions>) {
    options = {
      fovy: 1,
      aspect: 1,
      near: 1,
      far: 100,
      ...(options || {})
    }
    mat4.perspective(this.projection, options.fovy * DEG2RAD, options.aspect, options.near, options.far)
    this.type = "perspective"
  }

  ortographic(options?: Partial<CameraOrthographicOptions>) {
    options = {
      left: -1,
      right: 1,
      bottom: -1,
      top: 1,
      near: 1,
      far: 100,
      zoom: 1,
      ...(options || {})
    }
    mat4.ortho(this.projection, options.left / options.zoom, options.right / options.zoom, options.bottom / options.zoom, options.top / options.zoom, options.near, options.far)
    this.type = "orthographic"
  }

  // https://github.com/oframe/ogl/blob/master/src/core/Camera.js#L82
  updateFrustum() {
    if (!this.frustum) {
      this.frustum = [vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create(), vec3.create()]
    }

    const m = this.projectionView;

    vec3.set(this.frustum[0], m[3] - m[0], m[7] - m[4], m[11] - m[8])
    vec3.set(this.frustum[1], m[3] + m[0], m[7] + m[4], m[11] + m[8])
    vec3.set(this.frustum[2], m[3] + m[1], m[7] + m[5], m[11] + m[9])
    vec3.set(this.frustum[3], m[3] - m[1], m[7] - m[5], m[11] - m[9])
    vec3.set(this.frustum[4], m[3] - m[2], m[7] - m[6], m[11] - m[10])
    vec3.set(this.frustum[5], m[3] + m[2], m[7] + m[6], m[11] + m[10])

    this.frustumConstants[0] = m[15] - m[12] // -x
    this.frustumConstants[1] = m[15] + m[12] // +x
    this.frustumConstants[2] = m[15] + m[13] // +y
    this.frustumConstants[3] = m[15] - m[13] // -y
    this.frustumConstants[4] = m[15] - m[14] // +z (far)
    this.frustumConstants[5] = m[15] + m[14] // -z (near)

    for (let i = 0; i < 6; i++) {
      const invLen = 1.0 / vec3.length(this.frustum[i])
      vec3.scale(this.frustum[i], this.frustum[i], invLen)
      this.frustumConstants[i] *= invLen
    }
  }

  frustumIntersectsMesh(mesh: Mesh) {
    const g = mesh.geometry
    if (!g) return true
    if (!g.bounds) g.computeBoundingSphere()
    if (!g.bounds) return true

    const center = vec3.create()
    vec3.copy(center, g.bounds.center)
    vec3.transformMat4(center, center, mesh.transform.worldMatrix)
    const radius = g.bounds.radius * getMaxScaleOnAxis(mesh.transform.worldMatrix)

    return this.frustumIntersectsSphere(center, radius)
  }

  frustumIntersectsSphere(center: vec3, radius: number) {
    for (let i = 0; i < 6; i++) {
      const plane = this.frustum[i]
      const distance = vec3.dot(plane, center) + this.frustumConstants[i]
      if (distance < -radius) return false
    }

    return true
  }

}