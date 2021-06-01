import { mat4 } from "gl-matrix";

export function getMaxScaleOnAxis(mat: mat4) {
  let m11 = mat[0]
  let m12 = mat[1]
  let m13 = mat[2]
  let m21 = mat[4]
  let m22 = mat[5]
  let m23 = mat[6]
  let m31 = mat[8]
  let m32 = mat[9]
  let m33 = mat[10]

  const x = m11 * m11 + m12 * m12 + m13 * m13
  const y = m21 * m21 + m22 * m22 + m23 * m23
  const z = m31 * m31 + m32 * m32 + m33 * m33

  return Math.sqrt(Math.max(x, y, z))
}