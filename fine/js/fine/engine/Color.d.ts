export declare class Color extends Float32Array {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r?: number, g?: number, b?: number, a?: number);
    static Red(): Color;
    static Green(): Color;
    static Blue(): Color;
    static White(): Color;
    static Black(): Color;
    static from_hex(hex: number): Color;
    static to_hex(c: Color): number;
    static to_vec4_glsl(c: Color): string;
    static to_vec3_glsl(c: Color): string;
    static clone(c: Color): Color;
    static copy(from: Color, to: Color): Color;
    static set(c: Color, r?: number, g?: number, b?: number, a?: number): Color;
}
