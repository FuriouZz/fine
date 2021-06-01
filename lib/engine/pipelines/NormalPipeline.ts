import { GLContext } from "gl/constants/Types";
import Pipeline from "gl/Pipeline";
import Color from "engine/Color";
import NormalShader from "engine/shaders/NormalShader";

interface NormalPipelineOptions {
  premultiplyAlpha: boolean
  worldNormal: boolean
}

export default class NormalPipeline extends Pipeline {
  color = new Color(1, 0, 0, 1)
  opacity = 1
  options: NormalPipelineOptions = {
    premultiplyAlpha: false,
    worldNormal: true
  }

  constructor(gl: GLContext, options: Partial<NormalPipelineOptions> = {}) {
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

    this.shaders.vertex = NormalShader('Vertex', {
      WORLD: this.options.worldNormal
    })

    this.shaders.fragment = NormalShader('Fragment', {
      PRE_MULTIPLY_ALPHA: this.options.premultiplyAlpha
    })
  }
}