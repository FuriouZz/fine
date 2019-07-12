import { extname } from 'path';
import { Parser } from './Parser'
import { Resource } from '../../engine/Resource';

interface IGLTFData {
  type: "gltf" | "glb",
  bin: ArrayBuffer,
  json: any
}

export class Importer {
  data: IGLTFData = null
  parser: Parser = null

  constructor(private resource: Resource) {}

  load(path: string) {
    if (extname(path) == '.gltf') return this._loadJSON(path)
    if (extname(path) == '.glb')  return this._loadBinary(path)
  }

  private _loadJSON(path: string) {
    return this.resource
    .json(path)
    .then(this._parseJSON.bind(this))
  }

  private _loadBinary(path: string) {
    return this.resource
    .bytes(path)
    .then(this._parseBinary.bind(this))
  }

  private _parseBinary(buffer: ArrayBuffer) {
    this.parser = new Parser()
    return this.data = this.parser.parseGLB(buffer) as IGLTFData
  }

  private _parseJSON(o: any) {
    this.parser = new Parser()
    return this.data = this.parser.parseGLTF(o) as IGLTFData
  }

  getActiveScene() {
    return this.getScene(this.data.json.scene)
  }

  getScene(index?: number) {
    const json = this.data.json

    var scene = null
    var parser = this.parser || new Parser
    if (this.data.type == "glb") {
      parser.buffers[0] = this.data.bin
    }

    index = !isNaN(index) ? index : json.scene
    scene = parser.parseScene(json.scenes[index], json)

    this.parser = parser

    return scene
  }

}