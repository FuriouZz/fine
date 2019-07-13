import { GLDrawUsage, GLContext, GLBuffer, GLType, GLPrimitive } from "./constants/Types";
import { Buffer } from "./Buffer";
import { GetTypeSize } from "./Utils";
import { Pipeline } from "./Pipeline";

export class VertexElement {

  constructor(
    public name: string,
    public type: GLType,
    public size: number,
    public offset: number,
    public normalize: boolean
  ) {}

  get component_size() {
    return GetTypeSize(this.type)
  }

  get byte_size() {
    return this.component_size * this.size
  }
}

export class ArrayBuffer extends Buffer {
  protected stride = 0
  protected vertexCount = 0
  protected elements: VertexElement[] = []
  primitive = GLPrimitive.TRIANGLES
  instanced = false;
  instanceCount = 0;

  constructor(gl: GLContext, _data?: ArrayBufferView, _usage?: GLDrawUsage) {
    super(gl, _usage)
    this.bufferType = GLBuffer.ARRAY
    if (_data != null) this.data(_data)
  }

  attribute(name: string, type: GLType, size: number, normalize = false) {
    var element = new VertexElement(name, type, size, this.stride, normalize)
    this.elements.push( element )
    this.stride += element.byte_size
    this.compute_length()
  }

  data(_data: ArrayBufferView) {
    super.data(_data)
    this.compute_length()
  }

  attrib_pointer( pipeline: Pipeline ) {
    this.bind()

    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i]
      let location = pipeline.attributes[ element.name ]
      if (location == null) continue;

      this.gl.enableVertexAttribArray(location)
      this.gl.vertexAttribPointer(location, element.size, element.type, element.normalize, this.stride, element.offset )
    }
  }

  draw(_primitive = this.primitive, _count = this.vertexCount, _offset = 0) {

    if (this.instanced) {
      this.gl.drawArraysInstanced(_primitive, _offset, _count, this.instanceCount)
    } else {
      this.gl.drawArrays( _primitive, _offset, _count )
    }
  }

  compute_length() {
    if (this.stride > 0) {
      this.vertexCount = this.byteLength / this.stride
    }
  }

}