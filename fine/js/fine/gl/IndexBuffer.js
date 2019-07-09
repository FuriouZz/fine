import { Buffer } from "./Buffer";
import { GetTypeSize } from "./Utils";
export class IndexBuffer extends Buffer {
    constructor(gl, _type = 5123 /* UNSIGNED_SHORT */, _data, _usage) {
        super(gl, _usage);
        this.type = 5123 /* UNSIGNED_SHORT */;
        this.instanced = false;
        this.instanceCount = 0;
        this.vertexCount = 0;
        this.primitive = 4 /* TRIANGLES */;
        this.bufferType = 34963 /* ELEMENTS */;
        this.set_type(_type);
        if (_data != null)
            this.data(_data);
    }
    set_type(_type) {
        this.type = _type;
        this.compute_length();
    }
    data(_data) {
        super.data(_data);
        this.compute_length();
    }
    draw(_primitive = this.primitive, _count = this.vertexCount, _offset = 0) {
        this.bind();
        if (this.instanced) {
            this.gl.drawElementsInstanced(_primitive, _count, this.type, _offset, this.instanceCount);
        }
        else {
            this.gl.drawElements(_primitive, _count, this.type, _offset);
        }
    }
    compute_length() {
        this.vertexCount = this.byteLength / GetTypeSize(this.type);
    }
}
