
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const footerTopRef = useRef(null);
  const footerBottomRef = useRef(null);
  const emailRef = useRef(null);
  const linksRef = useRef(null);
  const hugeTextRef = useRef(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse',
        once: true,
      },
    });

    // Main footer pop-in with scale and fade
    tl.fromTo(
      footerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out' },
      0
    );

    // Footer top section slides in from left
    tl.fromTo(
      footerTopRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'expo.out' },
      0.1
    );

    // Email link pops in with scale
    tl.fromTo(
      emailRef.current,
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
      0.2
    );

    // Links stagger in from right
    const linkItems = linksRef.current?.querySelectorAll('li') || [];
    tl.fromTo(
      linkItems,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'expo.out', stagger: 0.08 },
      0.3
    );
    tl.fromTo(
      hugeTextRef.current,
      { y: 40, opacity: 0, scale: 0.8, letterSpacing: '-0.2em' },
      { y: 0, opacity: 1, scale: 1, letterSpacing: '-0.05em', duration: 0.8, ease: 'expo.out' },
      0.35
    );
    tl.fromTo(
      footerBottomRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
      0.5
    );
  }, []);

  return (
    <footer ref={footerRef} className="sticky-footer">
      <div className="footer-content">
        <div ref={footerTopRef} className="footer-top">
          <div className="footer-top-left">
            <h3>Have an idea?</h3>
            <a ref={emailRef} href="mailto:hello@agency.com" className="footer-email">
              Let's build it together &rarr;
            </a>
          </div>
          <div ref={linksRef} className="footer-links">
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Awwwards</a></li>
            </ul>
          </div>
        </div>
        <div ref={footerBottomRef} className="footer-bottom">
          <h1 ref={hugeTextRef} className="footer-huge-text">ITZFIZZ©</h1>
          <p>2026 Edition — All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}