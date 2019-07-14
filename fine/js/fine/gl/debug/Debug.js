var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Pipeline } from "../Pipeline";
import { Shader } from "../../engine/Shader";
import { Color } from "../../engine/Color";
export class Debug {
    static pipeline(state, type = "Color", color = Color.Red()) {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeline = new Pipeline(state);
            const resource = yield Shader.load('debug.glsl');
            const shader = resource.data;
            pipeline.vertex_shader = shader.get('Vertex.' + type, { color: Color.to_vec4_glsl(color) });
            pipeline.fragment_shader = shader.get('Fragment');
            pipeline.cullFace = true;
            pipeline.depthTest = true;
            pipeline.depthWrite = true;
            return pipeline;
        });
    }
}
