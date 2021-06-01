import { GLDrawUsage, GLContext, GLBuffer } from "gl/constants/Types";
import Bytes from "io/Bytes";

export default class Buffer {

  protected buffer: WebGLBuffer
  protected bufferType: GLBuffer = GLBuffer.ARRAY

  usage: GLDrawUsage = GLDrawUsage.STATIC
  bytes: DataView = null
  byteLength = 0

  constructor(public gl: GLContext, usage = GLDrawUsage.STATIC) {
    this.buffer = this.gl.createBuffer();
    this.usage = usage
  }

  bind() {
    this.gl.bindBuffer(this.bufferType, this.buffer)
    return this
  }

  unbind() {
    this.gl.bindBuffer(this.bufferType, null)
    return this
  }

  data(bytes: ArrayBufferView) {
    this.gl.bindBuffer(this.bufferType, this.buffer)
    this.gl.bufferData(this.bufferType, bytes, this.usage)
    this.gl.bindBuffer(this.bufferType, null)
    this.bytes = new DataView(bytes.buffer)
    this.byteLength = bytes.byteLength
    return this
  }

  subData(bytes: ArrayBufferView, offset: number) {
    this.gl.bindBuffer(this.bufferType, this.buffer)
    this.gl.bufferSubData(this.bufferType, offset, bytes)
    this.gl.bindBuffer(this.bufferType, null)
    this.bytes = new DataView(Bytes.concat(this.bytes.buffer.slice(0, offset), bytes.buffer))
    return this
  }

  dispose() {
    this.gl.deleteBuffer(this.buffer)
    this.buffer = null
    return this
  }

}