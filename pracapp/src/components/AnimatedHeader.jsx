import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimatedHeader({ 
  text, 
  animateOnScroll = false, 
  scrub = false,
  delay = 0,
  stagger = 0.02,
  duration = 0.8
}) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const chars = gsap.utils.toArray('.animated-header-char', containerRef.current);
    if (chars.length === 0) return;

    gsap.set(chars, { 
      x: 100, 
      opacity: 0, 
      skewX: 20 
    });
    const animateIn = () => {
      return gsap.to(chars, {
        x: 0,
        opacity: 1,
        skewX: 0,
        duration: duration,
        stagger: stagger,
        ease: "power3.out",
        delay: delay
      });
    };

    //Text reveal animation
    if (scrub) {
      gsap.to(chars, {
        x: 0,
        opacity: 1,
        skewX: 0,
        stagger: stagger,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "top 45%",
          scrub: true,
        }
      });
    } else if (animateOnScroll) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",
        onEnter: () => animateIn().restart(),
        onLeaveBack: () => gsap.set(chars, { x: 100, opacity: 0, skewX: 20 }) // 
      });
    } else {
      animateIn();
    }
  }, { scope: containerRef });

  return (
    <h1 ref={containerRef} style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="animated-header-word">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="animated-header-char">
              {char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}