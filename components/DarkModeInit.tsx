'use client';

import { useEffect } from 'react';

export default function DarkModeInit() {
  useEffect(() => {
    const t = localStorage.getItem('theme');
    if (t === 'dark') document.documentElement.classList.add('dark');
    return () => {
      // remove .dark when leaving blog so LP routes don't inherit dark mode
      document.documentElement.classList.remove('dark');
    };
  }, []);
  return null;
}
