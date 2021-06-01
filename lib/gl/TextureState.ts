import { GLContext, GLTextureTarget } from "gl/constants/Types"
import Texture from "gl/Texture"
import { GLMedia, GLTextureWrap, GLTextureFilter } from "gl/constants/Types"
import Extension from "gl/Extension"
import { TextureCubeElements } from "./TextureCube"

export interface TextureStateConfigImage {
  source: "data" | "html" | "compressed" | "texture"
  width: number
  height: number
  media: GLMedia
  data: ArrayBufferView
}

export class TextureStateConfig {
  image: TextureStateConfigImage =
    { source: "data", width: 0, height: 0, media: null, data: null, }

  images: TextureCubeElements<TextureStateConfigImage> = {
    posx: { source: "data", width: 0, height: 0, media: null, data: null, },
    posy: { source: "data", width: 0, height: 0, media: null, data: null, },
    posz: { source: "data", width: 0, height: 0, media: null, data: null, },
    negx: { source: "data", width: 0, height: 0, media: null, data: null, },
    negy: { source: "data", width: 0, height: 0, media: null, data: null, },
    negz: { source: "data", width: 0, height: 0, media: null, data: null, },
  }

  flipY = false
  premultiplyAlpha = false
  unpackAlignment = 4
  generateMipMaps = false

  wrapS = GLTextureWrap.REPEAT
  wrapT = GLTextureWrap.REPEAT

  magFilter = GLTextureFilter.LINEAR
  minFilter = GLTextureFilter.NEAREST_MIPMAP_LINEAR

  anisotropy = 0
}

export default class TextureState {

  private static _setTexture(gl: GLContext, texture: Texture, current: TextureStateConfig, updated: TextureStateConfig) {
    if (current.image != updated.image) {
      switch (updated.image.source) {
        case "html": {
          gl.texImage2D(texture.target, 0, texture.internal, texture.format, texture.type, updated.image.media)
          break
        }

        case "data": {
          gl.texImage2D(texture.target, 0, texture.internal, updated.image.width, updated.image.height, 0, texture.format, texture.type, updated.image.data)
          break
        }

        case "compressed": {
          gl.compressedTexImage2D(texture.target, 0, texture.internal, updated.image.width, updated.image.height, 0, updated.image.data)
          break
        }
      }

      if (updated.generateMipMaps) {
        gl.generateMipmap(texture.target)
        current.generateMipMaps = updated.generateMipMaps
      }

      current.image = updated.image
      return true
    }
    return false
  }

  private static _setCubemap(gl: GLContext, texture: Texture, current: TextureStateConfig, updated: TextureStateConfig) {
    if (current.images != updated.images) {
      switch (updated.image.source) {
        case "html": {
          gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, texture.internal, texture.format, texture.type, updated.images.posx.media)
          gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, texture.internal, texture.format, texture.type, updated.images.posy.media)
          gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, texture.internal, texture.format, texture.type, updated.images.posz.media)
          gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, texture.internal, texture.format, texture.type, updated.images.negx.media)
          gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, texture.internal, texture.format, texture.type, updated.images.negy.media)
          gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, texture.internal, texture.format, texture.type, updated.images.negz.media)
          break
        }

        case "data": {
          gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, texture.internal, updated.images.posx.width, updated.images.posx.height, 0, texture.format, texture.type, updated.images.posx.data)
          gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, texture.internal, updated.images.posy.width, updated.images.posy.height, 0, texture.format, texture.type, updated.images.posy.data)
          gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, texture.internal, updated.images.posz.width, updated.images.posz.height, 0, texture.format, texture.type, updated.images.posz.data)
          gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, texture.internal, updated.images.negx.width, updated.images.negx.height, 0, texture.format, texture.type, updated.images.negx.data)
          gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, texture.internal, updated.images.negy.width, updated.images.negy.height, 0, texture.format, texture.type, updated.images.negy.data)
          gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, texture.internal, updated.images.negz.width, updated.images.negz.height, 0, texture.format, texture.type, updated.images.negz.data)
          break
        }

        case "compressed": {
          gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, texture.internal, updated.images.posx.width, updated.images.posx.height, 0, updated.images.posx.data)
          gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, texture.internal, updated.images.posy.width, updated.images.posy.height, 0, updated.images.posy.data)
          gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, texture.internal, updated.images.posz.width, updated.images.posz.height, 0, updated.images.posz.data)
          gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, texture.internal, updated.images.negx.width, updated.images.negx.height, 0, updated.images.negx.data)
          gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, texture.internal, updated.images.negy.width, updated.images.negy.height, 0, updated.images.negy.data)
          gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, texture.internal, updated.images.negz.width, updated.images.negz.height, 0, updated.images.negz.data)
          break
        }
      }

      // if (updated.generateMipMaps) {
      //   gl.generateMipmap(texture.target)
      //   current.generateMipMaps = updated.generateMipMaps
      // }

      current.images = updated.images
      return true
    }
    return false
  }

  static apply(texture: Texture, unit = 0) {
    const gl = texture.gl
    const current = texture.currentState
    const updated = texture.state
    const paramsUpdate = texture.needsParametersUpdate

    const isCubemap = texture.target === GLTextureTarget.CUBE
    const needsUpdate = !(
      (
        (!isCubemap && current.image == updated.image)
        || (isCubemap && current.images == updated.images)
      )
      && !texture.needsUpdate
    )
    if (!needsUpdate) return

    texture.active(unit)

    if (paramsUpdate || current.flipY != updated.flipY) {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, updated.flipY)
      current.flipY = updated.flipY
    }

    if (paramsUpdate || current.premultiplyAlpha != updated.premultiplyAlpha) {
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, updated.premultiplyAlpha)
      current.premultiplyAlpha = updated.premultiplyAlpha
    }

    if (paramsUpdate || current.unpackAlignment != updated.unpackAlignment) {
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, updated.unpackAlignment)
      current.unpackAlignment = updated.unpackAlignment
    }

    if (paramsUpdate || current.wrapS != updated.wrapS) {
      gl.texParameteri(texture.target, gl.TEXTURE_WRAP_S, updated.wrapS)
      current.wrapS = updated.wrapS
    }

    if (paramsUpdate || current.wrapT != updated.wrapT) {
      gl.texParameteri(texture.target, gl.TEXTURE_WRAP_T, updated.wrapT)
      current.wrapT = updated.wrapT
    }

    if (paramsUpdate || current.magFilter !== updated.magFilter) {
      gl.texParameteri(texture.target, gl.TEXTURE_MAG_FILTER, updated.magFilter)
      current.magFilter = updated.magFilter
    }

    if (paramsUpdate || current.minFilter !== updated.minFilter) {
      gl.texParameteri(texture.target, gl.TEXTURE_MIN_FILTER, updated.minFilter)
      current.minFilter = updated.minFilter
    }

    if (paramsUpdate || current.anisotropy !== updated.anisotropy) {
      if (updated.anisotropy > 0) {
        const ext = Extension.get(gl, "EXT_texture_filter_anisotropic")
        if (ext) gl.texParameterf(texture.target, ext.TEXTURE_MAX_ANISOTROPY_EXT, updated.anisotropy)
        current.anisotropy = updated.anisotropy
      }
    }

    if (isCubemap) {
      TextureState._setCubemap(gl, texture, current, updated)
    } else {
      TextureState._setTexture(gl, texture, current, updated)
    }
  }

}