import { extname } from 'path';
import { Parser } from './Parser';
export class Importer {
    constructor(resource) {
        this.resource = resource;
        this.data = null;
        this.parser = null;
    }
    load(path) {
        if (extname(path) == '.gltf')
            return this._loadJSON(path);
        if (extname(path) == '.glb')
            return this._loadBinary(path);
    }
    _loadJSON(path) {
        return this.resource
            .json(path)
            .then(this._parseJSON.bind(this));
    }
    _loadBinary(path) {
        return this.resource
            .bytes(path)
            .then(this._parseBinary.bind(this));
    }
    _parseBinary(buffer) {
        this.parser = new Parser();
        return this.data = this.parser.parseGLB(buffer);
    }
    _parseJSON(o) {
        this.parser = new Parser();
        return this.data = this.parser.parseGLTF(o);
    }
    getActiveScene() {
        return this.getScene(this.data.json.scene);
    }
    getScene(index) {
        const json = this.data.json;
        var scene = null;
        var parser = this.parser || new Parser;
        if (this.data.type == "glb") {
            parser.buffers[0] = this.data.bin;
        }
        index = !isNaN(index) ? index : json.scene;
        scene = parser.parseScene(json.scenes[index], json);
        this.parser = parser;
        return scene;
    }
}
