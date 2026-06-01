'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export type ArticleCardProps = {
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
    month: 'short',
  });
}

export default function ArticleCard({
  articulo,
  index,
}: {
  articulo: ArticleCardProps;
  index: number;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = articulo.imagen_url && !imgFailed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link href={`/blog/${articulo.slug}`} className="block h-full no-underline group">
        <article className="card-glow relative h-full flex flex-col overflow-hidden rounded-2xl bg-white border border-[#001156]/15 hover:border-[#00FFFF] shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#001156]/10 via-slate-100 to-slate-200">
            {showImage ? (
              <>
                <img
                  src={articulo.imagen_url || ''}
                  alt={articulo.titular}
                  onError={() => setImgFailed(true)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-[#001156]/20 blur-3xl" />
                <span
                  className="absolute text-black/10 text-6xl"
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
                >
                  ia
                </span>
              </div>
            )}

            {articulo.categoria && (
              <div className="absolute top-4 left-4">
                <span
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/10 text-black/80 text-[10px] tracking-[0.18em] uppercase"
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                >
                  {articulo.categoria}
                </span>
              </div>
            )}

            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
              <ArrowUpRight className="w-4 h-4 text-[#001156]" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <div
              className="text-[11px] tracking-[0.18em] text-black/35 uppercase mb-3"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
            >
              {formatDate(articulo.fecha_publicacion)}
            </div>

            <h3
              className="text-xl md:text-[1.35rem] text-black leading-snug tracking-tight mb-3 group-hover:text-[#001156] transition-colors duration-300"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              {articulo.titular}
            </h3>

            {articulo.meta_description && (
              <p
                className="text-sm text-black/55 leading-relaxed line-clamp-3 flex-1"
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
              >
                {articulo.meta_description}
              </p>
            )}

            <div className="mt-5 pt-5 border-t border-black/8 flex items-center justify-between">
              <span
                className="text-xs text-black/40 group-hover:text-[#001156] transition-colors duration-300"
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
              >
                Leer artículo
              </span>
              <div className="w-7 h-px bg-black/10 group-hover:bg-[#001156]/60 group-hover:w-12 transition-all duration-500" />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
