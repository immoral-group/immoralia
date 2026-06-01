import Link from 'next/link';
import type { Articulo } from '@/lib/news-utils';
import CategoryBadge from './CategoryBadge';

/**
 * Numbered ranking sidebar — "Más leído" / "Top de la semana" style block.
 * Uses big monospace numerals and dense typography.
 */
export default function SideRanking({
  title,
  articulos,
}: {
  title: string;
  articulos: Articulo[];
}) {
  if (articulos.length === 0) return null;

  return (
    <aside className="border border-black/10 bg-white rounded-lg p-6">
      <header className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 bg-[#001156] inline-block" />
        <h3
          className="uppercase text-black"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '11px',
            letterSpacing: '0.24em',
            fontWeight: 700,
          }}
        >
          {title}
        </h3>
      </header>

      <ol className="space-y-5">
        {articulos.map((a, i) => (
          <li key={a.id}>
            <Link
              href={`/blog/${a.slug}`}
              className="group flex gap-4 no-underline"
            >
              <span
                className="shrink-0 text-[#001156]/30 group-hover:text-[#001156] transition-colors duration-300 leading-none"
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: '28px',
                  fontWeight: 700,
                  minWidth: '2.5rem',
                  paddingTop: '2px',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <CategoryBadge categoria={a.categoria} size="sm" />
                </div>
                <h4
                  className="text-black group-hover:text-[#001156] transition-colors duration-300 leading-tight"
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {a.titular}
                </h4>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
}
