void rotateByAxisAngle (inout vec3 normal, vec3 axis, float angle) {
  // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
  // assumes axis is normalized
  float halfAngle = angle / 2.0;
  float s = sin(halfAngle);
  vec4 quat = vec4(axis * s, cos(halfAngle));
  normal = normal + 2.0 * cross(quat.xyz, cross(quat.xyz, normal) + quat.w * normal);
}

void getRobustTBN(float t, out vec3 T, out vec3 B, out vec3 N) {
  // https://mattdesl.svbtle.com/shaping-curves-with-parametric-equations
  vec3 vFirst = vec3(0.0);
  getPositionAt(vFirst, 0.0);
  vec3 vSecond = vec3(0.0);
  getPositionAt(vSecond, 1.0 / DISC_COUNT);

  vec3 vLastTangent = normalize( vSecond - vFirst );

  // ROBUST NORMAL
  vec3 vAbsTangent = abs(vLastTangent);
  float minn = MAX_NUMBER;
  vec3 tmpNormal = vec3(0.0);
  if (vAbsTangent.x <= minn) {
    minn = vAbsTangent.x;
    tmpNormal.x = 1.0;
  }
  if (vAbsTangent.y <= minn) {
    minn = vAbsTangent.y;
    tmpNormal.y = 1.0;
  }
  if (vAbsTangent.z <= minn) {
    tmpNormal.z = 1.0;
  }
  // END ROBUST NORMAL

  vec3 vTmpNormal = tmpNormal;//vec3(1.0, 0.0, 0.0);
  vec3 vTmp = normalize(cross(vLastTangent, vTmpNormal));

  vec3 vLastNormal = cross(vLastTangent, vTmp);
  vec3 vLastBinormal = cross(vLastTangent, vLastNormal);
  vec3 vLastPos = vFirst;

  vec3 vNormal;
  vec3 vTangent;
  vec3 vBinormal;
  vec3 vPos = vec3(0.0);

  for (float i = 0.0; i < DISC_COUNT; i += 1.0) {
    float u = i / (DISC_COUNT - 1.0);

    getPositionAt(vPos, u);
    vTangent  = normalize( vPos - vLastPos );
    vNormal   = vLastNormal;
    vBinormal = vLastBinormal;

    vTmp = cross(vLastTangent, vTangent);

    if ((vTmp.x * vTmp.x + vTmp.y * vTmp.y +  vTmp.z * vTmp.z) > EPSILON * EPSILON) {
      vTmp = normalize(vTmp);
      float doot = dot(vLastTangent, vTangent);
      float theta = acos(clamp(doot, -1.0, 1.0));
      rotateByAxisAngle(vNormal, vTmp, theta );
    }

    vBinormal = cross(vTangent, vNormal);
    if (u >= t) break;

    vLastPos      = vPos;
    vLastNormal   = vNormal;
    vLastBinormal = vBinormal;
    vLastTangent  = vTangent;
  }

  T = vTangent;
  B = vBinormal;
  N = -vNormal;
}
