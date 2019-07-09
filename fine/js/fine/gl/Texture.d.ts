import { GLContext, GLType, GLImage, GLTextureWrap } from "./constants/Types";
import { GL } from "./constants/GL";
export declare type FilterBool = 0 | 1;
export declare class Texture {
    gl: GLContext;
    type: GLType;
    format: GL;
    internal: GL;
    static INDEX: number;
    id: number;
    texture: WebGLTexture;
    width: number;
    height: number;
    constructor(gl: GLContext, type?: GLType, format?: GL, internal?: GL);
    bind(): void;
    from_image(image: GLImage): void;
    from_data(width: number, height: number, data: ArrayBufferView): void;
    from_compressed(width: number, height: number, data: ArrayBufferView): void;
    dispose(): void;
    filter(smooth: FilterBool, mipmap: FilterBool, miplinear: FilterBool): void;
    wrap(wrap: GLTextureWrap): void;
    clamp(): void;
    mirror(): void;
    repeat(): void;
}
