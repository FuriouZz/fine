import { StateConfig } from './StateConfig';
import { State } from './State';
import { GLContext } from './constants/Types';
import { Uniform } from './Uniform';
import { Dispatcher } from '../utils/Dispatcher';
export declare class Pipeline extends StateConfig {
    state: State;
    private compiled;
    private vShader;
    private fShader;
    gl: GLContext;
    program: WebGLProgram;
    vertex_shader: string;
    fragment_shader: string;
    attributes: Record<string, number>;
    uniforms: Record<string, Uniform>;
    onUpdateUniforms: Dispatcher<Record<string, Uniform>>;
    constructor(state?: State);
    compile(): void;
    private get_locations;
    use(): void;
    applyState(): void;
    popState(): void;
    dispose(): void;
}
