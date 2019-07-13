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
export class Debug {
    static pipeline(state, type = "Color") {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeline = new Pipeline(state);
            const resource = yield Shader.load('debug.glsl');
            const shader = resource.data;
            pipeline.vertex_shader = shader.get('Vertex.' + type);
            pipeline.fragment_shader = shader.get('Fragment');
            pipeline.depthTest = true;
            pipeline.cullFace = true;
            pipeline.cullFaceMode = 1028 /* FRONT */;
            return pipeline;
        });
    }
}