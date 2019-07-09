import { StateConfig } from './StateConfig';
import { CompileShader } from './Utils';
import { Uniform } from './Uniform';
import { Dispatcher } from '../utils/Dispatcher';
export class Pipeline extends StateConfig {
    constructor(state = null) {
        super();
        this.state = state;
        this.compiled = false;
        this.attributes = {};
        this.uniforms = {};
        this.onUpdateUniforms = new Dispatcher();
        this.gl = state.gl;
    }
    compile() {
        if (!this.compiled) {
            this.vShader = CompileShader(this.gl, 35633 /* VERTEX */, this.vertex_shader);
            this.fShader = CompileShader(this.gl, 35632 /* FRAGMENT */, this.fragment_shader);
            this.program = this.gl.createProgram();
            this.gl.attachShader(this.program, this.vShader);
            this.gl.attachShader(this.program, this.fShader);
            this.gl.linkProgram(this.program);
            if (this.gl.getProgramParameter(this.program, 35714 /* LINK_STATUS */) == 0) {
                var message = "Unable to initialize the shader program";
                message += "\n" + this.gl.getProgramInfoLog(this.program);
                console.warn(message);
                return;
            }
            this.get_locations();
            this.compiled = true;
        }
    }
    get_locations() {
        // Attributes
        let attributeLocation;
        let attribute;
        let attributeCount = this.gl.getProgramParameter(this.program, 35721 /* ACTIVE_ATTRIBUTES */);
        for (let i = 0; i < attributeCount; i++) {
            attribute = this.gl.getActiveAttrib(this.program, i);
            attributeLocation = this.gl.getAttribLocation(this.program, attribute.name);
            this.attributes[attribute.name] = attributeLocation;
        }
        // Uniforms
        let uniformLocation;
        let uniform;
        let uniformCount = this.gl.getProgramParameter(this.program, 35718 /* ACTIVE_UNIFORMS */);
        for (let i = 0; i < uniformCount; i++) {
            uniform = this.gl.getActiveUniform(this.program, i);
            if (uniform == null) {
                this.gl.getError();
                continue;
            }
            uniformLocation = this.gl.getUniformLocation(this.program, uniform.name);
            if (uniformLocation == null)
                continue;
            this.uniforms[uniform.name] = new Uniform(this.gl, uniformLocation, uniform);
        }
    }
    use() {
        if (!this.compiled)
            this.compile();
        this.gl.useProgram(this.program);
        this.onUpdateUniforms.dispatch(this.uniforms);
        this.state.apply(this); // Apply state
        // this.state.apply() // Reset state
    }
    dispose() {
        if (this.compiled) {
            this.gl.deleteProgram(this.program);
            this.gl.deleteShader(this.vShader);
            this.gl.deleteShader(this.fShader);
            this.compiled = false;
        }
    }
}
