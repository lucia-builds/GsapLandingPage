import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function RotatingStars() {
  const starsRef = useRef();

  // useFrame runs on every render loop (60fps) to animate the scene
  useFrame(() => {
    if (starsRef.current) {
      // Slowly rotate the stars on the X and Y axis
      starsRef.current.rotation.y += 0.0005;
      starsRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={100}       // Radius of the inner sphere (default: 100)
      depth={50}         // Depth of area where stars should fit (default: 50)
      count={5000}       // Amount of stars (default: 5000)
      factor={4}         // Size factor (default: 4)
      saturation={0}     // Saturation 0 is white, 1 is colorful (default: 0)
      fade               // Fades stars in and out based on distance
      speed={1}          // Speed of the twinkling effect (default: 1)
    />
  );
}

export default function StarryBackground() {
  return (
    // The wrapper div ensures the canvas stays fixed behind all your content
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: '#050505' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <RotatingStars />
      </Canvas>
    </div>
  );
}