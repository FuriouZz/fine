import { GLDrawUsage, GLContext, GLBuffer } from "./constants/Types";
export declare class Buffer {
    gl: GLContext;
    protected buffer: WebGLBuffer;
    protected bufferType: GLBuffer;
    usage: GLDrawUsage;
    byteLength: number;
    constructor(gl: GLContext, _usage?: GLDrawUsage);
    bind(): void;
    data(data: ArrayBufferView): void;
    sub_data(data: ArrayBufferView, offset: number): void;
    dispose(): void;
}
