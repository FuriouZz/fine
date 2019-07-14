import { GLBlendMode, GLBlendEq, GLTest, GLCulling, GLStencilActions, GLFrontFaceDirection } from "./constants/Types";
export declare class StateConfig {
    blend: boolean;
    blendSrc: GLBlendMode;
    blendDst: GLBlendMode;
    blendEq: GLBlendEq;
    blendSeparate: boolean;
    alphaBlendSrc: GLBlendMode;
    alphaBlendDst: GLBlendMode;
    alphaBlendEq: GLBlendEq;
    blendColor: Float32Array;
    depthTest: boolean;
    depthFunc: GLTest;
    depthRange: Float32Array;
    cullFace: boolean;
    cullFaceMode: GLCulling;
    polygonOffset: boolean;
    polygonOffsetFactor: number;
    polygonOffsetUnits: number;
    depthWrite: boolean;
    colorMask: boolean[];
    stencil: boolean;
    stencilFunc: GLTest;
    stencilFuncRef: number;
    stencilFuncMask: number;
    stencilOpFail: GLStencilActions;
    stencilOpZFail: GLStencilActions;
    stencilOpZPass: GLStencilActions;
    stencilSeparate: boolean;
    stencilBackFunc: GLTest;
    stencilBackFuncRef: number;
    stencilBackFuncMask: number;
    stencilBackOpFail: GLStencilActions;
    stencilBackOpZFail: GLStencilActions;
    stencilBackOpZPass: GLStencilActions;
    scissor: boolean;
    scissorBox: Int32Array;
    viewport: Int32Array;
    overrideViewport: boolean;
    frontFace: GLFrontFaceDirection;
    lineWidth: number;
    dither: boolean;
    transparent(enable: boolean): void;
}
