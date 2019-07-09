import { AccessorTypeSize, ComponentTypeSize, ComponentType, PrimitiveMode, ChunkType } from './Data'
import { Bytes } from '../../io/Bytes';
import { mat4 } from 'gl-matrix';

const MAGIC = "glTF"

interface IData {
  type: string,
  name?: string
  children?: IData[],
  matrix?: mat4,
  geometries?: IGeometryData[]
}

interface IGeometryData {
  type?: string,
  name?: string,
  mode?: string,
  material?: IMaterialData,
  indices?: ArrayBufferView,
  attributes?: {
    [key: string]: {
      name?: string,
      data?: ArrayBufferView,
      attributeSize?: string,
      componentType?: string,
    }
  }
}

interface IMaterialData {
  name?: string,
  type?: string
  raw?: { [key:string]: {} }
}

export class Parser {
  buffers: { [key: string]: ArrayBuffer } = {}

  parseScene(rawScene, raw) {
    var scene: IData = { type: "scene" }
    scene.name = rawScene.name
    scene.children = []

    rawScene.nodes.forEach(nodeIndex => {
      var node = this.parseNode(raw.nodes[nodeIndex], raw)
      scene.children.push( node )
    })

    return scene
  }

  parseNode(rawNode, raw) {
    var node: IData = { type: "node" }
    node.name = rawNode.name
    node.children = []

    if (rawNode.matrix != undefined) node.matrix = rawNode.matrix

    if (rawNode.translation != undefined && rawNode.rotation != undefined && rawNode.scale != undefined) {
      var matrix = mat4.create()
      mat4.fromRotationTranslationScale(matrix, rawNode.rotation, rawNode.translation, rawNode.scale)
      node.matrix = matrix
    }

    if (rawNode.children != undefined) {
      rawNode.children.forEach(childIndex => {
        var child = this.parseNode(raw.nodes[childIndex], raw)
        node.children.push( child )
      })
    }

    if (rawNode.mesh != undefined) {
      this.parseMesh(raw.meshes[rawNode.mesh], raw, node)
    }

    // if (rawNode.camera != undefined) {
    //   this.parseCamera(raw.cameras[rawNode.camera], raw, node)
    // }

    return node
  }

  parseMesh(rawMesh, raw, mesh) {
    mesh = mesh || {}
    mesh.type = "mesh"
    mesh.geometries = []
    mesh.children = []

    rawMesh.primitives.forEach((primitive) => {
      var geometry = this.parseGeometry(primitive, raw)
      mesh.geometries.push( geometry )
    })

    return mesh
  }

  parseCamera(rawCamera, raw, camera) {
    camera = camera || {}
    camera.type = "camera"
    camera.lensType = rawCamera.type

    if (rawCamera.perspective) {
      camera.perspective = rawCamera.perspective
    }
    else if (rawCamera.orthographic) {
      camera.orthographic = rawCamera.orthographic
    }

    return camera
  }

  parseGeometry(rawGeometry, raw) {
    var geometry: IGeometryData = { type: "geometry" }
    geometry.name = rawGeometry.name
    geometry.mode = PrimitiveMode[rawGeometry.mode]
    geometry.attributes = {}

    if (rawGeometry.material) {
      geometry.material = this.parseMaterial(raw.materials[rawGeometry.material], raw)
    } else {
      geometry.material = { name: "default", raw: null }
    }

    Object.keys(rawGeometry.attributes).forEach((attribute) => {
      var accessorIndex = rawGeometry.attributes[attribute]
      var accessor = raw.accessors[accessorIndex]
      geometry.attributes[attribute] = {
        data: this.getBuffer(rawGeometry, raw, accessorIndex),
        attributeSize: AccessorTypeSize[accessor.type],
        componentType: accessor.componentType
      }

      switch (attribute) {
        case "POSITION":
          geometry.attributes[attribute].name = "position"
          break;
        case "NORMAL":
          geometry.attributes[attribute].name = "normal"
          break;
        case "TANGENT":
          geometry.attributes[attribute].name = "tangent"
          break;
        case "TEXCOORD_0":
          geometry.attributes[attribute].name = "uv0"
          break;
        case "TEXCOORD_1":
          geometry.attributes[attribute].name = "uv1"
          break;
        case "COLOR_0":
          geometry.attributes[attribute].name = "color0"
          break;
        case "JOINTS_0":
          geometry.attributes[attribute].name = "joints0"
          break;
        case "WEIGHTS_0":
          geometry.attributes[attribute].name = "weights0"
          break;
      }
    })

    if (rawGeometry.indices !== undefined) {
      geometry.indices = this.getBuffer(rawGeometry, raw, rawGeometry.indices)
    }

    return geometry
  }

  parseMaterial(rawMaterial, raw) {
    var material: IMaterialData = { type: "material" }
    material.name = rawMaterial.name
    material.raw = rawMaterial
    return material
  }

  getBuffer(rawGeometry, raw, index) {
    var accessor = raw.accessors[index]
    var bufferView = raw.bufferViews[accessor.bufferView]
    var buffer = raw.buffers[bufferView.buffer]

    if (this.buffers[bufferView.buffer] == undefined) {
      var BASE64_MARKER = ';base64,';
      var dataURI = buffer.uri
      var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      var base64 = dataURI.substring(base64Index);

      var binary = window.atob(base64)

      var arrbuff = new ArrayBuffer(buffer.byteLength)
      var uint8 = new Uint8Array(arrbuff)

      for (var i = 0; i < buffer.byteLength; i++) {
        uint8[i] = binary.charCodeAt(i)
      }

      this.buffers[bufferView.buffer] = arrbuff
    }

    var bytes = this.buffers[bufferView.buffer]
    var start = (accessor.byteOffset||0) + (bufferView.byteOffset||0)
    var end = start + (accessor.count * AccessorTypeSize[accessor.type] * ComponentTypeSize[accessor.componentType])

    var subBytes = bytes.slice(start, end)

    switch (accessor.componentType) {
      case ComponentType.FLOAT:
        return new Float32Array(subBytes)
      case ComponentType.UNSIGNED_SHORT:
        return new Uint16Array(subBytes)
      case ComponentType.BYTE:
        return new Uint8Array(subBytes)
      default:
        throw "Component type unknown"
    }
  }

  parseGLB(buffer) {
    var uint8 = new Uint8Array(buffer)
    var bytes = new Bytes(uint8.length, uint8)

    var header = new Uint8Array(buffer.slice(0, 12))

    var magic = bytes.getString(0, 4)
    // data.magic = magic
    if (magic !== MAGIC) throw new Error("[glTF Importer] Wrong magic")

    var version = bytes.getInt32(4)
    // data.version = version
    if (version != 2) throw new Error("[glTF Importer] Only support version 2")

    // var length = bytes.getInt32(8)
    // data.length = length

    var pos = 12
    var chunks = { bin: null, json: null }
    this.parseChunks(12, bytes, chunks)

    return {
      type: "glb",
      bin: chunks.bin,
      json: chunks.json
    }
  }

  parseGLTF(json) {
    return {
      type: "gltf",
      bin: null,
      json: json
    }
  }

  parseChunks(pos, bytes, chunks) {
    var chunkLength = bytes.getInt32(pos)
    pos += 4
    var chunkType = bytes.getInt32(pos)
    pos += 4

    var subBytes = bytes.slice(pos, pos + chunkLength)

    if (chunkType == ChunkType.JSON) {
      chunks.json = JSON.parse(String.fromCharCode.apply(null, subBytes))
    } else if (chunkType == ChunkType.BIN) {
      chunks.bin = subBytes.buffer
    }

    pos += chunkLength

    if (pos < bytes.length) {
      this.parseChunks(pos, bytes, chunks)
    }
  }

}