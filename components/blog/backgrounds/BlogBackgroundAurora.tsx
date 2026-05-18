/**
 * Variant A — "Aurora editorial"
 * Una sola gran aurora superior + grid de puntos sutil + línea de scan estática.
 * Sensación: sofisticada, calmada, premium magazine.
 */
export default function BlogBackgroundAurora() {
  return (
    <>
      {/* Soft aurora at top */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[100rem] h-[40rem] pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(59,128,223,0.25) 0%, rgba(0,17,86,0.10) 35%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(17,17,17,0.35) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 90%)',
        }}
      />

      {/* Hairline accent below nav */}
      <div className="fixed top-[68px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B80DF]/30 to-transparent pointer-events-none" />

      {/* Bottom soft fade so reading area doesn't feel infinite */}
      <div className="fixed bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#f8f8f6] to-transparent pointer-events-none" />
    </>
  );
}
