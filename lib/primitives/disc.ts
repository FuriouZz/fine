import Mesh from "engine/Mesh"
import { GLContext, GLType } from "gl/constants/Types"
import Pipeline from "gl/Pipeline"
import { geometryFromPrimitive, TPrimitive } from "primitives/utils"

interface DiscParams {
  radiusTop: number
  radiusBottom: number
  segment: number
  heightSegment: number
  height: number
  thethaStart: number
  thethaLength: number
}

export function createDiscPrimitive(params?: DiscParams): TPrimitive {
  const {
    radiusTop,
    radiusBottom,
    segment,
    heightSegment,
    height,
    thethaStart,
    thethaLength,
  } = {
    radiusTop: 1,
    radiusBottom: 0,
    segment: 3,
    heightSegment: 1,
    height: 0,
    thethaStart: 0,
    thethaLength: Math.PI * 2,
    ...(params || {})
  }

  const cSegment = Math.max(3, segment)
  const cHeightSegment = Math.max(1, heightSegment)

  const halfHeight = height * 0.5

  const vertexSize = 3 /* position */ + 2 /* uv */ + 3 /* normal */
  const vertices = new Float32Array((cSegment + 1) * (cHeightSegment + 1) * vertexSize)
  const indices = new Uint16Array(cSegment * cHeightSegment * 3 * 2)

  let i = 0
  for (let vh = 0; vh <= cHeightSegment; vh++) {
    for (let vw = 0; vw <= cSegment; vw++) {

      const step = vw / cSegment
      const circ_radius = vh / cHeightSegment

      // Position
      vertices[i + 0] = Math.cos(thethaStart + step * thethaLength) * (radiusBottom + circ_radius * radiusTop)
      vertices[i + 1] = Math.sin(thethaStart + step * thethaLength) * (radiusBottom + circ_radius * radiusTop)
      vertices[i + 2] = halfHeight * (circ_radius * 2 - 1)

      // UV
      vertices[i + 3] = step
      vertices[i + 4] = circ_radius

      // Normal
      vertices[i + 5] = Math.cos(thethaStart + step * thethaLength)
      vertices[i + 6] = Math.sin(thethaStart + step * thethaLength)
      vertices[i + 7] = 0

      i += vertexSize
    }
  }

  let j = 0
  for (let ih = 0; ih < cHeightSegment; ih++) {
    for (let iw = 0; iw < cSegment; iw++) {

      indices[j + 0] = (ih * (cSegment + 1)) + (iw)
      indices[j + 1] = (ih * (cSegment + 1)) + (iw + 1)
      indices[j + 2] = (ih * (cSegment + 1)) + (iw + (cSegment + 1))
      indices[j + 3] = (ih * (cSegment + 1)) + (iw + (cSegment + 1))
      indices[j + 4] = (ih * (cSegment + 1)) + (iw + 1)
      indices[j + 5] = (ih * (cSegment + 1)) + (iw + 1 + (cSegment + 1))

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
    ]
  ]
}


export function createDiscGeometry(gl: GLContext, params?: DiscParams) {
  return geometryFromPrimitive(gl, createDiscPrimitive(params))
}

export function createDiscMesh(pipeline: Pipeline, params?: DiscParams) {
  return new Mesh(
    createDiscGeometry(pipeline.gl, params),
    pipeline
  )
}