/**
 * Variant C — "Editorial puro"
 * Negro profundo + grano SVG + un único acento azul muy lejano + grid muy tenue.
 * Sensación: revista digital seria, máxima legibilidad, casi sin movimiento.
 */
export default function BlogBackgroundEditorial() {
  return (
    <>
      {/* Deep dark gradient base */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, #050507 0%, #000000 50%, #030308 100%)',
        }}
      />

      {/* Distant blue glow at top center */}
      <div
        className="fixed top-[-10rem] left-1/2 -translate-x-1/2 w-[70rem] h-[40rem] pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 50% 100% at 50% 50%, rgba(59,128,223,0.18), transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Faint grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(59,128,223,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,128,223,0.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage:
            'radial-gradient(ellipse 90% 80% at 50% 0%, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 80% at 50% 0%, black 30%, transparent 80%)',
        }}
      />

      {/* SVG grain noise */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-overlay"
        aria-hidden
      >
        <filter id="blog-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#blog-noise)" />
      </svg>

      {/* Hairline below nav */}
      <div className="fixed top-[68px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B80DF]/40 to-transparent pointer-events-none" />
    </>
  );
}
