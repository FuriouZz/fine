export class Buffer {
    constructor(gl, _usage = 35044 /* STATIC */) {
        this.gl = gl;
        this.bufferType = 34962 /* ARRAY */;
        this.usage = 35044 /* STATIC */;
        this.byteLength = 0;
        this.buffer = this.gl.createBuffer();
        this.usage = _usage;
    }
    bind() {
        this.gl.bindBuffer(this.bufferType, this.buffer);
    }
    data(data) {
        this.gl.bindBuffer(this.bufferType, this.buffer);
        this.gl.bufferData(this.bufferType, data, this.usage);
        this.gl.bindBuffer(this.bufferType, null);
        this.byteLength = data.byteLength;
    }
    sub_data(data, offset) {
        this.gl.bindBuffer(this.bufferType, this.buffer);
        this.gl.bufferSubData(this.bufferType, offset, data);
        this.gl.bindBuffer(this.bufferType, null);
    }
    dispose() {
        this.gl.deleteBuffer(this.buffer);
        this.buffer = null;
    }
}
