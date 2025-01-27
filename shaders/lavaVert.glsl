
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float delta;

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
    vec3 i = floor(p);
    vec3 f = fract(p);

    int ix = int(i.x) & 255;
    int iy = int(i.y) & 255;
    int iz = int(i.z) & 255;

    float u = fade(f.x);
    float v = fade(f.y);
    float s = fade(f.z);

    int a = ix + iy * 10 + iz * 100;
    int b = a + 1;

    // Calculate the gradient dot products for all 8 corners of the unit cube
    // float res = mix(
    //     mix(
    //         mix(grad(a, vec3(f.x, f.y, f.z)), grad(b, vec3(f.x - 1.0, f.y, f.z)), u),
    //         mix(grad(a + 10, vec3(f.x, f.y - 1.0, f.z)), grad(b + 10, vec3(f.x - 1.0, f.y - 1.0, f.z)), u),
    //         v
    //     ),
    //     mix(
    //         mix(grad(a + 100, vec3(f.x, f.y, f.z - 1.0)), grad(b + 100, vec3(f.x - 1.0, f.y, f.z - 1.0)), u),
    //         mix(grad(a + 110, vec3(f.x, f.y - 1.0, f.z - 1.0)), grad(b + 110, vec3(f.x - 1.0, f.y - 1.0, f.z - 1.0)), u),
    //         v
    //     ),
    //     s
    // );

    float res = mix(
        mix(
            mix(grad(a, vec3(f.x, f.y, f.z)), grad(b, vec3(f.x - 1.0, f.y, f.z)), u),
            mix(grad(a + 10, vec3(f.x, f.y - 1.0, f.z)), grad(b + 10, vec3(f.x - 1.0, f.y - 1.0, f.z)), u),
            v
        ),
        mix(
            mix(grad(a + 10, vec3(f.x, f.y, f.z - 1.0)), grad(b + 10, vec3(f.x - 1.0, f.y, f.z - 1.0)), u),
            mix(grad(a + 110, vec3(f.x, f.y - 1.0, f.z - 1.0)), grad(b + 110, vec3(f.x - 1.0, f.y - 1.0, f.z - 1.0)), u),
            v
        ),
        s
    );

    return res;
}

void main() {
  vUv = uv;
  vNormal = normal; 
  // vPosition = (projectionMatrix * modelViewMatrix * vec4( position, 1.0 )).xyz;
  float n = noise(position);
  vPosition = position + n * 0.25 * abs(cos(delta * n));
  vNormal = normal * n;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition * acos(noise(position)), 1.0 ) + noise(position * cos(delta)) / 32.0 + atan(noise(position));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);

  // gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}