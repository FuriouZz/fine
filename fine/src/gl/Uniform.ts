import { GLContext } from "./constants/Types";
import { Texture } from "./Texture";
import { vec2, vec3, vec4, mat2, mat3, mat4 } from 'gl-matrix';

export class Uniform {

  constructor(public gl: GLContext, public location: WebGLUniformLocation, public info: WebGLActiveInfo) {}

  float(x: number) {
    this.gl.uniform1f(this.location, x)
  }

  float2(x: number, y: number) {
    this.gl.uniform2f(this.location, x, y)
  }

  float3(x: number, y: number, z: number) {
    this.gl.uniform3f(this.location, x, y, z)
  }

  float4(x: number, y: number, z: number, w: number) {
    this.gl.uniform4f(this.location, x, y, z, w)
  }

  int(x: number) {
    this.gl.uniform1i(this.location, x)
  }

  int2(x: number, y: number) {
    this.gl.uniform2i(this.location, x, y)
  }

  int3(x: number, y: number, z: number) {
    this.gl.uniform3i(this.location, x, y, z)
  }

  int4(x: number, y: number, z: number, w: number) {
    this.gl.uniform4i(this.location, x, y, z, w)
  }

  vertor2(v: vec2) {
    this.gl.uniform2f(this.location, v[0], v[1])
  }

  vertor3(v: vec3) {
    this.gl.uniform3f(this.location, v[0], v[1], v[2])
  }

  vertor4(v: vec4) {
    this.gl.uniform4f(this.location, v[0], v[1], v[2], v[3])
  }

  matrix2(m: mat2, transpose = false) {
    this.gl.uniformMatrix2fv(this.location, transpose, m)
  }

  matrix3(m: mat3, transpose = false) {
    this.gl.uniformMatrix3fv(this.location, transpose, m)
  }

  matrix4(m: mat4, transpose = false) {
    this.gl.uniformMatrix4fv(this.location, transpose, m)
  }

  texture( t: Texture ) {
    this.gl.uniform1i(this.location, t.id)
  }

}