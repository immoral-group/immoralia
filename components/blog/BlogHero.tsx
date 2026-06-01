'use client';

import { motion } from 'motion/react';
import { blogConfig } from '@/lib/blog-config';

export default function BlogHero({ count }: { count: number }) {
  return (
    <section className="relative pt-40 pb-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-8"
          style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 100 }}
        >
          <span className="text-black/90">{blogConfig.hero.title}</span>
          <br />
          <span className="gradient-text font-black">{blogConfig.hero.titleAlt}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg md:text-xl text-[#001156]/80 max-w-2xl mx-auto leading-relaxed whitespace-pre-line"
          style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
        >
          {blogConfig.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex justify-center text-sm"
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00FFFF] text-black font-bold tracking-wide shadow-sm"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            <span>{count} {count === 1 ? 'Artículo publicado' : 'Artículos publicados'}</span>
            <span className="opacity-60">•</span>
            <span>{blogConfig.hero.frequency}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
