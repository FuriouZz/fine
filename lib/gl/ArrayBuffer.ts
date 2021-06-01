import { GLDrawUsage, GLContext, GLBuffer, GLType, GLPrimitive } from "gl/constants/Types";
import Buffer from "gl/Buffer";
import { getTypeSize, isWebGL2 } from "gl/utils";
import Pipeline from "gl/Pipeline";
import Extension from "gl/Extension";

export class VertexElement {
  constructor(
    public name: string,
    public type: GLType,
    public size: number,
    public offset: number,
    public normalize: boolean
  ) { }

  get componentSize() {
    return getTypeSize(this.type)
  }

  get byteSize() {
    return this.componentSize * this.size
  }
}

export interface InstanceElement {
  name: string,
  perInstance: number,
}

export default class ArrayBuffer extends Buffer {
  stride = 0
  vertexCount = 0
  elements: VertexElement[] = []
  primitive = GLPrimitive.TRIANGLES
  instance = {
    enabled: false,
    count: 0,
    attributes: new Map<string, InstanceElement>()
  }

  constructor(gl: GLContext, data?: ArrayBufferView, usage?: GLDrawUsage) {
    super(gl, usage)
    this.bufferType = GLBuffer.ARRAY
    if (data != null) this.data(data)
  }

  attribute(name: string, type: GLType, size: number, normalize = false) {
    var element = new VertexElement(name, type, size, this.stride, normalize)
    this.elements.push(element)
    this.stride += element.byteSize
    this.computeLength()

    return this
  }

  instanceAttribute(name: string, perInstance = 1) {
    this.instance.attributes.set(name, { name, perInstance })
  }

  data(_data: ArrayBufferView) {
    super.data(_data)
    this.computeLength()

    return this
  }

  attribPointer(pipeline: Pipeline) {
    this.bind()

    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i]
      let location = pipeline["_attributes"][element.name]
      if (location == null) continue

      this.gl.enableVertexAttribArray(location.location)
      this.gl.vertexAttribPointer(location.location, element.size, element.type, element.normalize, this.stride, element.offset)

      if (this.instance.enabled && this.instance.attributes.has(element.name)) {
        const instanceElement = this.instance.attributes.get(element.name)
        if (isWebGL2(this.gl)) {
          this.gl.vertexAttribDivisor(location.location, instanceElement.perInstance)
        } else {
          const ext = Extension.get(this.gl, "ANGLE_instanced_arrays")
          if (ext) ext.vertexAttribDivisorANGLE(location.location, instanceElement.perInstance)
        }
      }
    }

    return this
  }

  draw(_primitive = this.primitive, _count = this.vertexCount, _offset = 0) {
    if (this.instance.enabled) {
      if (isWebGL2(this.gl)) {
        this.gl.drawArraysInstanced(_primitive, _offset, _count, this.instance.count)
      } else {
        const ext = Extension.get(this.gl, "ANGLE_instanced_arrays")
        if (ext) ext.drawArraysInstancedANGLE(_primitive, _offset, _count, this.instance.count)
      }
    } else {
      this.gl.drawArrays(_primitive, _offset, _count)
    }

    return this
  }

  computeLength() {
    if (this.stride > 0) {
      this.vertexCount = this.byteLength / this.stride
    }

    return this
  }

}