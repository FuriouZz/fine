import { Pipeline } from "../Pipeline";
import { State } from "../State";
import { Shader } from "../../engine/Shader";
import { GL } from "../constants/GL";

export class Debug {

  static async pipeline(state?: State, type: "Color" | "UV" | "Normal" = "Color") {
    const pipeline = new Pipeline(state)

    const resource = await Shader.load('debug.glsl')
    const shader = resource.data

    pipeline.vertex_shader = shader.get('Vertex.' + type)
    pipeline.fragment_shader = shader.get('Fragment')

    pipeline.depthTest = true
    pipeline.cullFace = true

    return pipeline
  }

}