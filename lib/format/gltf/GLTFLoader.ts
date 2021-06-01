import Transform from "engine/Transform";
import Geometry from "gl/Geometry";
import { GLColorFormat, GLContext, GLCulling, GLDrawUsage} from "gl/constants/Types";
import { AccessorTypeSize, ArrayType, ChunkType, ComponentTypeSize, GLB_EXT_REG, GLTF_EXT_REG, MAGIC } from "format/gltf/Constants";
import Bytes from "io/Bytes";
import Mesh from "engine/Mesh";
import Pipeline from "gl/Pipeline";
import Camera from "engine/Camera";
import { GLTF, GLTFAccessor, GLTFAnimation, GLTFBufferView, GLTFCamera, GLTFImage, GLTFJSON, GLTFMaterial, GLTFMesh, GLTFPrimitive, GLTFScene, GLTFTexture, GLTFLoadedScene, GLTFLight } from "format/gltf/Types";
import { Net } from "lol/js/dom/net";
import { mat4 } from "gl-matrix";
import ActionDescriptor from "engine/animation/ActionDescriptor";
import Animation from "engine/animation/Animation";
import PBRPipeline from "engine/pipelines/PBRPipeline";
import Texture from "gl/Texture";
import { PointLight } from "engine/Light";
import Color from "engine/Color";
import VertexColorPipeline from "engine/pipelines/VertexColorPipeline";
import NormalPipeline from "engine/pipelines/NormalPipeline";
import UVPipeline from "engine/pipelines/UVPipeline";
import BasicPipeline from "engine/pipelines/BasicPipeline";

export default class GLTFLoader {
  buffers: { [key: string]: ArrayBuffer } = {}
  data: GLTF

  constructor(public gl: GLContext) { }

  parseScene(rawScene: GLTFScene, raw: GLTFJSON) {
    const root = new Transform()
    root.name = rawScene.name

    const scene: GLTFLoadedScene = {
      root,
      bufferViews: [],
      nodes: [],
      meshes: [],
      cameras: [],
      materials: [],
      textures: [],
      images: [],
      animations: new Animation(),
      loadables: [],
      lights: [],
      json: raw
    }

    if (raw.bufferViews) {
      scene.bufferViews = raw.bufferViews.map(rawBufferView => (
        this.getBufferView(raw, rawBufferView)
      ))
    }

    if (raw.textures) {
      scene.textures = raw.textures.map(rawTexture => (
        this.parseTexture(rawTexture, raw, scene)
      ))
    }

    if (raw.materials) {
      scene.materials = raw.materials.map(rawMaterial => (
        this.parseMaterial(rawMaterial, raw, scene)
      ))
    }

    if (raw.animations) {
      scene.animations.descriptors = raw.animations.map(rawAnimation => (
        this.parseAnimation(rawAnimation, raw, scene)
      ))
    }

    if (raw.meshes) {
      scene.meshes = raw.meshes.map(rawMesh => (
        this.parseMesh(rawMesh, raw, scene)
      ))
    }

    if (raw.cameras) {
      scene.cameras = raw.cameras.map(rawCamera => (
        this.parseCamera(rawCamera, raw)
      ))
    }

    if (raw.extensions) {
      if (raw.extensions.KHR_lights_punctual) {
        scene.lights = raw.extensions.KHR_lights_punctual.lights.map(rawLight => (
          this.parseLight(rawLight, raw)
        ))
      }
    }

    for (const index of rawScene.nodes) {
      const node = this.parseNode(index, raw, scene)
      scene.root.addChild(node)
    }

    // console.log(scene)

    return scene
  }

  parseNode(nodeIndex: number, raw: GLTFJSON, scene: GLTFLoadedScene) {
    const rawNode = raw.nodes[nodeIndex]
    const transform = new Transform()
    transform.name = rawNode.name
    scene.nodes.push(transform)

    if (rawNode.matrix != undefined) {
      transform.matrix = new Float32Array(rawNode.matrix)
    }

    if (rawNode.translation != undefined && rawNode.rotation != undefined && rawNode.scale != undefined) {
      const matrix = mat4.create()
      mat4.fromRotationTranslationScale(matrix, new Float32Array(rawNode.rotation), new Float32Array(rawNode.translation), new Float32Array(rawNode.scale))
      transform.matrix = matrix
    }

    if (rawNode.scale != undefined) {
      transform.scaleValues[0] = rawNode.scale[0]
      transform.scaleValues[1] = rawNode.scale[1]
      transform.scaleValues[2] = rawNode.scale[2]
    }

    if (rawNode.rotation != undefined) {
      transform.rotationValues[0] = rawNode.rotation[0]
      transform.rotationValues[1] = rawNode.rotation[1]
      transform.rotationValues[2] = rawNode.rotation[2]
      transform.rotationValues[3] = rawNode.rotation[3]
    }

    if (rawNode.translation != undefined) {
      transform.positionValues[0] = rawNode.translation[0]
      transform.positionValues[1] = rawNode.translation[1]
      transform.positionValues[2] = rawNode.translation[2]
    }

    transform.invalidate()

    if (rawNode.children != undefined) {
      rawNode.children.forEach(childIndex => {
        const child = this.parseNode(childIndex, raw, scene)
        transform.addChild(child)
      })
    }

    if (rawNode.mesh != undefined) {
      for (const primitive of scene.meshes[rawNode.mesh].primitives) {
        transform.addChild(primitive.transform)
      }
    }

    if (rawNode.camera != undefined) {
      const camera = scene.cameras[rawNode.camera]
      camera.transform = transform
    }

    if (rawNode.extensions != undefined) {
      if (rawNode.extensions.KHR_lights_punctual) {
        const light = scene.lights[rawNode.extensions.KHR_lights_punctual.light]
        light.transform = transform
      }
    }

    return transform
  }

  parseMesh(rawMesh: GLTFMesh, raw: GLTFJSON, scene: GLTFLoadedScene) {
    return {
      name: rawMesh.name,
      primitives: rawMesh.primitives.map(rawPrimitive => {
        const [geometry, pipeline] = this.parsePrimitive(rawPrimitive, raw, scene)
        const m = new Mesh(geometry, pipeline)
        m.name = `${rawMesh.name}.Material.${pipeline.name}`
        // if (!isNaN(rawPrimitive.material)) {
        //   m.name = `${m.name}.${rawPrimitive.material}`
        // }
        return m
      })
    }
  }

  parseCamera(rawCamera: GLTFCamera, raw: GLTFJSON) {
    const camera = new Camera()
    camera.transform.name = rawCamera.name

    if (rawCamera.type === "perspective" && rawCamera.perspective) {
      camera.perspective({
        fovy: rawCamera.perspective.yfov,
        aspect: rawCamera.perspective.aspectRatio,
        near: rawCamera.perspective.znear,
        far: rawCamera.perspective.zfar,
      })
    }

    if (rawCamera.type === "orthographic" && rawCamera.orthographic) {
      camera.ortographic({
        left: -rawCamera.orthographic.xmag,
        right: rawCamera.orthographic.xmag,
        top: rawCamera.orthographic.ymag,
        bottom: -rawCamera.orthographic.ymag,
        near: rawCamera.orthographic.znear,
        far: rawCamera.orthographic.zfar,
        zoom: 1
      })
    }

    return camera
  }

  parseLight(rawLight: GLTFLight, raw: GLTFJSON) {
    switch (rawLight.type) {
      case "point":
        {
          const p = new PointLight()
          p.cutOffDistance = isNaN(rawLight.range) ? 1 : rawLight.range
          p.color.set(rawLight.color[0], rawLight.color[1], rawLight.color[2], 1)
          return p
        }
    }
  }

  parsePrimitive(rawGeometry: GLTFPrimitive, raw: GLTFJSON, scene: GLTFLoadedScene) {
    const geometry = new Geometry(this.gl)

    Object.entries(rawGeometry.attributes).forEach(([attribute, index]) => {
      const accessor = raw.accessors[index]
      const buffer = this.getBufferFromAccessor(raw, accessor, scene)
      const abuffer = geometry.createArrayBuffer(buffer, GLDrawUsage.STATIC)

      switch (attribute) {
        case "POSITION":
          abuffer.attribute("position", accessor.componentType, AccessorTypeSize[accessor.type], accessor.normalized)
          break
        case "NORMAL":
          abuffer.attribute("normal", accessor.componentType, AccessorTypeSize[accessor.type], accessor.normalized)
          break
        case "TANGENT":
          abuffer.attribute("tangent", accessor.componentType, AccessorTypeSize[accessor.type], accessor.normalized)
          break
        case "TEXCOORD_0":
          abuffer.attribute("uv", accessor.componentType, AccessorTypeSize[accessor.type], accessor.normalized)
          break
        case "TEXCOORD_1":
          abuffer.attribute("uv1", accessor.componentType, AccessorTypeSize[accessor.type], accessor.normalized)
          break
        case "COLOR_0":
          abuffer.attribute("color", accessor.componentType, AccessorTypeSize[accessor.type], accessor.normalized)
          break
        case "JOINTS_0":
          abuffer.attribute("joints", accessor.componentType, AccessorTypeSize[accessor.type], accessor.normalized)
          break
        case "WEIGHTS_0":
          abuffer.attribute("weights", accessor.componentType, AccessorTypeSize[accessor.type], accessor.normalized)
          break
      }
    })

    if (rawGeometry.indices !== undefined) {
      const indices = this.getBufferFromAccessor(raw, raw.accessors[rawGeometry.indices], scene)
      geometry.createIndexBuffer(indices)
    }

    let material = scene.materials[rawGeometry.material]

    if (!material) {
      let m: Pipeline
      if (Object.keys(rawGeometry.attributes).includes("COLOR_0")) {
        m = new VertexColorPipeline(this.gl)
      } else if (Object.keys(rawGeometry.attributes).includes("NORMAL")) {
        m = new NormalPipeline(this.gl, { worldNormal: true })
      } else if (Object.keys(rawGeometry.attributes).includes("TEXCOORD_0")) {
        m = new UVPipeline(this.gl)
      } else {
        m = new BasicPipeline(this.gl)
      }
      // const hasNormal = Object.keys(rawGeometry.attributes).includes("NORMAL")
      // const hasColor = Object.keys(rawGeometry.attributes).includes("COLOR_0")
      // const hasUV = Object.keys(rawGeometry.attributes).includes("TEXCOORD_0")
      // const m = new DebugPipeline(this.gl, {
      //   type: hasColor ? "VertexColor" : hasNormal ? "WorldNormal" : hasUV ? "UV" : "Color"
      // })
      // material = m
    }

    return [geometry, material] as [Geometry, Pipeline]
  }

  parseAnimation(rawAnimation: GLTFAnimation, raw: GLTFJSON, scene: GLTFLoadedScene) {
    const action = new ActionDescriptor()
    action.name = rawAnimation.name

    for (const channel of rawAnimation.channels) {
      if (channel.target.node == undefined) continue
      const sampler = rawAnimation.samplers[channel.sampler]

      // Linear times
      const input = this.getBufferFromAccessor(raw, raw.accessors[sampler.input], scene)

      // Values
      const output = this.getBufferFromAccessor(raw, raw.accessors[sampler.output], scene)
      const accessor = raw.accessors[sampler.input]

      action.minTime = Math.min(action.minTime, accessor.min[0])
      action.maxTime = Math.max(action.maxTime, accessor.max[0])
      action.samplerDescriptions.push({
        interpolation: sampler.interpolation,
        type: channel.target.path,
        minTime: accessor.min[0],
        maxTime: accessor.max[0],
        times: input as Float32Array,
        values: output as Float32Array,
      })
    }

    return action
  }

  parseMaterial(rawMaterial: GLTFMaterial, raw: GLTFJSON, scene: GLTFLoadedScene) {
    const m = new PBRPipeline(this.gl)
    m.name = rawMaterial.name
    const options = rawMaterial.pbrMetallicRoughness

    m.metallicFactor = isNaN(options.metallicFactor) ? m.metallicFactor : options.metallicFactor
    m.roughnessFactor = isNaN(options.roughnessFactor) ? m.roughnessFactor : options.roughnessFactor

    if (!rawMaterial.doubleSided) {
      m.state
        .enableCullFace(true)
        .cullFace(GLCulling.BACK)
    }

    if (options.baseColorFactor) {
      m.baseColor = Color.fromDecimals(options.baseColorFactor)
    }

    if (options.baseColorTexture) {
      m.baseColorTexture = scene.textures[options.baseColorTexture.index]
    }

    if (options.metallicTexture) {
      m.metallicTexture = scene.textures[options.metallicTexture.index]
    }

    if (options.roughnessTexture) {
      m.roughnessTexture = scene.textures[options.roughnessTexture.index]
    }

    return m
  }

  parseTexture(rawTexture: GLTFTexture, raw: GLTFJSON, scene: GLTFLoadedScene) {
    const rawImage = raw.images[rawTexture.source]

    const t = new Texture(this.gl, {
      format: GLColorFormat.RGB,
      internal: GLColorFormat.RGB,
    })

    this.parseImage(rawImage, scene).then(img => {
      t.fromMedia(img)
      if (rawTexture.sampler != undefined) {
        const sampler = raw.samplers[rawTexture.sampler]
        t.generateMipmap()
        if (sampler.magFilter) t.state.magFilter = sampler.magFilter
        if (sampler.minFilter) t.state.minFilter = sampler.minFilter
        if (sampler.wrapS) t.state.wrapS = sampler.wrapS
        if (sampler.wrapT) t.state.wrapT = sampler.wrapT
        t.update(true)
      }
    })

    return t
  }

  parseImage(rawImage: GLTFImage, scene: GLTFLoadedScene) {
    const p = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.addEventListener("load", () => {
        scene.images.push(img)
        resolve(img)
      }, { once: true })
      img.addEventListener("error", reject)
      if (rawImage.uri) {
        img.src = rawImage.uri
      } else if (rawImage.bufferView && rawImage.mimeType) {
        const buffer = scene.bufferViews[rawImage.bufferView]
        const blob = new Blob([buffer], { type: rawImage.mimeType })
        img.src = URL.createObjectURL(blob)
      }
    })
    scene.loadables.push(p)
    return p
  }

  getBufferFromAccessor(raw: GLTFJSON, accessor: GLTFAccessor, scene: GLTFLoadedScene) {
    const bytes = scene.bufferViews[accessor.bufferView]
    const start = (accessor.byteOffset || 0)
    const end = start + (accessor.count * AccessorTypeSize[accessor.type] * ComponentTypeSize[accessor.componentType])
    const subBytes = bytes.slice(start, end)

    const TypedArray = ArrayType[accessor.componentType]
    return new TypedArray(subBytes)
  }

  getBufferView(raw: GLTFJSON, bufferView: GLTFBufferView) {
    const buffer = this.getBuffer(raw, bufferView.buffer)
    const start = (bufferView.byteOffset || 0)
    const end = start + (bufferView.byteLength || 0)
    return buffer.slice(start, end)
  }

  getBuffer(raw: GLTFJSON, index: number) {
    const rawBuffer = raw.buffers[index]

    if (this.buffers[index] == undefined && rawBuffer.uri) {
      const BASE64_MARKER = ';base64,';
      const dataURI = rawBuffer.uri
      const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      const base64 = dataURI.substring(base64Index);

      const binary = window.atob(base64)

      const arrbuff = new ArrayBuffer(rawBuffer.byteLength)
      const uint8 = new Uint8Array(arrbuff)

      for (let i = 0; i < rawBuffer.byteLength; i++) {
        uint8[i] = binary.charCodeAt(i)
      }

      this.buffers[index] = arrbuff
    }

    return this.buffers[index]
  }

  parseGLB(buffer): GLTF {
    const uint8 = new Uint8Array(buffer)
    const bytes = new Bytes(uint8.length, uint8)

    const header = new Uint8Array(buffer.slice(0, 12))

    const magic = bytes.getString(0, 4)
    if (magic !== MAGIC) throw new Error("[glTF Importer] Wrong magic")

    const version = bytes.getInt32(4)
    if (version != 2) throw new Error("[glTF Importer] Only support version 2")

    // const length = bytes.getInt32(8)
    // data.length = length

    const chunks = { bin: null, json: null }
    this.parseChunks(12, bytes, chunks)

    return {
      type: "glb",
      bin: chunks.bin,
      json: chunks.json
    }
  }

  parseGLTF(json): GLTF {
    return {
      type: "gltf",
      bin: null,
      json: json
    }
  }

  parseChunks(pos: number, bytes: Bytes, chunks: any) {
    var chunkLength = bytes.getInt32(pos)
    pos += 4
    var chunkType = bytes.getInt32(pos)
    pos += 4

    var subBytes = bytes.slice(pos, pos + chunkLength)

    if (chunkType == ChunkType.JSON) {
      chunks.json = JSON.parse(String.fromCharCode.apply(null, subBytes))
    } else if (chunkType == ChunkType.BIN) {
      // @ts-ignore
      chunks.bin = subBytes.buffer
    }

    pos += chunkLength

    if (pos < bytes.length) {
      this.parseChunks(pos, bytes, chunks)
    }
  }

  async load(path: string) {
    if (GLTF_EXT_REG.test(path)) {
      const { response } = await Net.json(path)
      this.data = this.parseGLTF(response)
    }

    else if (GLB_EXT_REG.test(path)) {
      const { response } = await Net.bytes(path)
      this.data = this.parseGLB(response)
    }
  }

  getActiveScene() {
    return this.getScene(this.data.json.scene)
  }

  getScene(index?: number): GLTFLoadedScene {
    const json = this.data.json

    var scene = null
    if (this.data.type == "glb") {
      this.buffers[0] = this.data.bin
    }

    index = !isNaN(index) ? index : json.scene
    scene = this.parseScene(json.scenes[index], json)

    return scene
  }

}