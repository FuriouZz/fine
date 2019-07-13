import { TypedArray, TypedArrayConstructor } from "./Types";

const dataView = new DataView(new ArrayBuffer(8))

export function Int32ToFloat(value) {
  dataView.setInt32(0, value, true)
  return dataView.getFloat32(0, true)
}

export function FloatToInt32(value) {
  dataView.setFloat32(0, value, true)
  return dataView.getInt32(0, true)
}

export function ConcatFloat32Array(...arrays: Float32Array[]) {
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

export function ConcatUint16Array(...arrays: Uint16Array[]) {
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