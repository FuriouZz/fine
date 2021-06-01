import Mesh from "engine/Mesh"
import BasicPipeline from "engine/pipelines/BasicPipeline"
import { GLContext, GLType } from "gl/constants/Types"
import Pipeline from "gl/Pipeline"
import { geometryFromPrimitive, TPrimitive } from "primitives/utils"

interface RectangleParams {
  width: number
  height: number
  widthSegment: number
  heightSegment: number
}

export function createRectanglePrimitive(params?: RectangleParams): TPrimitive {
  const {
    width,
    height,
    widthSegment,
    heightSegment,
  } = {
    width: 1,
    height: 1,
    widthSegment: 1,
    heightSegment: 1,
    ...(params || {})
  }

  const rWidthSegment = Math.max(1, widthSegment)
  const rHeightSegment = Math.max(1, heightSegment)

  const vertexSize = 3 /* position */ + 2 /* uv */ + 3 /* normal */ + 4 /* color */
  const vertices = new Float32Array((rWidthSegment + 1) * (rHeightSegment + 1) * vertexSize)
  const indices = new Uint16Array(rWidthSegment * rHeightSegment * 3 * 2)

  let i = 0
  for (let vh = 0; vh <= rHeightSegment; vh++) {
    for (let vw = 0; vw <= rWidthSegment; vw++) {

      const x = (vw / rWidthSegment) * 2 - 1
      const y = (vh / rHeightSegment) * 2 - 1

      // Position
      vertices[i + 0] = x * width
      vertices[i + 1] = y * height
      vertices[i + 2] = 0

      // UV
      vertices[i + 3] = vw / rWidthSegment
      vertices[i + 4] = vh / rHeightSegment

      // Normal
      vertices[i + 5] = 0
      vertices[i + 6] = 0
      vertices[i + 7] = 1

      // Color
      vertices[i + 8] = 1
      vertices[i + 9] = 1
      vertices[i + 10] = 1
      vertices[i + 11] = 1

      i += vertexSize
    }
  }

  let j = 0
  for (let ih = 0; ih < rHeightSegment; ih++) {
    for (let iw = 0; iw < rWidthSegment; iw++) {

      indices[j + 0] = (ih * (rWidthSegment + 1)) + (iw)
      indices[j + 1] = (ih * (rWidthSegment + 1)) + (iw + 1)
      indices[j + 2] = (ih * (rWidthSegment + 1)) + (iw + (rWidthSegment + 1))
      indices[j + 3] = (ih * (rWidthSegment + 1)) + (iw + (rWidthSegment + 1))
      indices[j + 4] = (ih * (rWidthSegment + 1)) + (iw + 1)
      indices[j + 5] = (ih * (rWidthSegment + 1)) + (iw + 1 + (rWidthSegment + 1))

      j += 6
    }
  }

  return [
    vertices,
    indices,
    [
      { attribute: "position", type: GLType.FLOAT, size: 3 },
      { attribute: "uv", type: GLType.FLOAT, size: 2 },
      { attribute: "normal", type: GLType.FLOAT, size: 3 },
      { attribute: "color", type: GLType.FLOAT, size: 4 },
    ]
  ]
}

export function createRectangleGeometry(gl: GLContext, params?: RectangleParams) {
  return geometryFromPrimitive(gl, createRectanglePrimitive(params))
}

export function createRectangleMesh(pipeline?: Pipeline, params?: RectangleParams) {
  return new Mesh(
    createRectangleGeometry(pipeline.gl, params),
    pipeline
  )
}