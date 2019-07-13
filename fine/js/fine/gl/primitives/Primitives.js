import { PI2 } from "lol/js/math";
import { Geometry } from "../Geometry";
import { ConcatFloat32Array, ConcatUint16Array } from "../../io/ByteHelper";
export function geometry_from_primitive(gl, primitive) {
    const [vertices, indices, descriptor] = primitive;
    const geometry = new Geometry(gl);
    const buffer = geometry.create_array_buffer(vertices);
    descriptor.forEach((attribute) => {
        buffer.attribute(attribute.attribute, attribute.type, attribute.size);
    });
    geometry.create_index_buffer(5123 /* UNSIGNED_SHORT */, indices);
    return geometry;
}
export function concat_primitives(...primitives) {
    let indices_length = 0;
    const vertices = [];
    const indices = [];
    for (let i = 0; i < primitives.length; i++) {
        const primitive = primitives[i];
        const [vs, is] = primitive;
        for (let k = 0; k < is.length; k++) {
            is[k] = is[k] + indices_length;
        }
        vertices.push(vs);
        indices.push(is);
        indices_length += is.length;
    }
    const [, , descriptor] = primitives[0];
    const f32 = ConcatFloat32Array(...vertices);
    const i16 = ConcatUint16Array(...indices);
    return [
        f32,
        i16,
        descriptor
    ];
}
export function triangle(size = 1) {
    const vertices = new Float32Array([
        -1 * size, -1 * size, 0, /* position */ 0, 0, /* uv */ 0, 0, 1,
        0, 1 * size, 0, /* position */ 0.5, 0.5, /* uv */ 0, 0, 1,
        1 * size, -1 * size, 0, /* position */ 1, 1, /* uv */ 0, 0, 1,
    ]);
    const indices = new Uint16Array([0, 1, 2]);
    return [
        vertices,
        indices,
        [
            { attribute: "position", type: 5126 /* FLOAT */, size: 3 },
            { attribute: "uv", type: 5126 /* FLOAT */, size: 2 },
            { attribute: "normal", type: 5126 /* FLOAT */, size: 3 },
        ]
    ];
}
export function circle(radius_top = 1, radius_bottom = 0, segment = 3, height_segment = 1, height = 0, thethaStart = 0, thethaLength = PI2) {
    segment = Math.max(3, segment);
    height_segment = Math.max(1, height_segment);
    const half_height = height * 0.5;
    const vertex_size = 3 /* position */ + 2 /* uv */ + 3; /* normal */
    const vertices = new Float32Array((segment + 1) * (height_segment + 1) * vertex_size);
    const indices = new Uint16Array(segment * height_segment * 3 * 2);
    let i = 0;
    for (let vh = 0; vh <= height_segment; vh++) {
        for (let vw = 0; vw <= segment; vw++) {
            const step = vw / segment;
            const circ_radius = vh / height_segment;
            // Position
            vertices[i + 0] = Math.cos(thethaStart + step * thethaLength) * (radius_bottom + circ_radius * radius_top);
            vertices[i + 1] = Math.sin(thethaStart + step * thethaLength) * (radius_bottom + circ_radius * radius_top);
            vertices[i + 2] = half_height * (circ_radius * 2 - 1);
            // UV
            vertices[i + 3] = step;
            vertices[i + 4] = circ_radius;
            // Normal
            vertices[i + 5] = Math.cos(thethaStart + step * thethaLength);
            vertices[i + 6] = Math.sin(thethaStart + step * thethaLength);
            vertices[i + 7] = 0;
            i += vertex_size;
        }
    }
    let j = 0;
    for (let ih = 0; ih < height_segment; ih++) {
        for (let iw = 0; iw < segment; iw++) {
            indices[j + 0] = (ih * (segment + 1)) + (iw);
            indices[j + 1] = (ih * (segment + 1)) + (iw + 1);
            indices[j + 2] = (ih * (segment + 1)) + (iw + (segment + 1));
            indices[j + 3] = (ih * (segment + 1)) + (iw + (segment + 1));
            indices[j + 4] = (ih * (segment + 1)) + (iw + 1);
            indices[j + 5] = (ih * (segment + 1)) + (iw + 1 + (segment + 1));
            j += 6;
        }
    }
    return [
        vertices,
        indices,
        [
            { attribute: "position", type: 5126 /* FLOAT */, size: 3 },
            { attribute: "uv", type: 5126 /* FLOAT */, size: 2 },
            { attribute: "normal", type: 5126 /* FLOAT */, size: 3 },
        ]
    ];
}
export function rectangle(width = 1, height = 1, width_segment = 1, height_segment = 1) {
    width_segment = Math.max(1, width_segment);
    height_segment = Math.max(1, height_segment);
    const vertex_size = 3 /* position */ + 2 /* uv */ + 3; /* normal */
    const vertices = new Float32Array((width_segment + 1) * (height_segment + 1) * vertex_size);
    const indices = new Uint16Array(width_segment * height_segment * 3 * 2);
    let i = 0;
    for (let vh = 0; vh <= height_segment; vh++) {
        for (let vw = 0; vw <= width_segment; vw++) {
            const x = (vw / width_segment) * 2 - 1;
            const y = (vh / height_segment) * 2 - 1;
            // Position
            vertices[i + 0] = x * width;
            vertices[i + 1] = y * height;
            vertices[i + 2] = 0;
            // UV
            vertices[i + 3] = vw / width_segment;
            vertices[i + 4] = vh / height_segment;
            // Normal
            vertices[i + 5] = 0;
            vertices[i + 6] = 0;
            vertices[i + 7] = 1;
            i += vertex_size;
        }
    }
    let j = 0;
    for (let ih = 0; ih < height_segment; ih++) {
        for (let iw = 0; iw < width_segment; iw++) {
            indices[j + 0] = (ih * (width_segment + 1)) + (iw);
            indices[j + 1] = (ih * (width_segment + 1)) + (iw + 1);
            indices[j + 2] = (ih * (width_segment + 1)) + (iw + (width_segment + 1));
            indices[j + 3] = (ih * (width_segment + 1)) + (iw + (width_segment + 1));
            indices[j + 4] = (ih * (width_segment + 1)) + (iw + 1);
            indices[j + 5] = (ih * (width_segment + 1)) + (iw + 1 + (width_segment + 1));
            j += 6;
        }
    }
    return [
        vertices,
        indices,
        [
            { attribute: "position", type: 5126 /* FLOAT */, size: 3 },
            { attribute: "uv", type: 5126 /* FLOAT */, size: 2 },
            { attribute: "normal", type: 5126 /* FLOAT */, size: 3 },
        ]
    ];
}
export function sphere(radius = 1, width_segment = 3, height_segment = 3, thethaStart = 0, thethaLength = PI2) {
    width_segment = Math.max(3, width_segment);
    height_segment = Math.max(3, height_segment);
    const vertex_size = 3 /* position */ + 2 /* uv */ + 3; /* normal */
    const vertices = new Float32Array((width_segment + 1) * (height_segment + 1) * vertex_size);
    const indices = new Uint16Array(width_segment * height_segment * 3 * 2);
    let i = 0;
    for (let vh = 0; vh <= height_segment; vh++) {
        for (let vw = 0; vw <= width_segment; vw++) {
            const step = vw / width_segment;
            const circ_radius = vh / height_segment;
            const p = (1 - Math.abs(circ_radius * 2 - 1));
            // Position
            vertices[i + 0] = Math.cos(thethaStart + step * thethaLength) * Math.cos(p * Math.PI * 0.5 + Math.PI * 0.5) * radius;
            vertices[i + 1] = Math.sin(thethaStart + step * thethaLength) * Math.sin(p * Math.PI * 0.5) * radius;
            vertices[i + 2] = Math.cos(circ_radius * Math.PI) * radius;
            // UV
            vertices[i + 3] = step;
            vertices[i + 4] = circ_radius;
            // Normal
            vertices[i + 5] = Math.cos(thethaStart + step * thethaLength) * Math.cos(p * Math.PI * 0.5 + Math.PI * 0.5);
            vertices[i + 6] = Math.sin(thethaStart + step * thethaLength) * Math.sin(p * Math.PI * 0.5);
            vertices[i + 7] = Math.cos(circ_radius * Math.PI);
            i += vertex_size;
        }
    }
    let j = 0;
    for (let ih = 0; ih < height_segment; ih++) {
        for (let iw = 0; iw < width_segment; iw++) {
            indices[j + 0] = (ih * (width_segment + 1)) + (iw);
            indices[j + 1] = (ih * (width_segment + 1)) + (iw + 1);
            indices[j + 2] = (ih * (width_segment + 1)) + (iw + (width_segment + 1));
            indices[j + 3] = (ih * (width_segment + 1)) + (iw + (width_segment + 1));
            indices[j + 4] = (ih * (width_segment + 1)) + (iw + 1);
            indices[j + 5] = (ih * (width_segment + 1)) + (iw + 1 + (width_segment + 1));
            j += 6;
        }
    }
    return [
        vertices,
        indices,
        [
            { attribute: "position", type: 5126 /* FLOAT */, size: 3 },
            { attribute: "uv", type: 5126 /* FLOAT */, size: 2 },
            { attribute: "normal", type: 5126 /* FLOAT */, size: 3 },
        ]
    ];
}
