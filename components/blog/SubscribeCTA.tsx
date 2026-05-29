'use client';

import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import SubscribeForm from '@/components/SubscribeForm';
import { blogConfig } from '@/lib/blog-config';

export default function SubscribeCTA({
  variant = 'large',
}: {
  variant?: 'large' | 'compact' | 'subtle';
}) {
  if (variant === 'subtle') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 mb-8 max-w-3xl mx-auto"
      >
        <div className="relative overflow-hidden rounded-2xl border border-[#3B80DF]/15 bg-white/70 backdrop-blur-md p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Animated subtle orb */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#3B80DF]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative text-left flex-1">
            <h4
              className="text-base text-black flex items-center gap-2 mb-1"
              style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 700 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0077cc]" />
              {blogConfig.cta.compact.title}
            </h4>
            <p
              className="text-xs text-black/60"
              style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
            >
              {blogConfig.cta.compact.description}
            </p>
          </div>

          <div className="relative w-full md:w-auto md:min-w-[320px] z-10">
            <SubscribeForm />
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl border border-[#3B80DF]/20 bg-gradient-to-br from-slate-50 via-blue-50/40 to-white shadow-sm p-8 md:p-10"
      >
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#3B80DF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <h3
            className="text-2xl md:text-3xl text-black mb-2 tracking-tight"
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}
          >
            {blogConfig.cta.compact.title}
          </h3>
          <p
            className="text-black/60 mb-6"
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
          >
            {blogConfig.cta.compact.description}
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
        <div className="relative overflow-hidden rounded-3xl border border-[#3B80DF]/25 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white shadow-sm p-10 md:p-16">
          {/* Animated orbs */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#3B80DF]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#0077cc]/8 rounded-full blur-3xl pointer-events-none animate-pulse"
            style={{ animationDelay: '2s' }}
          />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-50 [mask-image:radial-gradient(ellipse_50%_70%_at_50%_50%,#000_30%,transparent_80%)] pointer-events-none" />

          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0077cc]/10 border border-[#0077cc]/30 mb-6">
              <Mail className="w-3.5 h-3.5 text-[#0077cc]" />
              <span
                className="text-xs tracking-[0.2em] text-[#0077cc] uppercase"
                style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
              >
                {blogConfig.cta.badge}
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl text-black leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 100, letterSpacing: '-0.025em' }}
            >
              {blogConfig.cta.title}
              <br />
              <span className="gradient-text font-black">{blogConfig.cta.titleAlt}</span>
            </h2>

            <p
              className="text-lg text-black/65 mb-10 leading-relaxed max-w-xl"
              style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
            >
              {blogConfig.cta.description}
            </p>

            <SubscribeForm />

            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-black/40">
              {blogConfig.cta.stats.map((stat, i) => (
                <span key={i} className="flex items-center gap-4">
                  <span className="flex items-center gap-2">
                    {i === 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#0077cc]" />}
                    <span style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}>
                      {stat}
                    </span>
                  </span>
                  {i < blogConfig.cta.stats.length - 1 && (
                    <span className="w-px h-3 bg-black/15" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
