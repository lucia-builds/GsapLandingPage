import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Navbar() {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const logoRef = useRef(null);
  const navLinksRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    tl.to(frameRef.current, {
      width: "100vw",
      height: "100vh",
      borderRadius: "0px",
      ease: "none"
    }, 0);

    tl.fromTo(logoRef.current, {
      y: 300,
      scale: 2.5,
      opacity: 0,
    }, {
      y: 0,
      scale: 1,
      opacity: 1,
      ease: "none"
    }, 0);

    tl.to(navLinksRef.current, {
      padding: "2rem 5vw",
      ease: "none"
    }, 0);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ height: '200vh', width: '100%', position: 'relative' }}>
      <div style={{
        height: '100vh',
        position: 'sticky',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        // ✨ Deep space background behind the frame
        background: '#080714',
      }}>
        <div
          ref={frameRef}
          style={{
            width: '85vw',
            height: '80vh',
            // ✨ Rich purple-to-midnight gradient
            background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1a3e 100%)',
            borderRadius: '24px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* ✨ Ambient glow orbs */}
          <div style={{
            position: 'absolute',
            width: '500px', height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
            top: '-200px', left: '-100px',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            width: '400px', height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(103,232,249,0.15) 0%, transparent 70%)',
            bottom: '-150px', right: '50px',
            pointerEvents: 'none',
          }} />

          {/* ✨ Frosted glass nav bar */}
          <nav
            ref={navLinksRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '2rem 3vw',
              width: '100%',
              boxSizing: 'border-box',
              position: 'relative',
              zIndex: 2,
              // Frosted glass strip
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(12px)',
              borderBottom: '0.5px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Left links */}
            <div style={{
              display: 'flex', gap: '2rem',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              fontWeight: '600',
              letterSpacing: '0.12em',
              whiteSpace: 'nowrap',
            }}>
              {['Work', 'Studio'].map(link => (
                <a key={link} href="#" style={{
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                >{link}</a>
              ))}
            </div>

            {/* ✨ Gradient logo text */}
            <div
              ref={logoRef}
              style={{
                display: 'inline-block',
                fontSize: '4rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-2px',
                // Purple → indigo → cyan gradient on the text
                background: 'linear-gradient(90deg, #c084fc 0%, #818cf8 50%, #67e8f9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                whiteSpace: 'nowrap',
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
              }}
            >
              AGENCY
            </div>

            {/* Right links */}
            <div style={{
              display: 'flex', gap: '2rem',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              fontWeight: '600',
              letterSpacing: '0.12em',
              whiteSpace: 'nowrap',
            }}>
              {['News', 'Contact'].map(link => (
                <a key={link} href="#" style={{
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                >{link}</a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}