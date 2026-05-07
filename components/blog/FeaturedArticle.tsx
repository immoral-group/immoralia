'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

export type FeaturedArticleProps = {
  titular: string;
  slug: string;
  meta_description: string | null;
  imagen_url: string | null;
  categoria: string | null;
  fecha_publicacion: string | null;
};

function formatDate(d: string | null) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function FeaturedArticle({ articulo }: { articulo: FeaturedArticleProps }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = articulo.imagen_url && !imgFailed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="px-6 mb-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00ffff]" />
            <span
              className="text-xs tracking-[0.25em] text-white/50 uppercase"
              style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
            >
              Lo último
            </span>
          </div>
        </div>

        <Link href={`/blog/${articulo.slug}`} className="block group no-underline">
          <article className="card-glow relative grid lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1638]/60 via-[#001156]/40 to-black border border-[#3B80DF]/20 hover:border-[#00ffff]/40 transition-colors duration-500">
            {/* Image side */}
            <div className="relative h-72 lg:h-[28rem] overflow-hidden bg-black">
              {showImage ? (
                <>
                  <img
                    src={articulo.imagen_url || ''}
                    alt={articulo.titular}
                    onError={() => setImgFailed(true)}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-black/80" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B80DF]/20 via-[#001156]/40 to-black flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-[#3B80DF]/30 blur-3xl" />
                </div>
              )}

              {articulo.categoria && (
                <div className="absolute top-6 left-6">
                  <span
                    className="inline-flex items-center px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#00ffff]/40 text-[#00ffff] text-xs tracking-wider uppercase"
                    style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
                  >
                    {articulo.categoria}
                  </span>
                </div>
              )}
            </div>

            {/* Content side */}
            <div className="relative p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <div
                  className="text-xs tracking-[0.2em] text-white/40 uppercase mb-5"
                  style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
                >
                  {formatDate(articulo.fecha_publicacion)} · Pieza destacada
                </div>

                <h2
                  className="text-3xl md:text-4xl lg:text-5xl text-white leading-[1.05] tracking-tight mb-6 group-hover:text-[#00ffff] transition-colors duration-500"
                  style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900, letterSpacing: '-0.025em' }}
                >
                  {articulo.titular}
                </h2>

                {articulo.meta_description && (
                  <p
                    className="text-base md:text-lg text-white/65 leading-relaxed mb-8"
                    style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
                  >
                    {articulo.meta_description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-3 text-[#00ffff]"
                  style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
                >
                  Leer artículo
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </span>

                <div className="hidden md:flex items-center gap-2 text-xs text-white/30 uppercase tracking-wider">
                  <span className="w-8 h-px bg-white/20" />
                  Destacado
                </div>
              </div>
            </div>
          </article>
        </Link>
      </div>
    </motion.div>
  );
}
