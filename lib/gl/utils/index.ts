import { GLType, GLTypeSize, GLContext, GLShaderType } from "gl/constants/Types";

export function getTypeSize(type: GLType) {
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
    return (index + 1).toString().padStart(length, "0") + ": " + line
  })
  .join('\n')
}

export function compileShader(gl: GLContext, type: GLShaderType, code: string) {
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

export function compileProgram(gl: GLContext, vShader: WebGLShader, fShader: WebGLShader) {
  const program = gl.createProgram()
  gl.attachShader(program, vShader)
  gl.attachShader(program, fShader)
  gl.linkProgram(program)
  gl.deleteShader(vShader)
  gl.deleteShader(fShader)

  if (gl.getProgramParameter(program, gl.LINK_STATUS) == 0) {
    var message = "Unable to initialize the shader program"
    message += "\n" + gl.getProgramInfoLog(program)
    console.warn(message)
    return null
  }

  return program
}

export function isWebGL2(context: any): context is WebGL2RenderingContext {
  return context.fenceSync !== undefined;
}