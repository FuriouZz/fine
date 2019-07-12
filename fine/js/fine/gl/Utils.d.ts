import { GLType, GLTypeSize, GLContext, GLShaderType } from "./constants/Types";
export declare function GetTypeSize(type: GLType): GLTypeSize | 0;
export declare function CompileShader(gl: GLContext, type: GLShaderType, code: string): WebGLShader;
