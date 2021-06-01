import Buffer from "gl/Buffer";
import { GLType, GLPrimitive, GLDrawUsage, GLContext, GLBuffer, GLTypeSize } from "gl/constants/Types";
import Extension from "gl/Extension";
import { getTypeSize, isWebGL2 } from "gl/utils";

export default class IndexBuffer extends Buffer {

  private type: GLType = GLType.UNSIGNED_SHORT
  vertexCount = 0
  primitive = GLPrimitive.TRIANGLES
  instance = {
    enabled: false,
    count: 0,
  }

  constructor(gl: GLContext, type = GLType.UNSIGNED_SHORT, data?: ArrayBufferView, usage?: GLDrawUsage) {
    super(gl, usage)
    this.bufferType = GLBuffer.ELEMENTS
    this.setType(type)
    if (data != null) this.data(data)

  }

  setType(type: GLType) {
    this.type = type
    this.computeLength()

    return this
  }

  data(data: ArrayBufferView) {
    super.data(data)
    this.computeLength()
    return this
  }

  draw(primitive = this.primitive, count = this.vertexCount, offset = 0) {
    this.bind()
    if (this.instance.enabled) {
      if (isWebGL2(this.gl)) {
        this.gl.drawElementsInstanced(primitive, count, this.type, offset, this.instance.count)
      } else {
        const ext = Extension.get(this.gl, "ANGLE_instanced_arrays")
        if (ext) ext.drawElementsInstancedANGLE(primitive, count, this.type, offset, this.instance.count)
      }
    } else {
      this.gl.drawElements(primitive, count, this.type, offset)
    }
    return this
  }

  computeLength() {
    this.vertexCount = this.byteLength / getTypeSize(this.type)
    return this
  }

}