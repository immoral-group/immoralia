import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ArticleHero from '@/components/blog/ArticleHero';
import ReadingProgress from '@/components/blog/ReadingProgress';
import SubscribeCTA from '@/components/blog/SubscribeCTA';
import ArticleCard from '@/components/blog/ArticleCard';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';
import { getVerticalConfig } from '@/lib/vertical';

export const revalidate = 3600;

async function getArticulo(slug: string) {
  const { data } = await supabase
    .from('articulos')
    .select('*')
    .eq('slug', slug)
    .eq('estado', 'publicado')
    .eq('vertical_id', process.env.VERTICAL_ID!)
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
    .eq('vertical_id', process.env.VERTICAL_ID!)
    .neq('id', currentId)
    .order('fecha_publicacion', { ascending: false, nullsFirst: false })
    .limit(3);
  return data || [];
}

function readingMinutesFromHtml(html: string | null | undefined): number {
  if (!html) return 1;
  const text = html.replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const [articulo, vertical] = await Promise.all([
    getArticulo(slug),
    getVerticalConfig(),
  ])

  if (!articulo) return { title: 'Artículo no encontrado' }

  const siteTitle  = vertical?.seo_site_title || 'Immoralia'
  const title      = articulo.seo_title || articulo.titular
  const desc       = articulo.meta_description
                     || articulo.cuerpo?.replace(/<[^>]*>/g, '').slice(0, 160)
                     || ''
  const ogImage    = articulo.og_image_url
                     || articulo.imagen_url
                     || vertical?.seo_default_og_image
                     || null
  const canonical  = articulo.canonical_url
                     || `${process.env.NEXT_PUBLIC_APP_URL}/blog/${articulo.slug}`
  const noindex    = articulo.noindex ?? false

  return {
    title:       `${title} | ${siteTitle}`,
    description: desc,
    robots: noindex
      ? { index: false, follow: false }
      : { index: true,  follow: true  },
    alternates: { canonical },
    openGraph: {
      title,
      description:   desc,
      url:           canonical,
      siteName:      siteTitle,
      images:        ogImage
        ? [{
            url:    ogImage,
            width:  1200,
            height: 630,
            alt:    articulo.imagen_alt_text || title,
          }]
        : [],
      type:          'article',
      publishedTime: articulo.fecha_publicacion ?? undefined,
      tags:          articulo.focus_keyword ? [articulo.focus_keyword] : [],
    },
    twitter: {
      card:        'summary_large_image',
      title,
      description: desc,
      images:      ogImage ? [ogImage] : [],
    },
  }
}

function ArticuloJsonLd({
  articulo,
  siteTitle,
  canonical,
}: {
  articulo: NonNullable<Awaited<ReturnType<typeof getArticulo>>>;
  siteTitle: string;
  canonical: string;
}) {
  const ogImage = articulo.og_image_url || articulo.imagen_url || null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: articulo.seo_title || articulo.titular,
    description: articulo.meta_description || undefined,
    image: ogImage ? [ogImage] : undefined,
    datePublished: articulo.fecha_publicacion || undefined,
    dateModified: articulo.fecha_publicacion || undefined,
    author: {
      '@type': 'Organization',
      name: siteTitle,
    },
    publisher: {
      '@type': 'Organization',
      name: siteTitle,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [articulo, vertical] = await Promise.all([
    getArticulo(slug),
    getVerticalConfig(),
  ]);

  if (!articulo) notFound();

  const relacionados = await getRelacionados(articulo.id);
  const minutos = readingMinutesFromHtml(articulo.cuerpo);
  const siteTitle = vertical?.seo_site_title || 'Immoralia';
  const canonical = articulo.canonical_url
    || `${process.env.NEXT_PUBLIC_APP_URL}/blog/${articulo.slug}`;

  return (
    <main className="relative">
      <ArticuloJsonLd articulo={articulo} siteTitle={siteTitle} canonical={canonical} />
      <ReadingProgress />

      <ArticleHero
        titular={articulo.titular}
        categoria={articulo.categoria}
        fecha_publicacion={articulo.fecha_publicacion}
        imagen_url={articulo.imagen_url}
        readingMinutes={minutos}
        imagen_alt_text={articulo.imagen_alt_text}
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
                <span className="w-1.5 h-1.5 rounded-full bg-[#001156]" />
                <span
                  className="text-xs tracking-[0.25em] text-black/50 uppercase"
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                >
                  Sigue leyendo
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl text-black tracking-tight"
                style={{
                  fontFamily: 'Roboto, sans-serif',
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-black/15 text-black/80 hover:border-[#001156]/50 hover:text-[#001156] transition-all duration-300 text-sm no-underline"
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
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
