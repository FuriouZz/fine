import { ArrayBuffer } from "./ArrayBuffer";
import { IndexBuffer } from "./IndexBuffer";
export class Geometry {
    constructor(gl, _buffers, _indices) {
        this.gl = gl;
        this.buffers = [];
        this.indices = null;
        this.drawMode = 4 /* TRIANGLES */;
        this.drawOffset = 0;
        this.drawCount = -1;
        this.instanceCount = 1;
        this.instanced = false;
        this.buffers = _buffers == null ? this.buffers : _buffers;
        this.indices = _indices;
    }
    create_array_buffer(_data, _usage) {
        var buffer = new ArrayBuffer(this.gl, _data, _usage);
        this.buffers.push(buffer);
        return buffer;
    }
    create_index_buffer(_type = null, _data, _usage) {
        return this.indices = new IndexBuffer(this.gl, _type, _data, _usage);
    }
    draw(pipeline) {
        for (let i = 0; i < this.buffers.length; i++) {
            const buffer = this.buffers[i];
            buffer.attrib_pointer(pipeline);
        }
        if (this.indices == null) {
            if (this.instanced) {
                this.gl.drawArraysInstanced(this.drawMode, this.drawOffset, this.drawCount, this.instanceCount);
            }
            else {
                this.gl.drawArrays(this.drawMode, this.drawOffset, this.drawCount);
            }
        }
        else {
            this.indices.instanced = this.instanced;
            this.indices.instanceCount = this.instanceCount;
            this.indices.draw(this.drawMode, this.drawCount < 0 ? this.indices.vertexCount : this.drawCount, this.drawOffset);
        }
    }
}
