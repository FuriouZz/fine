-- Vertex
#version 300 es

in vec2 position;
out vec3 vWorldNormal;

uniform mat4 uWorldMatrix;

void main() {
  vWorldNormal = (uWorldMatrix * vec4(normal, 0.0)).xyz;
  gl_Position = vec4(position, 0.0, 1.0);
}

-- Fragment
#version 300 es

precision highp float;

in vec2 vWorldNormal;
out vec4 fragColor;

void main() {
  fragColor = vec4(vWorldNormal, 1.0);
}