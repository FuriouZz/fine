import { GLContext } from "gl/constants/Types";
import Pipeline from "gl/Pipeline";
import Texture from "gl/Texture";
import Color from "engine/Color";
import BasicShader from "engine/shaders/BasicShader";
import TextureUtils from "engine/TextureUtils";

interface BasicPipelineOptions {
  premultiplyAlpha: boolean
}

export default class BasicPipeline extends Pipeline {
  color = new Color(1, 0, 0, 1)
  opacity = 1
  texture: Texture
  options: BasicPipelineOptions = {
    premultiplyAlpha: false,
  }

  constructor(gl: GLContext, options: Partial<BasicPipelineOptions> = {}) {
    super(gl)
    this.options = {
      ...this.options,
      ...options,
    }
    this.texture = TextureUtils.WHITE(gl)
    this.state.enableDepthTest(true)
  }

  beforeCompile() {
    this.onUse.on(u => {
      u.uOpacity = this.opacity
      u.uColor = this.color.getDecimals()
      u.uTexture = this.texture
    })

    this.shaders.vertex = BasicShader('Vertex')
    this.shaders.fragment = BasicShader('Fragment', {
      PRE_MULTIPLY_ALPHA: this.options.premultiplyAlpha
    })
  }
}