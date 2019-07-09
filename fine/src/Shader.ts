import { Resource, ResourceItem } from "./Resource";
import  template from "lodash.template";

export interface IShader {
  get(name?: string, params?: any): string
}

class ShaderImports {

  static include(path: string, params: { data?: any, section?: string } = {}) {
    const shader = Shader.resource.get(path) as ResourceItem<IShader>
    if (!shader) return `Shader at "${path}" not loaded`
    return shader.data.get(params.section, params.data)
  }

}

export class Shader {
  static resource = new Resource()

  static async load(path: string) : Promise<ResourceItem<IShader>> {
    if (this.resource.get(path)) return this.resource.get(path)

    const response = await this.resource.text(path)
    const shader = this.parse(response.data)
    this.resource.set(path, shader)
    return this.resource.get(path)
  }

  static parse(shader: string) {
    const sections: Record<string, string> = {}
    sections['default'] = shader

    const lines = shader.split(/[\n\r]/g)
    let currentPass: string = null

    for (const index in lines) {
      const line = lines[index]

      if (line.match(/^-{2}\s.+$/)) {
        const match = line.match(/(\w|\.)+/)
        if (match !== null) {
          currentPass = match[0]
          continue;
        }
      }

      sections[currentPass] = sections[currentPass] || ''
      sections[currentPass] += line
    }

    return {
      get(name = "default", params?: any) {
        const shader = sections[name]
        return template(shader, {
          interpolate: /{{([\s\S]+?)}}/g,
          evaluate: /{%([\s\S]+?)%}/g,
          escape: /{#([\s\S]+?)#}/g,
          imports: ShaderImports
        })(params)
      }
    } as IShader
  }
}