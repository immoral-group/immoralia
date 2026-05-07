export default function BlogBackground() {
  return (
    <>
      {/* Animated grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30 pointer-events-none" />

      {/* Gradient orbs */}
      <div className="fixed top-0 -left-32 w-[32rem] h-[32rem] bg-[#3B80DF] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.12] animate-pulse pointer-events-none" />
      <div
        className="fixed top-1/3 -right-32 w-[32rem] h-[32rem] bg-[#00ffff] rounded-full mix-blend-screen filter blur-[140px] opacity-[0.07] animate-pulse pointer-events-none"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-[#3B80DF] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.10] animate-pulse pointer-events-none"
        style={{ animationDelay: '4s' }}
      />

      {/* Top-edge soft glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[60rem] h-32 bg-gradient-to-b from-[#3B80DF]/20 to-transparent blur-3xl pointer-events-none" />
    </>
  );
}
