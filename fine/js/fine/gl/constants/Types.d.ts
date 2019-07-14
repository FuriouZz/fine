/// <reference types="webgl2" />
export declare type GLContext = WebGL2RenderingContext;
export declare type GLImage = ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
export declare const enum GLDrawUsage {
    STATIC = 35044,
    STREAM = 35040,
    DYNAMIC = 35048
}
export declare const enum GLClear {
    DEPTH_BUFFER = 256,
    STENCIL_BUFFER = 1024,
    COLOR_BUFFER = 16384
}
export declare const enum GLPrimitive {
    POINTS = 0,
    LINES = 1,
    LINE_LOOP = 2,
    LINE_STRIP = 3,
    TRIANGLES = 4,
    TRIANGLE_STRIP = 5,
    TRIANGLE_FAN = 6
}
export declare const enum GLBlendMode {
    ZERO = 0,
    ONE = 1,
    SRC_COLOR = 768,
    ONE_MINUS_SRC_COLOR = 769,
    SRC_ALPHA = 770,
    ONE_MINUS_SRC_ALPHA = 771,
    DST_ALPHA = 772,
    ONE_MINUS_DST_ALPHA = 773,
    DST_COLOR = 774,
    ONE_MINUS_DST_COLOR = 775,
    SRC_ALPHA_SATURATE = 776,
    CONSTANT_COLOR = 32769,
    ONE_MINUS_CONSTANT_COLOR = 32770,
    CONSTANT_ALPHA = 32771,
    ONE_MINUS_CONSTANT_ALPHA = 32772
}
export declare const enum GLBlendEq {
    ADD = 32774,
    SUBTRACT = 32778,
    REVERSE_SUBTRACT = 32779
}
export declare const enum GLBuffer {
    ARRAY = 34962,
    ELEMENTS = 34963
}
export declare const enum GLCulling {
    FRONT = 1028,
    BACK = 1029,
    FRONT_AND_BACK = 1032
}
export declare const enum GLType {
    BYTE = 5120,
    UNSIGNED_BYTE = 5121,
    SHORT = 5122,
    UNSIGNED_SHORT = 5123,
    INT = 5124,
    UNSIGNED_INT = 5125,
    FLOAT = 5126
}
export declare const enum GLTypeSize {
    BYTE = 1,
    UNSIGNED_BYTE = 1,
    SHORT = 2,
    UNSIGNED_SHORT = 2,
    INT = 4,
    UNSIGNED_INT = 4,
    FLOAT = 4
}
export declare const enum GLShaderType {
    VERTEX = 35633,
    FRAGMENT = 35632
}
export declare const enum GLTextureWrap {
    MIRROR = 33648,
    CLAMP = 33071,
    REPEAT = 10497
}
export declare const enum GLTest {
    NEVER = 512,
    LESS = 513,
    EQUAL = 514,
    LEQUAL = 515,
    GREATER = 516,
    NOTEQUAL = 517,
    GEQUAL = 518,
    ALWAYS = 519
}
export declare const enum GLStencilActions {
    KEEP = 7680,
    REPLACE = 7681,
    INCR = 7682,
    DECR = 7683,
    INVERT = 5386,
    INCR_WRAP = 34055,
    DECR_WRAP = 34056
}
export declare const enum GLFrontFaceDirection {
    Clockwise = 2304,
    CounterClockwise = 2305
}
