import { glsl } from "engine/utils/glsl";

export default glsl`
-- Vertex.RenderPass
attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
-- Vertex.Basic
attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldNormal;

void main() {
  vUv = uv;
  vNormal = normal;
  vWorldNormal = normalize(mat3(uModelViewMatrix) * normal);
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(position, 1.0);
}
`