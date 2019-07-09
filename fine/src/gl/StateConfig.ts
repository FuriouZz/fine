import { GL } from "./constants/GL";

export class StateConfig {

  // Blending
  blend = false
  blendSrc = GL.SRC_COLOR
  blendDst = GL.DST_COLOR
  blendEq  = GL.FUNC_ADD

  blendSeparate = false
  alphaBlendSrc = GL.ONE
  alphaBlendDst = GL.ZERO
  alphaBlendEq  = GL.FUNC_ADD

  blendColor = new Float32Array([0,0,0,1])

  // Depth
  depthTest = false
  depthFunc = GL.NEVER
  depthRange = new Float32Array([0, 0])

  // Cullface
  cullFace = false
  cullFaceMode = GL.BACK

  // PolygonOffset
  polygonOffset = false
  polygonOffsetFactor = 2.0
  polygonOffsetUnits = 3.0

  // Mask
  depthWrite = false
  colorMask = [true, true, true, true]

  // Stencil
  stencil = false
  stencilFunc = GL.ALWAYS
  stencilFuncRef = 0
  stencilFuncMask = 1
  stencilOpFail = GL.KEEP
  stencilOpZFail = GL.KEEP
  stencilOpZPass = GL.KEEP

  stencilSeparate = false
  stencilBackFunc = GL.ALWAYS
  stencilBackFuncRef = 0
  stencilBackFuncMask = 1
  stencilBackOpFail = GL.KEEP
  stencilBackOpZFail = GL.KEEP
  stencilBackOpZPass = GL.KEEP

  // Scissor
  scissor = false
  scissorBox = new Int32Array([0,0,0,0])

  // Viewport
  viewport = new Int32Array([0,0,0,0])
  overrideViewport = false

  // Frontface
  frontFace = GL.CCW

  // Line
  lineWidth = 1.0

  // Dither
  dither = false

}