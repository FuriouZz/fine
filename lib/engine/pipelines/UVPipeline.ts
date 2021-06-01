import { GLContext } from "gl/constants/Types";
import Pipeline from "gl/Pipeline";
import Color from "engine/Color";
import UVShader from "engine/shaders/UVShader";

interface UVPipelineOptions {
  premultiplyAlpha: boolean
}

export default class UVPipeline extends Pipeline {
  color = new Color(1, 0, 0, 1)
  opacity = 1
  options: UVPipelineOptions = {
    premultiplyAlpha: false,
  }

  constructor(gl: GLContext, options: Partial<UVPipelineOptions> = {}) {
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

    this.shaders.vertex = UVShader('Vertex')
    this.shaders.fragment = UVShader('Fragment', {
      PRE_MULTIPLY_ALPHA: this.options.premultiplyAlpha
    })
  }
}