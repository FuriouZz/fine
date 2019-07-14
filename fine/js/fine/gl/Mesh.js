import { mat4 } from "gl-matrix";
import { Transform } from "../engine/Transform";
export class Mesh {
    constructor(geometry, pipeline) {
        this.geometry = geometry;
        this.pipeline = pipeline;
        this.transform = new Transform();
        this._M4 = mat4.identity(mat4.create());
        this.onUpdateUniforms = this.onUpdateUniforms.bind(this);
        this.pipeline.onUpdateUniforms.on(this.onUpdateUniforms);
    }
    computeModelViewProjection(camera) {
        camera.model_view_projection_matrix(this.transform.getMatrix(), this._M4);
    }
    onUpdateUniforms(uniforms) {
        if (uniforms.uMVPMatrix)
            uniforms.uMVPMatrix.matrix4(this._M4);
        if (uniforms.uWorldMatrix)
            uniforms.uWorldMatrix.matrix4(this.transform.getWorldMatrix());
    }
    render() {
        this.pipeline.use();
        this.geometry.draw(this.pipeline);
    }
    dispose() {
        this.pipeline.onUpdateUniforms.off(this.onUpdateUniforms);
        this.pipeline.dispose();
        this.geometry.dispose();
    }
}
