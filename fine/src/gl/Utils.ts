import { GLType, GLTypeSize, GLContext, GLShaderType } from "./constants/Types";
import { pad } from "lol/js/string"

export function GetTypeSize(type: GLType) {
  switch (type) {
    case GLType.BYTE: { return GLTypeSize.BYTE }
    case GLType.UNSIGNED_BYTE: { return GLTypeSize.UNSIGNED_BYTE }
    case GLType.SHORT: { return GLTypeSize.SHORT }
    case GLType.UNSIGNED_SHORT: { return GLTypeSize.UNSIGNED_SHORT }
    case GLType.INT: { return GLTypeSize.INT }
    case GLType.UNSIGNED_INT: { return GLTypeSize.UNSIGNED_INT }
    case GLType.FLOAT: { return GLTypeSize.FLOAT }
    default: return 0
  }
}

function format(code: string) {
  const lines = code.split(/\n/)
  const length = lines.length.toString().length
  return lines.map((line, index) => {
    return pad((index + 1).toString(), length, "0") + ": " + line
  })
  .join('\n')
}

export function CompileShader(gl: GLContext, type: GLShaderType, code: string) {
  const shader = gl.createShader( type )
  gl.shaderSource( shader, code )
  gl.compileShader( shader )

  if (!gl.getShaderParameter( shader, gl.COMPILE_STATUS )) {
    console.warn( format(code) )
    console.warn( gl.getShaderInfoLog(shader) )
    throw new Error(`Can't compile shader`)
  }

  return shader
}