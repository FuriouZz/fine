export function GetTypeSize(type) {
    switch (type) {
        case 5120 /* BYTE */: {
            return 1 /* BYTE */;
        }
        case 5121 /* UNSIGNED_BYTE */: {
            return 1 /* UNSIGNED_BYTE */;
        }
        case 5122 /* SHORT */: {
            return 2 /* SHORT */;
        }
        case 5123 /* UNSIGNED_SHORT */: {
            return 2 /* UNSIGNED_SHORT */;
        }
        case 5124 /* INT */: {
            return 4 /* INT */;
        }
        case 5125 /* UNSIGNED_INT */: {
            return 4 /* UNSIGNED_INT */;
        }
        case 5126 /* FLOAT */: {
            return 4 /* FLOAT */;
        }
        default: return 0;
    }
}
export function CompileShader(gl, type, code) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, code);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(shader));
        throw new Error(`Can't compile shader`);
    }
    return shader;
}
