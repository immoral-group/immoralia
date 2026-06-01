import { supabase } from '@/lib/supabase';
import NewsTicker from '@/components/news/NewsTicker';
import NewsHero from '@/components/news/NewsHero';
import NewsCard from '@/components/news/NewsCard';
import SideRanking from '@/components/news/SideRanking';
import SectionLabel from '@/components/news/SectionLabel';
import SubscribeCTA from '@/components/blog/SubscribeCTA';
import { Footer } from '@/components/Footer';
import { formatNewsLongDate } from '@/lib/news-utils';

export const revalidate = 3600;

async function getArticulos() {
  const { data } = await supabase
    .from('articulos')
    .select(
      'id, titular, slug, meta_description, imagen_url, categoria, fecha_publicacion'
    )
    .eq('estado', 'publicado')
    .order('fecha_publicacion', { ascending: false, nullsFirst: false });
  return data || [];
}

export default async function NewsPage() {
  const articulos = await getArticulos();

  if (articulos.length === 0) {
    return (
      <main className="relative pt-32">
        <EmptyMasthead />
        <div className="px-6 mb-32">
          <div className="max-w-3xl mx-auto text-center py-24">
            <p
              className="text-black/45 max-w-md mx-auto"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
            >
              Estamos preparando la primera tirada del noticiero.
            </p>
          </div>
        </div>
        <SubscribeCTA />
        <Footer />
      </main>
    );
  }

  const [lead, s1, s2, s3, ...rest] = articulos;
  const secondaries = [s1, s2, s3].filter(Boolean);
  const big = rest.slice(0, 2);
  const grid = rest.slice(2, 8);
  const more = rest.slice(8);
  const ranking = articulos.slice(0, 5);

  return (
    <main className="relative pt-[68px]">
      <Masthead totalCount={articulos.length} />

      <NewsTicker articulos={articulos} />

      <NewsHero lead={lead} secondaries={secondaries} />

      {/* Big two-up + ranking sidebar */}
      <section className="border-b border-black/8">
        <div className="max-w-[1400px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <SectionLabel label="Análisis · Producto" accent="#001156" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {big.map((a) => (
                <NewsCard key={a.id} articulo={a} variant="tall" />
              ))}
            </div>

            {grid.length > 0 && (
              <div className="mt-16">
                <SectionLabel
                  label="Más historias"
                  count={grid.length}
                  accent="#001156"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {grid.map((a) => (
                    <NewsCard key={a.id} articulo={a} variant="tall" />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-10">
            <SideRanking title="Top de la semana" articulos={ranking} />

            {/* Newsletter mini-CTA */}
            <aside
              className="border border-[#001156]/20 p-6 rounded-lg bg-[#001156]/5"
              style={{  }}
            >
              <div
                className="uppercase text-[#001156] mb-3"
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: '11px',
                  letterSpacing: '0.24em',
                  fontWeight: 700,
                }}
              >
                Newsletter
              </div>
              <h3
                className="text-black mb-3 leading-snug"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 900,
                  fontSize: '1.5rem',
                  letterSpacing: '-0.02em',
                }}
              >
                Una noticia al día. La que importa.
              </h3>
              <p
                className="text-black/55 text-sm mb-5 leading-relaxed"
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
              >
                Sin ruido. Sin hype. Cancela cuando quieras.
              </p>
              <a
                href="#suscribirse"
                className="inline-flex items-center gap-2 text-[#001156] text-sm group no-underline"
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500 }}
              >
                Suscribirme
                <span className="block w-6 h-px bg-[#001156] group-hover:w-12 transition-all duration-500" />
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* Dense list of older pieces */}
      {more.length > 0 && (
        <section className="border-b border-black/8">
          <div className="max-w-[1400px] mx-auto px-6 py-16">
            <SectionLabel
              label="Archivo"
              count={more.length}
              accent="#A78BFA"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {more.map((a) => (
                <NewsCard key={a.id} articulo={a} variant="minimal" />
              ))}
            </div>
          </div>
        </section>
      )}

      <div id="suscribirse" />
      <SubscribeCTA />

      <Footer />
    </main>
  );
}

function Masthead({ totalCount }: { totalCount: number }) {
  const today = formatNewsLongDate(new Date().toISOString());
  return (
    <div className="border-b border-black/8">
      <div className="max-w-[1400px] mx-auto px-6 py-10 md:py-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div
            className="uppercase text-black/40 mb-3 flex items-center gap-3"
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: '11px',
              letterSpacing: '0.26em',
              fontWeight: 500,
            }}
          >
            <span>EDICIÓN · {today.toUpperCase()}</span>
            <span className="w-1 h-1 rounded-full bg-black/30" />
            <span>{totalCount} PIEZAS PUBLICADAS</span>
          </div>
          <h1
            className="text-black tracking-tight"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.05em',
            }}
          >
            <span>immoralia </span>
            <span style={{ color: '#001156' }}>News</span>
          </h1>
          <p
            className="mt-4 text-black/55 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
          >
            IA aplicada a procesos de empresa. Sin ruido. Sin hype. Solo lo que
            cambia algo en tu equipo esta semana.
          </p>
        </div>

        <div className="hidden md:flex flex-col items-end gap-2 text-right">
          <div
            className="uppercase text-black/40"
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: '10px',
              letterSpacing: '0.24em',
            }}
          >
            Por Brian · Editorial Immoralia
          </div>
          <div className="flex items-center gap-2 text-black/35">
            <span className="w-1.5 h-1.5 bg-[#001156] inline-block animate-pulse" />
            <span
              className="uppercase"
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: '10px',
                letterSpacing: '0.24em',
              }}
            >
              En directo · L–V
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyMasthead() {
  return (
    <div className="border-b border-black/8 px-6 py-16">
      <div className="max-w-[1400px] mx-auto">
        <h1
          className="text-black"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
          }}
        >
          immoralia News <span style={{ color: '#001156' }}>·</span> Próximamente
        </h1>
      </div>
    </div>
  );
}
