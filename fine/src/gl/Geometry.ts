import { GLPrimitive, GLType, GLContext, GLDrawUsage } from "./constants/Types";
import { ArrayBuffer } from "./ArrayBuffer";
import { Pipeline } from "./Pipeline";
import { IndexBuffer } from "./IndexBuffer";

export class Geometry {

  buffers: Array<ArrayBuffer> = [];
  indices: IndexBuffer = null;

  drawMode = GLPrimitive.TRIANGLES;
  drawOffset = 0;
  drawCount = -1;

  instanceCount = 1;
  instanced = false;

  constructor( public gl: GLContext, _buffers?: Array<ArrayBuffer>, _indices?: IndexBuffer ) {
    this.buffers = _buffers == null ? this.buffers : _buffers;
    this.indices = _indices;
  }

  create_array_buffer( _data?: ArrayBufferView, _usage?: GLDrawUsage ) {
    var buffer = new ArrayBuffer( this.gl, _data, _usage );
    this.buffers.push( buffer );
    return buffer;
  }

  create_index_buffer( _type: GLType = null, _data?: ArrayBufferView, _usage?: GLDrawUsage ) {
    return this.indices = new IndexBuffer( this.gl, _type, _data, _usage );
  }

  draw( pipeline: Pipeline ) {
    for (let i = 0; i < this.buffers.length; i++) {
      const buffer = this.buffers[i];
      buffer.attrib_pointer( pipeline )
    }

    if (this.indices == null) {
      if (this.instanced) {
        this.gl.drawArraysInstanced(this.drawMode, this.drawOffset, this.drawCount, this.instanceCount);
      } else {
        this.gl.drawArrays( this.drawMode, this.drawOffset, this.drawCount );
      }
    } else {
      this.indices.instanced = this.instanced;
      this.indices.instanceCount = this.instanceCount;
      this.indices.vertexCount = this.drawCount < 0 ? this.indices.vertexCount : this.drawCount
      this.indices.draw( this.drawMode, this.indices.vertexCount, this.drawOffset );
    }
  }

}