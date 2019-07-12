import { Parser } from './Parser';
import { Resource } from '../../engine/Resource';
interface IGLTFData {
    type: "gltf" | "glb";
    bin: ArrayBuffer;
    json: any;
}
export declare class Importer {
    private resource;
    data: IGLTFData;
    parser: Parser;
    constructor(resource: Resource);
    load(path: string): Promise<import("../../engine/Resource").ResourceItem<unknown>>;
    private _loadJSON;
    private _loadBinary;
    private _parseBinary;
    private _parseJSON;
    getActiveScene(): any;
    getScene(index?: number): any;
}
export {};
