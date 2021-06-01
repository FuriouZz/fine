import Mesh from "engine/Mesh"
import { GLContext, GLType } from "gl/constants/Types"
import Pipeline from "gl/Pipeline"
import { geometryFromPrimitive, TPrimitive } from "primitives/utils"

interface SphereParams {
  radius: number
  widthSegment: number
  heightSegment: number
  thethaStart: number
  thethaLength: number
}

export function createSpherePrimitive(params?: SphereParams): TPrimitive {
  const {
    radius,
    widthSegment,
    heightSegment,
    thethaStart,
    thethaLength,
  } = {
    radius: 1,
    widthSegment: 3,
    heightSegment: 3,
    thethaStart: 0,
    thethaLength: Math.PI * 2,
    ...(params || {})
  }

  const sWidthSegment = Math.max(3, widthSegment)
  const sHeightSegment = Math.max(3, heightSegment)

  const vertexSize = 3 /* position */ + 2 /* uv */ + 3 /* normal */
  const vertices = new Float32Array((sWidthSegment + 1) * (sHeightSegment + 1) * vertexSize)
  const indices = new Uint16Array(sWidthSegment * sHeightSegment * 3 * 2)

  let i = 0
  for (let vh = 0; vh <= sHeightSegment; vh++) {
    for (let vw = 0; vw <= sWidthSegment; vw++) {

      const step = vw / sWidthSegment
      const circ_radius = vh / sHeightSegment

      const p = (1 - Math.abs(circ_radius * 2 - 1))

      // Position
      vertices[i + 0] = Math.cos(thethaStart + step * thethaLength) * Math.cos(p * Math.PI * 0.5 + Math.PI * 0.5) * radius
      vertices[i + 1] = Math.sin(thethaStart + step * thethaLength) * Math.sin(p * Math.PI * 0.5) * radius
      vertices[i + 2] = Math.cos(circ_radius * Math.PI) * radius

      // UV
      vertices[i + 3] = step
      vertices[i + 4] = circ_radius

      // Normal
      vertices[i + 5] = Math.cos(thethaStart + step * thethaLength) * Math.cos(p * Math.PI * 0.5 + Math.PI * 0.5)
      vertices[i + 6] = Math.sin(thethaStart + step * thethaLength) * Math.sin(p * Math.PI * 0.5)
      vertices[i + 7] = Math.cos(circ_radius * Math.PI)

      i += vertexSize
    }
  }

  let j = 0
  for (let ih = 0; ih < sHeightSegment; ih++) {
    for (let iw = 0; iw < sWidthSegment; iw++) {

      indices[j + 0] = (ih * (sWidthSegment + 1)) + (iw)
      indices[j + 1] = (ih * (sWidthSegment + 1)) + (iw + 1)
      indices[j + 2] = (ih * (sWidthSegment + 1)) + (iw + (sWidthSegment + 1))
      indices[j + 3] = (ih * (sWidthSegment + 1)) + (iw + (sWidthSegment + 1))
      indices[j + 4] = (ih * (sWidthSegment + 1)) + (iw + 1)
      indices[j + 5] = (ih * (sWidthSegment + 1)) + (iw + 1 + (sWidthSegment + 1))

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

export function createSphereGeometry(gl: GLContext, params?: SphereParams) {
  return geometryFromPrimitive(gl, createSpherePrimitive(params))
}

export function createSphereMesh(pipeline: Pipeline, params?: SphereParams) {
  return new Mesh(
    createSphereGeometry(pipeline.gl, params),
    pipeline
  )
}