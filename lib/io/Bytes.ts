export default class Bytes {
  length: number
  buffer: ArrayBuffer

  constructor(length: number, buffer: ArrayBuffer) {
    this.length = length
    this.buffer = buffer
  }

  get(pos: number) {
    return this.buffer[pos]
  }

  set(pos: number, num: number) {
    this.buffer[pos] = num
  }

  slice(start: number, end: number) {
    return this.buffer.slice(start, end)
  }

  setInt32(pos: number, num: number) {
    this.set(pos, num)
    this.set(pos + 1, num >> 8)
    this.set(pos + 2, num >> 16)
    this.set(pos + 3, num >> 25)
  }

  getInt32(pos: number) {
    return this.get(pos) | (this.get(pos + 1) << 8) | (this.get(pos + 2) << 16) | (this.get(pos + 3) << 24)
  }

  setUInt16(pos: number, num: number) {
    this.set(pos, num)
    this.set(pos + 1, num >> 8)
  }

  getUInt16(pos: number) {
    return this.get(pos) | (this.get(pos + 1) << 8)
  }

  setFloat(pos: number, num: number) {
    this.setInt32(pos, Bytes.FloatToInt32(num))
  }

  getFloat(pos: number) {
    return Bytes.Int32ToFloat(this.getInt32(pos))
  }

  getString(start: number, end: number) {
    var subBytes = this.slice(start, start + end)
    return String.fromCharCode.apply(null, subBytes)
  }

  private static _dataView = new DataView(new ArrayBuffer(8))

  static Int32ToFloat(value) {
    Bytes._dataView.setInt32(0, value, true)
    return Bytes._dataView.getFloat32(0, true)
  }

  static FloatToInt32(value) {
    Bytes._dataView.setFloat32(0, value, true)
    return Bytes._dataView.getInt32(0, true)
  }

  static concat(...arrays: ArrayBuffer[]) {
    return arrays.reduce<ArrayBuffer>((previous, current, i) => {
      if (i == 0) return previous

      const bytes = new Uint8Array(previous.byteLength + current.byteLength)
      bytes.set(new Uint8Array(previous), 0)
      bytes.set(new Uint8Array(current), previous.byteLength)

      return bytes.buffer
    }, arrays[0])
  }

  static ConcatFloat32Array(...arrays: Float32Array[]) {
    const type_size = 4
    let byteLength = 0
    for (let i = 0; i < arrays.length; i++) {
      const element = arrays[i];
      byteLength += element.byteLength
    }

    const buffer = new Float32Array(byteLength / type_size)
    let offset = 0

    for (let j = 0; j < arrays.length; j++) {
      const array = arrays[j];
      buffer.set(new Float32Array(array.buffer), offset)
      offset += array.buffer.byteLength / type_size
    }

    return buffer
  }

  static ConcatUint16Array(...arrays: Uint16Array[]) {
    const type_size = 2
    let byteLength = 0
    for (let i = 0; i < arrays.length; i++) {
      const element = arrays[i];
      byteLength += element.byteLength
    }

    const buffer = new Uint16Array(byteLength / type_size)
    let offset = 0

    for (let j = 0; j < arrays.length; j++) {
      const array = arrays[j];
      buffer.set(new Uint16Array(array.buffer), offset)
      offset += array.buffer.byteLength / type_size
    }

    return buffer
  }

}