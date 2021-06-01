export default class Color {
  private _decimals: Float32Array
  private _bytes: Uint8Array

  constructor(r = 0, g = 0, b = 0, a = 1) {
    this._decimals = new Float32Array([r, g, b, a])
    this._bytes = new Uint8Array([
      Math.floor(r * 255),
      Math.floor(g * 255),
      Math.floor(b * 255),
      Math.floor(a * 255),
    ])
  }

  get r() {
    return this._decimals[0]
  }

  set r(value: number) {
    this._decimals[0] = value
    this._bytes[0] = Math.floor(value * 255)
  }

  get g() {
    return this._decimals[1]
  }

  set g(value: number) {
    this._decimals[1] = value
    this._bytes[1] = Math.floor(value * 255)
  }

  get b() {
    return this._decimals[2]
  }

  set b(value: number) {
    this._decimals[2] = value
    this._bytes[2] = Math.floor(value * 255)
  }

  get a() {
    return this._decimals[3]
  }

  set a(value: number) {
    this._decimals[3] = value
    this._bytes[3] = Math.floor(value * 255)
  }

  static Red() { return new Color(1, 0, 0) }
  static Green() { return new Color(0, 1, 0) }
  static Blue() { return new Color(0, 0, 1) }
  static White() { return new Color(1, 1, 1) }
  static Black() { return new Color(0, 0, 0) }
  static Transparent() { return new Color(0, 0, 0, 0) }

  static fromHex(hex: number | string, alpha = 1) {
    let h: number
    if (typeof hex === "string") {
      h = parseInt(hex.slice(1), 16)
    } else {
      h = hex
    }

    var c = new Color()
    c.r = ((h >> 16) & 0xff) / 0xff
    c.g = ((h >> 8) & 0xff) / 0xff
    c.b = (h & 0xff) / 0xff
    c.a = alpha
    return c
  }

  static fromDecimals(decimals: Float32Array|number[]) {
    return new Color(decimals[0], decimals[1], decimals[2], decimals[3])
  }

  toHex() {
    return (this.r * 0xff) << 16 | (this.g * 0xff) << 8 | (this.b * 0xff)
  }

  toVec4GLSL() {
    return `vec4(${this.r}, ${this.g}, ${this.b}, ${this.a})`
  }

  toVec3GLSL() {
    return `vec3(${this.r}, ${this.g}, ${this.b})`
  }

  toCSS() {
    return `rgba(${Math.floor(this.r * 255)}, ${Math.floor(this.g * 255)}, ${Math.floor(this.b * 255)}, ${this.a})`
  }

  getBytes() {
    return this._bytes
  }

  getDecimals() {
    return this._decimals
  }

  clone() {
    const c0 = new Color()
    c0.copy(this)
    return c0
  }

  copy(from: Color) {
    this.r = from.r
    this.g = from.g
    this.b = from.b
    this.a = from.a
    return this
  }

  set(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
    return this
  }

  static interpolate(out: Color, a: Color, b: Color, t: number) {
    out.r = a.r + (b.r - a.r) * t
    out.g = a.g + (b.g - a.g) * t
    out.b = a.b + (b.b - a.b) * t
    out.a = a.a + (b.a - a.a) * t
    return out
  }

  static gradiant(out: Color, colors: Color[], t: number) {
    const step = 1 / (colors.length - 1)
    const ti = t * (colors.length - 1)
    const i0 = Math.max(0, Math.floor(ti))
    const i1 = Math.min(colors.length - 1, Math.ceil(ti))
    const c0 = colors[i0]
    const c1 = colors[i1]
    return Color.interpolate(out, c0, c1, (t % step) / step)
  }

}