import { Buffer } from "./Buffer";
import { GLType, GLPrimitive, GLDrawUsage, GLContext } from "./constants/Types";
export declare class IndexBuffer extends Buffer {
    private type;
    instanced: boolean;
    instanceCount: number;
    vertexCount: number;
    primitive: GLPrimitive;
    constructor(gl: GLContext, _type?: GLType, _data?: ArrayBufferView, _usage?: GLDrawUsage);
    set_type(_type: GLType): void;
    data(_data: ArrayBufferView): void;
    draw(_primitive?: GLPrimitive, _count?: number, _offset?: number): void;
    compute_length(): void;
}
