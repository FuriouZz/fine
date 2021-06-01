import { GLContext } from "gl/constants/Types"
import Texture from "gl/Texture"
import Color from "engine/Color"

export default class TextureUtils {
  private static _textures = new Map<GLContext, Record<number, Texture>>()

  static fromColor(gl: GLContext, color: Color|number|string, alpha = 1) {
    let c: Color
    if (color instanceof Color) {
      c = color
    } else {
      c = Color.fromHex(color)
    }

    c.a = alpha

    if (!this._textures.has(gl)) {
      this._textures.set(gl, {})
    }

    const textures = this._textures.get(gl)
    const hex = c.toHex()
    if (!textures[hex]) {
      textures[hex] = new Texture(gl).fromData(1, 1, c.getBytes())
    }

    return textures[hex]
  }

  static WHITE(gl: GLContext) {
    return TextureUtils.fromColor(gl, 0xffffff)
  }

  static RED(gl: GLContext) {
    return TextureUtils.fromColor(gl, 0xff000)
  }

  static GREEN(gl: GLContext) {
    return TextureUtils.fromColor(gl, 0x00ff00)
  }

  static BLUE(gl: GLContext) {
    return TextureUtils.fromColor(gl, 0x0000ff)
  }
}