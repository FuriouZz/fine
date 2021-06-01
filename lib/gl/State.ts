import { GL } from "gl/constants/Webgl";
import { GLContext } from "gl/constants/Types";
import StateClearConfig from "gl/StateClearConfig";
import StateConfig from "gl/StateConfig";

export default class State {

  private static _states = new Map<GLContext, StateConfig>()

  static fromContext(gl: GLContext) {
    if (State._states.has(gl)) return State._states.get(gl)

    const c = new StateConfig()

    // Blend
    c["blendRaw"].enabled = gl.getParameter(GL.BLEND);
    c["blendRaw"].separate = true

    c["blendRaw"].colorSrc = gl.getParameter(GL.BLEND_SRC_RGB);
    c["blendRaw"].colorDst = gl.getParameter(GL.BLEND_DST_RGB);
    c["blendRaw"].colorEq = gl.getParameter(GL.BLEND_EQUATION_RGB);

    c["blendRaw"].alphaSrc = gl.getParameter(GL.BLEND_SRC_ALPHA);
    c["blendRaw"].alphaDst = gl.getParameter(GL.BLEND_DST_ALPHA);
    c["blendRaw"].alphaEq = gl.getParameter(GL.BLEND_EQUATION_ALPHA);

    c["blendColorRaw"] = gl.getParameter(GL.BLEND_COLOR);

    // Depth
    c["depthTestRaw"].enabled = gl.getParameter(GL.DEPTH_TEST);
    c["depthTestRaw"].func = gl.getParameter(GL.DEPTH_FUNC);
    c["depthRangeRaw"] = gl.getParameter(GL.DEPTH_RANGE);

    // Cullface
    c["cullFaceRaw"].enabled = gl.getParameter(GL.CULL_FACE);
    c["cullFaceRaw"].mode = gl.getParameter(GL.CULL_FACE_MODE);

    // Polygon offset
    c["polygonOffsetRaw"].enabled = gl.getParameter(GL.POLYGON_OFFSET_FILL);
    c["polygonOffsetRaw"].factor = gl.getParameter(GL.POLYGON_OFFSET_FACTOR);
    c["polygonOffsetRaw"].units = gl.getParameter(GL.POLYGON_OFFSET_UNITS);

    // Mask
    c["depthWriteRaw"] = gl.getParameter(GL.DEPTH_WRITEMASK);
    c["colorMaskRaw"] = gl.getParameter(GL.COLOR_WRITEMASK);

    // Stencil
    c["stencilRaw"].enabled = gl.getParameter(GL.STENCIL_TEST);
    c["stencilRaw"].separate = true

    c["stencilRaw"].frontFunc = gl.getParameter(GL.STENCIL_FUNC);
    c["stencilRaw"].frontFuncMask = gl.getParameter(GL.STENCIL_VALUE_MASK);
    c["stencilRaw"].frontFuncRef = gl.getParameter(GL.STENCIL_REF);
    c["stencilRaw"].frontOnStencilFail = gl.getParameter(GL.STENCIL_FAIL);
    c["stencilRaw"].frontOnStencilDepthTestPass = gl.getParameter(GL.STENCIL_PASS_DEPTH_PASS);
    c["stencilRaw"].frontOnDepthTestFail = gl.getParameter(GL.STENCIL_PASS_DEPTH_FAIL);

    c["stencilRaw"].backFunc = gl.getParameter(GL.STENCIL_BACK_FUNC);
    c["stencilRaw"].backFuncMask = gl.getParameter(GL.STENCIL_BACK_VALUE_MASK);
    c["stencilRaw"].backFuncRef = gl.getParameter(GL.STENCIL_BACK_REF);
    c["stencilRaw"].backOnStencilFail = gl.getParameter(GL.STENCIL_BACK_FAIL);
    c["stencilRaw"].backOnStencilDepthTestPass = gl.getParameter(GL.STENCIL_BACK_PASS_DEPTH_PASS);
    c["stencilRaw"].backOnDepthTestFail = gl.getParameter(GL.STENCIL_BACK_PASS_DEPTH_FAIL);

    // gl.getParameter( GL.STENCIL_BITS );

    // Scissor
    c["scissorRaw"].enabled = gl.getParameter(GL.SCISSOR_TEST);
    c["scissorRaw"].box = gl.getParameter(GL.SCISSOR_BOX);

    // Viewport
    c["viewportRaw"].enabled = false
    c["viewportRaw"].box = gl.getParameter(GL.VIEWPORT);

    // Frontface
    c["frontFaceRaw"] = gl.getParameter(GL.FRONT_FACE);

    // Line width
    c["lineWidthRaw"] = gl.getParameter(GL.LINE_WIDTH);

    // Dither
    c["ditherRaw"] = gl.getParameter(GL.DITHER);

    State._states.set(gl, c)

    return c
  }

  static pop(gl: GLContext) {
    const c = State._states.get(gl)
    if (c) State.apply(gl, c)
  }

  static apply(gl: GLContext, c: StateConfig) {
    // Blend
    if (c["blendRaw"].enabled) {
      gl.enable(GL.BLEND);

      if (c["blendRaw"].separate) {
        gl.blendFuncSeparate(c["blendRaw"].colorSrc, c["blendRaw"].colorDst, c["blendRaw"].alphaSrc, c["blendRaw"].alphaDst);
        gl.blendEquationSeparate(c["blendRaw"].colorEq, c["blendRaw"].alphaEq);
      } else {
        gl.blendFunc(c["blendRaw"].colorSrc, c["blendRaw"].colorDst);
        gl.blendEquation(c["blendRaw"].colorEq);
      }
    } else {
      gl.disable(GL.BLEND);
    }

    // Depth
    if (c["depthTestRaw"].enabled) {
      gl.enable(GL.DEPTH_TEST);
      gl.depthFunc(c["depthTestRaw"].func);
    } else {
      gl.disable(GL.DEPTH_TEST);
    }
    gl.depthRange(c["depthRangeRaw"][0], c["depthRangeRaw"][1]);

    // Cullface
    if (c["cullFaceRaw"].enabled) {
      gl.enable(GL.CULL_FACE);
      gl.cullFace(c["cullFaceRaw"].mode);
    } else {
      gl.disable(GL.CULL_FACE);
    }

    // Frontface
    gl.frontFace(c["frontFaceRaw"]);

    // Line width
    gl.lineWidth(c["lineWidthRaw"]);

    // Stencil
    if (c["stencilRaw"].enabled) {
      gl.enable(GL.STENCIL_TEST);
      if (c["stencilRaw"].separate) {
        gl.stencilFuncSeparate(GL.FRONT, c["stencilRaw"].frontFunc, c["stencilRaw"].frontFuncRef, c["stencilRaw"].frontFuncMask);
        gl.stencilMaskSeparate(GL.FRONT, c["stencilRaw"].frontFuncMask);
        gl.stencilOpSeparate(GL.FRONT, c["stencilRaw"].frontOnStencilFail, c["stencilRaw"].frontOnDepthTestFail, c["stencilRaw"].frontOnStencilDepthTestPass);

        gl.stencilFuncSeparate(GL.BACK, c["stencilRaw"].backFunc, c["stencilRaw"].backFuncRef, c["stencilRaw"].backFuncMask);
        gl.stencilMaskSeparate(GL.BACK, c["stencilRaw"].backFuncMask);
        gl.stencilOpSeparate(GL.BACK, c["stencilRaw"].backOnStencilFail, c["stencilRaw"].backOnDepthTestFail, c["stencilRaw"].backOnStencilDepthTestPass);
      } else {
        gl.stencilFunc(c["stencilRaw"].frontFunc, c["stencilRaw"].frontFuncRef, c["stencilRaw"].frontFuncMask);
        gl.stencilMask(c["stencilRaw"].frontFuncMask);
        gl.stencilOp(c["stencilRaw"].frontOnStencilFail, c["stencilRaw"].frontOnDepthTestFail, c["stencilRaw"].frontOnStencilDepthTestPass);
      }
    } else {
      gl.disable(GL.STENCIL_TEST);
    }

    // Mask
    gl.colorMask(c["colorMaskRaw"][0], c["colorMaskRaw"][1], c["colorMaskRaw"][2], c["colorMaskRaw"][3]);
    gl.depthMask(c["depthWriteRaw"]);

    gl.blendColor(c["blendColorRaw"][0], c["blendColorRaw"][1], c["blendColorRaw"][2], c["blendColorRaw"][3]);

    // Scissor
    if (c["scissorRaw"].enabled) {
      gl.enable(GL.SCISSOR_TEST);
      gl.scissor(c["scissorRaw"].box[0], c["scissorRaw"].box[1], c["scissorRaw"].box[2], c["scissorRaw"].box[3]);
    } else {
      gl.disable(GL.SCISSOR_TEST);
    }

    // Viewport
    if (c["viewportRaw"].enabled) {
      gl.viewport(c["viewportRaw"].box[0], c["viewportRaw"].box[1], c["viewportRaw"].box[2], c["viewportRaw"].box[3]);
    }

    // Polygon offset
    if (c["polygonOffsetRaw"].enabled) {
      gl.enable(GL.POLYGON_OFFSET_FILL);
      gl.polygonOffset(c["polygonOffsetRaw"].factor, c["polygonOffsetRaw"].units);
    } else {
      gl.disable(GL.POLYGON_OFFSET_FILL);
    }

    // Dither
    if (c["ditherRaw"]) {
      gl.enable(GL.DITHER);
    } else {
      gl.disable(GL.DITHER);
    }
  }

  static applyClear(gl: GLContext, c: StateClearConfig) {
    // Clear
    if (c["clearRaw"].enabled) {
      gl.clearDepth(c["clearRaw"].depth)
      gl.clearColor(c["clearRaw"].color[0], c["clearRaw"].color[1], c["clearRaw"].color[2], c["clearRaw"].color[3])
      gl.clear(c["clearRaw"].bit)
    }
  }

}