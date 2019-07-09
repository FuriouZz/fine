// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
export const enum GL {

  /* ClearingBuffers */

  // Passed to clear to clear the current depth buffer.
  DEPTH_BUFFER_BIT = 0x00000100,

  // Passed to clear to clear the current stencil buffer.
  STENCIL_BUFFER_BIT = 0x00000400,

  // Passed to clear to clear the current color buffer.
  COLOR_BUFFER_BIT = 0x00004000,

  /* RenderingPrimitives */

  // Passed to drawElements or drawArrays to draw single points.
  POINTS = 0x0000,

  // Passed to drawElements or drawArrays to draw lines. Each vertex connects to the one after it.
  LINES = 0x0001,

  // Passed to drawElements or drawArrays to draw lines. Each set of two vertices is treated as a separate line segment.
  LINE_LOOP = 0x0002,

  // Passed to drawElements or drawArrays to draw a connected group of line segments from the first vertex to the last.
  LINE_STRIP = 0x0003,

  // Passed to drawElements or drawArrays to draw triangles. Each set of three vertices creates a separate triangle.
  TRIANGLES = 0x0004,

  // Passed to drawElements or drawArrays to draw a connected group of triangles.
  TRIANGLE_STRIP = 0x0005,

  // Passed to drawElements or drawArrays to draw a connected group of triangles. Each vertex connects to the previous and the first vertex in the fan.
  TRIANGLE_FAN = 0x0006,

  /* BlendingModes */

  // Passed to blendFunc or blendFuncSeparate to turn off a component.
  ZERO = 0,

  // Passed to blendFunc or blendFuncSeparate to turn on a component.
  ONE = 1,

  // Passed to blendFunc or blendFuncSeparate to multiply a component by the source elements color.
  SRC_COLOR = 0x0300,

  // Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the source elements color.
  ONE_MINUS_SRC_COLOR = 0x0301,

  // Passed to blendFunc or blendFuncSeparate to multiply a component by the source's alpha.
  SRC_ALPHA = 0x0302,

  // Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the source's alpha.
  ONE_MINUS_SRC_ALPHA = 0x0303,

  // Passed to blendFunc or blendFuncSeparate to multiply a component by the destination's alpha.
  DST_ALPHA = 0x0304,

  // Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the destination's alpha.
  ONE_MINUS_DST_ALPHA = 0x0305,

  // Passed to blendFunc or blendFuncSeparate to multiply a component by the destination's color.
  DST_COLOR = 0x0306,

  // Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the destination's color.
  ONE_MINUS_DST_COLOR = 0x0307,

  // Passed to blendFunc or blendFuncSeparate to multiply a component by the minimum of source's alpha or one minus the destination's alpha.
  SRC_ALPHA_SATURATE = 0x0308,

  // Passed to blendFunc or blendFuncSeparate to specify a constant color blend function.
  CONSTANT_COLOR = 0x8001,

  // Passed to blendFunc or blendFuncSeparate to specify one minus a constant color blend function.
  ONE_MINUS_CONSTANT_COLOR = 0x8002,

  // Passed to blendFunc or blendFuncSeparate to specify a constant alpha blend function.
  CONSTANT_ALPHA = 0x8003,

  // Passed to blendFunc or blendFuncSeparate to specify one minus a constant alpha blend function.
  ONE_MINUS_CONSTANT_ALPHA = 0x8004,

  /* BlendingEquation */

  // Passed to blendEquation or blendEquationSeparate to set an addition blend function.
  FUNC_ADD = 0x8006,

  // Passed to blendEquation or blendEquationSeparate to specify a subtraction blend function (source - destination).
  FUNC_SUBTRACT = 0x800A,

  // Passed to blendEquation or blendEquationSeparate to specify a reverse subtraction blend function (destination - source).
  FUNC_REVERSE_SUBTRACT = 0x800B,

  /* Parameters */

  // Passed to getParameter to get the current RGB blend function.
  BLEND_EQUATION = 0x8009,

  // Passed to getParameter to get the current RGB blend function. Same as BLEND_EQUATION
  BLEND_EQUATION_RGB = 0x8009,

  // Passed to getParameter to get the current alpha blend function. Same as BLEND_EQUATION
  BLEND_EQUATION_ALPHA = 0x883D,

  // Passed to getParameter to get the current destination RGB blend function.
  BLEND_DST_RGB = 0x80C8,

  // Passed to getParameter to get the current destination RGB blend function.
  BLEND_SRC_RGB = 0x80C9,

  // Passed to getParameter to get the current destination alpha blend function.
  BLEND_DST_ALPHA = 0x80CA,

  // Passed to getParameter to get the current source alpha blend function.
  BLEND_SRC_ALPHA = 0x80CB,

  // Passed to getParameter to return a the current blend color.
  BLEND_COLOR = 0x8005,

  // Passed to getParameter to get the array buffer binding.
  ARRAY_BUFFER_BINDING = 0x8894,

  // Passed to getParameter to get the current element array buffer.
  ELEMENT_ARRAY_BUFFER_BINDING = 0x8895,

  // Passed to getParameter to get the current lineWidth (set by the lineWidth method).
  LINE_WIDTH = 0x0B21,

  // Passed to getParameter to get the current size of a point drawn with gl.POINTS
  ALIASED_POINT_SIZE_RANGE = 0x846D,

  // Passed to getParameter to get the range of available widths for a line. Returns a length-2 array with the lo value at 0, and hight at 1.
  ALIASED_LINE_WIDTH_RANGE = 0x846E,

  // Passed to getParameter to get the current value of cullFace. Should return FRONT, BACK, or FRONT_AND_BACK
  CULL_FACE_MODE = 0x0B45,

  // Passed to getParameter to determine the current value of frontFace. Should return CW or CCW.
  FRONT_FACE = 0x0B46,

  // Passed to getParameter to return a length-2 array of floats giving the current depth range.
  DEPTH_RANGE = 0x0B70,

  // Passed to getParameter to determine if the depth write mask is enabled.
  DEPTH_WRITEMASK = 0x0B72,

  // Passed to getParameter to determine the current depth clear value.
  DEPTH_CLEAR_VALUE = 0x0B73,

  // Passed to getParameter to get the current depth function. Returns NEVER, ALWAYS, LESS, EQUAL, LEQUAL, GREATER, GEQUAL, or NOTEQUAL.
  DEPTH_FUNC = 0x0B74,

  // Passed to getParameter to get the value the stencil will be cleared to.
  STENCIL_CLEAR_VALUE = 0x0B91,

  // Passed to getParameter to get the current stencil function. Returns NEVER, ALWAYS, LESS, EQUAL, LEQUAL, GREATER, GEQUAL, or NOTEQUAL.
  STENCIL_FUNC = 0x0B92,

  // Passed to getParameter to get the current stencil fail function. Should return KEEP, REPLACE, INCR, DECR, INVERT, INCR_WRAP, or DECR_WRAP.
  STENCIL_FAIL = 0x0B94,

  // Passed to getParameter to get the current stencil fail function should the depth buffer test fail. Should return KEEP, REPLACE, INCR, DECR, INVERT, INCR_WRAP, or DECR_WRAP.
  STENCIL_PASS_DEPTH_FAIL = 0x0B95,

  // Passed to getParameter to get the current stencil fail function should the depth buffer test pass. Should return KEEP, REPLACE, INCR, DECR, INVERT, INCR_WRAP, or DECR_WRAP.
  STENCIL_PASS_DEPTH_PASS = 0x0B96,

  // Passed to getParameter to get the reference value used for stencil tests.
  STENCIL_REF = 0x0B97,

  STENCIL_VALUE_MASK = 0x0B93,
  STENCIL_WRITEMASK = 0x0B98,
  STENCIL_BACK_FUNC = 0x8800,
  STENCIL_BACK_FAIL = 0x8801,
  STENCIL_BACK_PASS_DEPTH_FAIL = 0x8802,
  STENCIL_BACK_PASS_DEPTH_PASS = 0x8803,
  STENCIL_BACK_REF = 0x8CA3,
  STENCIL_BACK_VALUE_MASK = 0x8CA4,
  STENCIL_BACK_WRITEMASK = 0x8CA5,

  // Returns an Int32Array with four elements for the current viewport dimensions.
  VIEWPORT = 0x0BA2,

  // Returns an Int32Array with four elements for the current scissor box dimensions.
  SCISSOR_BOX = 0x0C10,

  COLOR_CLEAR_VALUE = 0x0C22,
  COLOR_WRITEMASK = 0x0C23,
  UNPACK_ALIGNMENT = 0x0CF5,
  PACK_ALIGNMENT = 0x0D05,
  MAX_TEXTURE_SIZE = 0x0D33,
  MAX_VIEWPORT_DIMS = 0x0D3A,
  SUBPIXEL_BITS = 0x0D50,
  RED_BITS = 0x0D52,
  GREEN_BITS = 0x0D53,
  BLUE_BITS = 0x0D54,
  ALPHA_BITS = 0x0D55,
  DEPTH_BITS = 0x0D56,
  STENCIL_BITS = 0x0D57,
  POLYGON_OFFSET_UNITS = 0x2A00,
  POLYGON_OFFSET_FACTOR = 0x8038,
  TEXTURE_BINDING_2D = 0x8069,
  SAMPLE_BUFFERS = 0x80A8,
  SAMPLES = 0x80A9,
  SAMPLE_COVERAGE_VALUE = 0x80AA,
  SAMPLE_COVERAGE_INVERT = 0x80AB,
  COMPRESSED_TEXTURE_FORMATS = 0x86A3,
  VENDOR = 0x1F00,
  RENDERER = 0x1F01,
  VERSION = 0x1F02,
  IMPLEMENTATION_COLOR_READ_TYPE = 0x8B9A,
  IMPLEMENTATION_COLOR_READ_FORMAT = 0x8B9B,
  BROWSER_DEFAULT_WEBGL = 0x9244,

  /* Buffers */

  // Passed to bufferData as a hint about whether the contents of the buffer are likely to be used often and not change often.
  STATIC_DRAW = 0x88E4,

  // Passed to bufferData as a hint about whether the contents of the buffer are likely to not be used often.
  STREAM_DRAW = 0x88E0,

  // Passed to bufferData as a hint about whether the contents of the buffer are likely to be used often and change often.
  DYNAMIC_DRAW = 0x88E8,

  // Passed to bindBuffer or bufferData to specify the type of buffer being used.
  ARRAY_BUFFER = 0x8892,

  // Passed to bindBuffer or bufferData to specify the type of buffer being used.
  ELEMENT_ARRAY_BUFFER = 0x8893,

  // Passed to getBufferParameter to get a buffer's size.
  BUFFER_SIZE = 0x8764,

  // Passed to getBufferParameter to get the hint for the buffer passed in when it was created.
  BUFFER_USAGE = 0x8765,

  /* VertexAttributes */

  // Passed to getVertexAttrib to read back the current vertex attribute.
  CURRENT_VERTEX_ATTRIB = 0x8626,

  VERTEX_ATTRIB_ARRAY_ENABLED = 0x8622,
  VERTEX_ATTRIB_ARRAY_SIZE = 0x8623,
  VERTEX_ATTRIB_ARRAY_STRIDE = 0x8624,
  VERTEX_ATTRIB_ARRAY_TYPE = 0x8625,
  VERTEX_ATTRIB_ARRAY_NORMALIZED = 0x886A,
  VERTEX_ATTRIB_ARRAY_POINTER = 0x8645,
  VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 0x889F,

  /* Culling */

  // Passed to enable/disable to turn on/off culling. Can also be used with getParameter to find the current culling method.
  CULL_FACE = 0x0B44,

  // Passed to cullFace to specify that only front faces should be culled.
  FRONT = 0x0404,

  // Passed to cullFace to specify that only back faces should be culled.
  BACK = 0x0405,

  // Passed to cullFace to specify that front and back faces should be culled.
  FRONT_AND_BACK = 0x0408,

  /* Enablings */

  // Passed to enable/disable to turn on/off blending. Can also be used with getParameter to find the current blending method.
  BLEND = 0x0BE2,

  // Passed to enable/disable to turn on/off the depth test. Can also be used with getParameter to query the depth test.
  DEPTH_TEST = 0x0B71,

  // Passed to enable/disable to turn on/off dithering. Can also be used with getParameter to find the current dithering method.
  DITHER = 0x0BD0,

  // Passed to enable/disable to turn on/off the polygon offset. Useful for rendering hidden-line images, decals, and or solids with highlighted edges. Can also be used with getParameter to query the scissor test.
  POLYGON_OFFSET_FILL = 0x8037,

  // Passed to enable/disable to turn on/off the alpha to coverage. Used in multi-sampling alpha channels.
  SAMPLE_ALPHA_TO_COVERAGE = 0x809E,

  // Passed to enable/disable to turn on/off the sample coverage. Used in multi-sampling.
  SAMPLE_COVERAGE = 0x80A0,

  // Passed to enable/disable to turn on/off the scissor test. Can also be used with getParameter to query the scissor test.
  SCISSOR_TEST = 0x0C11,

  // Passed to enable/disable to turn on/off the stencil test. Can also be used with getParameter to query the stencil test.
  STENCIL_TEST = 0x0B90,

  /* Errors */

  // Returned from getError.
  NO_ERROR = 0,

  // Returned from getError.
  INVALID_ENUM = 0x0500,

  // Returned from getError.
  INVALID_VALUE = 0x0501,

  // Returned from getError.
  INVALID_OPERATION = 0x0502,

  // Returned from getError.
  OUT_OF_MEMORY = 0x0505,

  // Returned from getError.
  CONTEXT_LOST_WEBGL = 0x9242,

  /* FrontFaceDirection */

  // Passed to frontFace to specify the front face of a polygon is drawn in the clockwise direction
  CW = 0x0900,

  // Passed to frontFace to specify the front face of a polygon is drawn in the counter clockwise direction
  CCW = 0x0901,

  /* Hints */

  // There is no preference for this behavior.
  DONT_CARE = 0x1100,

  // The most efficient behavior should be used.
  FASTEST = 0x1101,

  // The most correct or the highest quality option should be used.
  NICEST = 0x1102,

  // Hint for the quality of filtering when generating mipmap images with WebGLRenderingContext.generateMipmap().
  GENERATE_MIPMAP_HINT = 0x8192,

  /* DataTypes */
  BYTE = 0x1400,
  UNSIGNED_BYTE = 0x1401,
  SHORT = 0x1402,
  UNSIGNED_SHORT = 0x1403,
  INT = 0x1404,
  UNSIGNED_INT = 0x1405,
  FLOAT = 0x1406,

  /* PixelFormats */
  DEPTH_COMPONENT = 0x1902,
  ALPHA = 0x1906,
  RGB = 0x1907,
  RGBA = 0x1908,
  LUMINANCE = 0x1909,
  LUMINANCE_ALPHA = 0x190A,

  /* ShaderConstants */

  // Passed to createShader to define a fragment shader.
  FRAGMENT_SHADER = 0x8B30,

  // Passed to createShader to define a vertex shader
  VERTEX_SHADER = 0x8B31,

  // Passed to getShaderParamter to get the status of the compilation. Returns false if the shader was not compiled. You can then query getShaderInfoLog to find the exact error
  COMPILE_STATUS = 0x8B81,

  // Passed to getShaderParamter to determine if a shader was deleted via deleteShader. Returns true if it was, false otherwise.
  DELETE_STATUS = 0x8B80,

  // Passed to getProgramParameter after calling linkProgram to determine if a program was linked correctly. Returns false if there were errors. Use getProgramInfoLog to find the exact error.
  LINK_STATUS = 0x8B82,

  // Passed to getProgramParameter after calling validateProgram to determine if it is valid. Returns false if errors were found.
  VALIDATE_STATUS = 0x8B83,

  // Passed to getProgramParameter after calling attachShader to determine if the shader was attached correctly. Returns false if errors occurred.
  ATTACHED_SHADERS = 0x8B85,

  // Passed to getProgramParameter to get the number of attributes active in a program.
  ACTIVE_ATTRIBUTES = 0x8B89,

  // Passed to getProgramParamter to get the number of uniforms active in a program.
  ACTIVE_UNIFORMS = 0x8B86,

  // The maximum number of entries possible in the vertex attribute list.
  MAX_VERTEX_ATTRIBS = 0x8869,

  MAX_VERTEX_UNIFORM_VECTORS = 0x8DFB,
  MAX_VARYING_VECTORS = 0x8DFC,
  MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8B4D,
  MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8B4C,

  // Implementation dependent number of maximum texture units. At least 8.
  MAX_TEXTURE_IMAGE_UNITS = 0x8872,

  MAX_FRAGMENT_UNIFORM_VECTORS = 0x8DFD,
  SHADER_TYPE = 0x8B4F,
  SHADING_LANGUAGE_VERSION = 0x8B8C,
  CURRENT_PROGRAM = 0x8B8D,

  /* DepthStencilTests */

  // Passed to depthFunction or stencilFunction to specify depth or stencil tests will never pass. i.e. Nothing will be drawn.
  NEVER = 0x0200,

  // Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is less than the stored value.
  LESS = 0x0201,

  // Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is equals to the stored value.
  EQUAL = 0x0202,

  // Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is less than or equal to the stored value.
  LEQUAL = 0x0203,

  // Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is greater than the stored value.
  GREATER = 0x0204,

  // Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is not equal to the stored value.
  NOTEQUAL = 0x0205,

  // Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is greater than or equal to the stored value.
  GEQUAL = 0x0206,

  // Passed to depthFunction or stencilFunction to specify depth or stencil tests will always pass. i.e. Pixels will be drawn in the order they are drawn.
  ALWAYS = 0x0207,

  /* StencilActions */
  KEEP = 0x1E00,
  REPLACE = 0x1E01,
  INCR = 0x1E02,
  DECR = 0x1E03,
  INVERT = 0x150A,
  INCR_WRAP = 0x8507,
  DECR_WRAP = 0x8508,

  /* Textures */
  NEAREST = 0x2600,
  LINEAR = 0x2601,
  NEAREST_MIPMAP_NEAREST = 0x2700,
  LINEAR_MIPMAP_NEAREST = 0x2701,
  NEAREST_MIPMAP_LINEAR = 0x2702,
  LINEAR_MIPMAP_LINEAR = 0x2703,
  TEXTURE_MAG_FILTER = 0x2800,
  TEXTURE_MIN_FILTER = 0x2801,
  TEXTURE_WRAP_S = 0x2802,
  TEXTURE_WRAP_T = 0x2803,
  TEXTURE_2D = 0x0DE1,
  TEXTURE = 0x1702,
  TEXTURE_CUBE_MAP = 0x8513,
  TEXTURE_BINDING_CUBE_MAP = 0x8514,
  TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515,
  TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516,
  TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517,
  TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518,
  TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519,
  TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A,
  MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C,

  // A texture unit.
  TEXTURE0 = 0x84C0 - 0x84DF,

  // The current active texture unit.
  ACTIVE_TEXTURE = 0x84E0,

  REPEAT = 0x2901,
  CLAMP_TO_EDGE = 0x812F,
  MIRRORED_REPEAT = 0x8370,

  /* UniformTypes */
  FLOAT_VEC2 = 0x8B50,
  FLOAT_VEC3 = 0x8B51,
  FLOAT_VEC4 = 0x8B52,
  INT_VEC2 = 0x8B53,
  INT_VEC3 = 0x8B54,
  INT_VEC4 = 0x8B55,
  BOOL = 0x8B56,
  BOOL_VEC2 = 0x8B57,
  BOOL_VEC3 = 0x8B58,
  BOOL_VEC4 = 0x8B59,
  FLOAT_MAT2 = 0x8B5A,
  FLOAT_MAT3 = 0x8B5B,
  FLOAT_MAT4 = 0x8B5C,
  SAMPLER_2D = 0x8B5E,
  SAMPLER_CUBE = 0x8B60,

  /* ShaderPrecisionTypes */
  LOW_FLOAT = 0x8DF0,
  MEDIUM_FLOAT = 0x8DF1,
  HIGH_FLOAT = 0x8DF2,
  LOW_INT = 0x8DF3,
  MEDIUM_INT = 0x8DF4,
  HIGH_INT = 0x8DF5,

  /* FramebuffersAndRenderBuffers */
  FRAMEBUFFER = 0x8D40,
  RENDERBUFFER = 0x8D41,
  RGBA4 = 0x8056,
  RGB5_A1 = 0x8057,
  RGB565 = 0x8D62,
  DEPTH_COMPONENT16 = 0x81A5,
  STENCIL_INDEX8 = 0x8D48,
  DEPTH_STENCIL = 0x84F9,
  RENDERBUFFER_WIDTH = 0x8D42,
  RENDERBUFFER_HEIGHT = 0x8D43,
  RENDERBUFFER_INTERNAL_FORMAT = 0x8D44,
  RENDERBUFFER_RED_SIZE = 0x8D50,
  RENDERBUFFER_GREEN_SIZE = 0x8D51,
  RENDERBUFFER_BLUE_SIZE = 0x8D52,
  RENDERBUFFER_ALPHA_SIZE = 0x8D53,
  RENDERBUFFER_DEPTH_SIZE = 0x8D54,
  RENDERBUFFER_STENCIL_SIZE = 0x8D55,
  FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 0x8CD0,
  FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 0x8CD1,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 0x8CD2,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 0x8CD3,
  COLOR_ATTACHMENT0 = 0x8CE0,
  DEPTH_ATTACHMENT = 0x8D00,
  STENCIL_ATTACHMENT = 0x8D20,
  DEPTH_STENCIL_ATTACHMENT = 0x821A,
  NONE = 0,
  FRAMEBUFFER_COMPLETE = 0x8CD5,
  FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 0x8CD6,
  FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8CD7,
  FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 0x8CD9,
  FRAMEBUFFER_UNSUPPORTED = 0x8CDD,
  FRAMEBUFFER_BINDING = 0x8CA6,
  RENDERBUFFER_BINDING = 0x8CA7,
  MAX_RENDERBUFFER_SIZE = 0x84E8,
  INVALID_FRAMEBUFFER_OPERATION = 0x0506,

  /* PixelStorageModes */
  UNPACK_FLIP_Y_WEBGL = 0x9240,
  UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241,
  UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243,
}