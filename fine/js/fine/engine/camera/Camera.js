import { mat4, vec4 } from "gl-matrix";
import { Transform } from "../Transform";
import { Orthographic } from "./Orthographic";
import { Perspective } from "./Perspective";
const IMVP = mat4.identity(mat4.create());
export class Camera {
    constructor() {
        this.view = mat4.identity(mat4.create());
        this.viewProjection = mat4.identity(mat4.create());
        this.transform = new Transform();
    }
    model_view_projection_matrix(modelMatrix, output) {
        mat4.mul(output, this.viewProjection, modelMatrix);
    }
    model_view_matrix(modelMatrix, output) {
        mat4.mul(output, this.view, modelMatrix);
    }
    unproject(v, output) {
        mat4.copy(IMVP, this.viewProjection);
        mat4.invert(IMVP, IMVP);
        vec4.transformMat4(output, v, IMVP);
    }
    update_view_matrix(transform = this.transform) {
        mat4.invert(this.view, transform.getWorldMatrix());
    }
    update_view_projection_matrix() {
        mat4.mul(this.viewProjection, this.lens.getProjection(), this.view);
    }
    static Orthographic(left = -1, right = 1, bottom = -1, top = 1, near = 1.0, far = 100.0) {
        const camera = new Camera();
        camera.lens = new Orthographic(left, right, bottom, top, near, far);
        camera.update_view_projection_matrix();
        return camera;
    }
    static Perspective(fovy = 1, aspect = 1, near = 1.0, far = 100.0) {
        const camera = new Camera();
        camera.lens = new Perspective(fovy, aspect, near, far);
        camera.update_view_projection_matrix();
        return camera;
    }
}
