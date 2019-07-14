-- Vertex.Color
#version 300 es

in vec3 position;

out vec4 vColor;

uniform mat4 uMVPMatrix;
uniform mat4 uWorldMatrix;

void main() {
  vColor = vec4(1.0, 0.0, 0.0, 1.0);
  gl_Position = uMVPMatrix * vec4(position, 1.0);
}

-- Vertex.UV
#version 300 es

in vec3 position;
in vec2 uv;

out vec4 vColor;

uniform mat4 uMVPMatrix;
uniform mat4 uWorldMatrix;

void main() {
  vColor = vec4(uv, 0.0, 1.0);
  gl_Position = uMVPMatrix * vec4(position, 1.0);
}

-- Vertex.Normal
#version 300 es

in vec3 position;
in vec3 normal;

out vec4 vColor;

uniform mat4 uMVPMatrix;

void main() {
  vColor = vec4(normal, 1.0);
  gl_Position = uMVPMatrix * vec4(position, 1.0);
}

-- Vertex.WorldNormal
#version 300 es

in vec3 position;
in vec3 normal;

out vec4 vColor;

uniform mat4 uMVPMatrix;
uniform mat4 uWorldMatrix;

void main() {
  vColor = uWorldMatrix * vec4(normal, 0.0);
  vColor.a = 1.0;
  gl_Position = uMVPMatrix * vec4(position, 1.0);
}

-- Fragment
#version 300 es

precision highp float;

in vec4 vColor;
out vec4 fragColor;

void main() {
  fragColor = vColor;
}