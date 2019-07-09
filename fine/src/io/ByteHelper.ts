const dataView = new DataView(new ArrayBuffer(8))

export function Int32ToFloat(value) {
  dataView.setInt32(0, value, true)
  return dataView.getFloat32(0, true)
}

export function FloatToInt32(value) {
  dataView.setFloat32(0, value, true)
  return dataView.getInt32(0, true)
}