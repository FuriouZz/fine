export declare class Bytes {
    length: number;
    buffer: ArrayBuffer;
    constructor(length: number, buffer: ArrayBuffer);
    get(pos: number): any;
    set(pos: number, num: number): void;
    slice(start: number, end: number): ArrayBuffer;
    setInt32(pos: number, num: number): void;
    getInt32(pos: number): number;
    setUInt16(pos: number, num: number): void;
    getUInt16(pos: number): number;
    setFloat(pos: number, num: number): void;
    getFloat(pos: number): number;
    getString(start: number, end: number): any;
}
