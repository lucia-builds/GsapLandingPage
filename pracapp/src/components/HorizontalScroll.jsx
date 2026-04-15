import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const galleryImages = [
  {
    src: "https://static.vecteezy.com/system/resources/previews/036/297/142/non_2x/illustration-of-digital-marketing-in-social-media-platform-free-png.png",
    title: "SOCIAL MEDIA MARKETING",
    category: "Boost Your Social Media Reach",
    year: "2024",
    description: "Harness the power of social platforms to engage your audience and build meaningful connections. Our SMM experts craft targeted campaigns on Instagram, Facebook, LinkedIn, and more to grow your brand organically and through paid strategies.",
  },
  {
    src: "https://cdn3d.iconscout.com/3d/premium/thumb/search-engine-optimization-3d-icon-png-download-6805599.png",
    title: "SEARCH ENGINE OPTIMIZATION",
    category: "Get a Free SEO Audit",
    year: "2024",
    description: "Drive organic traffic with a proven SEO strategy that focuses on on-page optimization, quality backlinks, and technical SEO. From keyword research to content marketing, we ensure your website ranks at the top of search engine results.",
  },
  {
    src: "https://png.pngtree.com/png-vector/20240208/ourmid/pngtree-software-development-isometric-web-concept-png-image_11719511.png",
    title: "WEB DEVELOPMENT",
    category: "Build Your Website with Us",
    year: "2023",
    description: "Create a seamless user experience with custom websites designed to convert. Our development team builds responsive, high-performance websites optimized for both desktop and mobile users.",
  },
  {
    src: "https://medimaze.in/wp-content/uploads/2022/05/Mobile-UI-UX-Design-1.png",
    title: "UI/UX DESIGN",
    category: "Start Revamping Your Design",
    year: "2023",
    description: "Our UI/UX design services focus on creating intuitive, user-centric designs that not only look great but also deliver superior usability and functionality. From wireframes to prototypes, we bring your vision to life.",
  },
];

export default function HorizontalScroll() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    const getScrollAmount = () => {
      const containerWidth = containerRef.current.scrollWidth;
      return -(containerWidth - window.innerWidth);
    };

    const tween = gsap.to(containerRef.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${containerRef.current.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    const cards = gsap.utils.toArray('.horizontal-card');

    cards.forEach((card, index) => {
      if (index === 0) {
        gsap.set(card, { opacity: 1 });
        return;
      }
      gsap.to(card, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          containerAnimation: tween,
          start: "left 95%",
          end: "center 85%",
          scrub: true,
        }
      });
    });

   //Hover animation reveal
    cards.forEach((card) => {
      const overlay   = card.querySelector('.card-overlay');
      const category  = card.querySelector('.card-category');
      const title     = card.querySelector('.card-title');
      const desc      = card.querySelector('.card-desc');
      const meta      = card.querySelector('.card-meta');
      const arrow     = card.querySelector('.card-arrow');
      const img       = card.querySelector('img');

      gsap.set(overlay,  { opacity: 0 });
      gsap.set(category, { y: 20, opacity: 0 });
      gsap.set(title,    { y: 40, opacity: 0 });
      gsap.set(desc,     { y: 30, opacity: 0 });
      gsap.set(meta,     { y: 20, opacity: 0 });
      gsap.set(arrow,    { x: -10, opacity: 0 });

      const tl = gsap.timeline({ paused: true });

      tl
        .to(overlay, { opacity: 1, duration: 0.35, ease: "power2.out" })
        .to(img,     { scale: 1.06, duration: 0.6, ease: "power2.out" }, 0)
        .to(category,{ y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0.1)
        .to(title,   { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, 0.18)
        .to(desc,    { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0.26)
        .to(meta,    { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0.32)
        .to(arrow,   { x: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0.36);

      card.addEventListener('mouseenter', () => tl.play());
      card.addEventListener('mouseleave', () => tl.reverse());
    });

  }, { scope: sectionRef });

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .horizontal-scroll-section {
          width: 100%;
          overflow: hidden;
        }

        .horizontal-card-container {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 0 5vw;
          width: max-content;
          height: 100vh;
          background: transparent;
        }

        /* ── Intro heading ── */
        .horizontal-heading {
          min-width: 340px;
          padding-right: 3rem;
          border-right: 0.5px solid rgba(255,255,255,0.1);
        }
        .horizontal-heading h1 {
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1;
          background: linear-gradient(135deg, #c084fc, #818cf8, #67e8f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }
        .horizontal-heading p {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.7;
          max-width: 260px;
        }

        /* ── Cards ── */
        .horizontal-card {
          position: relative;
          width: 420px;
          height: 560px;
          border-radius: 20px;
          overflow: hidden;
          opacity: 0;
          cursor: pointer;
          flex-shrink: 0;
        }

        .horizontal-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform-origin: center center;
          will-change: transform;
        }

        /* ── Overlay ── */
        .card-overlay {
          position: absolute;
          inset: 0;
          /* Dark gradient from bottom */
          background: linear-gradient(
            to top,
            rgba(5, 3, 25, 0.97) 0%,
            rgba(15, 10, 50, 0.75) 45%,
            rgba(30, 20, 80, 0.2) 75%,
            transparent 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem;
          gap: 0.5rem;
        }

        /* top-right index number */
        .card-overlay::before {
          content: attr(data-index);
          position: absolute;
          top: 1.25rem;
          right: 1.5rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.3);
        }

        .card-category {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c084fc;
          margin-bottom: 0.25rem;
        }

        .card-title {
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: -1px;
          color: #ffffff;
          line-height: 1.1;
        }

        .card-desc {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.6;
          max-width: 300px;
          margin-top: 0.25rem;
        }

        .card-meta {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.1em;
          margin-top: 0.5rem;
        }

        /* CTA arrow row */
        .card-arrow {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          border-top: 0.5px solid rgba(255,255,255,0.1);
          padding-top: 1rem;
        }
        .card-arrow-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
      `}</style>

      <section ref={sectionRef} className="horizontal-scroll-section">
        <div ref={containerRef} className="horizontal-card-container">

          <div className="horizontal-heading">
            <h1>Selected Works</h1>
            <p>Scroll horizontally to view our latest projects and visual explorations.</p>
          </div>

          {galleryImages.map((item, index) => (
            <div key={index} className="horizontal-card">
              <img src={item.src} alt={item.title} loading="lazy" />

              <div className="card-overlay" data-index={`0${index + 1}`}>
                <span className="card-category">{item.category}</span>
                <h2 className="card-title">{item.title}</h2>
                <p className="card-desc">{item.description}</p>
                <span className="card-meta">{item.year} — Visual Series</span>
                <div className="card-arrow">
                  <div className="card-arrow-icon">↗</div>
                  View 
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>
    </>
  );
}