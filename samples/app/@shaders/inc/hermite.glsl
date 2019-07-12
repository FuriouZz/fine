const int ANCHORS_COUNT = {{ anchorCount }};
uniform vec3 uAnchors[{{ anchorCount }}];

float hermite(float A, float B, float C, float D, float t) {
  // a*t^3 + b*t^2 + c*t + d

  float a = -A/2.0 + (3.0*B)/2.0 - (3.0*C)/2.0 + D/2.0;
  float b = A - (5.0*B)/2.0 + 2.0*C - D / 2.0;
  float c = -A/2.0 + C/2.0;
  float d = B;

  return a*t*t*t + b*t*t + c*t + d;
}

void getHermitePositionAt( out vec3 position, float progress ) {
  int anchorCount = {{ anchorCount - 1 }};
  int index = int(floor( progress * float(anchorCount) ));

  int index0 = int(max(float(index)-1.0, 0.0));
  int index1 = index;
  int index2 = int(min(float(index)+1.0, float(anchorCount)));
  int index3 = int(min(float(index)+2.0, float(anchorCount)));

  vec3 a = uAnchors[index0];
  vec3 b = uAnchors[index1];
  vec3 c = uAnchors[index2];
  vec3 d = uAnchors[index3];

  float fmin = float(index1) / float(anchorCount);
  float fmax = float(index2) / float(anchorCount);

  float p = clamp((progress - fmin) / (fmax - fmin), 0.0, 1.0);

  position.x = hermite(a.x, b.x, c.x, d.x, p);
  position.y = hermite(a.y, b.y, c.y, d.y, p);
  position.z = hermite(a.z, b.z, c.z, d.z, p);
}