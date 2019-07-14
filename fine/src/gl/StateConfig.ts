import { GLBlendMode, GLBlendEq, GLTest, GLCulling, GLStencilActions, GLFrontFaceDirection } from "./constants/Types";

export class StateConfig {

  // Blending
  blend = false
  blendSrc = GLBlendMode.ONE
  blendDst = GLBlendMode.ZERO
  blendEq  = GLBlendEq.ADD

  blendSeparate = true
  alphaBlendSrc = GLBlendMode.ONE
  alphaBlendDst = GLBlendMode.ZERO
  alphaBlendEq  = GLBlendEq.ADD

  blendColor = new Float32Array([0,0,0,0])

  // Depth
  depthTest = false
  depthFunc = GLTest.LESS
  depthRange = new Float32Array([0, 1])

  // Cullface
  cullFace = false
  cullFaceMode = GLCulling.BACK

  // PolygonOffset
  polygonOffset = false
  polygonOffsetFactor = 0
  polygonOffsetUnits = 0

  // Mask
  depthWrite = true
  colorMask = [true, true, true, true]

  // Stencil
  stencil = false
  stencilFunc = GLTest.ALWAYS
  stencilFuncRef = 0
  stencilFuncMask = 1
  stencilOpFail = GLStencilActions.KEEP
  stencilOpZFail = GLStencilActions.KEEP
  stencilOpZPass = GLStencilActions.KEEP

  stencilSeparate = true
  stencilBackFunc = GLTest.ALWAYS
  stencilBackFuncRef = 0
  stencilBackFuncMask = 1
  stencilBackOpFail = GLStencilActions.KEEP
  stencilBackOpZFail = GLStencilActions.KEEP
  stencilBackOpZPass = GLStencilActions.KEEP

  // Scissor
  scissor = false
  scissorBox = new Int32Array([0,0,300,150])

  // Viewport
  viewport = new Int32Array([0,0,300,150])
  overrideViewport = false

  // Frontface
  frontFace = GLFrontFaceDirection.CounterClockwise

  // Line
  lineWidth = 1.0

  // Dither
  dither = true

  transparent(enable: boolean) {
    if (enable) {
      this.blend = true
      this.blendSrc = GLBlendMode.SRC_ALPHA
      this.blendDst = GLBlendMode.ONE_MINUS_SRC_ALPHA
      this.blendEq = GLBlendEq.ADD
      this.blendSeparate = true
      this.alphaBlendSrc = GLBlendMode.SRC_ALPHA
      this.alphaBlendDst = GLBlendMode.ONE_MINUS_SRC_ALPHA
      this.alphaBlendEq = GLBlendEq.ADD
    } else {
      this.blend = true
      this.blendSrc = GLBlendMode.ONE
      this.blendDst = GLBlendMode.ZERO
      this.blendEq = GLBlendEq.ADD
      this.blendSeparate = true
      this.alphaBlendSrc = GLBlendMode.ONE
      this.alphaBlendDst = GLBlendMode.ZERO
      this.alphaBlendEq = GLBlendEq.ADD
    }
  }
}