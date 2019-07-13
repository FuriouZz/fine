import { GLPrimitive, GLType, GLContext, GLDrawUsage } from "./constants/Types";
import { ArrayBuffer } from "./ArrayBuffer";
import { Pipeline } from "./Pipeline";
import { IndexBuffer } from "./IndexBuffer";
export declare class Geometry {
    gl: GLContext;
    buffers: Array<ArrayBuffer>;
    indices: IndexBuffer;
    drawMode: GLPrimitive;
    drawOffset: number;
    drawCount: number;
    instanceCount: number;
    instanced: boolean;
    constructor(gl: GLContext, _buffers?: Array<ArrayBuffer>, _indices?: IndexBuffer);
    create_array_buffer(_data?: ArrayBufferView, _usage?: GLDrawUsage): ArrayBuffer;
    create_index_buffer(_type?: GLType, _data?: ArrayBufferView, _usage?: GLDrawUsage): IndexBuffer;
    draw(pipeline: Pipeline): void;
    dispose(): void;
}
