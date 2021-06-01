import { glsl } from "engine/utils/glsl";

export default glsl`
-- Vertex
attribute vec3 position;
attribute vec3 normal;

varying vec4 vColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  {% if (WORLD) { %}
  vColor.rgb = normalize(mat3(uModelViewMatrix) * normal);
  {% } else {%}
  vColor.rgb = normal;
  {% } %}
  vColor.a = 1.0;
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(position, 1.0);
}

-- Fragment
varying vec4 vColor;

uniform float uOpacity;
uniform vec4 uColor;

void main() {
  vec4 color = vColor;
  color *= uColor;
  color.a *= uOpacity;

  ${"if PRE_MULTIPLY_ALPHA"}
  color.rgb *= color.a;
  ${"endif"}

  gl_FragColor = color;
}
`