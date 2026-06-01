'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { blogConfig } from '@/lib/blog-config';

export default function BlogNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isNews = pathname?.startsWith('/news');

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-[#00FFFF]/20 shadow-2xl shadow-[#00FFFF]/5'
          : 'bg-black/60 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href={blogConfig.nav.logo.href} className="flex items-center gap-3 group cursor-pointer">
            <ArrowLeft className="w-4 h-4 text-white/40 group-hover:text-[#00ffff] group-hover:-translate-x-1 transition-all duration-300" />
            {blogConfig.nav.logo.src ? (
              <img src={blogConfig.nav.logo.src} alt={blogConfig.nav.logo.alt} className="h-7 w-auto" />
            ) : (
              <span className="text-white font-bold text-lg">{blogConfig.nav.logo.alt}</span>
            )}
          </Link>

          {/* Blog / News switcher */}
          {blogConfig.nav.showBlogNewsToggle && (
            <div className="flex items-center p-1 rounded-full bg-white/5 border border-white/10">
              <Link
                href="/blog"
                className={`px-4 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase transition-all duration-300 no-underline ${
                  !isNews
                    ? 'bg-[#00ffff]/15 text-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.15)]'
                    : 'text-white/55 hover:text-white'
                }`}
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
              >
                Blog
              </Link>
              <Link
                href="/news"
                className={`px-4 py-1.5 rounded-full text-xs tracking-[0.18em] uppercase transition-all duration-300 no-underline ${
                  isNews
                    ? 'bg-[#00ffff]/15 text-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.15)]'
                    : 'text-white/55 hover:text-white'
                }`}
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
              >
                News
              </Link>
            </div>
          )}

          {blogConfig.nav.cta?.href && blogConfig.nav.cta?.text && (
            <>
              <a
                href={blogConfig.nav.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00ffff] hover:bg-[#00e6e6] text-black text-sm transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.25)] no-underline"
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
              >
                {blogConfig.nav.cta.text}
              </a>

              <a
                href={blogConfig.nav.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#00ffff] text-black"
                aria-label={blogConfig.nav.cta.text}
              >
                <Sparkles className="w-4 h-4" />
              </a>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
