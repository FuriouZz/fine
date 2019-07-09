export declare const enum GL {
    DEPTH_BUFFER_BIT = 256,
    STENCIL_BUFFER_BIT = 1024,
    COLOR_BUFFER_BIT = 16384,
    POINTS = 0,
    LINES = 1,
    LINE_LOOP = 2,
    LINE_STRIP = 3,
    TRIANGLES = 4,
    TRIANGLE_STRIP = 5,
    TRIANGLE_FAN = 6,
    ZERO = 0,
    ONE = 1,
    SRC_COLOR = 768,
    ONE_MINUS_SRC_COLOR = 769,
    SRC_ALPHA = 770,
    ONE_MINUS_SRC_ALPHA = 771,
    DST_ALPHA = 772,
    ONE_MINUS_DST_ALPHA = 773,
    DST_COLOR = 774,
    ONE_MINUS_DST_COLOR = 775,
    SRC_ALPHA_SATURATE = 776,
    CONSTANT_COLOR = 32769,
    ONE_MINUS_CONSTANT_COLOR = 32770,
    CONSTANT_ALPHA = 32771,
    ONE_MINUS_CONSTANT_ALPHA = 32772,
    FUNC_ADD = 32774,
    FUNC_SUBTRACT = 32778,
    FUNC_REVERSE_SUBTRACT = 32779,
    BLEND_EQUATION = 32777,
    BLEND_EQUATION_RGB = 32777,
    BLEND_EQUATION_ALPHA = 34877,
    BLEND_DST_RGB = 32968,
    BLEND_SRC_RGB = 32969,
    BLEND_DST_ALPHA = 32970,
    BLEND_SRC_ALPHA = 32971,
    BLEND_COLOR = 32773,
    ARRAY_BUFFER_BINDING = 34964,
    ELEMENT_ARRAY_BUFFER_BINDING = 34965,
    LINE_WIDTH = 2849,
    ALIASED_POINT_SIZE_RANGE = 33901,
    ALIASED_LINE_WIDTH_RANGE = 33902,
    CULL_FACE_MODE = 2885,
    FRONT_FACE = 2886,
    DEPTH_RANGE = 2928,
    DEPTH_WRITEMASK = 2930,
    DEPTH_CLEAR_VALUE = 2931,
    DEPTH_FUNC = 2932,
    STENCIL_CLEAR_VALUE = 2961,
    STENCIL_FUNC = 2962,
    STENCIL_FAIL = 2964,
    STENCIL_PASS_DEPTH_FAIL = 2965,
    STENCIL_PASS_DEPTH_PASS = 2966,
    STENCIL_REF = 2967,
    STENCIL_VALUE_MASK = 2963,
    STENCIL_WRITEMASK = 2968,
    STENCIL_BACK_FUNC = 34816,
    STENCIL_BACK_FAIL = 34817,
    STENCIL_BACK_PASS_DEPTH_FAIL = 34818,
    STENCIL_BACK_PASS_DEPTH_PASS = 34819,
    STENCIL_BACK_REF = 36003,
    STENCIL_BACK_VALUE_MASK = 36004,
    STENCIL_BACK_WRITEMASK = 36005,
    VIEWPORT = 2978,
    SCISSOR_BOX = 3088,
    COLOR_CLEAR_VALUE = 3106,
    COLOR_WRITEMASK = 3107,
    UNPACK_ALIGNMENT = 3317,
    PACK_ALIGNMENT = 3333,
    MAX_TEXTURE_SIZE = 3379,
    MAX_VIEWPORT_DIMS = 3386,
    SUBPIXEL_BITS = 3408,
    RED_BITS = 3410,
    GREEN_BITS = 3411,
    BLUE_BITS = 3412,
    ALPHA_BITS = 3413,
    DEPTH_BITS = 3414,
    STENCIL_BITS = 3415,
    POLYGON_OFFSET_UNITS = 10752,
    POLYGON_OFFSET_FACTOR = 32824,
    TEXTURE_BINDING_2D = 32873,
    SAMPLE_BUFFERS = 32936,
    SAMPLES = 32937,
    SAMPLE_COVERAGE_VALUE = 32938,
    SAMPLE_COVERAGE_INVERT = 32939,
    COMPRESSED_TEXTURE_FORMATS = 34467,
    VENDOR = 7936,
    RENDERER = 7937,
    VERSION = 7938,
    IMPLEMENTATION_COLOR_READ_TYPE = 35738,
    IMPLEMENTATION_COLOR_READ_FORMAT = 35739,
    BROWSER_DEFAULT_WEBGL = 37444,
    STATIC_DRAW = 35044,
    STREAM_DRAW = 35040,
    DYNAMIC_DRAW = 35048,
    ARRAY_BUFFER = 34962,
    ELEMENT_ARRAY_BUFFER = 34963,
    BUFFER_SIZE = 34660,
    BUFFER_USAGE = 34661,
    CURRENT_VERTEX_ATTRIB = 34342,
    VERTEX_ATTRIB_ARRAY_ENABLED = 34338,
    VERTEX_ATTRIB_ARRAY_SIZE = 34339,
    VERTEX_ATTRIB_ARRAY_STRIDE = 34340,
    VERTEX_ATTRIB_ARRAY_TYPE = 34341,
    VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922,
    VERTEX_ATTRIB_ARRAY_POINTER = 34373,
    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975,
    CULL_FACE = 2884,
    FRONT = 1028,
    BACK = 1029,
    FRONT_AND_BACK = 1032,
    BLEND = 3042,
    DEPTH_TEST = 2929,
    DITHER = 3024,
    POLYGON_OFFSET_FILL = 32823,
    SAMPLE_ALPHA_TO_COVERAGE = 32926,
    SAMPLE_COVERAGE = 32928,
    SCISSOR_TEST = 3089,
    STENCIL_TEST = 2960,
    NO_ERROR = 0,
    INVALID_ENUM = 1280,
    INVALID_VALUE = 1281,
    INVALID_OPERATION = 1282,
    OUT_OF_MEMORY = 1285,
    CONTEXT_LOST_WEBGL = 37442,
    CW = 2304,
    CCW = 2305,
    DONT_CARE = 4352,
    FASTEST = 4353,
    NICEST = 4354,
    GENERATE_MIPMAP_HINT = 33170,
    BYTE = 5120,
    UNSIGNED_BYTE = 5121,
    SHORT = 5122,
    UNSIGNED_SHORT = 5123,
    INT = 5124,
    UNSIGNED_INT = 5125,
    FLOAT = 5126,
    DEPTH_COMPONENT = 6402,
    ALPHA = 6406,
    RGB = 6407,
    RGBA = 6408,
    LUMINANCE = 6409,
    LUMINANCE_ALPHA = 6410,
    FRAGMENT_SHADER = 35632,
    VERTEX_SHADER = 35633,
    COMPILE_STATUS = 35713,
    DELETE_STATUS = 35712,
    LINK_STATUS = 35714,
    VALIDATE_STATUS = 35715,
    ATTACHED_SHADERS = 35717,
    ACTIVE_ATTRIBUTES = 35721,
    ACTIVE_UNIFORMS = 35718,
    MAX_VERTEX_ATTRIBS = 34921,
    MAX_VERTEX_UNIFORM_VECTORS = 36347,
    MAX_VARYING_VECTORS = 36348,
    MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660,
    MAX_TEXTURE_IMAGE_UNITS = 34930,
    MAX_FRAGMENT_UNIFORM_VECTORS = 36349,
    SHADER_TYPE = 35663,
    SHADING_LANGUAGE_VERSION = 35724,
    CURRENT_PROGRAM = 35725,
    NEVER = 512,
    LESS = 513,
    EQUAL = 514,
    LEQUAL = 515,
    GREATER = 516,
    NOTEQUAL = 517,
    GEQUAL = 518,
    ALWAYS = 519,
    KEEP = 7680,
    REPLACE = 7681,
    INCR = 7682,
    DECR = 7683,
    INVERT = 5386,
    INCR_WRAP = 34055,
    DECR_WRAP = 34056,
    NEAREST = 9728,
    LINEAR = 9729,
    NEAREST_MIPMAP_NEAREST = 9984,
    LINEAR_MIPMAP_NEAREST = 9985,
    NEAREST_MIPMAP_LINEAR = 9986,
    LINEAR_MIPMAP_LINEAR = 9987,
    TEXTURE_MAG_FILTER = 10240,
    TEXTURE_MIN_FILTER = 10241,
    TEXTURE_WRAP_S = 10242,
    TEXTURE_WRAP_T = 10243,
    TEXTURE_2D = 3553,
    TEXTURE = 5890,
    TEXTURE_CUBE_MAP = 34067,
    TEXTURE_BINDING_CUBE_MAP = 34068,
    TEXTURE_CUBE_MAP_POSITIVE_X = 34069,
    TEXTURE_CUBE_MAP_NEGATIVE_X = 34070,
    TEXTURE_CUBE_MAP_POSITIVE_Y = 34071,
    TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072,
    TEXTURE_CUBE_MAP_POSITIVE_Z = 34073,
    TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074,
    MAX_CUBE_MAP_TEXTURE_SIZE = 34076,
    TEXTURE0 = -31,
    ACTIVE_TEXTURE = 34016,
    REPEAT = 10497,
    CLAMP_TO_EDGE = 33071,
    MIRRORED_REPEAT = 33648,
    FLOAT_VEC2 = 35664,
    FLOAT_VEC3 = 35665,
    FLOAT_VEC4 = 35666,
    INT_VEC2 = 35667,
    INT_VEC3 = 35668,
    INT_VEC4 = 35669,
    BOOL = 35670,
    BOOL_VEC2 = 35671,
    BOOL_VEC3 = 35672,
    BOOL_VEC4 = 35673,
    FLOAT_MAT2 = 35674,
    FLOAT_MAT3 = 35675,
    FLOAT_MAT4 = 35676,
    SAMPLER_2D = 35678,
    SAMPLER_CUBE = 35680,
    LOW_FLOAT = 36336,
    MEDIUM_FLOAT = 36337,
    HIGH_FLOAT = 36338,
    LOW_INT = 36339,
    MEDIUM_INT = 36340,
    HIGH_INT = 36341,
    FRAMEBUFFER = 36160,
    RENDERBUFFER = 36161,
    RGBA4 = 32854,
    RGB5_A1 = 32855,
    RGB565 = 36194,
    DEPTH_COMPONENT16 = 33189,
    STENCIL_INDEX8 = 36168,
    DEPTH_STENCIL = 34041,
    RENDERBUFFER_WIDTH = 36162,
    RENDERBUFFER_HEIGHT = 36163,
    RENDERBUFFER_INTERNAL_FORMAT = 36164,
    RENDERBUFFER_RED_SIZE = 36176,
    RENDERBUFFER_GREEN_SIZE = 36177,
    RENDERBUFFER_BLUE_SIZE = 36178,
    RENDERBUFFER_ALPHA_SIZE = 36179,
    RENDERBUFFER_DEPTH_SIZE = 36180,
    RENDERBUFFER_STENCIL_SIZE = 36181,
    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048,
    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051,
    COLOR_ATTACHMENT0 = 36064,
    DEPTH_ATTACHMENT = 36096,
    STENCIL_ATTACHMENT = 36128,
    DEPTH_STENCIL_ATTACHMENT = 33306,
    NONE = 0,
    FRAMEBUFFER_COMPLETE = 36053,
    FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054,
    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055,
    FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057,
    FRAMEBUFFER_UNSUPPORTED = 36061,
    FRAMEBUFFER_BINDING = 36006,
    RENDERBUFFER_BINDING = 36007,
    MAX_RENDERBUFFER_SIZE = 34024,
    INVALID_FRAMEBUFFER_OPERATION = 1286,
    UNPACK_FLIP_Y_WEBGL = 37440,
    UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441,
    UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443
}
