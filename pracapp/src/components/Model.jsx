import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useVideoTexture, useAspect } from '@react-three/drei';
import { useControls } from 'leva';
import { transform } from 'framer-motion';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './Shader';

export default function Model({ scrollProgress, videoUrl }) {
  const plane = useRef();
  const { viewport } = useThree();
  
  // Load the video instead of an image
  // This automatically handles autoplay, mute, and looping
  const texture = useVideoTexture(videoUrl, {
    crossOrigin: 'Anonymous',
    loop: true,
    muted: true,
    start: true,
    playsInline: true
  });

  const { amplitude, wavelength } = useControls({
    amplitude: { value: 0.25, min: 0, max: 2, step: 0.05 },
    wavelength: { value: 5, min: 0, max: 20, step: 1 },
  });

  // Videos store their dimensions in videoWidth and videoHeight
  // Use a 16:9 fallback to avoid a visible "jump" before metadata loads.
  const videoWidth = texture.image.videoWidth || 1920;
  const videoHeight = texture.image.videoHeight || 1080;
  const videoRatio = videoWidth / videoHeight;

  // Start smaller, then expand to cover the viewport by the end of scroll
  const startScale = useAspect(videoWidth, videoHeight, 0.35);
  const endScale = useMemo(() => {
    const viewportRatio = viewport.width / viewport.height;
    if (videoRatio > viewportRatio) {
      return [viewport.height * videoRatio, viewport.height];
    }
    return [viewport.width, viewport.width / videoRatio];
  }, [viewport.width, viewport.height, videoRatio]);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 0 },
      uWavelength: { value: 0 },
      uTexture: { value: texture },
      vUvScale: { value: new THREE.Vector2(1, 1) },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    if (!plane.current) return;

    plane.current.material.uniforms.uTime.value += delta;

    const currentScroll = scrollProgress.current ?? 0;
    
    // Amplitude: smooth lerp for wave effect
    const targetAmplitude = transform(currentScroll, [0, 1], [amplitude, 0]);
    plane.current.material.uniforms.uAmplitude.value = THREE.MathUtils.lerp(
      plane.current.material.uniforms.uAmplitude.value,
      targetAmplitude,
      delta * 3
    );
    plane.current.material.uniforms.uWavelength.value = wavelength;

    // Scale: damp to avoid jitter from scroll wheel deltas / scrub smoothing.
    const targetScaleX = transform(currentScroll, [0, 1], [startScale[0], endScale[0]]);
    const targetScaleY = transform(currentScroll, [0, 1], [startScale[1], endScale[1]]);

    plane.current.scale.x = THREE.MathUtils.damp(plane.current.scale.x, targetScaleX, 12, delta);
    plane.current.scale.y = THREE.MathUtils.damp(plane.current.scale.y, targetScaleY, 12, delta);

    const scaleRatio = plane.current.scale.x / plane.current.scale.y;
    plane.current.material.uniforms.vUvScale.value.set(1, videoRatio / scaleRatio);
  });

  return (
    <mesh ref={plane} scale={startScale}>
      <planeGeometry args={[1, 1, 45, 45]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
