import { GLContext } from "./constants/Types";
import { Texture } from "./Texture";
import { vec2, vec3, vec4, mat2, mat3, mat4 } from 'gl-matrix';
export declare class Uniform {
    gl: GLContext;
    location: WebGLUniformLocation;
    info: WebGLActiveInfo;
    constructor(gl: GLContext, location: WebGLUniformLocation, info: WebGLActiveInfo);
    float(x: number): void;
    float2(x: number, y: number): void;
    float3(x: number, y: number, z: number): void;
    float4(x: number, y: number, z: number, w: number): void;
    floats(v: number[]): void;
    int(x: number): void;
    int2(x: number, y: number): void;
    int3(x: number, y: number, z: number): void;
    int4(x: number, y: number, z: number, w: number): void;
    ints(v: number[]): void;
    vertor2(v: vec2 | number[]): void;
    vertor3(v: vec3 | number[]): void;
    vertor4(v: vec4 | number[]): void;
    matrix2(m: mat2 | number[], transpose?: boolean): void;
    matrix3(m: mat3 | number[], transpose?: boolean): void;
    matrix4(m: mat4 | number[], transpose?: boolean): void;
    texture(t: Texture): void;
}
