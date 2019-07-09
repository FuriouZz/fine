export class Color extends Float32Array {

  get r() { return this[0] }
  set r(value: number) { this[0] = value }
  get g() { return this[1] }
  set g(value: number) { this[1] = value }
  get b() { return this[2] }
  set b(value: number) { this[2] = value }
  get a() { return this[3] }
  set a(value: number) { this[3] = value }

  constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
    super([ r, g, b, a ])
  }

  static Red() { return new Color(1, 0, 0) }
  static Green() { return new Color(0, 1, 0) }
  static Blue() { return new Color(0, 0, 1) }
  static White() { return new Color(0, 0, 1) }
  static Black() { return new Color(0, 0, 0) }

  static from_hex(hex: number) {
    var c = new Color()
    c.r = ((hex >> 16) & 0xff) / 0xff
    c.g = ((hex >> 8) & 0xff) / 0xff
    c.b = (hex & 0xff) / 0xff
    return c
  }

  static to_hex(c: Color) {
    return (c.r * 0xff) << 16 | (c.g * 0xff) << 8 | (c.b * 0xff)
  }

  static to_vec4_glsl(c: Color) {
    return `vec4(${c.r}, ${c.g}, ${c.b}, ${c.a})`
  }

  static to_vec3_glsl(c: Color) {
    return `vec3(${c.r}, ${c.g}, ${c.b})`
  }

  static clone(c: Color) {
    var c0 = new Color()
    c0.r = c.r
    c0.g = c.g
    c0.b = c.b
    c0.a = c.a
    return c0
  }

  static copy(from: Color, to: Color) {
    to.r = from.r
    to.g = from.g
    to.b = from.b
    to.a = from.a
    return to
  }

  static set(c: Color, r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
    c.r = r
    c.g = g
    c.b = b
    c.a = a
    return c
  }

}