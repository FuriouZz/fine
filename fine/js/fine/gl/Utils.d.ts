import { GLType, GLTypeSize, GLContext, GLShaderType } from "./constants/Types";
export declare function GetTypeSize(type: GLType): 0 | GLTypeSize;
export declare function CompileShader(gl: GLContext, type: GLShaderType, code: string): WebGLShader;
