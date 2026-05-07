'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return setProgress(0);
      setProgress(Math.min(100, Math.max(0, (window.scrollY / total) * 100)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[2px] z-[60] pointer-events-none"
      style={{
        width: `${progress}%`,
        background: 'linear-gradient(to right, #3B80DF, #00ffff)',
        boxShadow: '0 0 12px rgba(0, 255, 255, 0.6)',
        transition: 'width 0.05s linear',
      }}
    />
  );
}
