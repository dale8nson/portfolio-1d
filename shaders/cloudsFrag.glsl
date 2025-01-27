uniform float time;
uniform bool invert;
uniform float intensity;
varying vec3 vPosition;

float fade(float t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float grad(int hash, vec3 p) {
    int h = hash & 15; // Convert low 3 bits of hash code
    float u = h < 8 ? p.x : p.y;
    float v = h < 4 ? p.y : h == 12 || h == 14 ? p.x : p.z;
    float s = h < 8 ? p.z : p.x;
    return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v) + ((h & 4) == 0 ? s : -s);

}

float noise(vec3 p) {

  p += vec3(cos(time / 23.0) * 0.3, 0.0, 0.0);

  p = normalize(mat4(
    cos(time / 23.0) / (5.0 * sin(time / 23.0)), -sin(time / 23.0) / (13.0 * -cos(time / 23.0)), 0.0, cos(time) / 5.0,
    sin(time / 23.0) / 3.0, cos(time / 23.0) / 5.0, 0.0, 0.0, 
    0.0, 0.0, 1.0, 0.0, 
    0.0, 0.0, 0.0, 1.0 ) 
    * vec4(p, 1.0)).xyz 
    * 15.0 
    // * sin(time / 23.0)
    ;

  vec3 i = floor(p);
  vec3 f = fract(p);

  int ix = int(i.x) & 255;
  int iy = int(i.y) & 255;
  int iz = int(i.z) & 255;

  float u = (fade(f.x));
  float v = (fade(f.y));
  float s = (fade(f.z));

  // float u = ((f.x));
  // float v = ((f.y));
  // float s = ((f.z));

  vec3 norm = normalize(f);

  // float u = mix(intBitsToFloat(ix), intBitsToFloat(ix + 1), norm.x);
  // float v = mix(intBitsToFloat(iy), intBitsToFloat(iy + 1), norm.y);
  // float s = mix(intBitsToFloat(iz), intBitsToFloat(iz + 1), norm.z);

  int a = ix + iy * 100 + iz * 1000;
  int b =  a + 1;

  // int a = ix + iy * 1000 + iz * 10000;
  // int b = a + 10;

  float res = mix(mix(mix(grad(a, vec3(f.x, f.y, f.z)), grad(b, vec3(f.x - 1.0, f.y, f.z)), u), mix(grad(a + 100, vec3(f.x, f.y - 1.0, f.z)), grad(b + 100, vec3(f.x - 1.0, f.y - 1.0, f.z)), u), v), mix(mix(grad(a + 10, vec3(f.x, f.y, f.z - 1.0)), grad(b + 10, vec3(f.x - 1.0, f.y, f.z - 1.0)), u), mix(grad(a + 110, vec3(f.x, f.y - 1.0, f.z - 1.0)), grad(b + 110, vec3(f.x - 1.0, f.y - 1.0, f.z - 1.0)), u), v), s);

    // float res = mix(mix(mix(grad(a, vec3(f.x, f.y, f.z)), grad(b, vec3(f.x - 1.0, f.y, f.z)), u), mix(grad(a + 10, vec3(f.x, f.y - 1.0, f.z)), grad(b + 10, vec3(f.x - 1.0, f.y - 1.0, f.z)), u), v), mix(mix(grad(a + 1, vec3(f.x, f.y, f.z - 1.0)), grad(b + 10, vec3(f.x - 1.0, f.y, f.z - 1.0)), u), mix(grad(a + 11, vec3(f.x, f.y - 1.0, f.z - 1.0)), grad(b + 11, vec3(f.x - 1.0, f.y - 1.0, f.z - 1.0)), u), v), s);

  return res;

}

float fbm(vec3 pos, int octaves) {
  float noiseSum = 0.0, frequency = 2.0, amplitude = .5;

  for(int i = 0; i < octaves; ++i) {
    noiseSum += noise(pos * frequency) * amplitude;
    amplitude *= 1.1;
    frequency *= .9;
  }

  return noiseSum;
}

void main() {

  // vec3 p = vPosition * cos(fract(time / 23.0) * 2.0 * 3.141592654) * 0.3; // Scale the coordinates

  // vec3 p = vPosition * mod(sin(time / 100.0 ) , 1000.0);

  vec3 p = normalize(vPosition 
  // + cos(time / 1.7   
  
  // (2.0 * 3.1415926535897932)
  // ) 
  ) * 255.0 
  // * (sin(time / 13.0 ) )
  // / abs((cos(time / 23.0)) / (2.0 * 3.1415926535897932))
  ;


  // float n = fbm(p, 4);
  float n = fbm(p, 4) - fbm(p, 3) 
  - fbm(p, 2) + fbm(p, 4)
  ;

  gl_FragColor = vec4(clamp(n,0.00392157, 0.34901961)
  // + cos(time) / 100.0 
  , clamp(n, 0.08627451, 0.44705882),clamp(n,0.15294118, 0.54901961), 1.0);
}