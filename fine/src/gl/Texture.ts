import { GLContext, GLType, GLImage, GLTextureWrap } from "./constants/Types";
import { GL } from "./constants/GL";

export type FilterBool = 0 | 1

// https://github.com/plepers/nanogl/blob/develop/texture.js
export class Texture {
  static INDEX = -1

  id: number = -1
  texture: WebGLTexture
  width = 0
  height = 0

  constructor(
    public gl: GLContext,
    public type: GLType = GLType.UNSIGNED_BYTE,
    public format = GL.RGB,
    public internal = GL.RGB
  ) {
    this.id = Texture.INDEX++
    this.texture = this.gl.createTexture()
  }

  bind() {
    this.gl.bindTexture( GL.TEXTURE_2D, this.texture )
  }

  from_image(image: GLImage) {
    this.width = image.width
    this.height = image.height

    this.gl.bindTexture( GL.TEXTURE_2D, this.texture )
    this.gl.texImage2D( GL.TEXTURE_2D, 0, this.internal, this.format, this.type, image )
  }

  from_data(width: number, height: number, data: ArrayBufferView) {
    this.width = width
    this.height = height

    this.gl.bindTexture( GL.TEXTURE_2D, this.texture )
    this.gl.texImage2D( GL.TEXTURE_2D, 0, this.internal, width, height, 0, this.format, this.type, data )
  }

  from_compressed(width: number, height: number, data: ArrayBufferView) {
    this.width = width
    this.height = height

    this.gl.bindTexture( GL.TEXTURE_2D, this.texture )
    this.gl.compressedTexImage2D( GL.TEXTURE_2D, 0, this.internal, width, height, 0, data )
  }

  dispose() {
    this.gl.deleteTexture( this.texture )
    this.texture = null
  }

  filter( smooth: FilterBool, mipmap: FilterBool, miplinear: FilterBool ) {
    var filter = GL.NEAREST | smooth | mipmap << 8 | (mipmap & miplinear) << 1
    this.gl.texParameteri( GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST | smooth )
    this.gl.texParameteri( GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, filter )
  }

  wrap( wrap: GLTextureWrap ) {
    this.gl.texParameteri( GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, wrap )
    this.gl.texParameteri( GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, wrap )
  }

  clamp() { this.wrap( GLTextureWrap.CLAMP ) }
  mirror() { this.wrap( GLTextureWrap.MIRROR ) }
  repeat() { this.wrap( GLTextureWrap.REPEAT ) }

}