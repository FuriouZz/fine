-- Vertex
attribute vec3 position;
uniform mat4 uMVPMatrix;

void main() {
  gl_Position = uMVPMatrix * vec4(position, 1.0);
}
-- Fragment
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}