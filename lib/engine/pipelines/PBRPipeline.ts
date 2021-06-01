import { GLContext } from "gl/constants/Types";
import Pipeline from "gl/Pipeline";
import Texture from "gl/Texture";
import Color from "engine/Color";
import PBRShader from "engine/shaders/PBRShader";

export default class PBRPipeline extends Pipeline {
  baseColor: Color
  baseColorTexture: Texture
  normalTexture: Texture
  metallicTexture: Texture
  metallicFactor = 0
  roughnessTexture: Texture
  roughnessFactor = 0
  opacity = 1

  constructor(gl: GLContext) {
    super(gl)
    this.state.enableDepthTest(true)
  }

  beforeCompile() {
    if (!!this.baseColor) this.defines['HAS_BASE_COLOR'] = "1"
    if (!!this.baseColorTexture) this.defines['HAS_BASE_COLOR_TEXTURE'] = "1"
    if (!!this.normalTexture) this.defines['HAS_NORMAL_TEXTURE'] = "1"
    if (!!this.metallicTexture) this.defines['HAS_METALLIC_TEXTURE'] = "1"
    if (!!this.roughnessTexture) this.defines['HAS_ROUGHNESS_TEXTURE'] = "1"

    this.shaders.vertex = PBRShader("Vertex")
    this.shaders.fragment = PBRShader("Fragment")

    this.onUse.on(u => {
      u.uBaseColor = this.baseColor.getDecimals()
      u.uBaseColorTexture = this.baseColorTexture
      u.uNormalTexture = this.normalTexture
      u.uMetallicTexture = this.metallicTexture
      u.uRoughnessTexture = this.roughnessTexture
      u.uMetallicFactor = this.metallicFactor
      u.uRoughnessFactor = this.roughnessFactor
      u.uOpacity = this.opacity
    })
  }
}