import { mat4, quat, vec3 } from "gl-matrix";

export class Transform {

  scale = vec3.set(vec3.create(), 1, 1, 1)
  position = vec3.set(vec3.create(), 0, 0, 0)
  rotation = quat.identity(quat.create())

  parent: Transform;
  children = new Array<Transform>();
  object: Object;

  private matrix = mat4.identity(mat4.create());
  private worldMatrix = mat4.identity(mat4.create());

  private invalidWorldMatrix = true;
  private invalidMatrix = true;

  constructor() {}

  setScale(x = this.scale[0], y = this.scale[1], z = this.scale[2]) {
    this.scale[0] = x
    this.scale[1] = y
    this.scale[2] = z
    this.invalidate()
  }

  setPosition(x = this.position[0], y = this.position[1], z = this.position[2]) {
    this.position[0] = x
    this.position[1] = y
    this.position[2] = z
    this.invalidate()
  }

  setRotation(axis: vec3 | number[], radian: number) {
    quat.setAxisAngle(this.rotation, axis, radian)
    this.invalidate()
  }

  rotateX(radian: number) {
    quat.rotateX(this.rotation, this.rotation, radian)
    this.invalidate()
  }

  rotateY(radian: number) {
    quat.rotateY(this.rotation, this.rotation, radian)
    this.invalidate()
  }

  rotateZ(radian: number) {
    quat.rotateZ(this.rotation, this.rotation, radian)
    this.invalidate()
  }

  translate(x: number, y: number, z: number) {
    this.position[0] = this.position[0] + x
    this.position[1] = this.position[1] + y
    this.position[2] = this.position[2] + z
    this.invalidate()
  }

  getUp( out: vec3 ) {
    vec3.set(out, 0, 1, 0)
    mat4.getRotation( TMP_QUAT, this.worldMatrix )
    vec3.transformQuat(out, out, TMP_QUAT)
  }

  getForward( out: vec3 ) {
    vec3.set(out, 0, 0, -1)
    mat4.getRotation( TMP_QUAT, this.worldMatrix )
    vec3.transformQuat(out, out, TMP_QUAT)
  }

  getRight( out: vec3 ) {
    vec3.set(out, 1, 0, 0)
    mat4.getRotation( TMP_QUAT, this.worldMatrix )
    vec3.transformQuat(out, out, TMP_QUAT)
  }

  decompose() {
    mat4.getRotation( this.rotation, this.matrix )
    mat4.getScaling( this.scale, this.matrix )
    mat4.getTranslation( this.position, this.matrix )
  }

  getMatrix() {
    return this.matrix;
  }

  setMatrix( m: mat4 ) {
    mat4.copy( this.matrix, m )
    this.decompose();
    this.invalidWorldMatrix = true;
  }

  getWorldMatrix() {
    return this.worldMatrix;
  }

  getRoot() {
    return this.parent == null ? this : this.parent.getRoot();
  }

  getInvalidParent() {
    if (this.parent == null) return null;

    var pp = this.parent.getInvalidParent();
    if (pp != null) return pp;

    if (this.parent.invalidWorldMatrix) return this.parent;

    return null;
  }

  updateMatrix() {
    if (this.invalidMatrix) {
      mat4.fromRotationTranslationScale( this.matrix, this.rotation, this.position, this.scale )
      this.invalidMatrix = false;
    }
  }

  updateWorldMatrix() {
    var invalidParent = this.getInvalidParent();

    if (invalidParent == null) {
        this.updateMatrix();
        this._updateWorldMatrix();
    } else {
      invalidParent.updateMatrix();
      invalidParent._updateWorldMatrix();
    }
  }

  private _updateWorldMatrix() {
    if (this.invalidWorldMatrix) {
      if (this.parent == null) {
        mat4.copy( this.worldMatrix, this.matrix )
      } else {
        mat4.mul( this.worldMatrix, this.parent.worldMatrix, this.matrix )
      }

      this.invalidWorldMatrix = false;
    }

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      child.updateMatrix();
      child._updateWorldMatrix();
    }
  }

  invalidate() {
    this.invalidMatrix = true
    this.invalidWorldMatrix = true

    // Invalidate children
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i]
      child.invalidate()
    }
  }

  addChild( t: Transform ) {
    if (t.parent != null) {
      t.parent.removeChild( t );
    }

    t.parent = this;
    this.children.push( t );
  }

  removeChild( t: Transform ) {
    const index = this.children.indexOf(t)
    if (index > -1) return this.children.splice(index, 1)
    return null
  }

}