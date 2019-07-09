import { Buffer } from "./Buffer";
import { GetTypeSize } from "./Utils";
export class VertexElement {
    constructor(name, type, size, offset, normalize) {
        this.name = name;
        this.type = type;
        this.size = size;
        this.offset = offset;
        this.normalize = normalize;
    }
    get component_size() {
        return GetTypeSize(this.type);
    }
    get byte_size() {
        return this.component_size * this.size;
    }
}
export class ArrayBuffer extends Buffer {
    constructor(gl, _data, _usage) {
        super(gl, _usage);
        this.stride = 0;
        this.vertexCount = 0;
        this.elements = [];
        this.primitive = 4 /* TRIANGLES */;
        this.instanced = false;
        this.instanceCount = 0;
        this.bufferType = 34962 /* ARRAY */;
        if (_data != null)
            this.data(_data);
    }
    attribute(name, type, size, normalize = false) {
        var element = new VertexElement(name, type, size, this.stride, normalize);
        this.elements.push(element);
        this.stride += element.byte_size;
        this.compute_length();
    }
    data(_data) {
        super.data(_data);
        this.compute_length();
    }
    attrib_pointer(pipeline) {
        this.bind();
        for (let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i];
            let location = pipeline.attributes[element.name];
            if (location == null)
                return;
            this.gl.enableVertexAttribArray(location);
            this.gl.vertexAttribPointer(location, element.size, element.type, element.normalize, this.stride, element.offset);
        }
    }
    draw(_primitive = this.primitive, _count = this.vertexCount, _offset = 0) {
        if (this.instanced) {
            this.gl.drawArraysInstanced(_primitive, _offset, _count, this.instanceCount);
        }
        else {
            this.gl.drawArrays(_primitive, _offset, _count);
        }
    }
    compute_length() {
        if (this.stride > 0) {
            this.vertexCount = this.byteLength / this.stride;
        }
    }
}
