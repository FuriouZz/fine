import { GLContext } from "gl/constants/Types";

export default class Extension {
  private static _exts = new Map<GLContext, Map<string, any>>()

  static get(gl: GLContext, key: "EXT_blend_minmax"): EXT_blend_minmax | null;
  static get(gl: GLContext, key: "EXT_texture_filter_anisotropic"): EXT_texture_filter_anisotropic | null;
  static get(gl: GLContext, key: "EXT_frag_depth"): EXT_frag_depth | null;
  static get(gl: GLContext, key: "EXT_shader_texture_lod"): EXT_shader_texture_lod | null;
  static get(gl: GLContext, key: "EXT_sRGB"): EXT_sRGB | null;
  static get(gl: GLContext, key: "OES_vertex_array_object"): OES_vertex_array_object | null;
  static get(gl: GLContext, key: "WEBGL_color_buffer_float"): WEBGL_color_buffer_float | null;
  static get(gl: GLContext, key: "WEBGL_compressed_texture_astc"): WEBGL_compressed_texture_astc | null;
  static get(gl: GLContext, key: "WEBGL_compressed_texture_s3tc_srgb"): WEBGL_compressed_texture_s3tc_srgb | null;
  static get(gl: GLContext, key: "WEBGL_debug_shaders"): WEBGL_debug_shaders | null;
  static get(gl: GLContext, key: "WEBGL_draw_buffers"): WEBGL_draw_buffers | null;
  static get(gl: GLContext, key: "WEBGL_lose_context"): WEBGL_lose_context | null;
  static get(gl: GLContext, key: "WEBGL_depth_texture"): WEBGL_depth_texture | null;
  static get(gl: GLContext, key: "WEBGL_debug_renderer_info"): WEBGL_debug_renderer_info | null;
  static get(gl: GLContext, key: "WEBGL_compressed_texture_s3tc"): WEBGL_compressed_texture_s3tc | null;
  static get(gl: GLContext, key: "OES_texture_half_float_linear"): OES_texture_half_float_linear | null;
  static get(gl: GLContext, key: "OES_texture_half_float"): OES_texture_half_float | null;
  static get(gl: GLContext, key: "OES_texture_float_linear"): OES_texture_float_linear | null;
  static get(gl: GLContext, key: "OES_texture_float"): OES_texture_float | null;
  static get(gl: GLContext, key: "OES_standard_derivatives"): OES_standard_derivatives | null;
  static get(gl: GLContext, key: "OES_element_index_uint"): OES_element_index_uint | null;
  static get(gl: GLContext, key: "ANGLE_instanced_arrays"): ANGLE_instanced_arrays | null;
  static get(gl: GLContext, key: string): any {
    if (!this._exts.has(gl)) {
      this._exts.set(gl, new Map())
    }

    const exts = this._exts.get(gl)

    if (exts.has(key)) {
      return exts.get(key)
    }

    const ext = gl.getExtension(key)
    exts.set(key, ext)
    return ext
  }
}