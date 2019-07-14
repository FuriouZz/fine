import { mat4, quat, vec3 } from "gl-matrix";
const TMP_QUAT = quat.create();
export class Transform {
    constructor() {
        this.localScale = vec3.set(vec3.create(), 1, 1, 1);
        this.localPosition = vec3.set(vec3.create(), 0, 0, 0);
        this.localRotation = quat.identity(quat.create());
        this.children = new Array();
        this.matrix = mat4.identity(mat4.create());
        this.worldMatrix = mat4.identity(mat4.create());
        this.invalidWorldMatrix = true;
        this.invalidMatrix = true;
    }
    scale(x = this.localScale[0], y = this.localScale[1], z = this.localScale[2]) {
        this.localScale[0] = x;
        this.localScale[1] = y;
        this.localScale[2] = z;
        this.invalidate();
    }
    rotateX(radian) {
        quat.rotateX(this.localRotation, this.localRotation, radian);
        this.invalidate();
    }
    rotateY(radian) {
        quat.rotateY(this.localRotation, this.localRotation, radian);
        this.invalidate();
    }
    rotateZ(radian) {
        quat.rotateZ(this.localRotation, this.localRotation, radian);
        this.invalidate();
    }
    translate(x, y, z) {
        this.localPosition[0] = this.localPosition[0] + x;
        this.localPosition[1] = this.localPosition[1] + y;
        this.localPosition[2] = this.localPosition[2] + z;
        this.invalidate();
    }
    setPosition(x = this.localPosition[0], y = this.localPosition[1], z = this.localPosition[2]) {
        this.localPosition[0] = x;
        this.localPosition[1] = y;
        this.localPosition[2] = z;
        this.invalidate();
    }
    setRotation(axis, radian) {
        quat.setAxisAngle(this.localRotation, axis, radian);
        this.invalidate();
    }
    getUp(out) {
        vec3.set(out, 0, 1, 0);
        mat4.getRotation(TMP_QUAT, this.worldMatrix);
        vec3.transformQuat(out, out, TMP_QUAT);
    }
    getForward(out) {
        vec3.set(out, 0, 0, -1);
        mat4.getRotation(TMP_QUAT, this.worldMatrix);
        vec3.transformQuat(out, out, TMP_QUAT);
    }
    getRight(out) {
        vec3.set(out, 1, 0, 0);
        mat4.getRotation(TMP_QUAT, this.worldMatrix);
        vec3.transformQuat(out, out, TMP_QUAT);
    }
    decompose() {
        mat4.getRotation(this.localRotation, this.matrix);
        mat4.getScaling(this.localScale, this.matrix);
        mat4.getTranslation(this.localPosition, this.matrix);
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
            mat4.fromRotationTranslationScale(this.matrix, this.localRotation, this.localPosition, this.localScale);
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
                mat4.mul(this.worldMatrix, this.parent.worldMatrix, this.matrix);
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
        // Invalidate children
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            child.invalidate();
        }
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
