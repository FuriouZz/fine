export class Uniform {
    constructor(gl, location, info) {
        this.gl = gl;
        this.location = location;
        this.info = info;
    }
    float(x) {
        this.gl.uniform1f(this.location, x);
    }
    float2(x, y) {
        this.gl.uniform2f(this.location, x, y);
    }
    float3(x, y, z) {
        this.gl.uniform3f(this.location, x, y, z);
    }
    float4(x, y, z, w) {
        this.gl.uniform4f(this.location, x, y, z, w);
    }
    int(x) {
        this.gl.uniform1i(this.location, x);
    }
    int2(x, y) {
        this.gl.uniform2i(this.location, x, y);
    }
    int3(x, y, z) {
        this.gl.uniform3i(this.location, x, y, z);
    }
    int4(x, y, z, w) {
        this.gl.uniform4i(this.location, x, y, z, w);
    }
    vertor2(v) {
        this.gl.uniform2f(this.location, v[0], v[1]);
    }
    vertor3(v) {
        this.gl.uniform3f(this.location, v[0], v[1], v[2]);
    }
    vertor4(v) {
        this.gl.uniform4f(this.location, v[0], v[1], v[2], v[3]);
    }
    matrix2(m, transpose = false) {
        this.gl.uniformMatrix2fv(this.location, transpose, m);
    }
    matrix3(m, transpose = false) {
        this.gl.uniformMatrix3fv(this.location, transpose, m);
    }
    matrix4(m, transpose = false) {
        this.gl.uniformMatrix4fv(this.location, transpose, m);
    }
    texture(t) {
        this.gl.uniform1i(this.location, t.id);
    }
}
