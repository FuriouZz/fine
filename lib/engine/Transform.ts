import { mat4, quat, vec3 } from "gl-matrix";
import { DEG2RAD } from "lol/js/math";

const TMP_QUAT = quat.create()

export default class Transform {

  up = vec3.fromValues(0, 1, 0)
  scaleValues = vec3.fromValues(1, 1, 1)
  positionValues = vec3.fromValues(0, 0, 0)
  rotationValues = quat.identity(quat.create())

  parent: Transform
  children = new Array<Transform>()
  name: string

  private _worldMatrix = mat4.identity(mat4.create())
  private _worldPosition = vec3.fromValues(0, 0,0)
  private _matrix = mat4.identity(mat4.create())

  get worldMatrix() {
    return this._worldMatrix
  }

  get worldPosition() {
    return this._worldPosition
  }

  get matrix() {
    return this._matrix
  }

  set matrix(m: mat4) {
    mat4.copy(this._matrix, m)
    this.decompose()
    this.invalidWorldMatrix = true
  }

  private invalidWorldMatrix = true
  private invalidMatrix = true

  constructor(name = "Transform") {
    this.name = name
  }

  clone() {
    const t = new Transform(this.name)
    t.copy(this)
    return t
  }

  copy(t: Transform) {
    this.name = t.name
    vec3.copy(this.up, t.up)
    vec3.copy(this.scaleValues, t.scaleValues)
    vec3.copy(this.positionValues, t.positionValues)
    quat.copy(this.rotationValues, t.rotationValues)
    mat4.copy(this._worldMatrix, t._worldMatrix)
    vec3.copy(this._worldPosition, t._worldPosition)
    mat4.copy(this._matrix, t._matrix)
    return this
  }

  set uniformScale(value: number) {
    this.scaleValues[0] = value
    this.scaleValues[1] = value
    this.scaleValues[2] = value
    this.invalidate()
  }

  get uniformScale() {
    if (this.scaleValues[0] !== this.scaleValues[1] || this.scaleValues[0] !== this.scaleValues[2] || this.scaleValues[1] || this.scaleValues[2]) {
      this.uniformScale = this.scaleValues[0];
    }
    return this.scaleValues[0]
  }

  set scaleX(value: number) {
    this.scaleValues[0] = value
    this.invalidate()
  }

  get scaleX() {
    return this.scaleValues[0]
  }

  set scaleY(value: number) {
    this.scaleValues[1] = value
    this.invalidate()
  }

  get scaleY() {
    return this.scaleValues[1]
  }

  set scaleZ(value: number) {
    this.scaleValues[2] = value
    this.invalidate()
  }

  get scaleZ() {
    return this.scaleValues[2]
  }

  setPosition(x = this.positionValues[0], y = this.positionValues[1], z = this.positionValues[2]) {
    this.positionValues[0] = x
    this.positionValues[1] = y
    this.positionValues[2] = z
    this.invalidate()
  }

  set x(value: number) {
    this.positionValues[0] = value
    this.invalidate()
  }

  get x() {
    return this.positionValues[0]
  }

  set y(value: number) {
    this.positionValues[1] = value
    this.invalidate()
  }

  get y() {
    return this.positionValues[1]
  }

  set z(value: number) {
    this.positionValues[2] = value
    this.invalidate()
  }

  get z() {
    return this.positionValues[2]
  }

  translate(x: number, y: number, z: number) {
    this.positionValues[0] = this.positionValues[0] + x
    this.positionValues[1] = this.positionValues[1] + y
    this.positionValues[2] = this.positionValues[2] + z
    this.invalidate()
  }

  translateX(x: number) {
    this.positionValues[0] = this.positionValues[0] + x
    this.invalidate()
  }

  translateY(y: number) {
    this.positionValues[1] = this.positionValues[1] + y
    this.invalidate()
  }

  translateZ(z: number) {
    this.positionValues[2] = this.positionValues[2] + z
    this.invalidate()
  }

  setRotation(axis: vec3, degree: number) {
    quat.setAxisAngle(this.rotationValues, axis, degree * DEG2RAD)
    this.invalidate()
  }

  rotateX(degree: number) {
    quat.rotateX(this.rotationValues, this.rotationValues, degree * DEG2RAD)
    this.invalidate()
  }

  rotateY(degree: number) {
    quat.rotateY(this.rotationValues, this.rotationValues, degree * DEG2RAD)
    this.invalidate()
  }

  rotateZ(degree: number) {
    quat.rotateZ(this.rotationValues, this.rotationValues, degree * DEG2RAD)
    this.invalidate()
  }

  // getUp(out: vec3) {
  //   vec3.set(out, 0, 1, 0)
  //   mat4.getRotation(TMP_QUAT, this.worldMatrix)
  //   vec3.transformQuat(out, out, TMP_QUAT)
  // }

  // getForward(out: vec3) {
  //   vec3.set(out, 0, 0, -1)
  //   mat4.getRotation(TMP_QUAT, this.worldMatrix)
  //   vec3.transformQuat(out, out, TMP_QUAT)
  // }

  // getRight(out: vec3) {
  //   vec3.set(out, 1, 0, 0)
  //   mat4.getRotation(TMP_QUAT, this.worldMatrix)
  //   vec3.transformQuat(out, out, TMP_QUAT)
  // }

  lookAt(target: vec3) {
    mat4.lookAt(this.matrix, this.positionValues, target, this.up)
    this.invalidWorldMatrix = true
  }

  setMatrix(matrix: mat4) {
    mat4.copy(this.matrix, matrix)
    this.decompose()
    this.invalidate()
  }

  decompose() {
    mat4.getRotation(this.rotationValues, this.matrix)
    mat4.getScaling(this.scaleValues, this.matrix)
    mat4.getTranslation(this.positionValues, this.matrix)
  }

  compose(localRotation: quat, localPosition: vec3, localScale: vec3) {
    mat4.fromRotationTranslationScale(this.matrix, localRotation, localPosition, localScale)
  }

  getRoot(): Transform {
    return this.parent == null ? this : this.parent.getRoot()
  }

  getInvalidParent(): Transform {
    if (this.parent == null) return null

    var pp = this.parent.getInvalidParent()
    if (pp != null) return pp

    if (this.parent.invalidWorldMatrix) return this.parent

    return null
  }

  updateMatrix() {
    if (this.invalidMatrix) {
      this.compose(this.rotationValues, this.positionValues, this.scaleValues)
      this.invalidMatrix = false
    }
  }

  updateWorldMatrix() {
    var invalidParent = this.getInvalidParent()

    if (invalidParent == null) {
      this.updateMatrix()
      this._updateWorldMatrix()
    } else {
      invalidParent.updateMatrix()
      invalidParent._updateWorldMatrix()
    }
  }

  private _updateWorldMatrix() {
    const parentHadInvalidWorldMatrix = this.invalidWorldMatrix
    if (this.invalidWorldMatrix) {
      if (this.parent == null) {
        mat4.copy(this.worldMatrix, this.matrix)
      } else {
        mat4.mul(this.worldMatrix, this.parent.worldMatrix, this.matrix)
      }
      mat4.getTranslation(this._worldPosition, this.worldMatrix)
      this.invalidWorldMatrix = false
    }

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i]
      child.invalidWorldMatrix = child.invalidWorldMatrix || parentHadInvalidWorldMatrix
      child.updateMatrix()
      child._updateWorldMatrix()
    }
  }

  invalidate() {
    this.invalidMatrix = true
    this.invalidWorldMatrix = true
  }

  addChild(t: Transform) {
    if (t.parent != null) {
      t.parent.removeChild(t)
    }

    t.parent = this
    this.children.push(t)
  }

  removeChild(t: Transform) {
    const index = this.children.indexOf(t)
    if (index > -1) return this.children.splice(index, 1)
    return null
  }

  traverse(cb: (t: Transform) => void) {
    for (const child of this.children) {
      cb(child)
      if (child.children.length > 0) {
        child.traverse(cb)
      }
    }
  }

}