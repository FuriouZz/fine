import Animation from "engine/animation/Animation";
import Camera from "engine/Camera";
import Light from "engine/Light";
import Mesh from "engine/Mesh";
import Transform from "engine/Transform";
import Pipeline from "gl/Pipeline";
import Texture from "gl/Texture";
import { AccessorTypeSize } from "format/gltf/Constants";

export interface GLTFLoadedScene {
  root: Transform
  bufferViews: ArrayBuffer[]
  nodes: Transform[]
  meshes: {
    name: string
    primitives: Mesh[]
  }[]
  cameras: Camera[]
  materials: Pipeline[]
  textures: Texture[]
  images: HTMLImageElement[]
  animations: Animation
  lights: Light[],
  loadables: Promise<any>[]
  json: GLTFJSON
}

export interface GLTF {
  type: "gltf" | "glb",
  bin: ArrayBuffer,
  json: GLTFJSON
}

export interface GLTFJSON {
  nodes: GLTFNode[]
  scenes: GLTFScene[]
  meshes: GLTFMesh[]
  accessors: GLTFAccessor[]
  bufferViews: GLTFBufferView[]
  buffers: GLTFBuffer[]
  cameras: GLTFCamera[]
  animations: GLTFAnimation[]
  materials: GLTFMaterial[]
  textures: GLTFTexture[]
  images: GLTFImage[]
  samplers: GLTFSampler[]
  scene: number
  extensions?: {
    KHR_lights_punctual?: {
      lights: GLTFLight[]
    }
  }
}

export interface GLTFNode {
  name: string
  children?: number[]
  mesh?: number
  camera?: number
  matrix?: number[]
  scale?: number[]
  translation?: number[]
  rotation?: number[]
  extensions?: {
    KHR_lights_punctual?: {
      light: number
    }
  }
}

export interface GLTFScene {
  name: string
  nodes: number[]
}

export interface GLTFMesh {
  name: string
  primitives: GLTFPrimitive[]
}

export interface GLTFPrimitive {
  indices: number
  material?: number
  attributes?: {
    POSITION?: number
    NORMAL?: number
    TANGENT?: number
    TEXCOORD_0?: number
    TEXCOORD_1?: number
    COLOR_0?: number
    JOINTS_0?: number
    WEIGHTS_0?: number
  }
}

export interface GLTFBuffer {
  uri?: string
  byteLength: number
}

export interface GLTFBufferView {
  buffer: number
  byteLength: number
  byteOffset: number
}

export interface GLTFAccessor {
  bufferView: number
  componentType: number
  count: number
  type: keyof typeof AccessorTypeSize
  normalized: boolean
  byteOffset?: number
  min?: number[]
  max?: number[]
}

export interface GLTFCamera {
  name: string
  perspective?: {
    aspectRatio: number,
    yfov: number,
    zfar: number,
    znear: number
  }
  orthographic?: {
    xmag: number,
    ymag: number
    zfar: number,
    znear: number
  }
  type: "perspective" | "orthographic"
}

export interface GLTFAnimation {
  name: string
  channels: {
    sampler: number
    target: {
      node: number
      path: "translation" | "scale" | "rotation" | "weights"
    }
  }[]
  samplers: {
    input: number
    output: number
    interpolation: "LINEAR" | "STEP" | "CUBICSPLINE"
  }[]
}

export interface GLTFMaterial {
  doubleSided: boolean
  name: string
  emissiveFactor: [number, number, number]
  pbrMetallicRoughness: {
    baseColorFactor?: [number, number, number, number]
    metallicFactor?: number
    roughnessFactor?: number
    baseColorTexture?: {
      index: number,
      texCoord: number
    }
    metallicTexture?: {
      index: number,
      texCoord: number
    }
    roughnessTexture?: {
      index: number,
      texCoord: number
    }
    metallicRoughnessTexture?: {
      index: number,
      texCoord: number
    }
  }
  normalTexture: {
    scale: number,
    index: number,
    texCoord: number
  }
}

export interface GLTFTexture {
  source: number
  sampler?: number
}

export interface GLTFImage {
  uri?: string
  bufferView?: number
  mimeType?: string
}

export interface GLTFSampler {
  magFilter: number,
  minFilter: number,
  wrapS: number,
  wrapT: number
}

export interface GLTFLight {
  color: [number, number, number]
  intensity: number
  name: string
  range?: number
  type: "point"
}