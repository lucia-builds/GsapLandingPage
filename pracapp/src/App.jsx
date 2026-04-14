import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Import all our custom components
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import AnimatedHeader from './components/AnimatedHeader';
import HorizontalScroll from './components/HorizontalScroll';
import CardStack from './components/CardStack';
import Footer from './components/Footer'; // <-- Import the new footer

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
      {/* SCENE 1: LOADING SCREEN */}
      <div className="loader-container">
        <div className="follow"></div>
        <div className="progress-bar hide-loader" style={{ width: count + '%' }}></div>
        <p className="count hide-loader">{count}%</p>
      </div>

      <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
        <main>
          {isRevealed && (
            <>
              {/* EVERY SCROLLING COMPONENT GOES INSIDE THIS WRAPPER */}
              {/* This wrapper has the 80vh margin-bottom! */}
              <div className="content-wrapper">
                
                {/* SCENE 2: EXPANDING NAVBAR */}
                <Navbar />
                
                {/* SCENE 3: FIGHTING FOR SPACE GRID */}
                <Projects />

                {/* SCENE 4: AWWWARDS TEXT REVEAL */}
                <div style={{ padding: '20vh 5vw', display: 'flex', flexDirection: 'column', gap: '30vh', minHeight: '100vh' }}>
                  <AnimatedHeader text="We Build Digital" animateOnScroll={true} />
                  <AnimatedHeader text="Experiences That Inspire" scrub={true} />
                </div>

                {/* SCENE 5: HORIZONTAL SCROLL GALLERY */}
                <HorizontalScroll />

                {/* SCENE 6: THE STACKING QUOTE CARDS */}
                <CardStack />
                
              </div>

              {/* SCENE 7: THE STICKY FOOTER */}
              {/* This sits outside the wrapper, stuck to the bottom of the window waiting to be revealed */}
              <Footer />
            </>
          )}
        </main>
      </ReactLenis>
    </>
  );
}