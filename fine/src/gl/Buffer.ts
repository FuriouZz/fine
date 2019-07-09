import { GLDrawUsage, GLContext, GLBuffer } from "./constants/Types";

export class Buffer {

  protected buffer: WebGLBuffer
  protected bufferType: GLBuffer = GLBuffer.ARRAY

  usage: GLDrawUsage = GLDrawUsage.STATIC
  byteLength = 0

  constructor(public gl: GLContext, _usage = GLDrawUsage.STATIC) {
    this.buffer = this.gl.createBuffer();
    this.usage = _usage
  }

  bind() {
    this.gl.bindBuffer( this.bufferType, this.buffer )
  }

  data( data: ArrayBufferView ) {
    this.gl.bindBuffer( this.bufferType, this.buffer )
    this.gl.bufferData( this.bufferType, data, this.usage )
    this.gl.bindBuffer( this.bufferType, null )
    this.byteLength = data.byteLength
  }

  sub_data( data: ArrayBufferView, offset: number ) {
    this.gl.bindBuffer( this.bufferType, this.buffer )
    this.gl.bufferSubData( this.bufferType, offset, data )
    this.gl.bindBuffer( this.bufferType, null )
  }

  dispose() {
    this.gl.deleteBuffer( this.buffer )
    this.buffer = null
  }

}