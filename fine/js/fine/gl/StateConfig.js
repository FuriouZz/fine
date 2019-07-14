export class StateConfig {
    constructor() {
        // Blending
        this.blend = false;
        this.blendSrc = 1 /* ONE */;
        this.blendDst = 0 /* ZERO */;
        this.blendEq = 32774 /* ADD */;
        this.blendSeparate = true;
        this.alphaBlendSrc = 1 /* ONE */;
        this.alphaBlendDst = 0 /* ZERO */;
        this.alphaBlendEq = 32774 /* ADD */;
        this.blendColor = new Float32Array([0, 0, 0, 0]);
        // Depth
        this.depthTest = false;
        this.depthFunc = 513 /* LESS */;
        this.depthRange = new Float32Array([0, 1]);
        // Cullface
        this.cullFace = false;
        this.cullFaceMode = 1029 /* BACK */;
        // PolygonOffset
        this.polygonOffset = false;
        this.polygonOffsetFactor = 0;
        this.polygonOffsetUnits = 0;
        // Mask
        this.depthWrite = true;
        this.colorMask = [true, true, true, true];
        // Stencil
        this.stencil = false;
        this.stencilFunc = 519 /* ALWAYS */;
        this.stencilFuncRef = 0;
        this.stencilFuncMask = 1;
        this.stencilOpFail = 7680 /* KEEP */;
        this.stencilOpZFail = 7680 /* KEEP */;
        this.stencilOpZPass = 7680 /* KEEP */;
        this.stencilSeparate = true;
        this.stencilBackFunc = 519 /* ALWAYS */;
        this.stencilBackFuncRef = 0;
        this.stencilBackFuncMask = 1;
        this.stencilBackOpFail = 7680 /* KEEP */;
        this.stencilBackOpZFail = 7680 /* KEEP */;
        this.stencilBackOpZPass = 7680 /* KEEP */;
        // Scissor
        this.scissor = false;
        this.scissorBox = new Int32Array([0, 0, 300, 150]);
        // Viewport
        this.viewport = new Int32Array([0, 0, 300, 150]);
        this.overrideViewport = false;
        // Frontface
        this.frontFace = 2305 /* CounterClockwise */;
        // Line
        this.lineWidth = 1.0;
        // Dither
        this.dither = true;
    }
    transparent(enable) {
        if (enable) {
            this.blend = true;
            this.blendSrc = 770 /* SRC_ALPHA */;
            this.blendDst = 771 /* ONE_MINUS_SRC_ALPHA */;
            this.blendEq = 32774 /* ADD */;
            this.blendSeparate = true;
            this.alphaBlendSrc = 770 /* SRC_ALPHA */;
            this.alphaBlendDst = 771 /* ONE_MINUS_SRC_ALPHA */;
            this.alphaBlendEq = 32774 /* ADD */;
        }
        else {
            this.blend = true;
            this.blendSrc = 1 /* ONE */;
            this.blendDst = 0 /* ZERO */;
            this.blendEq = 32774 /* ADD */;
            this.blendSeparate = true;
            this.alphaBlendSrc = 1 /* ONE */;
            this.alphaBlendDst = 0 /* ZERO */;
            this.alphaBlendEq = 32774 /* ADD */;
        }
    }
}
