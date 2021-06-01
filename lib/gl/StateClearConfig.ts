import { GLClear } from "gl/constants/Types";

export default class StateClearConfig {
  // Clear
  protected clearRaw = {
    enabled: true,
    bit: GLClear.COLOR_BUFFER,
    color: [0, 0, 0, 1],
    depth: 1
  }

  clone() {
    const c = new StateClearConfig()
    c.clearRaw.enabled = this.clearRaw.enabled
    c.clearRaw.bit = this.clearRaw.bit
    c.clearRaw.color = this.clearRaw.color.slice(0)
    return c
  }

  enable(enabled: boolean) {
    this.clearRaw.enabled = enabled
    return this
  }

  bit(bit: GLClear) {
    this.clearRaw.bit = bit
    return this
  }

  color(red: number = 0, green: number = 0, blue: number = 0, alpha: number = 0) {
    this.clearRaw.color[0] = red
    this.clearRaw.color[1] = green
    this.clearRaw.color[2] = blue
    this.clearRaw.color[3] = alpha
    return this
  }

  depth(value: number) {
    this.clearRaw.depth = value
    return this
  }
}