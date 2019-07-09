import { GLDrawUsage, GLContext, GLType, GLPrimitive } from "./constants/Types";
import { Buffer } from "./Buffer";
import { Pipeline } from "./Pipeline";
export declare class VertexElement {
    name: string;
    type: GLType;
    size: number;
    offset: number;
    normalize: boolean;
    constructor(name: string, type: GLType, size: number, offset: number, normalize: boolean);
    readonly component_size: 0 | import("./constants/Types").GLTypeSize;
    readonly byte_size: number;
}
export declare class ArrayBuffer extends Buffer {
    protected stride: number;
    protected vertexCount: number;
    protected elements: VertexElement[];
    primitive: GLPrimitive;
    instanced: boolean;
    instanceCount: number;
    constructor(gl: GLContext, _data?: ArrayBufferView, _usage?: GLDrawUsage);
    attribute(name: string, type: GLType, size: number, normalize?: boolean): void;
    data(_data: ArrayBufferView): void;
    attrib_pointer(pipeline: Pipeline): void;
    draw(_primitive?: GLPrimitive, _count?: number, _offset?: number): void;
    compute_length(): void;
}
