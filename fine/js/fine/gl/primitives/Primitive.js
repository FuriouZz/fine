import { circle, geometry_from_primitive, rectangle, triangle, sphere } from "./Primitives";
import { Mesh } from "../Mesh";
export class PrimitiveGeometry {
    static triangle(gl, size) {
        const data = triangle(size);
        return geometry_from_primitive(gl, data);
    }
    static circle(gl, radius_top, segment, height, thethaStart, thethaLength) {
        const data = circle(radius_top, 0, segment, 1, height, thethaStart, thethaLength);
        return geometry_from_primitive(gl, data);
    }
    static rectangle(gl, width, height, width_segment, height_segment) {
        const data = rectangle(width, height, width_segment, height_segment);
        return geometry_from_primitive(gl, data);
    }
    static cylinder(gl, radius_top, radius_bottom, segment, height_segment, height, thethaStart, thethaLength) {
        const data = circle(radius_top, radius_bottom, segment, height_segment, height, thethaStart, thethaLength);
        return geometry_from_primitive(gl, data);
    }
    static sphere(gl, radius, width_segment, height_segment, thethaStart, thethaLength) {
        const data = sphere(radius, width_segment, height_segment, thethaStart, thethaLength);
        return geometry_from_primitive(gl, data);
    }
}
export class PrimitiveMesh {
    static triangle(pipeline, size) {
        const geometry = PrimitiveGeometry.triangle(pipeline.gl, size);
        return new Mesh(geometry, pipeline);
    }
    static circle(pipeline, radius_top, segment, height, thethaStart, thethaLength) {
        const geometry = PrimitiveGeometry.circle(pipeline.gl, radius_top, segment, height, thethaStart, thethaLength);
        return new Mesh(geometry, pipeline);
    }
    static rectangle(pipeline, width, height, width_segment, height_segment) {
        const geometry = PrimitiveGeometry.rectangle(pipeline.gl, width, height, width_segment, height_segment);
        return new Mesh(geometry, pipeline);
    }
    static cylinder(pipeline, radius_top, radius_bottom, segment, height_segment, height, thethaStart, thethaLength) {
        const geometry = PrimitiveGeometry.cylinder(pipeline.gl, radius_top, radius_bottom, segment, height_segment, height, thethaStart, thethaLength);
        return new Mesh(geometry, pipeline);
    }
    static sphere(pipeline, radius, width_segment, height_segment, thethaStart, thethaLength) {
        const geometry = PrimitiveGeometry.sphere(pipeline.gl, radius, width_segment, height_segment, thethaStart, thethaLength);
        return new Mesh(geometry, pipeline);
    }
}
