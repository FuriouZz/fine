import { GLType } from "gl/constants/Types"
import { TPrimitive } from "primitives/utils"

export function createParticlesPrimitive(count = 100): TPrimitive {
  const vertex_size = 1 /* index */
  const vertices = new Float32Array(vertex_size * count)
  const indices = new Uint16Array(count)

  for (let i = 0, j = 0; i < count; i++) {
    vertices[j+0] = j+0
    j += vertex_size
    indices[i] = i
  }

  return [
    vertices,
    indices,
    [
      { attribute: "index", type: GLType.FLOAT, size: 1 }
    ]
  ]
}