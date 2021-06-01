import { GLContext, ValidUniformType } from "gl/constants/Types"
import Pipeline from "gl/Pipeline"
import { Dispatcher } from "lol/js/dispatcher"
import CommonShader from "./shaders/CommonShader"

export default class RenderPass {
  pipeline: Pipeline
  name = "renderpass"
  onUpdateUniforms: Dispatcher<Record<string, ValidUniformType>>

  constructor(public gl: GLContext, pipeline?: Pipeline) {
    if (!pipeline) {
      pipeline = new Pipeline(gl)
      pipeline.shaders.vertex = CommonShader("Vertex.RenderPass")
    }
    this.pipeline = pipeline
    this.onUpdateUniforms = this.pipeline.onUse
    this.init()
  }

  init() {}

  dispose() {
    this.pipeline.dispose()
  }

}