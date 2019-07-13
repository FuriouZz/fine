import { GLType, GLContext } from "../constants/Types";
import { circle, geometry_from_primitive, rectangle, triangle, sphere } from "./Primitives";
import { Mesh } from "../Mesh";
import { Pipeline } from "../Pipeline";

export interface PrimitiveDescriptor {
  attribute: string,
  type: GLType,
  size: number
}

export class PrimitiveGeometry {
  static triangle(gl: GLContext, size?: number) {
    const data = triangle(size)
    return geometry_from_primitive(gl, data)
  }

  static circle(gl: GLContext, radius_top?: number, segment?: number, height?: number, thethaStart?: number, thethaLength?: number) {
    const data = circle(radius_top, 0, segment, 1, height, thethaStart, thethaLength)
    return geometry_from_primitive(gl, data)
  }

  static rectangle(gl: GLContext, width?: number, height?: number, width_segment?: number, height_segment?: number) {
    const data = rectangle(width, height, width_segment, height_segment)
    return geometry_from_primitive(gl, data)
  }

  static cylinder(gl: GLContext, radius_top?: number, radius_bottom?: number, segment?: number, height_segment?: number, height?: number, thethaStart?: number, thethaLength?: number) {
    const data = circle(radius_top, radius_bottom, segment, height_segment, height, thethaStart, thethaLength)
    return geometry_from_primitive(gl, data)
  }

  static sphere(gl: GLContext, radius?: number, width_segment?: number, height_segment?: number, thethaStart?: number, thethaLength?: number) {
    const data = sphere(radius, width_segment, height_segment, thethaStart, thethaLength)
    return geometry_from_primitive(gl, data)
  }
}

export class PrimitiveMesh {
  static triangle(pipeline: Pipeline, size?: number) {
    const geometry = PrimitiveGeometry.triangle(pipeline.gl, size)
    return new Mesh(geometry, pipeline)
  }

  static circle(pipeline: Pipeline, radius_top?: number, segment?: number, height?: number, thethaStart?: number, thethaLength?: number) {
    const geometry = PrimitiveGeometry.circle(pipeline.gl, radius_top, segment, height, thethaStart, thethaLength)
    return new Mesh(geometry, pipeline)
  }

  static rectangle(pipeline: Pipeline, width?: number, height?: number, width_segment?: number, height_segment?: number) {
    const geometry = PrimitiveGeometry.rectangle(pipeline.gl, width, height, width_segment, height_segment)
    return new Mesh(geometry, pipeline)
  }

  static cylinder(pipeline: Pipeline, radius_top?: number, radius_bottom?: number, segment?: number, height_segment?: number, height?: number, thethaStart?: number, thethaLength?: number) {
    const geometry = PrimitiveGeometry.cylinder(pipeline.gl, radius_top, radius_bottom, segment, height_segment, height, thethaStart, thethaLength)
    return new Mesh(geometry, pipeline)
  }

  static sphere(pipeline: Pipeline, radius?: number, width_segment?: number, height_segment?: number, thethaStart?: number, thethaLength?: number) {
    const geometry = PrimitiveGeometry.sphere(pipeline.gl, radius, width_segment, height_segment, thethaStart, thethaLength)
    return new Mesh(geometry, pipeline)
  }
}