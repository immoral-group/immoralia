'use client';

import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import SubscribeForm from '@/components/SubscribeForm';

export default function SubscribeCTA({
  variant = 'large',
}: {
  variant?: 'large' | 'compact';
}) {
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl border border-[#3B80DF]/20 bg-gradient-to-br from-[#0a1638]/60 via-black to-black p-8 md:p-10"
      >
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#3B80DF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <h3
            className="text-2xl md:text-3xl text-white mb-2 tracking-tight"
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}
          >
            Una noticia al día. La que importa.
          </h3>
          <p
            className="text-white/60 mb-6"
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
          >
            Sin ruido. Sin hype. Cancela cuando quieras.
          </p>
          <SubscribeForm />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="px-6 mb-32"
    >
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-[#3B80DF]/25 bg-gradient-to-br from-[#0a1638]/70 via-[#001156]/30 to-black p-10 md:p-16">
          {/* Animated orbs */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#3B80DF]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#00ffff]/10 rounded-full blur-3xl pointer-events-none animate-pulse"
            style={{ animationDelay: '2s' }}
          />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 [mask-image:radial-gradient(ellipse_50%_70%_at_50%_50%,#000_30%,transparent_80%)] pointer-events-none" />

          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ffff]/10 border border-[#00ffff]/30 mb-6">
              <Mail className="w-3.5 h-3.5 text-[#00ffff]" />
              <span
                className="text-xs tracking-[0.2em] text-[#00ffff] uppercase"
                style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
              >
                Newsletter diaria
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 100, letterSpacing: '-0.025em' }}
            >
              Una noticia al día.
              <br />
              <span className="gradient-text font-black">La que importa.</span>
            </h2>

            <p
              className="text-lg text-white/65 mb-10 leading-relaxed max-w-xl"
              style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
            >
              Sin ruido. Sin hype. Solo lo que cambia algo en tu empresa esta
              semana. Cancela cuando quieras.
            </p>

            <SubscribeForm />

            <div className="mt-8 flex items-center gap-4 text-xs text-white/40">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ffff]" />
                <span style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}>
                  Lunes a viernes
                </span>
              </span>
              <span className="w-px h-3 bg-white/15" />
              <span style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}>
                3 minutos de lectura
              </span>
              <span className="w-px h-3 bg-white/15" />
              <span style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}>
                Sin spam
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
