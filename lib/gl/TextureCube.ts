import { GLContext, GLMedia, GLTextureTarget } from "gl/constants/Types";
import Texture, { TextureOptions } from "gl/Texture";

export interface TextureCubeElements<T> {
  posx: T
  posy: T
  posz: T
  negx: T
  negy: T
  negz: T
}

export default class TextureCube extends Texture {
  constructor(gl: GLContext, options: Partial<TextureOptions> = {}) {
    options.target = GLTextureTarget.D2
    super(gl, options)
  }

  fromMedias(medias: TextureCubeElements<GLMedia>) {
    let width = 0
    let height = 0
    if (medias[0] instanceof Image) {
      width = medias[0].naturalWidth
      height = medias[0].naturalHeight
    } else if (medias[0] instanceof HTMLVideoElement) {
      width = medias[0].videoWidth
      height = medias[0].videoHeight
    } else {
      width = medias[0].width
      height = medias[0].height
    }

    this.state.images = {
      posx: { source: "html", width, height, media: medias.posx, data: null, },
      posy: { source: "html", width, height, media: medias.posy, data: null, },
      posz: { source: "html", width, height, media: medias.posz, data: null, },
      negx: { source: "html", width, height, media: medias.negx, data: null, },
      negy: { source: "html", width, height, media: medias.negy, data: null, },
      negz: { source: "html", width, height, media: medias.negz, data: null, },
    }

    this.needsUpdate = true
    return this
  }

  fromDatas(width: number, height: number, datas: TextureCubeElements<ArrayBufferView>) {
    this.state.images = {
      posx: { source: "data", width, height, media: null, data: datas.posx, },
      posy: { source: "data", width, height, media: null, data: datas.posy, },
      posz: { source: "data", width, height, media: null, data: datas.posz, },
      negx: { source: "data", width, height, media: null, data: datas.negx, },
      negy: { source: "data", width, height, media: null, data: datas.negy, },
      negz: { source: "data", width, height, media: null, data: datas.negz, },
    }
    this.needsUpdate = true
    return this
  }

  fromDatasCompressed(width: number, height: number, datas: TextureCubeElements<ArrayBufferView>) {
    this.state.images = {
      posx: { source: "compressed", width, height, media: null, data: datas.posx, },
      posy: { source: "compressed", width, height, media: null, data: datas.posy, },
      posz: { source: "compressed", width, height, media: null, data: datas.posz, },
      negx: { source: "compressed", width, height, media: null, data: datas.negx, },
      negy: { source: "compressed", width, height, media: null, data: datas.negy, },
      negz: { source: "compressed", width, height, media: null, data: datas.negz, },
    }
    this.needsUpdate = true
    return this
  }

  resize(width: number, height: number) {
    if (width !== this.state.image.width || height !== this.state.image.height) {
      this.fromDatas(width, height, null)
    }
    return this
  }

}