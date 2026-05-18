'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Articulo } from '@/lib/news-utils';
import CategoryBadge from './CategoryBadge';
import Timestamp from './Timestamp';

/**
 * Magazine-style card. Sharp edges, no padding container, typography-driven.
 * Variants:
 *   - 'tall'    : image on top, text below — for big slots
 *   - 'wide'    : image left, text right — horizontal
 *   - 'minimal' : no image, just text — for dense column lists
 */
export default function NewsCard({
  articulo,
  variant = 'tall',
}: {
  articulo: Articulo;
  variant?: 'tall' | 'wide' | 'minimal';
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = articulo.imagen_url && !imgFailed;

  if (variant === 'minimal') {
    return (
      <Link
        href={`/blog/${articulo.slug}`}
        className="group no-underline block h-full"
      >
        <article className="h-full bg-white/70 backdrop-blur-sm border border-[#3B80DF]/12 rounded-2xl p-5 hover:bg-white hover:border-[#0077cc]/35 hover:shadow-md hover:shadow-blue-900/5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <CategoryBadge categoria={articulo.categoria} size="sm" />
              <Timestamp
                date={articulo.fecha_publicacion}
                className="text-black/40"
              />
            </div>
            <h3
              className="text-black group-hover:text-[#0077cc] transition-colors duration-300 leading-snug"
              style={{
                fontFamily: 'Lexend, sans-serif',
                fontWeight: 700,
                fontSize: '1.05rem',
                letterSpacing: '-0.01em',
              }}
            >
              {articulo.titular}
            </h3>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'wide') {
    return (
      <Link
        href={`/blog/${articulo.slug}`}
        className="group no-underline block"
      >
        <article className="grid grid-cols-[40%_1fr] gap-5 p-5 hover:bg-white/[0.02] transition-colors h-full">
          <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#3B80DF]/10 to-slate-200">
            {showImage ? (
              <img
                src={articulo.imagen_url || ''}
                alt={articulo.titular}
                onError={() => setImgFailed(true)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#3B80DF]/15 to-slate-200" />
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <CategoryBadge categoria={articulo.categoria} size="sm" />
            </div>
            <h3
              className="text-black group-hover:text-[#0077cc] transition-colors duration-300 leading-snug"
              style={{
                fontFamily: 'Lexend, sans-serif',
                fontWeight: 700,
                fontSize: '1.05rem',
                letterSpacing: '-0.015em',
              }}
            >
              {articulo.titular}
            </h3>
            <Timestamp
              date={articulo.fecha_publicacion}
              className="text-black/35 mt-auto pt-3"
            />
          </div>
        </article>
      </Link>
    );
  }

  // tall (default)
  return (
    <Link
      href={`/blog/${articulo.slug}`}
      className="group no-underline block h-full"
    >
      <article className="flex flex-col h-full">
        <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#3B80DF]/10 to-slate-200 mb-4">
          {showImage ? (
            <img
              src={articulo.imagen_url || ''}
              alt={articulo.titular}
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#3B80DF]/15 to-slate-200" />
          )}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <CategoryBadge categoria={articulo.categoria} size="sm" />
          <Timestamp
            date={articulo.fecha_publicacion}
            className="text-black/40"
          />
        </div>

        <h3
          className="text-black group-hover:text-[#0077cc] transition-colors duration-300 leading-snug"
          style={{
            fontFamily: 'Lexend, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)',
            letterSpacing: '-0.02em',
          }}
        >
          {articulo.titular}
        </h3>

        {articulo.meta_description && (
          <p
            className="mt-3 text-black/55 text-sm leading-relaxed line-clamp-2"
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
          >
            {articulo.meta_description}
          </p>
        )}
      </article>
    </Link>
  );
}
