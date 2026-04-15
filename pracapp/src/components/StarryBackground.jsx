import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function RotatingStars() {
  const starsRef = useRef();
  useFrame(() => {
    if (starsRef.current) {
      // Rotating with respect to x and y axes
      starsRef.current.rotation.y += 0.0005;
      starsRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={100}       
      depth={50}      
      count={5000}      
      factor={4}       
      saturation={0}    
      fade              
      speed={1}         
    />
  );
}

export default function StarryBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: '#050505' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <RotatingStars />
      </Canvas>
    </div>
  );
}