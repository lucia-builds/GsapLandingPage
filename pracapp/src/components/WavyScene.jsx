import { useRef, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Model from './Model';
import videoLink from '../assets/videos/futuristic-technology-background-with-blue-and-purple-light-rays-SBV-353527629-preview.mp4';

gsap.registerPlugin(ScrollTrigger);

export default function WavyScene({ scrollContainerRef }) {
  // Refs for our GSAP animations
  const sectionRef = useRef(null);
  const textWrapperRef = useRef(null);
  const scrollProgress = useRef(0);

  useLayoutEffect(() => {
    if (!scrollContainerRef.current || !sectionRef.current || !textWrapperRef.current) return;

    gsap.set(textWrapperRef.current, { autoAlpha: 1, x: 0, force3D: true, willChange: 'transform, opacity' });
    gsap.set(sectionRef.current, { force3D: true, willChange: 'transform' });

    let ctx = gsap.context(() => {
      
      // 1. Function-based value calculation (Crucial for Responsiveness, exactly like the video)
      const getScrollAmount = () => {
        const textWidth = textWrapperRef.current.scrollWidth;
        const viewportWidth = scrollContainerRef.current?.clientWidth || window.innerWidth;
        return Math.max(textWidth - viewportWidth, 0);
      };

      const getScrollDistance = () => Math.max(getScrollAmount(), 1000);

      // 2. Create the GSAP Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: scrollContainerRef.current, // Target our custom scroll container
          start: "top top",
          // The scroll distance is dynamically tied to how wide the text is
          end: () => `+=${getScrollDistance()}`,
          pin: true, // Pin the section so it stays on screen while text moves
          scrub: 1,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true, // Re-calculates widths if user resizes window!
          onUpdate: (self) => {
            // With numeric `scrub`, the animation can lag behind the scroll position.
            // Drive the 3D zoom from the (smoothed) animation progress to prevent jitter.
            scrollProgress.current = self.animation ? self.animation.totalProgress() : self.progress;
          }
        }
      });

      // 3. The Animation Sequence
      tl.to(textWrapperRef.current, {
        // Move the text horizontally using the responsive function
        x: () => -getScrollAmount(),
        duration: 1,
        ease: "none",
        overwrite: true,
        force3D: true
      }, 0);

    });

    // Ensure ScrollTrigger measures after layout/paint (helps when `.content` was width-animated).
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [scrollContainerRef]);

  return (
    // This is the trigger container that GSAP will "pin"
    <div ref={sectionRef} style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}>
      
      {/* --- 3D Video Canvas (Background) --- */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas>
          <Model scrollProgress={scrollProgress} videoUrl={videoLink} />
        </Canvas>
      </div>

      {/* --- GSAP Animated Text Overlay --- */}
      {/* We make it flex and max-content so it extends way off the right side of the screen */}
      <div 
        ref={textWrapperRef}
        style={{
          position: 'absolute',
          top: '10%', // Keeps it at the top of the video
          left: '5%', // Starts with a little padding on the left
          display: 'flex',
          gap: '40px', // Space between words
          width: 'max-content',
          opacity: 1,
          visibility: 'visible',
          willChange: 'transform, opacity',
          zIndex: 10,
          pointerEvents: 'none' 
        }}
      >
        {/* We make the text HUGE (20vw) to force a long horizontal scroll */}
        <h1 style={{ fontSize: '20vw', fontWeight: 'bold', margin: 0, color: '#ff5733' }}>Hello</h1>
        <h1 style={{ fontSize: '20vw', fontWeight: 'bold', margin: 0, color: '#33ff57' }}>and</h1>
        <h1 style={{ fontSize: '20vw', fontWeight: 'bold', margin: 0, color: '#3357ff' }}>welcome</h1>
        <h1 style={{ fontSize: '20vw', fontWeight: 'bold', margin: 0, color: '#f3ff33' }}>here</h1>
      </div>

    </div>
  );
}
