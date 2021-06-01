import { GLPrimitive, GLType, GLContext, GLDrawUsage } from "gl/constants/Types";
import ArrayBuffer, { VertexElement } from "gl/ArrayBuffer";
import Pipeline from "gl/Pipeline";
import IndexBuffer from "gl/IndexBuffer";
import Bytes from "io/Bytes";
import { vec3 } from "gl-matrix";
import { TypedArray } from "io/Types";

export interface PrimitiveDescriptor {
  attribute: string,
  type: GLType,
  size: number
}

export default class Geometry {
  static ID = 0
  id: number
  name: string = "Geometry"
  buffers: Array<ArrayBuffer> = [];
  indices: IndexBuffer = null;

  drawMode = GLPrimitive.TRIANGLES;
  vertexOffset = 0;
  vertexCount = -1;

  // instanceCount = 1;
  // instanced = false;
  instance = {
    enabled: false,
    count: 1,
  }

  bounds: {
    min: vec3
    max: vec3
    center: vec3
    scale: vec3
    radius: number
  }

  constructor(public gl: GLContext, buffers?: Array<ArrayBuffer>, indices?: IndexBuffer) {
    this.id = ++Geometry.ID
    this.buffers = buffers == null ? this.buffers : buffers;
    this.indices = indices;
  }

  createArrayBuffer(data?: ArrayBufferView, usage?: GLDrawUsage) {
    var buffer = new ArrayBuffer(this.gl, data, usage);
    this.buffers.push(buffer);
    return buffer;
  }

  createIndexBuffer(data?: ArrayBufferView, usage?: GLDrawUsage, type?: GLType) {
    return this.indices = new IndexBuffer(this.gl, type, data, usage);
  }

  draw(pipeline: Pipeline) {
    pipeline.updateUniforms()

    for (let i = 0; i < this.buffers.length; i++) {
      const buffer = this.buffers[i]
      buffer.instance.enabled = this.instance.enabled
      buffer.instance.count = this.instance.count
      buffer.attribPointer(pipeline)
    }

    if (this.indices) {
      this.indices.instance.enabled = this.instance.enabled;
      this.indices.instance.count = this.instance.count;
      this.indices.draw(this.drawMode, this.vertexCount < 0 ? this.indices.vertexCount : this.vertexCount, this.vertexOffset);
    } else if (this.buffers[0]) {
      const vertexCount = this.vertexCount < 0 ? this.buffers[0].vertexCount : this.vertexCount
      const buffer = this.buffers[0]
      buffer.draw(this.drawMode, vertexCount, this.vertexOffset)
    }
  }

  dispose() {
    for (let i = 0; i < this.buffers.length; i++) {
      const buffer = this.buffers[i];
      buffer.dispose()
    }

    if (this.indices) this.indices.dispose()

    this.buffers = []
    this.indices = null
  }

  getAttributeData(name: string) {
    let buffer: ArrayBuffer
    let element: VertexElement
    for (const b of this.buffers) {
      buffer = b
      element = b.elements.find(e => e.name === name)
      if (element) break
    }

    if (!buffer || !element) return []

    const convert = (subBytes: globalThis.ArrayBuffer) => {
      switch (element.type) {
        case GLType.FLOAT:
          return new Float32Array(subBytes)
        case GLType.UNSIGNED_SHORT:
          return new Uint16Array(subBytes)
        case GLType.BYTE:
          return new Uint8Array(subBytes)
        default:
          throw "Component type unknown"
      }
    }

    const positions: TypedArray[] = []
    const bytes = buffer.bytes

    for (let i = 0; i < buffer.byteLength; i += buffer.stride) {
      const start = i + element.offset
      const end = start + element.componentSize * element.size
      const position = convert(bytes.buffer.slice(start, end))
      positions.push(position)
    }

    return positions
  }

  computeBoundingBox(positions?: TypedArray[]) {
    if (!positions) positions = this.getAttributeData("position")
    if (positions.length === 0) return

    if (!this.bounds) {
      this.bounds = {
        min: vec3.create(),
        max: vec3.create(),
        center: vec3.create(),
        scale: vec3.create(),
        radius: Infinity,
      }
    }

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]

      this.bounds.min[0] = Math.min(position[0], this.bounds.min[0])
      this.bounds.min[1] = Math.min(position[1], this.bounds.min[1])
      this.bounds.min[2] = Math.min(position[2], this.bounds.min[2])

      this.bounds.max[0] = Math.max(position[0], this.bounds.max[0])
      this.bounds.max[1] = Math.max(position[1], this.bounds.max[1])
      this.bounds.max[2] = Math.max(position[2], this.bounds.max[2])
    }

    vec3.sub(this.bounds.scale, this.bounds.max, this.bounds.min)
    vec3.add(this.bounds.center, this.bounds.min, this.bounds.max)
    vec3.scale(this.bounds.center, this.bounds.center, 0.5)
  }

  computeBoundingSphere(positions?: TypedArray[]) {
    if (!positions) positions = this.getAttributeData("position")
    if (!this.bounds) this.computeBoundingBox(positions)

    let maxRadiusSq = 0
    for (let i = 0, l = positions.length; i < l; i++) {
      maxRadiusSq = Math.max(maxRadiusSq, vec3.sqrDist(this.bounds.center, positions[i] as vec3))
    }

    this.bounds.radius = Math.sqrt(maxRadiusSq)
  }

}

export class GeometryUtils {

  static create(gl: GLContext, vertices: Array<ArrayBufferView>, descriptor: PrimitiveDescriptor[], indices?: ArrayBufferView) {
    const geometry = new Geometry(gl)

    vertices.map((v) => {
      const buffer = geometry.createArrayBuffer(v)
      descriptor.forEach((attribute) => {
        buffer.attribute(attribute.attribute, attribute.type, attribute.size)
      })
    })

    if (indices) {
      geometry.createIndexBuffer(indices, GLDrawUsage.STATIC, GLType.UNSIGNED_SHORT)
    }

    return geometry
  }

  static merge(gl: GLContext, ...geometries: Geometry[]) {
    let indices_length = 0
    let vertices = new Uint8Array(0).buffer
    let indices = new Uint8Array(0).buffer

    for (let i = 0; i < geometries.length; i++) {
      const geometry = geometries[i];

      for (let l = 0; l < geometry.buffers.length; l++) {
        vertices = Bytes.concat(vertices, geometry.buffers[l].bytes.buffer)
      }

      if (geometry.indices) {
        const idxs = new Uint16Array(geometry.indices.bytes.buffer)
        for (let k = 0; k < idxs.length; k++) {
          idxs[k] = idxs[k] + indices_length
        }
        indices_length += idxs.length
        indices = Bytes.concat(indices, geometry.indices.bytes.buffer)
      }
    }

    const descriptor: PrimitiveDescriptor[] = []

    for (let i = 0; i < geometries[0].buffers.length; i++) {
      const buffer = geometries[0].buffers[i];
      buffer.elements.forEach((element) => {
        descriptor.push({
          attribute: element.name,
          size: element.size,
          type: element.type
        })
      })
    }

    return GeometryUtils.create(gl, [new DataView(vertices)], descriptor, new DataView(indices))
  }

}