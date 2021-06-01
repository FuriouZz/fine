import { GLContext, GLShaderType } from "gl/constants/Types";
import { compileProgram, compileShader } from "gl/utils";

export interface Program {
  key: string
  program: WebGLProgram
}

export default class ProgramCache {
  static cache = new Map<GLContext, Map<string, Program>>()

  static get(gl: GLContext, vertexShader: string, fragmentShader: string) {
    if (!ProgramCache.cache.has(gl)) {
      ProgramCache.cache.set(gl, new Map<string, Program>())
    }
    const cache = ProgramCache.cache.get(gl)
    const key = vertexShader+fragmentShader

    if (!cache.has(key)) {
      const vShader = compileShader(gl, GLShaderType.VERTEX, vertexShader)
      const fShader = compileShader(gl, GLShaderType.FRAGMENT, fragmentShader)
      const program = compileProgram(gl, vShader, fShader)
      cache.set(key, {
        key,
        program
      })
    }

    return cache.get(key)
  }

  static destroy(gl: GLContext, key: string) {
    if (!ProgramCache.cache.has(gl)) {
      ProgramCache.cache.set(gl, new Map<string, Program>())
    }
    const cache = ProgramCache.cache.get(gl)

    if (cache.has(key)) {
      const program = cache.get(key)
      gl.deleteProgram(program)
      cache.delete(key)
    }
  }
}