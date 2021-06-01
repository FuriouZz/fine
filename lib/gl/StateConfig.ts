import { GLBlendMode, GLBlendEq, GLTest, GLCulling, GLStencilActions, GLFrontFaceDirection, GLClear } from "gl/constants/Types";

export default class StateConfig {

  // Blending
  protected blendRaw = {
    enabled: false,
    colorSrc: GLBlendMode.ONE,
    colorDst: GLBlendMode.ZERO,
    colorEq: GLBlendEq.ADD,

    separate: true,
    alphaSrc: GLBlendMode.ONE,
    alphaDst: GLBlendMode.ZERO,
    alphaEq: GLBlendEq.ADD,
  }

  protected blendColorRaw = new Float32Array([0, 0, 0, 0])

  // Depth
  protected depthTestRaw = {
    enabled: false,
    func: GLTest.LESS,
  }

  protected depthRangeRaw = new Float32Array([0, 1])

  // Cullface
  protected cullFaceRaw = {
    enabled: false,
    mode: GLCulling.BACK
  }

  // PolygonOffset
  protected polygonOffsetRaw = {
    enabled: false,
    factor: 0,
    units: 0,
  }

  // Mask
  protected depthWriteRaw = true
  protected colorMaskRaw = [true, true, true, true]

  // Stencil
  protected stencilRaw = {
    enabled: false,
    mask: 0xff,

    frontFunc: GLTest.ALWAYS,
    frontFuncRef: 0,
    frontFuncMask: 0xff,
    frontOnStencilFail: GLStencilActions.KEEP,
    frontOnDepthTestFail: GLStencilActions.KEEP,
    frontOnStencilDepthTestPass: GLStencilActions.KEEP,

    separate: true,
    backFunc: GLTest.ALWAYS,
    backFuncRef: 0,
    backFuncMask: 0xff,
    backOnStencilFail: GLStencilActions.KEEP,
    backOnDepthTestFail: GLStencilActions.KEEP,
    backOnStencilDepthTestPass: GLStencilActions.KEEP,
  }

  // Scissor
  protected scissorRaw = {
    enabled: false,
    box: new Int32Array([0, 0, 300, 150])
  }

  // Viewport
  protected viewportRaw = {
    enabled: false,
    box: new Int32Array([0, 0, 300, 150]),
  }

  // Frontface
  protected frontFaceRaw = GLFrontFaceDirection.CounterClockwise

  // Line
  protected lineWidthRaw = 1.0

  // Dither
  protected ditherRaw = true

  clone() {
    const c = new StateConfig()
    c.copy(this)
    return c
  }

  copy(c: StateConfig) {
    this.blendRaw.enabled = c.blendRaw.enabled
    this.blendRaw.colorSrc = c.blendRaw.colorSrc
    this.blendRaw.colorDst = c.blendRaw.colorDst
    this.blendRaw.colorEq = c.blendRaw.colorEq
    this.blendRaw.separate = c.blendRaw.separate
    this.blendRaw.alphaSrc = c.blendRaw.alphaSrc
    this.blendRaw.alphaDst = c.blendRaw.alphaDst
    this.blendRaw.alphaEq = c.blendRaw.alphaEq
    this.blendColorRaw = c.blendColorRaw.slice(0)
    this.depthTestRaw.enabled = c.depthTestRaw.enabled
    this.depthTestRaw.func = c.depthTestRaw.func
    this.depthRangeRaw = c.depthRangeRaw.slice(0)
    this.cullFaceRaw.enabled = c.cullFaceRaw.enabled
    this.cullFaceRaw.mode = c.cullFaceRaw.mode
    this.polygonOffsetRaw.enabled = c.polygonOffsetRaw.enabled
    this.polygonOffsetRaw.factor = c.polygonOffsetRaw.factor
    this.polygonOffsetRaw.units = c.polygonOffsetRaw.units
    this.depthWriteRaw = c.depthWriteRaw
    this.colorMaskRaw = c.colorMaskRaw
    this.stencilRaw.enabled = c.stencilRaw.enabled
    this.stencilRaw.frontFunc = c.stencilRaw.frontFunc
    this.stencilRaw.frontFuncRef = c.stencilRaw.frontFuncRef
    this.stencilRaw.frontFuncMask = c.stencilRaw.frontFuncMask
    this.stencilRaw.frontOnStencilFail = c.stencilRaw.frontOnStencilFail
    this.stencilRaw.frontOnDepthTestFail = c.stencilRaw.frontOnDepthTestFail
    this.stencilRaw.frontOnStencilDepthTestPass = c.stencilRaw.frontOnStencilDepthTestPass
    this.stencilRaw.separate = c.stencilRaw.separate
    this.stencilRaw.backFunc = c.stencilRaw.backFunc
    this.stencilRaw.backFuncRef = c.stencilRaw.backFuncRef
    this.stencilRaw.backFuncMask = c.stencilRaw.backFuncMask
    this.stencilRaw.backOnStencilFail = c.stencilRaw.backOnStencilFail
    this.stencilRaw.backOnDepthTestFail = c.stencilRaw.backOnDepthTestFail
    this.stencilRaw.backOnStencilDepthTestPass = c.stencilRaw.backOnStencilDepthTestPass
    this.scissorRaw.enabled = c.scissorRaw.enabled
    this.scissorRaw.box = c.scissorRaw.box.slice(0)
    this.viewportRaw.enabled = c.viewportRaw.enabled
    this.viewportRaw.box = c.viewportRaw.box.slice(0)
    this.frontFaceRaw = c.frontFaceRaw
    this.lineWidthRaw = c.lineWidthRaw
    this.ditherRaw = c.ditherRaw
    return this
  }

  enableViewport(enabled: boolean) {
    this.viewportRaw.enabled = enabled
    return this
  }

  viewport(x: number, y: number, width: number, height: number) {
    this.viewportRaw.box[0] = x
    this.viewportRaw.box[1] = y
    this.viewportRaw.box[2] = width
    this.viewportRaw.box[3] = height
    return this
  }

  enableScissor(enabled: boolean) {
    this.scissorRaw.enabled = enabled
    return this
  }

  scissor(x: number, y: number, width: number, height: number) {
    this.scissorRaw.box[0] = x
    this.scissorRaw.box[1] = y
    this.scissorRaw.box[2] = width
    this.scissorRaw.box[3] = height
    return this
  }

  blendColor(r: number, g: number, b: number, a: number) {
    this.blendColorRaw[0] = r
    this.blendColorRaw[1] = g
    this.blendColorRaw[2] = b
    this.blendColorRaw[3] = a
    return this
  }

  colorMask(r: boolean, g: boolean = r, b: boolean = r, a: boolean = r) {
    this.colorMaskRaw[0] = r
    this.colorMaskRaw[1] = g
    this.colorMaskRaw[2] = b
    this.colorMaskRaw[3] = a
    return this
  }

  enableDepthWrite(enabled: boolean) {
    this.depthWriteRaw = enabled
    return this
  }

  depthRange(zNear: number, zFar: number) {
    this.depthRangeRaw[0] = zNear
    this.depthRangeRaw[1] = zFar
    return this
  }

  enableBlending(enabled: boolean) {
    this.blendRaw.enabled = enabled
    return this
  }

  blend(src: GLBlendMode, dst: GLBlendMode, eq: GLBlendEq = GLBlendEq.ADD) {
    this.blendRaw.separate = false
    this.blendRaw.colorSrc = src
    this.blendRaw.colorDst = dst
    this.blendRaw.colorEq = eq
    return this
  }

  colorBlend(src: GLBlendMode, dst: GLBlendMode, eq: GLBlendEq = GLBlendEq.ADD) {
    this.blendRaw.separate = true
    this.blendRaw.colorSrc = src
    this.blendRaw.colorDst = dst
    this.blendRaw.colorEq = eq
    return this
  }

  alphaBlend(src: GLBlendMode, dst: GLBlendMode, eq: GLBlendEq = GLBlendEq.ADD) {
    this.blendRaw.separate = true
    this.blendRaw.alphaSrc = src
    this.blendRaw.alphaDst = dst
    this.blendRaw.alphaEq = eq
    return this
  }

  enableStencil(enabled: boolean) {
    this.stencilRaw.enabled = enabled
    return this
  }

  stencil(func: GLTest, ref: number, mask: number, onStencilFail = GLStencilActions.KEEP, onDepthTestFail = onStencilFail, onStencilDepthTestPass = onStencilFail) {
    this.stencilRaw.separate = false
    this.stencilRaw.frontFunc = func
    this.stencilRaw.frontFuncRef = ref
    this.stencilRaw.frontFuncMask = mask
    this.stencilRaw.frontOnStencilFail = onStencilFail
    this.stencilRaw.frontOnDepthTestFail = onDepthTestFail
    this.stencilRaw.frontOnStencilDepthTestPass = onStencilDepthTestPass
    return this
  }

  stencilFront(func: GLTest, ref: number, mask: number, onStencilFail = GLStencilActions.KEEP, onDepthTestFail = onStencilFail, onStencilDepthTestPass = onStencilFail) {
    this.stencilRaw.separate = true
    this.stencilRaw.frontFunc = func
    this.stencilRaw.frontFuncRef = ref
    this.stencilRaw.frontFuncMask = mask
    this.stencilRaw.frontOnStencilFail = onStencilFail
    this.stencilRaw.frontOnDepthTestFail = onDepthTestFail
    this.stencilRaw.frontOnStencilDepthTestPass = onStencilDepthTestPass
    return this
  }

  stencilBack(func: GLTest, ref: number, mask: number, onStencilFail = GLStencilActions.KEEP, onDepthTestFail = onStencilFail, onStencilDepthTestPass = onStencilFail) {
    this.stencilRaw.separate = true
    this.stencilRaw.backFunc = func
    this.stencilRaw.backFuncRef = ref
    this.stencilRaw.backFuncMask = mask
    this.stencilRaw.backOnStencilFail = onStencilFail
    this.stencilRaw.backOnDepthTestFail = onDepthTestFail
    this.stencilRaw.backOnStencilDepthTestPass = onStencilDepthTestPass
    return this
  }

  stencilMask(mask: number) {
    this.stencilRaw.mask = mask
    return this
  }

  enableDepthTest(enabled: boolean) {
    this.depthTestRaw.enabled = enabled
    return this
  }

  depthTest(func: GLTest) {
    this.depthTestRaw.func = func
    return this
  }

  enableCullFace(enabled: boolean) {
    this.cullFaceRaw.enabled = enabled
    return this
  }

  cullFace(mode: GLCulling) {
    this.cullFaceRaw.mode = mode
    return this
  }

  enablePolygonOffset(enabled: boolean) {
    this.polygonOffsetRaw.enabled = enabled
    return this
  }

  polygonOffset(factor: number, units: number) {
    this.polygonOffsetRaw.factor = factor
    this.polygonOffsetRaw.units = units
    return this
  }

  enableDither(enabled: boolean) {
    this.ditherRaw = enabled
    return this
  }

  frontFace(direction: GLFrontFaceDirection) {
    this.frontFaceRaw = direction
    return this
  }

  lineWidth(value: number) {
    this.lineWidthRaw = value
    return this
  }

  transparent(enable: boolean, lossy = false) {
    this.enableBlending(true)
    if (enable) {
      if (lossy) {
        this.blend(GLBlendMode.SRC_ALPHA, GLBlendMode.ONE_MINUS_SRC_ALPHA, GLBlendEq.ADD)
      } else {
        this.blend(GLBlendMode.ONE, GLBlendMode.ONE_MINUS_SRC_ALPHA)
      }
    } else {
      this.blend(GLBlendMode.ONE, GLBlendMode.ZERO, GLBlendEq.ADD)
    }
    return this
  }

}