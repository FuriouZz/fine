-- Vertex
attribute vec3 position;
attribute vec2 texcoord;
varying vec4 aColor;

uniform mat4 uMVPMatrix;
uniform mat4 uProjectionMatrix;

{{ include('inc/common.glsl') }}
{{ include('inc/hermite.glsl', { data: { anchorCount: anchorCount } }) }}

void getPositionAt( out vec3 position, float progress ) {
  getHermitePositionAt( position, progress );

  // progress = 1.0 - progress;
  // progress -= 1.0 / float(ANCHORS_COUNT);

  // position.x += cos( progress * PI + 0.0 * PI ) * progress;
  // position.z += sin( progress * PI + 0.0 * PI ) * progress;
}

{{ include("inc/parallel_transform_frame.glsl") }}

void main() {
  uMVPMatrix;
  uProjectionMatrix;

  vec4 pos = vec4(position, 1.0);
  vec3 nor = vec3(0.0);

  vec3 vector0 = vec3(0.0);
  getPositionAt( vector0, texcoord.y );

  vec3 T = vec3(0.0);
  vec3 B = vec3(0.0);
  vec3 N = vec3(0.0);

  getRobustTBN( texcoord.y, T, B, N );

  float radius = 0.5;

  float angle = PI * (texcoord.x * 2.0 - 1.0);
  float circX = cos(angle);
  float circY = sin(angle);

  nor = B * circX + N * circY;
  pos.xyz = vector0.xyz + B * circX * radius + N * circY * radius;

  gl_Position = uMVPMatrix * pos;
  aColor = vec4(1.0);
}

-- Fragment
precision highp float;
varying vec4 aColor;

void main() {
  gl_FragColor = vec4(aColor.rgb, 1.0);
}