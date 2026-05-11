import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ArticleHero from '@/components/blog/ArticleHero';
import ReadingProgress from '@/components/blog/ReadingProgress';
import SubscribeCTA from '@/components/blog/SubscribeCTA';
import ArticleCard from '@/components/blog/ArticleCard';
import { Footer } from '@/components/Footer';

export const revalidate = 3600;

async function getArticulo(slug: string) {
  const { data } = await supabase
    .from('articulos')
    .select('*')
    .eq('slug', slug)
    .eq('estado', 'publicado')
    .single();
  return data;
}

async function getRelacionados(currentId: string) {
  const { data } = await supabase
    .from('articulos')
    .select(
      'id, titular, slug, meta_description, imagen_url, categoria, fecha_publicacion'
    )
    .eq('estado', 'publicado')
    .neq('id', currentId)
    .order('fecha_publicacion', { ascending: false })
    .limit(3);
  return data || [];
}

function readingMinutesFromHtml(html: string | null | undefined): number {
  if (!html) return 1;
  const text = html.replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articulo = await getArticulo(slug);

  if (!articulo) notFound();

  const relacionados = await getRelacionados(articulo.id);
  const minutos = readingMinutesFromHtml(articulo.cuerpo);

  return (
    <main className="relative">
      <ReadingProgress />

      <ArticleHero
        titular={articulo.titular}
        categoria={articulo.categoria}
        fecha_publicacion={articulo.fecha_publicacion}
        imagen_url={articulo.imagen_url}
        readingMinutes={minutos}
      />

      <article className="px-6 mb-24">
        <div className="max-w-3xl mx-auto">
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: articulo.cuerpo || '' }}
          />
        </div>
      </article>

      <SubscribeCTA />

      {relacionados.length > 0 && (
        <section className="px-6 mb-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B80DF]" />
                <span
                  className="text-xs tracking-[0.25em] text-white/50 uppercase"
                  style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
                >
                  Sigue leyendo
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl text-white tracking-tight"
                style={{
                  fontFamily: 'Lexend, sans-serif',
                  fontWeight: 100,
                  letterSpacing: '-0.025em',
                }}
              >
                Otros artículos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relacionados.map((a, i) => (
                <ArticleCard key={a.id} articulo={a} index={i} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white/80 hover:border-[#00ffff]/50 hover:text-[#00ffff] transition-all duration-300 text-sm no-underline"
                style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
              >
                Ver todos los artículos
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
