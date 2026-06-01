import { supabase } from '@/lib/supabase';
import BlogHero from '@/components/blog/BlogHero';
import BlogList from '@/components/blog/BlogList';
import SubscribeCTA from '@/components/blog/SubscribeCTA';
import { Footer } from '@/components/Footer';
import { blogConfig } from '@/lib/blog-config';

export const revalidate = 3600;

async function getArticulos() {
  const { data } = await supabase
    .from('articulos')
    .select(
      'id, titular, slug, meta_description, imagen_url, categoria, fecha_publicacion'
    )
    .eq('estado', 'publicado')
    .eq('vertical_id', process.env.VERTICAL_ID!)
    .order('fecha_publicacion', { ascending: false, nullsFirst: false })
    .limit(90);
  return data || [];
}

export default async function BlogPage() {
  const articulos = await getArticulos();

  return (
    <main className="relative">
      <BlogHero count={articulos.length} />

      {articulos.length === 0 ? (
        <EmptyState />
      ) : (
        <BlogList articulos={articulos} />
      )}

      <SubscribeCTA />

      <Footer />
    </main>
  );
}

function EmptyState() {
  return (
    <section className="px-6 mb-32">
      <div className="max-w-3xl mx-auto">
        <div 
          className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-[#0a1638]/40 to-black p-12 md:p-20 text-center"
          style={{ borderColor: 'color-mix(in srgb, var(--blog-accent-blue) 20%, transparent)' }}
        >
          <div 
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: 'color-mix(in srgb, var(--blog-accent-blue) 15%, transparent)' }}
          />
          <div className="relative">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border mb-6"
              style={{ 
                backgroundColor: 'color-mix(in srgb, var(--blog-accent-blue) 10%, transparent)',
                borderColor: 'color-mix(in srgb, var(--blog-accent-blue) 30%, transparent)'
              }}
            >
              <span 
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--blog-accent-glow)' }}
              />
            </div>
            <h2
              className="text-3xl md:text-4xl text-white mb-4 tracking-tight"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}
            >
              {blogConfig.emptyState.title}
            </h2>
            <p
              className="text-white/55 max-w-md mx-auto"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
            >
              {blogConfig.emptyState.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
