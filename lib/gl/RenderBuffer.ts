import { GLContext, GLRenderBufferFormat } from "gl/constants/Types"
import { isWebGL2 } from "gl/utils"

export interface RenderBufferOptions {
  format: GLRenderBufferFormat
  samples: number
  width: number
  height: number
}

export default class RenderBuffer {
  static INDEX = -1

  id: number = -1
  width = 0
  height = 0
  format: GLRenderBufferFormat
  buffer: WebGLRenderbuffer
  samples: number

  constructor(public gl: GLContext, options: Partial<RenderBufferOptions> = {}) {
    this.id = ++RenderBuffer.INDEX
    this.format = options.format || GLRenderBufferFormat.DEPTH
    this.samples = options.samples || 0
    this.buffer = gl.createRenderbuffer()
    this.resize(options.width || 0, options.height || 0)
  }

  resize(width: number, height: number) {
    if (width !== this.width || height !== this.height) {
      this.width = width
      this.height = height
      const gl = this.gl
      gl.bindRenderbuffer(gl.RENDERBUFFER, this.buffer)
      if (isWebGL2(gl)) {
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this.samples, this.format, this.width, this.height)
      } else {
        gl.renderbufferStorage(gl.RENDERBUFFER, this.format, this.width, this.height)
      }
    }
  }

  dispose() {
    this.gl.deleteRenderbuffer(this.buffer)
    this.buffer = null
  }

}