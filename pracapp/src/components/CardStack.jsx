import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const quotations = [
  {
    text: "Design is intelligence made visible.",
    author: "Alina Wheeler",
    color: "#fce83a",
    textColor: "#1a1a1a",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop&crop=face",
    role: "Brand Strategist"
  },
  {
    text: "Everything is designed. Few things are designed well.",
    author: "Brian Reed",
    color: "#ff6b6b",
    textColor: "#fff",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop&crop=face",
    role: "Creative Director"
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    color: "#4ecdc4",
    textColor: "#fff",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop&crop=face",
    role: "Renaissance Polymath"
  },
  {
    text: "Make it simple, but significant.",
    author: "Don Draper",
    color: "#a8e6cf",
    textColor: "#1a1a1a",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop&crop=face",
    role: "Advertising Executive"
  },
  {
    text: "Good design is good business.",
    author: "Thomas Watson Jr.",
    color: "#ff8b94",
    textColor: "#fff",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&fit=crop&crop=face",
    role: "IBM Chairman"
  },
  {
    text: "Styles come and go. Good design is a language, not a style.",
    author: "Massimo Vignelli",
    color: "#cfbaf0",
    textColor: "#1a1a1a",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&fit=crop&crop=face",
    role: "Graphic Designer"
  },
];

const rotations = [-12, 8, -6, 10, -8, 5];

export default function CardStack() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const cards = cardsRef.current;

    cards.forEach((card, i) => {
      gsap.set(card, {
        y: window.innerHeight,
        rotation: rotations[i],
        transformOrigin: "center center"
      });
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 8}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const totalCards = cards.length;
        const progressPerCard = 1 / totalCards;

        cards.forEach((card, index) => {
          const cardStart = index * progressPerCard;
          let cardProgress = (self.progress - cardStart) / progressPerCard;
          cardProgress = Math.min(Math.max(cardProgress, 0), 1);

          let yPos = window.innerHeight * (1 - cardProgress);
          let xPos = 0;

          if (cardProgress === 1 && index < totalCards - 1) {
            const remainingProgress = (self.progress - (cardStart + progressPerCard)) / (1 - (cardStart + progressPerCard));
            if (remainingProgress > 0) {
              const distanceMultiplier = 1 - (index / 15);
              xPos = -(window.innerWidth * 0.05 * distanceMultiplier * remainingProgress);
              yPos = -(window.innerHeight * 0.05 * distanceMultiplier * remainingProgress);
            }
          }

          gsap.set(card, { y: yPos, x: xPos });
        });
      }
    });

  }, { scope: sectionRef });

  return (
    <>
      <style>{`
        .stack-card {
          position: absolute;
          width: 380px;
          border-radius: 28px;
          padding: 0 2.5rem 2.5rem;
          /* Extra top padding so the avatar has room to sit above the content */
          padding-top: 4rem;
          box-shadow: 0 30px 80px rgba(0,0,0,0.25);
          will-change: transform;
        }

        /* ── Avatar ring sitting half-outside the card top ── */
        .avatar-wrapper {
          position: absolute;
          /* Pull it up so it straddles the top edge */
          top: -44px;
          left: 50%;
          transform: translateX(-50%);
          width: 88px;
          height: 88px;
          border-radius: 50%;
          padding: 3px;                    /* ring gap */
          background: rgba(255,255,255,0.9);
          box-shadow: 0 8px 30px rgba(0,0,0,0.18);
          z-index: 2;
        }

        .avatar-wrapper img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }

        /* Small online-style dot (decorative) */
        .avatar-dot {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #22c55e;
          border: 2px solid #fff;
        }

        .quote-content {
          position: relative;
          text-align: center;
          /* Extra top space for the avatar half that hangs above */
          padding-top: 1.5rem;
        }

        .quote-mark {
          font-size: 5rem;
          line-height: 0.6;
          opacity: 0.15;
          font-family: Georgia, serif;
          margin-bottom: 0.5rem;
          display: block;
        }

        .quote-text {
          font-size: 1.15rem;
          font-weight: 700;
          line-height: 1.55;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        /* Thin divider line */
        .quote-divider {
          width: 40px;
          height: 2px;
          border-radius: 99px;
          margin: 0 auto 1rem;
          opacity: 0.35;
          background: currentColor;
        }

        .quote-author {
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          margin-bottom: 0.2rem;
        }

        .quote-role {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.5;
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          height: '100vh',
          width: '100vw',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {quotations.map((quote, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="stack-card"
            style={{
              backgroundColor: quote.color,
              color: quote.textColor,
            }}
          >
            {/* ── Circular avatar straddling the top edge ── */}
            <div className="avatar-wrapper">
              <img src={quote.avatar} alt={quote.author} />
              <div className="avatar-dot" />
            </div>

            <div className="quote-content">
              {/* Large decorative quotation mark */}
              <span className="quote-mark" style={{ color: quote.textColor }}>"</span>

              <p className="quote-text" style={{ color: quote.textColor }}>
                {quote.text}
              </p>

              <div className="quote-divider" style={{ background: quote.textColor }} />

              <p className="quote-author" style={{ color: quote.textColor }}>
                {quote.author}
              </p>
              <p className="quote-role" style={{ color: quote.textColor }}>
                {quote.role}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}