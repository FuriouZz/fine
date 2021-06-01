import Color from "engine/Color";
import { GLType, GLMedia, GLTextureWrap, GLColorFormat, GLTextureTarget, GLContext } from "gl/constants/Types";
import { GL } from "gl/constants/Webgl";
import TextureState, { TextureStateConfig } from "./TextureState";

export interface TextureOptions {
  target: GLTextureTarget
  type: GLType
  format: GLColorFormat
  internal: GLColorFormat
  flipY: boolean
  premultiplyAlpha: boolean
  unpackAlignment: number
  generateMipMaps: boolean
  wrap: "repeat" | "mirror" | "clamp"
  wrapS: GLTextureWrap
  wrapT: GLTextureWrap
  filterSmooth: boolean
  filterMipMaps: boolean
  filterMipMapsLinear: boolean
  anisotropy: number
}

export default class Texture {
  static INDEX = -1

  id = -1
  texture: WebGLTexture

  state = new TextureStateConfig()
  currentState = new TextureStateConfig()

  type = GLType.UNSIGNED_BYTE
  target = GLTextureTarget.D2
  format = GLColorFormat.RGB
  internal = GLColorFormat.RGB

  needsUpdate = true
  needsParametersUpdate = true

  constructor(
    public gl: GLContext,
    options: Partial<TextureOptions> = {}
  ) {
    this.id = ++Texture.INDEX

    this.texture = this.gl.createTexture()

    options = {
      type: this.type,
      target: this.target,
      format: this.format,
      internal: this.internal,
      filterSmooth: false,
      filterMipMaps: false,
      filterMipMapsLinear: false,
      wrapS: GLTextureWrap.CLAMP,
      wrapT: GLTextureWrap.CLAMP,
      premultiplyAlpha: false,
      unpackAlignment: 4,
      flipY: false,
      anisotropy: 0,
      ...options
    }

    this.type = options.type
    this.target = options.target
    this.format = options.format
    this.internal = options.internal

    if (options.generateMipMaps) {
      this.generateMipmap(true)
    }

    if (options.wrap) {
      switch (options.wrap) {
        case "clamp": { this.clamp(true, true); break; }
        case "repeat": { this.repeat(true, true); break; }
        case "mirror": { this.mirror(true, true); break; }
      }
    } else {
      this.state.wrapS = options.wrapS
      this.state.wrapT = options.wrapT
    }

    this.filter(options.filterSmooth, options.filterMipMaps, options.filterMipMapsLinear)
    this.premultiplyAlpha(options.premultiplyAlpha)
    this.unpackAlignment(options.unpackAlignment)
    this.flipY(options.flipY)
    this.anisotropy(options.anisotropy)
  }

  get width() {
    return this.currentState.image.width
  }

  get height() {
    return this.currentState.image.height
  }

  dispose() {
    this.gl.deleteTexture(this.texture)
    this.texture = null
  }

  active(unit = 0) {
    this.gl.activeTexture(GL.TEXTURE0 + unit)
    this.gl.bindTexture(this.target, this.texture)
    return this
  }

  bind() {
    this.gl.bindTexture(this.target, this.texture)
    return this
  }

  unbind() {
    this.gl.bindTexture(this.target, null)
    return this
  }

  update(force = false, unit = 0) {
    if (force || this.needsUpdate && this.texture) {
      TextureState.apply(this, unit)
      this.needsUpdate = this.needsParametersUpdate = false
    }
    return this
  }

  flipY(enabled = true) {
    this.state.flipY = enabled
    this.needsUpdate = true
    return this
  }

  premultiplyAlpha(enabled = true) {
    this.state.premultiplyAlpha = enabled
    this.needsUpdate = true
    return this
  }

  unpackAlignment(value = 4) {
    this.state.unpackAlignment = value
    this.needsUpdate = true
    return this
  }

  filter(smooth = false, mipmap = false, miplinear = false) {
    const _smooth = smooth ? 1 : 0
    const _mipmap = mipmap ? 1 : 0
    const _miplinear = miplinear ? 1 : 0

    const filter = GL.NEAREST | _smooth | _mipmap << 8 | (_mipmap & _miplinear) << 1
    this.state.magFilter = GL.NEAREST | _smooth
    this.state.minFilter = filter
    this.needsUpdate = true
    return this
  }

  wrap(wrapS: GLTextureWrap, wrapT = wrapS) {
    this.state.wrapS = wrapS
    this.state.wrapT = wrapT
    this.needsUpdate = true
    return this
  }

  clamp(wrapS = true, wrapT = wrapS) {
    this.state.wrapS = wrapS ? GLTextureWrap.CLAMP : GLTextureWrap.REPEAT
    this.state.wrapT = wrapT ? GLTextureWrap.CLAMP : GLTextureWrap.REPEAT
    this.needsUpdate = true
    return this
  }

  mirror(wrapS = true, wrapT = wrapS) {
    this.state.wrapS = wrapS ? GLTextureWrap.MIRROR : GLTextureWrap.REPEAT
    this.state.wrapT = wrapT ? GLTextureWrap.MIRROR : GLTextureWrap.REPEAT
    this.needsUpdate = true
    return this
  }

  repeat(wrapS = true, wrapT = wrapS) {
    this.state.wrapS = wrapS ? GLTextureWrap.REPEAT : GLTextureWrap.CLAMP
    this.state.wrapT = wrapT ? GLTextureWrap.REPEAT : GLTextureWrap.CLAMP
    this.needsUpdate = true
    return this
  }

  anisotropy(value: number) {
    this.state.anisotropy = value
    this.needsUpdate = true
    return this
  }

  generateMipmap(enabled = true) {
    this.state.generateMipMaps = enabled
    this.needsUpdate = true
    return this
  }

  fromMedia(media: GLMedia) {
    let width = 0
    let height = 0
    if (media instanceof Image) {
      width = media.naturalWidth
      height = media.naturalHeight
    } else if (media instanceof HTMLVideoElement) {
      width = media.videoWidth
      height = media.videoHeight
    } else {
      width = media.width
      height = media.height
    }

    this.state.image = {
      width,
      height,
      source: "html",
      media,
      data: null
    }
    this.needsUpdate = true
    return this
  }

  fromData(width: number, height: number, data: ArrayBufferView) {
    this.state.image = {
      width,
      height,
      source: "data",
      media: null,
      data,
    }
    this.needsUpdate = true
    return this
  }

  fromDataCompressed(width: number, height: number, data: ArrayBufferView) {
    this.state.image = {
      width,
      height,
      source: "compressed",
      media: null,
      data,
    }
    this.needsUpdate = true
    return this
  }

  fromWebGLTexture(texture: WebGLTexture, width: number, height: number) {
    this.texture = texture
    this.state.image = {
      width,
      height,
      source: "texture",
      media: null,
      data: null,
    }
    this.needsUpdate = true
    return this
  }

  resize(width: number, height: number) {
    if (width !== this.state.image.width || height !== this.state.image.height) {
      this.fromData(width, height, null)
    }
    return this
  }

}