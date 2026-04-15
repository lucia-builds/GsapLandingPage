import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const quotations = [
  {
    text: "Design is intelligence made visible.",
    author: "Alina Wheeler",
    color: "linear-gradient(135deg, #fce83a 0%, #fdbb2d 100%)",
    textColor: "#1a1a1a",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop&crop=face",
    role: "Brand Strategist",
    rating: 5,
    review: "Exceptional design work!",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&h=250&fit=crop"
  },
  {
    text: "Everything is designed. Few things are designed well.",
    author: "Brian Reed",
    color: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
    textColor: "#fff",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop&crop=face",
    role: "Creative Director",
    rating: 5,
    review: "Outstanding results!",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&h=250&fit=crop"
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    color: "linear-gradient(135deg, #4ecdc4 0%, #44b3aa 100%)",
    textColor: "#fff",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop&crop=face",
    role: "Renaissance Polymath",
    rating: 5,
    review: "Incredible execution!",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&h=250&fit=crop"
  },
  {
    text: "Make it simple, but significant.",
    author: "Don Draper",
    color: "linear-gradient(135deg, #a8e6cf 0%, #96d5b8 100%)",
    textColor: "#1a1a1a",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop&crop=face",
    role: "Advertising Executive",
    rating: 4,
    review: "Very impressed!",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&h=250&fit=crop"
  },
  {
    text: "Good design is good business.",
    author: "Thomas Watson Jr.",
    color: "linear-gradient(135deg, #ff8b94 0%, #ff7a82 100%)",
    textColor: "#fff",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&fit=crop&crop=face",
    role: "IBM Chairman",
    rating: 5,
    review: "Perfect work!",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&h=250&fit=crop"
  },
  {
    text: "Styles come and go. Good design is a language, not a style.",
    author: "Massimo Vignelli",
    color: "linear-gradient(135deg, #cfbaf0 0%, #b89fdb 100%)",
    textColor: "#1a1a1a",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&fit=crop&crop=face",
    role: "Graphic Designer",
    rating: 5,
    review: "Masterpiece!",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&h=250&fit=crop"
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
          width: 420px;
          height: auto;
          border-radius: 32px;
          padding: 0 3rem 3.5rem;
          padding-top: 7rem;
          box-shadow: 0 30px 80px rgba(0,0,0,0.35);
          will-change: transform;
          backdrop-filter: blur(12px);
          border: 2px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: visible;
          display: flex;
          flex-direction: column;
        }
        .stack-card::before {
          content: '';
          position: absolute;
          width: 300%;
          height: 300%;
          top: -50%;
          left: -50%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: shimmerStack 3s infinite;
          pointer-events: none;
        }

        .stack-card::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.05) 100%);
          pointer-events: none;
        }

        @keyframes shimmerStack {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(10px) translateY(10px); }
          100% { transform: translateX(0) translateY(0); }
        }

        .stack-card:hover {
          transform: translateY(-20px) scale(1.02);
          box-shadow: 0 40px 120px rgba(0,0,0,0.4);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .avatar-wrapper {
          position: absolute;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 110px;
          height: 110px;
          border-radius: 50%;
          padding: 4px;
          background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85));
          box-shadow: 0 15px 50px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.5);
          z-index: 3;
          border: 3px solid rgba(255,255,255,0.6);
          transition: all 0.4s ease;
        }

        .stack-card:hover .avatar-wrapper {
          box-shadow: 0 20px 70px rgba(0,0,0,0.4), inset 0 0 30px rgba(255,255,255,0.7);
          transform: translateX(-50%) scale(1.08);
        }

        .avatar-wrapper img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          filter: brightness(1.05) contrast(1.1);
        }

     
        .avatar-dot {
          position: absolute;
          bottom: 3px;
          right: 3px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          border: 3px solid rgba(255,255,255,0.95);
          box-shadow: 0 0 12px rgba(34, 197, 94, 0.6);
        }

        
        .quote-content {
          position: relative;
          text-align: center;
          padding-top: 2rem;
          z-index: 2;
        }


        .quote-mark {
          font-size: 6rem;
          line-height: 0.8;
          opacity: 0.15;
          font-family: 'Georgia', serif;
          margin-bottom: 1rem;
          display: block;
          font-weight: 900;
        }

        /* ── Premium quote text ── */
        .quote-text {
          font-size: 1.3rem;
          font-weight: 700;
          line-height: 1.7;
          margin-bottom: 2rem;
          font-style: italic;
          letter-spacing: 0.3px;
          transition: all 0.3s ease;
        }

        .stack-card:hover .quote-text {
          transform: scale(1.02);
          opacity: 1;
        }
        .quote-divider {
          width: 50px;
          height: 3px;
          border-radius: 99px;
          margin: 0 auto 1.5rem;
          opacity: 0.4;
          background: currentColor;
          transition: all 0.4s ease;
          box-shadow: 0 0 12px rgba(0,0,0,0.15);
        }

        .stack-card:hover .quote-divider {
          width: 70px;
          opacity: 0.7;
          box-shadow: 0 0 20px rgba(0,0,0,0.25);
        }
        .quote-author {
          font-size: 1.1rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          margin-bottom: 0.3rem;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .stack-card:hover .quote-author {
          letter-spacing: 0.15em;
        }
        .quote-role {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.55;
          margin-top: 0.5rem;
          transition: all 0.3s ease;
        }

        .stack-card:hover .quote-role {
          opacity: 0.75;
          letter-spacing: 0.2em;
        }
        .card-image-container {
          width: 100%;
          height: 160px;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          position: relative;
          z-index: 2;
          transition: all 0.4s ease;
        }

        .stack-card:hover .card-image-container {
          box-shadow: 0 15px 50px rgba(0,0,0,0.3);
          transform: scale(1.05);
        }

        .card-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(1.1) contrast(1.05);
          transition: all 0.4s ease;
        }

        .stack-card:hover .card-image-container img {
          filter: brightness(1.2) contrast(1.15);
        }
        .card-rating {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.3rem;
          margin-bottom: 0.8rem;
          z-index: 2;
          position: relative;
        }

        .star {
          font-size: 1.3rem;
          color: #ffd700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
          filter: drop-shadow(0 0 3px rgba(255, 215, 0, 0.5));
          transition: all 0.3s ease;
        }

        .stack-card:hover .star {
          transform: rotate(15deg) scale(1.1);
        }

        .star-empty {
          color: rgba(255, 215, 0, 0.3);
        }

        .card-review {
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          line-height: 1.5;
          margin-bottom: 1rem;
          opacity: 0.95;
          position: relative;
          z-index: 2;
          font-style: italic;
        }
        @media (max-width: 768px) {
          .stack-card {
            width: 320px;
            padding: 0 2rem 2.5rem;
            padding-top: 6rem;
            border-radius: 24px;
          }

          .avatar-wrapper {
            width: 90px;
            height: 90px;
            top: 15px;
          }

          .card-image-container {
            height: 130px;
            margin-bottom: 1rem;
            border-radius: 16px;
          }

          .card-rating {
            margin-bottom: 0.6rem;
          }

          .star {
            font-size: 1.1rem;
          }

          .card-review {
            font-size: 0.85rem;
            margin-bottom: 0.8rem;
          }

          .quote-mark {
            font-size: 4rem;
          }

          .quote-text {
            font-size: 1.1rem;
            line-height: 1.6;
          }

          .quote-author {
            font-size: 0.95rem;
          }

          .quote-role {
            font-size: 0.7rem;
          }
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
              background: quote.color,
              color: quote.textColor,
            }}
          >
            <div className="avatar-wrapper">
              <img src={quote.avatar} alt={quote.author} />
              <div className="avatar-dot" />
            </div>

            <div className="card-image-container">
              <img src={quote.image} alt="project" />
            </div>
            <div className="card-rating">
              {[...Array(5)].map((_, starIndex) => (
                <span
                  key={starIndex}
                  className={`star ${starIndex >= quote.rating ? 'star-empty' : ''}`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="card-review" style={{ color: quote.textColor }}>
              "{quote.review}"
            </p>

            <div className="quote-content">
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