-- Vertex
attribute vec3 position;
varying vec3 depth;

uniform mat4 uMVPMatrix;

void main() {
  gl_Position = uMVPMatrix * vec4(position, 1.0);
  depth = gl_Position.xyz;
}

-- Fragment
precision highp float;

varying vec3 depth;

void main() {
  gl_FragColor = vec4(vec3(1.0) * (1.0 - (depth.z / 2.0)), 1.0);
}