export const ComponentType = {
  BYTE: 5120,
  UNSIGNED_BYTE: 5121,
  SHORT: 5122,
  UNSIGNED_SHORT: 5123,
  UNSIGNED_INT: 5125,
  FLOAT: 5126,

  5120: "BYTE",
  5121: "UNSIGNED_BYTE",
  5122: "SHORT",
  5123: "UNSIGNED_SHORT",
  5125: "UNSIGNED_INT",
  5126: "FLOAT"
}

export const ComponentTypeSize = {
  BYTE: 1,
  UNSIGNED_BYTE: 1,
  SHORT: 2,
  UNSIGNED_SHORT: 2,
  UNSIGNED_INT: 4,
  FLOAT: 4,

  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
}

export const AccessorTypeSize = {
  "SCALAR": 1,
  "VEC2": 2,
  "VEC3": 3,
  "VEC4": 4,
  "MAT2": 4,
  "MAT3": 9,
  "MAT4": 16
}

export const Accessor = {
  POSITION:   [ "VEC3", ["FLOAT"] ],
  NORMAL:     [ "VEC3", ["FLOAT"] ],
  TANGENT:    [ "VEC4", ["FLOAT"] ],
  TEXCOORD_0: [ "VEC2", ["BYTE","UNSIGNED_SHORT","FLOAT"] ],
  TEXCOORD_1: [ "VEC2", ["BYTE","UNSIGNED_SHORT","FLOAT"] ],
  COLOR_0:    [ "VEC2", ["BYTE","UNSIGNED_SHORT","FLOAT"] ],
  JOINTS_0:   [ "VEC4", ["BYTE","UNSIGNED_SHORT"] ],
  WEIGHTS_0:  [ "VEC4", ["BYTE","UNSIGNED_SHORT","FLOAT"] ]
}

export const PrimitiveMode = [
  "POINTS",
  "LINES",
  "LINE_LOOP",
  "LINE_STRIP",
  "TRIANGLES",
  "TRIANGLE_STRIP",
  "TRIANGLE_FAN"
]

export const ChunkType = {
  JSON: 0x4E4F534A,
  BIN: 0x004E4942
}