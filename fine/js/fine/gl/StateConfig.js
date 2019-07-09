export class StateConfig {
    constructor() {
        // Blending
        this.blend = false;
        this.blendSrc = 768 /* SRC_COLOR */;
        this.blendDst = 774 /* DST_COLOR */;
        this.blendEq = 32774 /* FUNC_ADD */;
        this.blendSeparate = false;
        this.alphaBlendSrc = 1 /* ONE */;
        this.alphaBlendDst = 0 /* ZERO */;
        this.alphaBlendEq = 32774 /* FUNC_ADD */;
        this.blendColor = new Float32Array([0, 0, 0, 1]);
        // Depth
        this.depthTest = false;
        this.depthFunc = 512 /* NEVER */;
        this.depthRange = new Float32Array([0, 0]);
        // Cullface
        this.cullFace = false;
        this.cullFaceMode = 1029 /* BACK */;
        // PolygonOffset
        this.polygonOffset = false;
        this.polygonOffsetFactor = 2.0;
        this.polygonOffsetUnits = 3.0;
        // Mask
        this.depthWrite = false;
        this.colorMask = [true, true, true, true];
        // Stencil
        this.stencil = false;
        this.stencilFunc = 519 /* ALWAYS */;
        this.stencilFuncRef = 0;
        this.stencilFuncMask = 1;
        this.stencilOpFail = 7680 /* KEEP */;
        this.stencilOpZFail = 7680 /* KEEP */;
        this.stencilOpZPass = 7680 /* KEEP */;
        this.stencilSeparate = false;
        this.stencilBackFunc = 519 /* ALWAYS */;
        this.stencilBackFuncRef = 0;
        this.stencilBackFuncMask = 1;
        this.stencilBackOpFail = 7680 /* KEEP */;
        this.stencilBackOpZFail = 7680 /* KEEP */;
        this.stencilBackOpZPass = 7680 /* KEEP */;
        // Scissor
        this.scissor = false;
        this.scissorBox = new Int32Array([0, 0, 0, 0]);
        // Viewport
        this.viewport = new Int32Array([0, 0, 0, 0]);
        this.overrideViewport = false;
        // Frontface
        this.frontFace = 2305 /* CCW */;
        // Line
        this.lineWidth = 1.0;
        // Dither
        this.dither = false;
    }
}
