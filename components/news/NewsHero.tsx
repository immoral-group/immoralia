'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Articulo } from '@/lib/news-utils';
import CategoryBadge from './CategoryBadge';
import Timestamp from './Timestamp';

export default function NewsHero({
  lead,
  secondaries,
}: {
  lead: Articulo;
  secondaries: Articulo[];
}) {
  return (
    <section className="border-b border-black/8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Lead story */}
        <Link
          href={`/blog/${lead.slug}`}
          className="lg:col-span-7 group no-underline border-b lg:border-b-0 lg:border-r border-black/8"
        >
          <LeadCard articulo={lead} />
        </Link>

        {/* Secondary stack */}
        <div className="lg:col-span-5 flex flex-col">
          {secondaries.slice(0, 3).map((a, i) => (
            <Link
              key={a.id}
              href={`/blog/${a.slug}`}
              className={`group no-underline ${
                i < secondaries.length - 1 ? 'border-b border-black/8' : ''
              }`}
            >
              <SecondaryCard articulo={a} index={i + 1} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadCard({ articulo }: { articulo: Articulo }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = articulo.imagen_url && !imgFailed;

  return (
    <article className="relative h-full min-h-[28rem] lg:min-h-[36rem] overflow-hidden bg-slate-200">
      {showImage ? (
        <img
          src={articulo.imagen_url || ''}
          alt={articulo.titular}
          onError={() => setImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] opacity-90 group-hover:opacity-100"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#001156]/20 via-blue-100/60 to-slate-200" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

      <div className="relative h-full flex flex-col justify-end p-8 md:p-12 lg:p-14">
        <div className="flex items-center gap-4 mb-6">
          <CategoryBadge categoria={articulo.categoria} size="md" />
          <Timestamp
            date={articulo.fecha_publicacion}
            className="text-white/50"
          />
        </div>

        <h1
          className="text-white group-hover:text-[#00ffff] transition-colors duration-300"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 4vw, 3.75rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.035em',
            maxWidth: '20ch',
          }}
        >
          {articulo.titular}
        </h1>

        {articulo.meta_description && (
          <p
            className="mt-6 text-white/70 max-w-2xl text-base md:text-lg leading-relaxed"
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
          >
            {articulo.meta_description}
          </p>
        )}

        <div
          className="mt-8 flex items-center gap-3 text-[#00ffff] uppercase"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '11px',
            letterSpacing: '0.22em',
          }}
        >
          <span>Leer pieza completa</span>
          <span className="block w-8 h-px bg-[#00ffff] group-hover:w-16 transition-all duration-500" />
        </div>
      </div>
    </article>
  );
}

function SecondaryCard({
  articulo,
  index,
}: {
  articulo: Articulo;
  index: number;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = articulo.imagen_url && !imgFailed;

  return (
    <article className="relative flex gap-5 p-5 md:p-7 hover:bg-black/[0.02] transition-colors duration-300 h-full">
      <div
        className="shrink-0 text-black/15 group-hover:text-[#001156]/40 transition-colors leading-none"
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: '32px',
          fontWeight: 700,
          minWidth: '2.5rem',
        }}
      >
        {String(index).padStart(2, '0')}
      </div>

      <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 overflow-hidden bg-gradient-to-br from-[#001156]/15 to-slate-200">
        {showImage ? (
          <img
            src={articulo.imagen_url || ''}
            alt={articulo.titular}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#001156]/20 to-slate-200" />
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <CategoryBadge categoria={articulo.categoria} size="sm" />
          <Timestamp
            date={articulo.fecha_publicacion}
            className="text-black/40"
          />
        </div>

        <h2
          className="text-black group-hover:text-[#001156] transition-colors duration-300 leading-snug"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
            letterSpacing: '-0.015em',
          }}
        >
          {articulo.titular}
        </h2>
      </div>
    </article>
  );
}
