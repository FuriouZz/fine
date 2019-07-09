import { mat4, quat, vec3 } from "gl-matrix";
const M4 = mat4.create();
export class Transform {
    constructor() {
        this.scale = vec3.set(vec3.create(), 1, 1, 1);
        this.position = vec3.set(vec3.create(), 0, 0, 0);
        this.rotation = quat.identity(quat.create());
        this.children = new Array();
        this.matrix = mat4.identity(mat4.create());
        this.worldMatrix = mat4.identity(mat4.create());
        this.invalidWorldMatrix = true;
        this.invalidMatrix = true;
    }
    setScale(x = this.scale[0], y = this.scale[1], z = this.scale[2]) {
        this.scale[0] = x;
        this.scale[1] = y;
        this.scale[2] = z;
        this.invalidate();
    }
    setPosition(x = this.position[0], y = this.position[1], z = this.position[2]) {
        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;
        this.invalidate();
    }
    setRotation(axis, radian) {
        quat.setAxisAngle(this.rotation, axis, radian);
    }
    rotateX(radian) {
        quat.rotateX(this.rotation, this.rotation, radian);
        this.invalidate();
    }
    rotateY(radian) {
        quat.rotateY(this.rotation, this.rotation, radian);
        this.invalidate();
    }
    rotateZ(radian) {
        quat.rotateZ(this.rotation, this.rotation, radian);
        this.invalidate();
    }
    translate(x, y, z) {
        this.position[0] = this.position[0] + x;
        this.position[1] = this.position[1] + y;
        this.position[2] = this.position[2] + z;
        this.invalidate();
    }
    decompose() {
        mat4.getRotation(this.rotation, this.matrix);
        mat4.getScaling(this.scale, this.matrix);
        mat4.getTranslation(this.position, this.matrix);
    }
    getMatrix() {
        return this.matrix;
    }
    setMatrix(m) {
        mat4.copy(this.matrix, m);
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
        if (this.parent == null)
            return null;
        var pp = this.parent.getInvalidParent();
        if (pp != null)
            return pp;
        if (this.parent.invalidWorldMatrix)
            return this.parent;
        return null;
    }
    updateMatrix() {
        if (this.invalidMatrix) {
            mat4.fromRotationTranslationScale(this.matrix, this.rotation, this.position, this.scale);
            this.invalidMatrix = false;
        }
    }
    updateWorldMatrix() {
        var invalidParent = this.getInvalidParent();
        if (invalidParent == null) {
            this.updateMatrix();
            this._updateWorldMatrix();
        }
        else {
            invalidParent.updateMatrix();
            invalidParent._updateWorldMatrix();
        }
    }
    _updateWorldMatrix() {
        if (this.invalidWorldMatrix) {
            if (this.parent == null) {
                mat4.copy(this.worldMatrix, this.matrix);
            }
            else {
                mat4.copy(M4, this.parent.worldMatrix);
                mat4.mul(M4, M4, this.matrix);
                mat4.copy(this.worldMatrix, M4);
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
        this.invalidMatrix = true;
        this.invalidWorldMatrix = true;
    }
    addChild(t) {
        if (t.parent != null) {
            t.parent.removeChild(t);
        }
        t.parent = this;
        this.children.push(t);
    }
    removeChild(t) {
        const index = this.children.indexOf(t);
        if (index > -1)
            return this.children.splice(index, 1);
        return null;
    }
}
