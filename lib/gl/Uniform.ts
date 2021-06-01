import { GLContext, GLUniformType, ValidUniformType } from "gl/constants/Types";
import Texture from "gl/Texture";
import Pipeline from "gl/Pipeline";
import { isWebGL2 } from "gl/utils";

export default class Uniform {
  gl: GLContext

  constructor(
    public pipeline: Pipeline,
    public name: string,
    public location: WebGLUniformLocation,
    public info: WebGLActiveInfo,
  ) {
    this.gl = pipeline.gl
  }

  private prepareTexture(t?: Texture) {
    if (!t) return 0;

    let unit = this.pipeline['_textureUnits'].indexOf(t.id)
    if (unit === -1) {
      unit = this.pipeline['_textureUnits'].length
      this.pipeline['_textureUnits'].push(t.id)
    }

    t.active(unit)
    t.update(false, unit)
    return unit
  }

  set(value: ValidUniformType) {
    switch (this.info.type) {
      case GLUniformType.FLOAT: {
        this.gl.uniform1f(this.location, value as number)
        break;
      }
      case GLUniformType.FLOAT_VEC2: {
        this.gl.uniform2fv(this.location, value as Float32List)
        break;
      }
      case GLUniformType.FLOAT_VEC3: {
        this.gl.uniform3fv(this.location, value as Float32List)
        break;
      }
      case GLUniformType.FLOAT_VEC4: {
        this.gl.uniform4fv(this.location, value as Float32List)
        break;
      }
      case GLUniformType.INT_VEC2: {
        this.gl.uniform2iv(this.location, value as Int32List)
        break;
      }
      case GLUniformType.INT_VEC3: {
        this.gl.uniform3iv(this.location, value as Int32List)
        break;
      }
      case GLUniformType.INT_VEC4: {
        this.gl.uniform4iv(this.location, value as Int32List)
        break;
      }
      case GLUniformType.BOOL: {
        this.gl.uniform1i(this.location, value as number)
        break;
      }
      case GLUniformType.BOOL_VEC2: {
        this.gl.uniform2iv(this.location, value as Int32List)
        break;
      }
      case GLUniformType.BOOL_VEC3: {
        this.gl.uniform3iv(this.location, value as Int32List)
        break;
      }
      case GLUniformType.BOOL_VEC4: {
        this.gl.uniform4iv(this.location, value as Int32List)
        break;
      }
      case GLUniformType.FLOAT_MAT2: {
        this.gl.uniformMatrix2fv(this.location, false, value as Float32List)
        break;
      }
      case GLUniformType.FLOAT_MAT3: {
        this.gl.uniformMatrix3fv(this.location, false, value as Float32List)
        break;
      }
      case GLUniformType.FLOAT_MAT4: {
        this.gl.uniformMatrix4fv(this.location, false, value as Float32List)
        break;
      }
      case GLUniformType.SAMPLER_CUBE:
      case GLUniformType.SAMPLER_2D: {
        const unit = this.prepareTexture(value as Texture)
        this.gl.uniform1i(this.location, unit)
        break;
      }
    }

    if (!isWebGL2(this.gl)) return;

    // Added with WebGL 2
    switch (this.info.type) {
      case GLUniformType.UNSIGNED_INT: {
        this.gl.uniform1ui(this.location, value as number)
        break;
      }
      case GLUniformType.UNSIGNED_INT_VEC2: {
        this.gl.uniform2uiv(this.location, value as Uint32List)
        break;
      }
      case GLUniformType.UNSIGNED_INT_VEC3: {
        this.gl.uniform3uiv(this.location, value as Uint32List)
        break;
      }
      case GLUniformType.UNSIGNED_INT_VEC4: {
        this.gl.uniform4uiv(this.location, value as Uint32List)
        break;
      }
      case GLUniformType.FLOAT_MAT2x3:
      case GLUniformType.FLOAT_MAT2x4: {
        this.gl.uniformMatrix2fv(this.location, false, value as Float32List)
        break;
      }
      case GLUniformType.FLOAT_MAT3x2:
      case GLUniformType.FLOAT_MAT3x4: {
        this.gl.uniformMatrix3fv(this.location, false, value as Float32List)
        break;
      }
      case GLUniformType.FLOAT_MAT4x2:
      case GLUniformType.FLOAT_MAT4x3: {
        this.gl.uniformMatrix4fv(this.location, false, value as Float32List)
        break;
      }
      case GLUniformType.INT_SAMPLER_2D:
      case GLUniformType.INT_SAMPLER_3D:
      case GLUniformType.INT_SAMPLER_CUBE:
      case GLUniformType.INT_SAMPLER_2D_ARRAY:
      case GLUniformType.SAMPLER_2D_SHADOW:
      case GLUniformType.SAMPLER_2D_ARRAY:
      case GLUniformType.SAMPLER_2D_ARRAY_SHADOW:
      case GLUniformType.SAMPLER_CUBE_SHADOW:
      case GLUniformType.SAMPLER_3D: {
        const unit = this.prepareTexture(value as Texture)
        this.gl.uniform1i(this.location, unit)
        break;
      }
      case GLUniformType.UNSIGNED_INT_SAMPLER_2D:
      case GLUniformType.UNSIGNED_INT_SAMPLER_3D:
      case GLUniformType.UNSIGNED_INT_SAMPLER_CUBE:
      case GLUniformType.UNSIGNED_INT_SAMPLER_2D_ARRAY: {
        const unit = this.prepareTexture(value as Texture)
        this.gl.uniform1ui(this.location, unit)
        break;
      }
    }
  }
}
