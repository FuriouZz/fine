import { StateConfig } from "./StateConfig";
import { GL } from "./constants/GL";
import { GLContext } from "./constants/Types";

export class State {
  config: StateConfig;

  constructor(public gl: GLContext) {
    this.config = new StateConfig();
    this.from_context();
  }

  from_context() {
    // Blend
    this.config.blend = this.gl.getParameter( GL.BLEND );
    this.config.blendSeparate = true;

    this.config.blendSrc = this.gl.getParameter( GL.BLEND_SRC_RGB );
    this.config.blendDst = this.gl.getParameter( GL.BLEND_DST_RGB );
    this.config.blendEq  = this.gl.getParameter( GL.BLEND_EQUATION_RGB );

    this.config.alphaBlendSrc = this.gl.getParameter( GL.BLEND_SRC_ALPHA );
    this.config.alphaBlendDst = this.gl.getParameter( GL.BLEND_DST_ALPHA );
    this.config.alphaBlendEq  = this.gl.getParameter( GL.BLEND_EQUATION_ALPHA );

    this.config.blendColor = this.gl.getParameter( GL.BLEND_COLOR );

    // Depth
    this.config.depthTest  = this.gl.getParameter( GL.DEPTH_TEST );
    this.config.depthFunc  = this.gl.getParameter( GL.DEPTH_FUNC );
    this.config.depthRange = this.gl.getParameter( GL.DEPTH_RANGE );

    // Cullface
    this.config.cullFace     = this.gl.getParameter( GL.CULL_FACE );
    this.config.cullFaceMode = this.gl.getParameter( GL.CULL_FACE_MODE );

    // Polygon offset
    this.config.polygonOffset       = this.gl.getParameter( GL.POLYGON_OFFSET_FILL );
    this.config.polygonOffsetFactor = this.gl.getParameter( GL.POLYGON_OFFSET_FACTOR );
    this.config.polygonOffsetUnits  = this.gl.getParameter( GL.POLYGON_OFFSET_UNITS );

    // Mask
    this.config.depthWrite = this.gl.getParameter( GL.DEPTH_WRITEMASK );
    this.config.colorMask = this.gl.getParameter( GL.COLOR_WRITEMASK );

    // Stencil
    this.config.stencil = this.gl.getParameter( GL.STENCIL_TEST );
    this.config.stencilSeparate = true;

    this.config.stencilFunc     = this.gl.getParameter( GL.STENCIL_FUNC );
    this.config.stencilFuncMask = this.gl.getParameter( GL.STENCIL_VALUE_MASK );
    this.config.stencilFuncRef  = this.gl.getParameter( GL.STENCIL_REF );
    this.config.stencilOpFail   = this.gl.getParameter( GL.STENCIL_FAIL );
    this.config.stencilOpZPass  = this.gl.getParameter( GL.STENCIL_PASS_DEPTH_PASS );
    this.config.stencilOpZFail  = this.gl.getParameter( GL.STENCIL_PASS_DEPTH_FAIL );

    this.config.stencilBackFunc     = this.gl.getParameter( GL.STENCIL_BACK_FUNC );
    this.config.stencilBackFuncMask = this.gl.getParameter( GL.STENCIL_BACK_VALUE_MASK );
    this.config.stencilBackFuncRef  = this.gl.getParameter( GL.STENCIL_BACK_REF );
    this.config.stencilBackOpFail   = this.gl.getParameter( GL.STENCIL_BACK_FAIL );
    this.config.stencilBackOpZPass  = this.gl.getParameter( GL.STENCIL_BACK_PASS_DEPTH_PASS );
    this.config.stencilBackOpZFail  = this.gl.getParameter( GL.STENCIL_BACK_PASS_DEPTH_FAIL );

    // this.gl.getParameter( GL.STENCIL_BITS );

    // Scissor
    this.config.scissor = this.gl.getParameter( GL.SCISSOR_TEST );
    this.config.scissorBox = this.gl.getParameter( GL.SCISSOR_BOX );

    // Viewport
    this.config.viewport = this.gl.getParameter( GL.VIEWPORT );

    // Frontface
    this.config.frontFace = this.gl.getParameter( GL.FRONT_FACE );

    // Line width
    this.config.lineWidth = this.gl.getParameter( GL.LINE_WIDTH );

    // Dither
    this.config.dither = this.gl.getParameter( GL.DITHER );
  }

  apply( c: StateConfig = null ) {
    c = c == null ? this.config : c;

    // Blend
    if (c.blend) {
      this.gl.enable(GL.BLEND);

      if (c.blendSeparate) {
        this.gl.blendFuncSeparate(c.blendSrc, c.blendDst, c.alphaBlendSrc, c.alphaBlendDst);
        this.gl.blendEquationSeparate(c.blendEq, c.alphaBlendEq);
      } else {
        this.gl.blendFunc(c.blendSrc, c.blendDst);
        this.gl.blendEquation(c.blendEq);
      }
    } else {
      this.gl.disable(GL.BLEND);
    }

    // Depth
    if (c.depthTest) {
      this.gl.enable(GL.DEPTH_TEST);
      this.gl.depthFunc(c.depthFunc);
    } else {
      this.gl.disable(GL.DEPTH_TEST);
    }

    // Cullface
    if (c.cullFace) {
      this.gl.enable(GL.CULL_FACE);
      this.gl.cullFace(c.cullFaceMode);
    } else {
      this.gl.disable(GL.CULL_FACE);
    }

    // Frontface
    this.gl.frontFace(c.frontFace);

    // Line width
    this.gl.lineWidth(c.lineWidth);

    // Stencil
    if (c.stencil) {
      this.gl.enable(GL.STENCIL_TEST);
      if (c.stencilSeparate) {
        this.gl.stencilFuncSeparate(GL.FRONT, c.stencilFunc, c.stencilFuncRef, c.stencilFuncMask);
        this.gl.stencilMaskSeparate(GL.FRONT, c.stencilFuncMask);
        this.gl.stencilOpSeparate(GL.FRONT, c.stencilOpFail, c.stencilOpZFail, c.stencilOpZPass);

        this.gl.stencilFuncSeparate(GL.BACK, c.stencilBackFunc, c.stencilBackFuncRef, c.stencilBackFuncMask);
        this.gl.stencilMaskSeparate(GL.BACK, c.stencilBackFuncMask);
        this.gl.stencilOpSeparate(GL.BACK, c.stencilBackOpFail, c.stencilBackOpZFail, c.stencilBackOpZPass);
      } else {
        this.gl.stencilFunc(c.stencilFunc, c.stencilFuncRef, c.stencilFuncMask);
        this.gl.stencilMask(c.stencilFuncMask);
        this.gl.stencilOp(c.stencilOpFail, c.stencilOpZFail, c.stencilOpZPass);
      }
    } else {
      this.gl.disable(GL.STENCIL_TEST);
    }

    // Mask
    this.gl.colorMask(c.colorMask[0], c.colorMask[1], c.colorMask[2], c.colorMask[3]);
    this.gl.depthMask(c.depthWrite);

    this.gl.blendColor(c.blendColor[0], c.blendColor[1], c.blendColor[2], c.blendColor[3]);

    // Scissor
    if (c.scissor) {
      this.gl.enable(GL.SCISSOR_TEST);
      this.gl.scissor(c.scissorBox[0], c.scissorBox[1], c.scissorBox[2], c.scissorBox[3]);
    } else {
      this.gl.disable(GL.SCISSOR_TEST);
    }

    // Viewport
    if (this.config.overrideViewport) {
      this.gl.viewport(c.viewport[0], c.viewport[1], c.viewport[2], c.viewport[3]);
    }

    // Polygon offset
    if (c.polygonOffset) {
      this.gl.enable(GL.POLYGON_OFFSET_FILL);
      this.gl.polygonOffset(c.polygonOffsetFactor, c.polygonOffsetUnits);
    } else {
      this.gl.disable(GL.POLYGON_OFFSET_FILL);
    }

    this.gl.depthRange(c.depthRange[0], c.depthRange[1]);

    // Dither
    if (c.dither) {
      this.gl.enable(GL.DITHER);
    } else {
      this.gl.disable(GL.DITHER);
    }
  }

}