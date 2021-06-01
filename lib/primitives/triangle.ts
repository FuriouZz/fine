import Mesh from "engine/Mesh"
import { GLContext, GLType } from "gl/constants/Types"
import Pipeline from "gl/Pipeline"
import { geometryFromPrimitive, TPrimitive } from "primitives/utils"

export function createTrianglePrimitive(size = 1): TPrimitive {
  const vertices = new Float32Array([
    -1 * size, -1 * size, 0, /* position */   0, 0, /* uv */ 0, 0, 1, /* normal */
    0, 1 * size, 0, /* position */ 0.5, 0.5, /* uv */ 0, 0, 1, /* normal */
    1 * size, -1 * size, 0, /* position */   1, 1, /* uv */ 0, 0, 1, /* normal */
  ])

  const indices = new Uint16Array([0, 1, 2])

  return [
    vertices,
    indices,
    [
      { attribute: "position", type: GLType.FLOAT, size: 3 },
      { attribute: "uv", type: GLType.FLOAT, size: 2 },
      { attribute: "normal", type: GLType.FLOAT, size: 3 },
    ]
  ]
}

export function createTriangleGeometry(gl: GLContext, size?: number) {
  return geometryFromPrimitive(gl, createTrianglePrimitive(size))
}

export function createTriangleMesh(pipeline: Pipeline, size?: number) {
  return new Mesh(
    createTriangleGeometry(pipeline.gl, size),
    pipeline
  )
}