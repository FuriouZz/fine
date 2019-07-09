import { Buffer } from "./Buffer";
import { GLType, GLPrimitive, GLDrawUsage, GLContext, GLBuffer, GLTypeSize } from "./constants/Types";
import { GetTypeSize } from "./Utils";

export class IndexBuffer extends Buffer {

  private type: GLType = GLType.UNSIGNED_SHORT
  instanced = false
  instanceCount = 0
  vertexCount = 0
  primitive = GLPrimitive.TRIANGLES

  constructor(gl: GLContext, _type = GLType.UNSIGNED_SHORT, _data?: ArrayBufferView, _usage?: GLDrawUsage) {
    super(gl, _usage)
    this.bufferType = GLBuffer.ELEMENTS
    this.set_type(_type)
    if (_data != null) this.data(_data)
  }

  set_type(_type: GLType) {
    this.type = _type
    this.compute_length()
  }

  data( _data: ArrayBufferView ) {
    super.data(_data)
    this.compute_length()
  }

  draw(_primitive = this.primitive, _count = this.vertexCount, _offset = 0) {
    this.bind()
    if (this.instanced) {
      this.gl.drawElementsInstanced(_primitive, _count, this.type, _offset, this.instanceCount)
    } else {
      this.gl.drawElements(_primitive, _count, this.type, _offset)
    }
  }

  compute_length() {
    this.vertexCount = this.byteLength / GetTypeSize(this.type)
  }

}