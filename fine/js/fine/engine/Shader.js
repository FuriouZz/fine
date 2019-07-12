var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Resource } from "./Resource";
import template from "lodash.template";
const ShaderImports = {
    include(path, params = {}) {
        const shader = Shader.resource.get(path);
        if (!shader)
            return `Shader at "${path}" not loaded`;
        return shader.data.get(params.section, params.data);
    }
};
export class Shader {
    static load(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.resource.get(path))
                return this.resource.get(path);
            const response = yield this.resource.text(path);
            const shader = this.parse(response.data);
            this.resource.set(path, shader);
            return this.resource.get(path);
        });
    }
    static parse(shader) {
        const sections = {};
        sections['default'] = shader;
        const lines = shader.split(/[\n\r]/g);
        let currentPass = null;
        for (const index in lines) {
            const line = lines[index];
            if (line.match(/^-{2}\s.+$/)) {
                const match = line.match(/(\w|\.)+/);
                if (match !== null) {
                    currentPass = match[0];
                    continue;
                }
            }
            if (currentPass) {
                sections[currentPass] = sections[currentPass] || '';
                sections[currentPass] += line + '\n';
            }
        }
        return {
            get(name = "default", params) {
                const shader = sections[name];
                const t = template(shader, {
                    interpolate: /{{([\s\S]+?)}}/g,
                    evaluate: /{%([\s\S]+?)%}/g,
                    escape: /{#([\s\S]+?)#}/g,
                    imports: ShaderImports
                })(params);
                return t;
            }
        };
    }
}
Shader.resource = new Resource();
