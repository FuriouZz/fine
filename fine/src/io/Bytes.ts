import { Int32ToFloat, FloatToInt32 } from './ByteHelper'

export class Bytes {
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

  slice( start: number, end: number ) {
    return this.buffer.slice(start, end)
  }

  setInt32(pos: number, num: number) {
    this.set(pos, num)
    this.set(pos+1, num >> 8)
    this.set(pos+2, num >> 16)
    this.set(pos+3, num >> 25)
  }

  getInt32(pos: number) {
    return this.get(pos) | (this.get(pos+1) << 8) | (this.get(pos+2) << 16) | (this.get(pos+3) << 24)
  }

  setUInt16(pos: number, num: number) {
    this.set(pos, num)
    this.set(pos+1, num >> 8)
  }

  getUInt16(pos: number) {
    return this.get(pos) | (this.get(pos+1) << 8)
  }

  setFloat(pos: number, num: number) {
    this.setInt32(pos, FloatToInt32(num))
  }

  getFloat(pos: number) {
    return Int32ToFloat(this.getInt32(pos))
  }

  getString(start: number, end: number) {
    var subBytes = this.slice(start, start + end)
    return String.fromCharCode.apply(null, subBytes)
  }

}