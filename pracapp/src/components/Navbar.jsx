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
  const linksLeftRef = useRef(null);
  const linksRightRef = useRef(null);

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
      filter: 'blur(10px)'
    }, {
      y: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      ease: "none"
    }, 0);

    tl.to(navLinksRef.current, {
      padding: "2rem 5vw",
      ease: "none"
    }, 0);

    tl.fromTo(linksLeftRef.current?.querySelectorAll('a'), {
      x: -50,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1
    }, 0.2);
    tl.fromTo(linksRightRef.current?.querySelectorAll('a'), {
      x: 50,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1
    }, 0.2);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ height: '200vh', width: '100%', position: 'relative' }}>
      <style>{`
        .nav-link {
          position: relative;
          display: inline-block;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          padding: 0.5rem 0;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #667eea, #f093fb);
          transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          inset: -5px;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
          border-radius: 4px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .nav-link:hover {
          color: #fff;
          transform: translateY(-2px);
          text-shadow: 0 0 12px rgba(102, 126, 234, 0.5);
        }

        .nav-link:hover::before {
          width: 100%;
        }

        .nav-link:hover::after {
          opacity: 1;
        }

        .logo-text {
          position: relative;
          display: inline-block;
          z-index: 1;
        }

        .logo-text::before {
          content: 'Itzfizz';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #667eea, #f093fb, #667eea);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: logoShimmer 3s ease-in-out infinite;
          z-index: -1;
        }

        @keyframes logoShimmer {
          0%, 100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }

        .navbar-container {
          position: relative;
          z-index: 2;
        }

        .navbar-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, transparent 50%, rgba(240, 147, 251, 0.05) 100%);
          pointer-events: none;
          border-bottom: 1px solid rgba(102, 126, 234, 0.1);
          border-radius: inherit;
        }

        .nav-section {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .nav-link {
            font-size: 0.65rem;
          }

          .logo-text {
            font-size: 2.5rem;
          }

          .nav-section {
            gap: 1rem;
          }
        }
      `}</style>

      <div style={{
        height: '100vh',
        position: 'sticky',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a3e 50%, #0f0c29 100%)',
      }}>
        <div
          ref={frameRef}
          style={{
            width: '85vw',
            height: '80vh',
            background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1a3e 100%)',
            borderRadius: '24px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1.5px solid rgba(102, 126, 234, 0.2)',
            boxShadow: '0 30px 80px rgba(102, 126, 234, 0.15), inset 0 0 50px rgba(103, 232, 249, 0.05)',
          }}
        >
          <div style={{
            position: 'absolute',
            width: '500px', height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',
            top: '-200px', left: '-100px',
            pointerEvents: 'none',
            animation: 'float 6s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute',
            width: '400px', height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(103,232,249,0.2) 0%, transparent 70%)',
            bottom: '-150px', right: '50px',
            pointerEvents: 'none',
            animation: 'float 8s ease-in-out infinite',
          }} />

          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(20px); }
            }
          `}</style>
          <nav
            ref={navLinksRef}
            className="navbar-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '2rem 3vw',
              width: '100%',
              boxSizing: 'border-box',
              position: 'relative',
              zIndex: 2,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(15px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'all 0.3s ease',
            }}
          >
            <div 
              ref={linksLeftRef}
              className="nav-section"
              style={{
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                fontWeight: '600',
                letterSpacing: '0.12em',
                whiteSpace: 'nowrap',
              }}
            >
              {['Work', 'Studio'].map(link => (
                <a 
                  key={link} 
                  href="#" 
                  className="nav-link"
                  onClick={(e) => e.preventDefault()}
                >
                  {link}
                </a>
              ))}
            </div>

            <div
              ref={logoRef}
              className="logo-text"
              style={{
                fontSize: '3.5rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-2px',
                background: 'linear-gradient(90deg, #c084fc 0%, #818cf8 50%, #67e8f9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                whiteSpace: 'nowrap',
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
                filter: 'drop-shadow(0 0 10px rgba(102, 126, 234, 0.3))',
              }}
            >
             Itzfizz
            </div>
            <div 
              ref={linksRightRef}
              className="nav-section"
              style={{
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                fontWeight: '600',
                letterSpacing: '0.12em',
                whiteSpace: 'nowrap',
              }}
            >
              {['News', 'Contact'].map(link => (
                <a 
                  key={link} 
                  href="#" 
                  className="nav-link"
                  onClick={(e) => e.preventDefault()}
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}