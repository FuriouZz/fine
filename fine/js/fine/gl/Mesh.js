import { mat4 } from "gl-matrix";
import { Transform } from "../engine/Transform";
export class Mesh {
    constructor(geometry, pipeline) {
        this.geometry = geometry;
        this.pipeline = pipeline;
        this.transform = new Transform();
        this.modelViewProjectionMatrix = mat4.identity(mat4.create());
        this.onUpdateUniforms = this.onUpdateUniforms.bind(this);
        this.pipeline.onUpdateUniforms.on(this.onUpdateUniforms);
    }
    computeModelViewProjection(camera) {
        camera.model_view_projection_matrix(this.transform.getWorldMatrix(), this.modelViewProjectionMatrix);
    }
    onUpdateUniforms(uniforms) {
        if (uniforms.uMVPMatrix)
            uniforms.uMVPMatrix.matrix4(this.modelViewProjectionMatrix);
        if (uniforms.uWorldMatrix)
            uniforms.uWorldMatrix.matrix4(this.transform.getWorldMatrix());
    }
    render() {
        this.pipeline.use();
        this.pipeline.applyState();
        this.geometry.draw(this.pipeline);
        this.pipeline.popState();
    }
    dispose() {
        this.pipeline.onUpdateUniforms.off(this.onUpdateUniforms);
        this.pipeline.dispose();
        this.geometry.dispose();
    }
}
