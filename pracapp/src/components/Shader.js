// export const vertexShader = `
//   varying vec2 vUv;
//   uniform float uTime;
//   uniform float uAmplitude;
//   uniform float uWavelength;

//   void main() {
//     vUv = uv;
//     vec3 newPosition = position;
    
//     // Wave math
//     float wave = sin(newPosition.x * uWavelength + uTime) * uAmplitude;
//     newPosition.z += wave;

//     gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
//   }
// `;

// export const fragmentShader = `
//   varying vec2 vUv;
//   uniform sampler2D uTexture;
//   uniform vec2 vUvScale;

//   void main() {
//     // Math to center the zoom and prevent image stretching
//     vec2 uv = (vUv - 0.5) * vUvScale + 0.5;
//     vec4 color = texture2D(uTexture, uv);
//     gl_FragColor = color;
//   }
// `;