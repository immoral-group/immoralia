'use client';

/**
 * Decorative vertical wordmark on the left edge — signature element borrowed
 * from The Verge's "pylon" design vocabulary, re-skinned for Immoralia.
 */
export default function VerticalPylon() {
  return (
    <div
      className="hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none"
      aria-hidden
    >
      <div
        style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          fontFamily: 'Lexend, sans-serif',
          fontWeight: 900,
          fontSize: '0.85rem',
          letterSpacing: '0.55em',
          color: 'rgba(255,255,255,0.20)',
        }}
        className="uppercase"
      >
        Immoralia <span style={{ color: '#00ffff', opacity: 0.5 }}>·</span>{' '}
        Noticiero <span style={{ color: '#00ffff', opacity: 0.5 }}>·</span>{' '}
        IA aplicada a procesos de empresa
      </div>
    </div>
  );
}
