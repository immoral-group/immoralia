'use client';

/**
 * Variant B — "Starfield"
 * Capa de "estrellas" pequeñas estáticas + parallax muy sutil + viñeta radial.
 * Sensación: editorial-tecnológica, espacial, profunda.
 */

import { useEffect, useRef } from 'react';

const STAR_COUNT = 90;

type Star = { x: number; y: number; size: number; opacity: number; twinkle: number };

function generateStars(seed = 1): Star[] {
  // deterministic pseudo-random for SSR consistency
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: STAR_COUNT }, () => ({
    x: rnd() * 100,
    y: rnd() * 100,
    size: 0.5 + rnd() * 1.6,
    opacity: 0.25 + rnd() * 0.55,
    twinkle: 2 + rnd() * 4,
  }));
}

export default function BlogBackgroundStarfield() {
  const layerRef = useRef<HTMLDivElement>(null);
  const stars = generateStars(7);

  useEffect(() => {
    const onScroll = () => {
      if (!layerRef.current) return;
      layerRef.current.style.transform = `translate3d(0, ${window.scrollY * -0.04}px, 0)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top deep blue glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[80rem] h-96 pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(ellipse 50% 100% at 50% 0%, rgba(59,128,223,0.45), transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Star layer with parallax */}
      <div
        ref={layerRef}
        className="fixed inset-0 pointer-events-none will-change-transform"
        aria-hidden
      >
        {stars.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,${star.opacity * 0.6})`,
              animation: `blogStarTwinkle ${star.twinkle}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      <style jsx>{`
        @keyframes blogStarTwinkle {
          0%, 100% { opacity: var(--o, 0.5); transform: scale(1); }
          50% { opacity: 0.15; transform: scale(0.85); }
        }
      `}</style>
    </>
  );
}
