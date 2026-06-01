'use client';

import { motion } from 'motion/react';
import { blogConfig } from '@/lib/blog-config';

export default function BlogHero({ count }: { count: number }) {
  return (
    <section className="relative pt-40 pb-16 px-6">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block border border-[#00FFFF] px-10 py-6 max-w-[610px] w-full mx-auto mb-8"
        >
          <h1
            className="text-4xl md:text-[60px] tracking-tight leading-[1.1] text-center text-[#001156]"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            <span className="font-bold">{blogConfig.hero.title}</span>
            <br />
            <span className="font-black">{blogConfig.hero.titleAlt}</span>
          </h1>
        </motion.div>

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
