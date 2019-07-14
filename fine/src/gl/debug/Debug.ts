import { Pipeline } from "../Pipeline";
import { State } from "../State";
import { Shader } from "../../engine/Shader";
import { Color } from "../../engine/Color";

export class Debug {

  static async pipeline(state?: State, type: "Color" | "UV" | "Normal" | "WorldNormal" = "Color", color = Color.Red()) {
    const pipeline = new Pipeline(state)

    const resource = await Shader.load('debug.glsl')
    const shader = resource.data

    pipeline.vertex_shader = shader.get('Vertex.' + type, { color: Color.to_vec4_glsl(color) })
    pipeline.fragment_shader = shader.get('Fragment')

    pipeline.cullFace = true
    pipeline.depthTest = true
    pipeline.depthWrite = true

    return pipeline
  }

}