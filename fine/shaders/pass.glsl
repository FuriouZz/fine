-- Vertex
#version 300 es

in vec2 position;
out vec2 vPosition;

void main() {
  vPosition = position;
  gl_Position = vec4(position, 0.0, 1.0);
}

-- Fragment
#version 300 es

precision highp float;

in vec2 vPosition;
out vec4 fragColor;

void main() {
  fragColor = vec4(vPosition, 0.0, 1.0);
}