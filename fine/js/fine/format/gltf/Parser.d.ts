import { mat4 } from 'gl-matrix';
interface IData {
    type: string;
    name?: string;
    children?: IData[];
    matrix?: mat4;
    geometries?: IGeometryData[];
}
interface IGeometryData {
    type?: string;
    name?: string;
    mode?: string;
    material?: IMaterialData;
    indices?: ArrayBufferView;
    attributes?: {
        [key: string]: {
            name?: string;
            data?: ArrayBufferView;
            attributeSize?: string;
            componentType?: string;
        };
    };
}
interface IMaterialData {
    name?: string;
    type?: string;
    raw?: {
        [key: string]: {};
    };
}
export declare class Parser {
    buffers: {
        [key: string]: ArrayBuffer;
    };
    parseScene(rawScene: any, raw: any): IData;
    parseNode(rawNode: any, raw: any): IData;
    parseMesh(rawMesh: any, raw: any, mesh: any): any;
    parseCamera(rawCamera: any, raw: any, camera: any): any;
    parseGeometry(rawGeometry: any, raw: any): IGeometryData;
    parseMaterial(rawMaterial: any, raw: any): IMaterialData;
    getBuffer(rawGeometry: any, raw: any, index: any): Float32Array | Uint16Array | Uint8Array;
    parseGLB(buffer: any): {
        type: string;
        bin: any;
        json: any;
    };
    parseGLTF(json: any): {
        type: string;
        bin: any;
        json: any;
    };
    parseChunks(pos: any, bytes: any, chunks: any): void;
}
export {};
