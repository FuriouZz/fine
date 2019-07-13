-- Vertex
#version 300 es

in vec3 position;
in vec3 normal;

out vec3 vWorldNormal;

uniform mat4 uMVPMatrix;
uniform mat4 uWorldMatrix;

void main() {
  vWorldNormal = (uWorldMatrix * vec4(normal, 0.0)).xyz;
  gl_Position = uMVPMatrix * vec4(position, 1.0);
}

-- Fragment
#version 300 es

precision highp float;

in vec3 vWorldNormal;
out vec4 fragColor;

void main() {
  fragColor = vec4(vWorldNormal, 1.0);
}