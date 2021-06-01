import { glsl } from "engine/utils/glsl";

export default glsl`
-- Vertex
attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;
attribute vec4 tangent;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying vec3 vWorldTangent;
varying vec3 vWorldBitangent;

uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  vec4 worldPosition = uWorldMatrix * vec4(position, 1.0);
  gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;

  vUv = uv;
  vWorldPosition = worldPosition.xyz;
  vWorldNormal = normalize(mat3(uWorldMatrix) * normal);
  vWorldTangent = normalize(mat3(uWorldMatrix) * tangent.xyz);
  vWorldBitangent = normalize(cross(vWorldNormal, vWorldTangent) * tangent.w);
}

-- Fragment
varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying vec3 vWorldTangent;
varying vec3 vWorldBitangent;

uniform vec3 uEyePosition;
uniform mat4 uViewMatrix;
uniform float uMetallicFactor;
uniform float uRoughnessFactor;
uniform float uOpacity;

#define PI 3.14159265359

#ifdef POINT_LIGHT_COUNT
uniform vec3 uPointLightPositions[POINT_LIGHT_COUNT];
uniform vec3 uPointLightColors[POINT_LIGHT_COUNT];
uniform vec2 uPointLightParameters[POINT_LIGHT_COUNT];
#endif

#ifdef HAS_BASE_COLOR
uniform vec4 uBaseColor;
#endif

#ifdef HAS_BASE_COLOR_TEXTURE
uniform sampler2D uBaseColorTexture;
#endif

#ifdef HAS_METALLIC_TEXTURE
uniform sampler2D uMetallicTexture;
#endif

#ifdef HAS_ROUGHNESS_TEXTURE
uniform sampler2D uRoughnessTexture;
#endif

#ifdef HAS_NORMAL_TEXTURE
uniform sampler2D uNormalTexture;
#endif

#ifdef HAS_NORMAL_TEXTURE
uniform float uNormalScale;
#endif

#ifdef HAS_NORMAL_TEXTURE
vec3 getNormal() {
  mat3 tbn = mat3(vWorldTangent, vWorldBitangent, vWorldNormal);
  vec3 normal = texture2D(uNormalTexture, vUv * uNormalScale).rgb * 2.0 - 1.0;
  normal.xy *= uNormalScale;
  normal = normalize(tbn * normal);
  return normalize(normal * mat3(uViewMatrix));
}
#endif

uniform vec2 uLightC;

vec3 fresnelSchlick(float cosTheta, vec3 F0) {
  return F0 + (1.0 - F0) * pow(max(1.0 - cosTheta, 0.0), 5.0);
}

float DistributionGGX(vec3 N, vec3 H, float roughness) {
  float a      = roughness*roughness;
  float a2     = a*a;
  float NdotH  = max(dot(N, H), 0.0);
  float NdotH2 = NdotH*NdotH;

  float num   = a2;
  float denom = (NdotH2 * (a2 - 1.0) + 1.0);
  denom = PI * denom * denom;

  return num / denom;
}

float GeometrySchlickGGX(float NdotV, float roughness) {
  float r = (roughness + 1.0);
  float k = (r*r) / 8.0;

  float num   = NdotV;
  float denom = NdotV * (1.0 - k) + k;

  return num / denom;
}

float GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness) {
  float NdotV = max(dot(N, V), 0.0);
  float NdotL = max(dot(N, L), 0.0);
  float ggx2  = GeometrySchlickGGX(NdotV, roughness);
  float ggx1  = GeometrySchlickGGX(NdotL, roughness);

  return ggx1 * ggx2;
}

float D_GGX(float NoH, float a) {
    float a2 = a * a;
    float f = (NoH * a2 - NoH) * NoH + 1.0;
    return a2 / (PI * f * f);
}

vec3 F_Schlick(float u, vec3 f0) {
    return f0 + (vec3(1.0) - f0) * pow(1.0 - u, 5.0);
}

float V_SmithGGXCorrelated(float NoV, float NoL, float a) {
    float a2 = a * a;
    float GGXL = NoV * sqrt((-NoL * a2 + NoL) * NoL + a2);
    float GGXV = NoL * sqrt((-NoV * a2 + NoV) * NoV + a2);
    return 0.5 / (GGXV + GGXL);
}

float Fd_Lambert() {
    return 1.0 / PI;
}

float pow2(in float value) {
  return value * value;
}

float pow4(in float value) {
  return value * value * value * value;
}

#define saturate(a) clamp( a, 0.0, 1.0 )

float computeDiffuse(const in vec3 lightPosition, const in vec2 lightParameters, const in vec3 surfaceToViewDirection, const in vec3 normal) {
  vec3 surfaceToLight = lightPosition - vWorldPosition;
  vec3 surfaceToLightDirection = normalize(surfaceToLight);
  vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);

  // float lightConstant = 1.0;
  // float lightLinear = lightParameters.x;//0.09;
  // float lightQuadratic = lightParameters.y;//0.032;
  // // float lightLinear = 0.09;
  // // float lightQuadratic = 0.032;
  // float dist = length(lightPosition - vWorldPosition);

  // float attenuation = 1.0 / (lightConstant + lightLinear * dist + lightQuadratic * (dist * dist));
  // float d = dot(normal, surfaceToLightDirection);
  // d *= attenuation;

  // float dist = length(lightPosition - vWorldPosition);
  // float lightCutOffDistance = lightParameters.x;//uLightC.x;
  // float lightDecay = lightParameters.y;//uLightC.y;

  // // based upon Frostbite 3 Moving to Physically-based Rendering
  // // page 32, equation 26: E[window1]
  // // https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
  // // this is intended to be used on spot and point lights who are represented as luminous intensity
  // // but who must be converted to luminous irradiance for surface lighting calculation
  // float d = 1.0 / max(pow(dist, lightDecay ), 0.01);

  // if (lightCutOffDistance > 0.0) {
  //   d *= pow2(saturate(1.0 - pow4(dist / lightCutOffDistance )));
  // }

  float att = 1.0;
  float invSqrAttRadius = 1.0 / max(lightParameters.x, 0.0001);

  {
    float sqrDist = dot(surfaceToLight, surfaceToLight);
    float attenuation = 1.0 / (max(sqrDist , 0.01*0.01));

    float factor = sqrDist * invSqrAttRadius;
    float smoothFactor = saturate(1.0 - factor * factor);

    attenuation *= smoothFactor * smoothFactor;
    attenuation *= saturate(dot(normal, surfaceToLightDirection));
    att *= attenuation;
  }

  return att / PI;
}

/**
 * Uncharted 2 tone mapping
 * http://filmicgames.com/archives/75
 */
vec3 Uncharted2Tonemap( vec3 color ) {
  float A = 0.15;
  float B = 0.50;
  float C = 0.10;
  float D = 0.20;
  float E = 0.02;
  float F = 0.30;
  float W = 11.2;

  return ((color*(A*color+C*B)+D*E)/(color*(A*color+B)+D*F))-E/F;
}

/*
 * Apply correction (tone mapping)
 * http://learnopengl.com/#!Advanced-Lighting/HDR
 * http://filmicgames.com/archives/75
 */
vec3 ReinhartTonemap(vec3 c){
  return c / (c + vec3(1.0));
}

vec3 applyTonemap( in vec3 color, in float gamma ) {

  // // Reinhart
  // return ReinhartTonemap( color );

  // Uncharted 2
  float W = 11.2;
  float ExposureBias = 2.0;
  vec3 curr          = Uncharted2Tonemap( ExposureBias * color );
  vec3 whiteScale    = 1.0 / Uncharted2Tonemap( vec3( W ) );
  color              = curr * whiteScale;

  return pow( color, vec3(1.0/gamma) );

}

void main() {
  vec3 color = vec3(1.0);
  vec3 albedo = vec3(1.0);

  #ifdef HAS_BASE_COLOR
  albedo *= uBaseColor.rgb;
  #endif

  #ifdef HAS_BASE_COLOR_TEXTURE
  albedo *= texture2D(uBaseColorTexture, vUv).rgb;
  #endif

  vec3 normal = vWorldNormal;
  #ifdef HAS_NORMAL_TEXTURE
  normal = getNormal();
  #endif
  normal = normalize(normal);

  float metalness = uMetallicFactor;
  #ifdef HAS_METALLIC_TEXTURE
  metalness *= texture2D(uMetallicTexture, vUv).r;
  #endif

  float roughness = uRoughnessFactor;
  #ifdef HAS_ROUGHNESS_TEXTURE
  roughness *= texture2D(uRoughnessTexture, vUv).r;
  #endif

  vec3 surfaceToViewDirection = normalize(uEyePosition.xyz - vWorldPosition.xyz);

  // // Compute irradiance
  // vec3 Lo = vec3(0.0);
  // #ifdef POINT_LIGHT_COUNT
  // vec3 N = normal;
  // vec3 V = surfaceToViewDirection;

  // vec3 F0 = vec3(0.04);
  // F0 = mix(F0, albedo, metalness);

  // for(int i = 0; i < POINT_LIGHT_COUNT; ++i) {
  //   float radius = 10.0;

  //   // calculate per-light radiance
  //   vec3 L = normalize(uLightPositions[i] - vWorldPosition);
  //   vec3 H = normalize(V + L);
  //   float d = length(uLightPositions[i] - vWorldPosition) / radius;
  //   float attenuation = max(d, 0.0);
  //   vec3 radiance = uLightColors[i] * attenuation;

  //   // cook-torrance brdf
  //   float NDF = DistributionGGX(N, H, roughness);
  //   float G   = GeometrySmith(N, V, L, roughness);
  //   vec3 F    = fresnelSchlick(max(dot(H, V), 0.0), F0);

  //   vec3 kS = F;
  //   vec3 kD = vec3(1.0) - F;
  //   kD *= 1.0 - metalness;

  //   vec3 numerator = NDF * G * F;
  //   float denominator = 4.0 * max(dot(N, V), 0.0) * max(dot(N, L), 0.0);
  //   vec3 specular = numerator / max(denominator, 0.001);

  //   // add to outgoing radiance Lo
  //   float NdotL = max(dot(N, L), 0.0);
  //   Lo += (kD * albedo / PI + specular) * radiance * NdotL;
  // }
  // #endif

  // vec3 ambient = vec3(0.03) * albedo;
  // color.rgb = ambient + Lo;

  // color = color / (color + vec3(1.0));
  // color = pow(color, vec3(1.0/2.2));

  vec3 diffuse = vec3(0.0);
  vec3 specular = vec3(0.0);
  #ifdef POINT_LIGHT_COUNT
  for (int i = 0; i < POINT_LIGHT_COUNT; i++) {
    diffuse += uPointLightColors[i] * computeDiffuse(uPointLightPositions[i], uPointLightParameters[i], surfaceToViewDirection, normal);
  }
  #endif

  // Ambient
  vec3 ambient = {{ color(0xFFF5ED) }} * 0.6;

  vec3 F0 = vec3(0.04);
  F0 = mix(F0, albedo, metalness);
  vec3 fresnel = fresnelSchlick(dot(surfaceToViewDirection, normal), F0);

  diffuse = (albedo*albedo*albedo) * diffuse;
  diffuse = mix(ambient+diffuse, diffuse, min(vec3(1.0), fresnel));

  color.rgb = diffuse;
  color.rgb += specular;

  color.rgb = applyTonemap(color.rgb, 2.2);
  color.rgb *= uOpacity;

  gl_FragColor = vec4(color, uOpacity);
}`