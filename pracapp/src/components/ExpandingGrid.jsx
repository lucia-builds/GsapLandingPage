import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExpandingGrid() {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Loop through every row and attach a scroll trigger to it
      rowsRef.current.forEach((row) => {
        gsap.to(row, {
          width: "500%", // The target expanded width
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom", // Animation starts when row's top hits bottom of screen
            end: "bottom top",   // Animation ends when row's bottom hits top of screen
            scrub: true,         // Ties the animation directly to the scrollbar
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);
  const rows = Array.from({ length: 10 });
  const items = Array.from({ length: 9 });

  return (
    <div ref={containerRef} style={{ background: '#0a0a0a', padding: '20vh 0', overflow: 'hidden', minHeight: '100vh' }}>
      
      {/* Intro text spacer */}
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '30vh', fontSize: '3rem', fontFamily: 'sans-serif' }}>
        Scroll Down to Expand
      </h1>

      {rows.map((_, rowIndex) => (
        <div
          key={rowIndex}
          ref={(el) => (rowsRef.current[rowIndex] = el)}
          style={{
            display: 'flex',
            width: '125%', 
            gap: '2vw',
            marginBottom: '2vw',
            justifyContent: 'center'
          }}
        >
          {items.map((_, itemIndex) => (
            <div
              key={itemIndex}
              style={{
                flex: 1, 
                aspectRatio: '7/5', 
                backgroundColor: '#222',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
            
              <img 
                src={`https://picsum.photos/seed/${rowIndex * 10 + itemIndex}/600/400`} 
                alt="Project" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
              />
            </div>
          ))}
        </div>
      ))}
      
    </div>
  );
}