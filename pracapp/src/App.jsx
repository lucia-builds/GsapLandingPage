import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Projects from './components/Projects';
import AnimatedHeader from './components/AnimatedHeader'; // <-- Import it here
import './index.css';

gsap.registerPlugin(useGSAP);

export default function App() {
  const [count, setCount] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (count === 100) {
      const tl = gsap.timeline();
      tl.to('.follow', { width: '100%', duration: 1.2, delay: 0.5, ease: 'expo.inOut' })
        .to('.hide-loader', { opacity: 0, duration: 0.3 })
        .set('.hide-loader', { display: 'none' })
        .to('.follow', { height: '100%', duration: 0.7, ease: 'expo.inOut' })
        .add(() => setIsRevealed(true)) 
        .to('.loader-container', { yPercent: -100, duration: 1.2, ease: 'expo.inOut', delay: 0.2 });
    }
  }, [count]);

  return (
    <>
      <div className="loader-container">
        <div className="follow"></div>
        <div className="progress-bar hide-loader" style={{ width: count + '%' }}></div>
        <p className="count hide-loader">{count}%</p>
      </div>

      <ReactLenis root options={{ lerp: 0.05 }}>
        <main>
          {isRevealed && (
            <>
              {/* Top Space
              <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h2 style={{ fontSize: '2rem', color: '#fff' }}>Scroll Down</h2>
              </div> */}
              
              {/* The Expanding Image Grid */}
              <Projects />

              {/* The New Awwwards Text Animations */}
              <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', gap: '30vh' }}>
                
                <AnimatedHeader 
                  text="We Build Digital" 
                  animateOnScroll={true} 
                />
                
                <AnimatedHeader 
                  text="Experiences That Inspire" 
                  scrub={true} // This one will tie directly to the scrollbar!
                />

              </div>
            </>
          )}
        </main>
      </ReactLenis>
    </>
  );
}