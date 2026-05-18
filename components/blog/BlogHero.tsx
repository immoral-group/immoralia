'use client';

import { motion } from 'motion/react';

export default function BlogHero({ count }: { count: number }) {
  return (
    <section className="relative pt-40 pb-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-8"
          style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 100 }}
        >
          <span className="text-black/90">Lo que importa,</span>
          <br />
          <span className="gradient-text font-black">cada día</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
        >
          Inteligencia artificial aplicada a procesos de empresa. Sin ruido. Sin
          hype. Solo lo que cambia algo en tu equipo esta semana.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-6 text-sm"
        >
          <div className="flex items-center gap-2">
            <span
              className="text-3xl text-black"
              style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
            >
              {count}
            </span>
            <span className="text-black/50" style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}>
              {count === 1 ? 'artículo publicado' : 'artículos publicados'}
            </span>
          </div>
          <div className="w-px h-6 bg-black/20" />
          <div className="flex items-center gap-2 text-black/50">
            <span className="w-2 h-2 rounded-full bg-[#0077cc] animate-pulse" />
            <span style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}>Lunes a viernes</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
