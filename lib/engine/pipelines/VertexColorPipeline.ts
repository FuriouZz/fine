import { GLContext } from "gl/constants/Types";
import Pipeline from "gl/Pipeline";
import Color from "engine/Color";
import VertexColorShader from "engine/shaders/VertexColorShader";

interface VertexColorPipelineOptions {
  premultiplyAlpha: boolean
}

export default class VertexColorPipeline extends Pipeline {
  color = new Color(1, 0, 0, 1)
  opacity = 1
  options: VertexColorPipelineOptions = {
    premultiplyAlpha: false,
  }

  constructor(gl: GLContext, options: Partial<VertexColorPipelineOptions> = {}) {
    super(gl)
    this.options = {
      ...this.options,
      ...options,
    }
    this.state.enableDepthTest(true)
  }

  beforeCompile() {
    this.onUse.on(u => {
      u.uOpacity = this.opacity
      u.uColor = this.color.getDecimals()
    })

    this.shaders.vertex = VertexColorShader('Vertex')
    this.shaders.fragment = VertexColorShader('Fragment', {
      PRE_MULTIPLY_ALPHA: this.options.premultiplyAlpha
    })
  }
}