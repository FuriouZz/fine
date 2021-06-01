import { GLContext, GLDrawUsage, GLType } from "gl/constants/Types";
import Geometry, { PrimitiveDescriptor } from "gl/Geometry";
import Bytes from "io/Bytes";

export type TPrimitive = [Float32Array, Uint16Array, PrimitiveDescriptor[]]

export function geometryFromPrimitive(gl: GLContext, primitive: TPrimitive, geometry?: Geometry) {
  const [vertices, indices, descriptor] = primitive

  if (!geometry) {
    geometry = new Geometry(gl)
  }

  const buffer = geometry.createArrayBuffer(vertices)
  descriptor.forEach((attribute) => {
    buffer.attribute(attribute.attribute, attribute.type, attribute.size)
  })

  geometry.createIndexBuffer(indices, GLDrawUsage.STATIC, GLType.UNSIGNED_SHORT)

  return geometry
}

export function concatPrimitives(...primitives: TPrimitive[]): TPrimitive {
  let indices_length = 0
  const vertices: Float32Array[] = []
  const indices: Uint16Array[] = []

  for (let i = 0; i < primitives.length; i++) {
    const primitive = primitives[i];
    const [vs, is] = primitive

    for (let k = 0; k < is.length; k++) {
      is[k] = is[k] + indices_length
    }

    vertices.push(vs)
    indices.push(is)

    indices_length += is.length
  }

  const [, , descriptor] = primitives[0]

  const f32 = Bytes.ConcatFloat32Array(...vertices)
  const i16 = Bytes.ConcatUint16Array(...indices)

  return [
    f32,
    i16,
    descriptor
  ]
}