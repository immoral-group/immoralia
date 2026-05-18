'use client';

import Link from 'next/link';
import type { Articulo } from '@/lib/news-utils';
import { formatNewsTimestamp } from '@/lib/news-utils';

export default function NewsTicker({ articulos }: { articulos: Articulo[] }) {
  const items = articulos.slice(0, 8);
  if (items.length === 0) return null;

  return (
    <div className="border-y border-black/8 bg-white/60 backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto flex items-stretch">
        <div
          className="shrink-0 flex items-center gap-2 px-5 py-3 bg-[#0077cc] text-white"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '11px',
            letterSpacing: '0.22em',
            fontWeight: 700,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          ÚLTIMA HORA
        </div>

        <div className="flex-1 overflow-hidden relative">
          <div className="flex items-center gap-8 whitespace-nowrap py-3 px-5 ticker-track">
            {[...items, ...items].map((a, i) => (
              <Link
                key={`${a.id}-${i}`}
                href={`/blog/${a.slug}`}
                className="inline-flex items-center gap-3 group no-underline shrink-0"
              >
                <span
                  className="text-black/40 uppercase"
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: '10px',
                    letterSpacing: '0.18em',
                  }}
                >
                  {formatNewsTimestamp(a.fecha_publicacion)}
                </span>
                <span className="w-1 h-1 rounded-full bg-black/15" />
                <span
                  className="text-black/80 group-hover:text-[#0077cc] transition-colors text-sm"
                  style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 400 }}
                >
                  {a.titular}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .ticker-track {
          animation: ticker 60s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
