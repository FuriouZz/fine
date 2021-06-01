import { GLColorFormat, GLContext, GLType } from "gl/constants/Types";
import Extension from "gl/Extension";
import RenderBuffer from "gl/RenderBuffer";
import Texture, { TextureOptions } from "gl/Texture";
import { isWebGL2 } from "gl/utils";

export interface RenderTargetOptions extends Omit<TextureOptions, "target"> {
  width: number
  height: number
  colorAttachmentCount: number
  depthAttachment: boolean
  stencilAttachment: boolean
  samples: number
}

export default class RenderTarget {
  static ID = 0

  id: number

  fbo: WebGLFramebuffer

  width = 0
  height = 0

  colors: Texture[] = []
  depth?: RenderBuffer
  stencil?: RenderBuffer
  depthStencil?: RenderBuffer

  constructor(
    public gl: GLContext,
    options: Partial<RenderTargetOptions> = {}
  ) {
    this.id = ++RenderTarget.ID

    options.type = options.type || GLType.UNSIGNED_BYTE
    options.format = options.format || GLColorFormat.RGBA
    options.internal = options.internal || GLColorFormat.RGBA
    options.colorAttachmentCount = options.colorAttachmentCount || 1
    options.depthAttachment = options.depthAttachment || false
    options.stencilAttachment = options.stencilAttachment || false
    options.width = options.width || gl.canvas.width
    options.height = options.height || gl.canvas.height

    this.fbo = this.gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo)

    const drawBuffers: number[] = []

    for (let i = 0; i < options.colorAttachmentCount; i++) {
      const texture = new Texture(gl, {
        type: options.type,
        format: options.format,
        internal: options.internal,
        ...options
      })
      texture.fromData(options.width, options.height, null).update()
      this.colors.push(texture)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, texture.texture, 0)
      drawBuffers.push(gl.COLOR_ATTACHMENT0 + i)
    }

    if (drawBuffers.length > 0) {
      if (isWebGL2(gl)) {
        gl.drawBuffers(drawBuffers)
      } else {
        const ext = Extension.get(gl, "WEBGL_draw_buffers")
        if (ext) ext.drawBuffersWEBGL(drawBuffers)
      }
    }

    if (options.depthAttachment && !options.stencilAttachment) {
      this.depth = new RenderBuffer(gl, {
        format: gl.DEPTH_COMPONENT16,
        samples: options.samples,
        width: options.width,
        height: options.height,
      })
      gl.bindRenderbuffer(gl.RENDERBUFFER, this.depth.buffer)
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depth.buffer)
    }

    if (!options.depthAttachment && options.stencilAttachment) {
      this.stencil = new RenderBuffer(gl, {
        format: gl.STENCIL_INDEX8,
        samples: options.samples,
        width: options.width,
        height: options.height,
      })
      gl.bindRenderbuffer(gl.RENDERBUFFER, this.stencil.buffer)
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.stencil.buffer)
    }

    if (options.depthAttachment && options.stencilAttachment) {
      this.depthStencil = new RenderBuffer(gl, {
        format: gl.DEPTH_STENCIL,
        samples: options.samples,
        width: options.width,
        height: options.height,
      })
      gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthStencil.buffer)
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.depthStencil.buffer)
    }

    this.resize(options.width, options.height)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  }

  resize(width: number, height: number) {
    if (width !== this.width || height !== this.height) {
      this.width = width
      this.height = height

      for (const color of this.colors) {
        color.fromData(width, height, null).update()
      }

      if (this.depth) {
        this.depth.resize(width, height)
      }

      if (this.stencil) {
        this.stencil.resize(width, height)
      }

      if (this.depthStencil) {
        this.depthStencil.resize(width, height)
      }
    }
  }

  dispose() {
    for (const color of this.colors) {
      color.dispose()
    }

    if (this.depth) this.depth.dispose()
    if (this.stencil) this.stencil.dispose()
    if (this.depthStencil) this.depthStencil.dispose()

    this.gl.deleteFramebuffer(this.fbo)

    this.colors = []
    this.depth = null
    this.stencil = null
    this.depthStencil = null
    this.fbo = null
  }

  bind() {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo)
  }

  unbind() {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null)
  }

}