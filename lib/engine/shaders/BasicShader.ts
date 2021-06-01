import { glsl } from "engine/utils/glsl";

export default glsl`
-- Vertex
attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  vUv.xy = uv.xy;
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(position, 1.0);
}

-- Fragment
varying vec2 vUv;

uniform float uOpacity;
uniform vec4 uColor;
uniform sampler2D uTexture;

void main() {
  vec4 color = texture2D(uTexture, vUv);
  color *= uColor;
  color.a *= uOpacity;

  ${"if PRE_MULTIPLY_ALPHA"}
  color.rgb *= color.a;
  ${"endif"}

  gl_FragColor = color;
}
`