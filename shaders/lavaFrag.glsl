float ease(float v) {
    return 3.0 * pow(v, 2.0) - 2.0 * pow(v, 3.0);
}

uniform vec3 gVecs[1000];
uniform float delta;
uniform vec3 light;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

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

    int a = ix + iy * 100 + iz * 1000;
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

    float res = mix(mix(mix(grad(a, vec3(f.x, f.y, f.z)), grad(b, vec3(f.x - 1.0, f.y, f.z)), u), mix(grad(a + 100, vec3(f.x, f.y - 1.0, f.z)), grad(b + 100, vec3(f.x - 1.0, f.y - 1.0, f.z)), u), v), mix(mix(grad(a + 10, vec3(f.x, f.y, f.z - 1.0)), grad(b + 10, vec3(f.x - 1.0, f.y, f.z - 1.0)), u), mix(grad(a + 110, vec3(f.x, f.y - 1.0, f.z - 1.0)), grad(b + 110, vec3(f.x - 1.0, f.y - 1.0, f.z - 1.0)), u), v), s);

    return res;
}

float phong() {
    float alpha = 0.01;
    vec3 L = light;
    vec3 N = vNormal;
    vec3 R = reflect(L, N);
    vec3 V = -cameraPosition;

    return 0.2 + 1.5 * (dot(L, N)) + 0.5 * (pow(dot(R, V), alpha));
}

float gaussianBlur(float n) {
    // float sigma = clamp(n * 9.0, 0.0, 2.0);
    float sigma = 2.5;

    return (1.0 / pow((2.0 * 3.141592654 * sigma), 1.5)) * exp(-((pow(vPosition.x, 2.0) + pow(vPosition.y, 2.0) + pow(vPosition.z, 2.0)) / (2.0 * sigma * sigma)));
}

void main() {
    vec3 p = vPosition * 10.0; // Scale the coordinates
    float n = noise(p) + noise(p * 100.0) + noise(p * 1000.0);
    // if(n > noise(p * 100.0)) discard;

    float phongResult = phong();
    float blurResult = gaussianBlur(n);

    // Blend the effects, you can adjust the blendFactor for more control
    float blendFactor = 0.5;
    // float combinedResult = mix(blurResult, phongResult, blendFactor) * 2.0;
    // combinedResult = mix(combinedResult, clamp(0.9, 0.95, n), 0.7);

    // gl_FragColor = vec4(ease(clamp(1.0 / n, 0.66, 0.68)) * 20.0, 0.0, 0.0, 1.0);
    // float smoothRes = smoothstep(0.0, 1.0, combinedResult * 2.0);
    // if(dot(vPosition, light) < 0.0) combinedResult = combinedResult * .9;

    float combinedResult = mix(n, phongResult, blendFactor);
    combinedResult = mix(combinedResult, blurResult, 0.4);

    // vec3 L = vec3(cos(delta), 0.15, 0.15);
    // vec3 N = vNormal;
    // vec3 R = reflect(L, N);
    // vec3 V = normalize(cameraPosition - vNormal);
    // float Kd = combinedResult * 3.0;
    // float Ks = 0.5;
    // float a = 0.2;

    // float c = 0.5 + (Kd * (dot(L, N))) + Ks * pow(dot(R, V), a);

    gl_FragColor = vec4((clamp(combinedResult, 0.08627451, 0.44705882) - n / 6.0) * 2.0 - noise(vPosition * 1.9), clamp(n, 0.08627451, 0.44705882), clamp(n,0.15294118, 0.54901961), 1.0);

    // clamp(n,0.00392157, 0.34901961)
  // + cos(time) / 100.0 


    // gl_FragColor = vec4((clamp(c, 0.5, 0.6) - n / 6.0) * 2.0 - noise(vPosition * 1.9), 0.0, 0.0, 1.0);
}