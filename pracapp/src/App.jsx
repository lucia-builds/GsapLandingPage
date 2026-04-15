import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import Navbar from './components/Navbar';
import Projects from './components/Projects';
import AnimatedHeader from './components/AnimatedHeader';
import ImpactMetrics from './components/ImpactMetrics';
import HorizontalScroll from './components/HorizontalScroll';
import CardStack from './components/CardStack';
import StarryBackground from './components/StarryBackground';
import Footer from './components/Footer'; 

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

      <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
        <main>
          {isRevealed && (
            <>
              <div className="content-wrapper">
                <StarryBackground />
                <Navbar />
                <Projects />

                <div
                  style={{
                    padding: '20vh 5vw',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30vh',
                    minHeight: '100vh',
                  }}
                >
                  <AnimatedHeader text="Welcome to Itzfizz" animateOnScroll={true} />
                  <ImpactMetrics />
                </div>
                <HorizontalScroll />
   <AnimatedHeader  text="What Our Customers Say" animateOnScroll={true}/>
                <CardStack />
              </div>
              <div className="footer-spacer" aria-hidden="true" />
              <Footer />
            </>
          )}
        </main>
      </ReactLenis>
    </>
  );
}
