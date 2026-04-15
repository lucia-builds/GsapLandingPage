import React, { useEffect, useRef } from 'react';

const sparkData = [
  [40, 55, 50, 70, 65, 80, 75, 95, 90, 98],
  [80, 120, 150, 200, 220, 300, 350, 420, 470, 500],
  [5, 10, 12, 18, 22, 30, 38, 44, 48, 50],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
];

const metrics = [
  {
    label: 'Client satisfaction',
    target: 98,
    suffix: '%',
    color: '#1D9E75',
    bgColor: '#E1F5EE',
    textColor: '#0F6E56',
    ringColors: ['#1D9E75', '#5DCAA5'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15 9H22L16.5 13.5L18.5 21L12 17L5.5 21L7.5 13.5L2 9H9L12 2Z" fill="#0F6E56" />
      </svg>
    ),
  },
  {
    label: 'Projects delivered',
    target: 500,
    suffix: '+',
    color: '#7F77DD',
    bgColor: '#EEEDFE',
    textColor: '#534AB7',
    ringColors: ['#7F77DD', '#AFA9EC'],
    ringReverse: true,
    ringDuration: '3s',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="11" width="4" height="10" rx="1" fill="#534AB7" />
        <rect x="10" y="7" width="4" height="14" rx="1" fill="#534AB7" />
        <rect x="17" y="3" width="4" height="18" rx="1" fill="#534AB7" />
      </svg>
    ),
  },
  {
    label: 'Users impacted',
    target: 50,
    suffix: 'M+',
    color: '#D85A30',
    bgColor: '#FAECE7',
    textColor: '#993C1D',
    ringColors: ['#D85A30', '#F0997B'],
    ringDuration: '5s',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3" fill="#993C1D" />
        <circle cx="15" cy="8" r="3" fill="#D85A30" />
        <path d="M3 20C3 17 5.5 15 9 15H15C18.5 15 21 17 21 20" stroke="#D85A30" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Years experience',
    target: 10,
    suffix: '+',
    color: '#378ADD',
    bgColor: '#E6F1FB',
    textColor: '#185FA5',
    ringColors: ['#378ADD', '#85B7EB'],
    ringReverse: true,
    ringDuration: '6s',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#185FA5" strokeWidth="1.5" />
        <path d="M12 7V12L15 15" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function drawSpark(canvas, data, color) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const pad = 4;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const xStep = (w - pad * 2) / (data.length - 1);
  const yScale = (v) => h - pad - ((v - min) / (max - min)) * (h - pad * 2);

  ctx.clearRect(0, 0, w, h);
  ctx.beginPath();
  ctx.moveTo(pad, yScale(data[0]));
  data.forEach((v, i) => {
    if (i > 0) ctx.lineTo(pad + i * xStep, yScale(v));
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const last = data.length - 1;
  ctx.beginPath();
  ctx.arc(pad + last * xStep, yScale(data[last]), 3, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function MetricCard({ metric, index, onReveal }) {
  const cardRef = useRef(null);
  const numRef = useRef(null);
  const canvasRef = useRef(null);
  const floatRef = useRef(null);
  const revealedRef = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !revealedRef.current) {
            revealedRef.current = true;
            observer.disconnect();

            const delay = index * 150;

            setTimeout(() => {
              card.style.transition =
                'opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0px)';

              setTimeout(() => {
                const numEl = numRef.current;
                if (numEl) {
                  const start = performance.now();
                  const duration = 1800;
                  const tick = (now) => {
                    const t = Math.min((now - start) / duration, 1);
                    const val = Math.ceil(easeOutExpo(t) * metric.target);
                    numEl.textContent = val + metric.suffix;
                    if (t < 1) requestAnimationFrame(tick);
                  };
                  requestAnimationFrame(tick);
                }

                drawSpark(canvasRef.current, sparkData[index], metric.color)
                setTimeout(() => {
                  const amp = 6 + Math.random() * 4;
                  const period = 2800 + Math.random() * 800;
                  const phase = Math.random() * Math.PI * 2;
                  let startTime = null;
                  const animate = (ts) => {
                    if (!startTime) startTime = ts;
                    const y = Math.sin(((ts - startTime) / period) * Math.PI * 2 + phase) * amp;
                    if (cardRef.current) {
                      cardRef.current.style.transform = `translateY(${y}px)`;
                    }
                    floatRef.current = requestAnimationFrame(animate);
                  };
                  floatRef.current = requestAnimationFrame(animate);
                }, 800);
              }, 600);
            }, delay);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
      if (floatRef.current) cancelAnimationFrame(floatRef.current);
    };
  }, [index, metric]);

  const ringStyle = {
    position: 'absolute',
    inset: '-4px',
    borderRadius: '50%',
    border: '1.5px solid transparent',
    borderTopColor: metric.ringColors[0],
    borderRightColor: metric.ringColors[1],
    animation: `spin ${metric.ringDuration || '4s'} linear infinite`,
    animationDirection: metric.ringReverse ? 'reverse' : 'normal',
  };

  return (
    <div
      ref={cardRef}
      style={{
        background: 'transparent',
        border: '0.5px solid var(--color-border-tertiary, rgba(0,0,0,0.12))',
        borderRadius: '12px',
        padding: '1.5rem 1rem',
        textAlign: 'center',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        opacity: 0,
        transform: 'translateY(40px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-secondary, rgba(0,0,0,0.25))';
        e.currentTarget.style.background = 'transparent';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-tertiary, rgba(0,0,0,0.12))';
        e.currentTarget.style.background = 'transparent';
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: '12px',
          top: '12px',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: metric.color,
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />

      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          margin: '0 auto 1rem',
          background: metric.bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div style={ringStyle} />
        {metric.icon}
      </div>

      <div
        ref={numRef}
        style={{
          fontSize: '32px',
          fontWeight: 500,
          lineHeight: 1,
          marginBottom: '8px',
          color: metric.textColor,
          position: 'relative',
          zIndex: 1,
        }}
      >
        0{metric.suffix}
      </div>
      <p
        style={{
          fontSize: '13px',
          color: 'var(--color-text-secondary, #666)',
          margin: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {metric.label}
      </p>
      <div style={{ marginTop: '14px', height: '32px', position: 'relative', zIndex: 1 }}>
        <canvas ref={canvasRef} width={160} height={32} style={{ width: '100%', height: '32px' }} />
      </div>
    </div>
  );
}

export default function ImpactMetrics() {
  return (
    <>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.5); }
        }
      `}</style>

      <div style={{ padding: '3rem 1rem 2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px',
          }}
        >
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}