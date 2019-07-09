export declare class Bytes {
    length: number;
    buffer: Uint8Array;
    constructor(length: any, buffer: any);
    get(pos: any): number;
    set(pos: any, num: any): void;
    slice(start: any, end: any): Uint8Array;
    setInt32(pos: any, num: any): void;
    getInt32(pos: any): number;
    setUInt16(pos: any, num: any): void;
    getUInt16(pos: any): number;
    setFloat(pos: any, num: any): void;
    getFloat(pos: any): number;
    getString(start: any, end: any): any;
}
