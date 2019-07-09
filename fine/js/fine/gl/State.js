import { StateConfig } from "./StateConfig";
export class State {
    constructor(gl) {
        this.gl = gl;
        this.config = new StateConfig();
        this.from_context();
    }
    from_context() {
        // Blend
        this.config.blend = this.gl.getParameter(3042 /* BLEND */);
        this.config.blendSeparate = true;
        this.config.blendSrc = this.gl.getParameter(32969 /* BLEND_SRC_RGB */);
        this.config.blendDst = this.gl.getParameter(32968 /* BLEND_DST_RGB */);
        this.config.blendEq = this.gl.getParameter(32777 /* BLEND_EQUATION_RGB */);
        this.config.alphaBlendSrc = this.gl.getParameter(32971 /* BLEND_SRC_ALPHA */);
        this.config.alphaBlendDst = this.gl.getParameter(32970 /* BLEND_DST_ALPHA */);
        this.config.alphaBlendEq = this.gl.getParameter(34877 /* BLEND_EQUATION_ALPHA */);
        this.config.blendColor = this.gl.getParameter(32773 /* BLEND_COLOR */);
        // Depth
        this.config.depthTest = this.gl.getParameter(2929 /* DEPTH_TEST */);
        this.config.depthFunc = this.gl.getParameter(2932 /* DEPTH_FUNC */);
        this.config.depthRange = this.gl.getParameter(2928 /* DEPTH_RANGE */);
        // Cullface
        this.config.cullFace = this.gl.getParameter(2884 /* CULL_FACE */);
        this.config.cullFaceMode = this.gl.getParameter(2885 /* CULL_FACE_MODE */);
        // Polygon offset
        this.config.polygonOffset = this.gl.getParameter(32823 /* POLYGON_OFFSET_FILL */);
        this.config.polygonOffsetFactor = this.gl.getParameter(32824 /* POLYGON_OFFSET_FACTOR */);
        this.config.polygonOffsetUnits = this.gl.getParameter(10752 /* POLYGON_OFFSET_UNITS */);
        // Mask
        this.config.depthWrite = this.gl.getParameter(2930 /* DEPTH_WRITEMASK */);
        this.config.colorMask = this.gl.getParameter(3107 /* COLOR_WRITEMASK */);
        // Stencil
        this.config.stencil = this.gl.getParameter(2960 /* STENCIL_TEST */);
        this.config.stencilSeparate = true;
        this.config.stencilFunc = this.gl.getParameter(2962 /* STENCIL_FUNC */);
        this.config.stencilFuncMask = this.gl.getParameter(2963 /* STENCIL_VALUE_MASK */);
        this.config.stencilFuncRef = this.gl.getParameter(2967 /* STENCIL_REF */);
        this.config.stencilOpFail = this.gl.getParameter(2964 /* STENCIL_FAIL */);
        this.config.stencilOpZPass = this.gl.getParameter(2966 /* STENCIL_PASS_DEPTH_PASS */);
        this.config.stencilOpZFail = this.gl.getParameter(2965 /* STENCIL_PASS_DEPTH_FAIL */);
        this.config.stencilBackFunc = this.gl.getParameter(34816 /* STENCIL_BACK_FUNC */);
        this.config.stencilBackFuncMask = this.gl.getParameter(36004 /* STENCIL_BACK_VALUE_MASK */);
        this.config.stencilBackFuncRef = this.gl.getParameter(36003 /* STENCIL_BACK_REF */);
        this.config.stencilBackOpFail = this.gl.getParameter(34817 /* STENCIL_BACK_FAIL */);
        this.config.stencilBackOpZPass = this.gl.getParameter(34819 /* STENCIL_BACK_PASS_DEPTH_PASS */);
        this.config.stencilBackOpZFail = this.gl.getParameter(34818 /* STENCIL_BACK_PASS_DEPTH_FAIL */);
        // this.gl.getParameter( GL.STENCIL_BITS );
        // Scissor
        this.config.scissor = this.gl.getParameter(3089 /* SCISSOR_TEST */);
        this.config.scissorBox = this.gl.getParameter(3088 /* SCISSOR_BOX */);
        // Viewport
        this.config.viewport = this.gl.getParameter(2978 /* VIEWPORT */);
        // Frontface
        this.config.frontFace = this.gl.getParameter(2886 /* FRONT_FACE */);
        // Line width
        this.config.lineWidth = this.gl.getParameter(2849 /* LINE_WIDTH */);
        // Dither
        this.config.dither = this.gl.getParameter(3024 /* DITHER */);
    }
    apply(c = null) {
        c = c == null ? this.config : c;
        // Blend
        if (c.blend) {
            this.gl.enable(3042 /* BLEND */);
            if (c.blendSeparate) {
                this.gl.blendFuncSeparate(c.blendSrc, c.blendDst, c.alphaBlendSrc, c.alphaBlendDst);
                this.gl.blendEquationSeparate(c.blendEq, c.alphaBlendEq);
            }
            else {
                this.gl.blendFunc(c.blendSrc, c.blendDst);
                this.gl.blendEquation(c.blendEq);
            }
        }
        else {
            this.gl.disable(3042 /* BLEND */);
        }
        // Depth
        if (c.depthTest) {
            this.gl.enable(2929 /* DEPTH_TEST */);
            this.gl.depthFunc(c.depthFunc);
        }
        else {
            this.gl.disable(2929 /* DEPTH_TEST */);
        }
        // Cullface
        if (c.cullFace) {
            this.gl.enable(2884 /* CULL_FACE */);
            this.gl.cullFace(c.cullFaceMode);
        }
        else {
            this.gl.disable(2884 /* CULL_FACE */);
        }
        // Frontface
        this.gl.frontFace(c.frontFace);
        // Line width
        this.gl.lineWidth(c.lineWidth);
        // Stencil
        if (c.stencil) {
            this.gl.enable(2960 /* STENCIL_TEST */);
            if (c.stencilSeparate) {
                this.gl.stencilFuncSeparate(1028 /* FRONT */, c.stencilFunc, c.stencilFuncRef, c.stencilFuncMask);
                this.gl.stencilMaskSeparate(1028 /* FRONT */, c.stencilFuncMask);
                this.gl.stencilOpSeparate(1028 /* FRONT */, c.stencilOpFail, c.stencilOpZFail, c.stencilOpZPass);
                this.gl.stencilFuncSeparate(1029 /* BACK */, c.stencilBackFunc, c.stencilBackFuncRef, c.stencilBackFuncMask);
                this.gl.stencilMaskSeparate(1029 /* BACK */, c.stencilBackFuncMask);
                this.gl.stencilOpSeparate(1029 /* BACK */, c.stencilBackOpFail, c.stencilBackOpZFail, c.stencilBackOpZPass);
            }
            else {
                this.gl.stencilFunc(c.stencilFunc, c.stencilFuncRef, c.stencilFuncMask);
                this.gl.stencilMask(c.stencilFuncMask);
                this.gl.stencilOp(c.stencilOpFail, c.stencilOpZFail, c.stencilOpZPass);
            }
        }
        else {
            this.gl.disable(2960 /* STENCIL_TEST */);
        }
        // Mask
        this.gl.colorMask(c.colorMask[0], c.colorMask[1], c.colorMask[2], c.colorMask[3]);
        this.gl.depthMask(c.depthWrite);
        this.gl.blendColor(c.blendColor[0], c.blendColor[1], c.blendColor[2], c.blendColor[3]);
        // Scissor
        if (c.scissor) {
            this.gl.enable(3089 /* SCISSOR_TEST */);
            this.gl.scissor(c.scissorBox[0], c.scissorBox[1], c.scissorBox[2], c.scissorBox[3]);
        }
        else {
            this.gl.disable(3089 /* SCISSOR_TEST */);
        }
        // Viewport
        if (this.config.overrideViewport) {
            this.gl.viewport(c.viewport[0], c.viewport[1], c.viewport[2], c.viewport[3]);
        }
        // Polygon offset
        if (c.polygonOffset) {
            this.gl.enable(32823 /* POLYGON_OFFSET_FILL */);
            this.gl.polygonOffset(c.polygonOffsetFactor, c.polygonOffsetUnits);
        }
        else {
            this.gl.disable(32823 /* POLYGON_OFFSET_FILL */);
        }
        this.gl.depthRange(c.depthRange[0], c.depthRange[1]);
        // Dither
        if (c.dither) {
            this.gl.enable(3024 /* DITHER */);
        }
        else {
            this.gl.disable(3024 /* DITHER */);
        }
    }
}
