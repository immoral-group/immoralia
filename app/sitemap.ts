import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl    = process.env.NEXT_PUBLIC_APP_URL || ''
  const verticalId = process.env.VERTICAL_ID || ''

  // Páginas estáticas configuradas en el panel
  const { data: paginas } = await supabase
    .from('paginas_seo')
    .select('path, updated_at')
    .eq('vertical_id', verticalId)
    .eq('noindex', false)

  // Artículos publicados y no excluidos de indexación
  const { data: articulos } = await supabase
    .from('articulos')
    .select('slug, fecha_publicacion, updated_at')
    .eq('vertical_id', verticalId)
    .eq('estado', 'publicado')
    .eq('noindex', false)
    .order('fecha_publicacion', { ascending: false, nullsFirst: false })
    .limit(1000)

  const paginasEntries: MetadataRoute.Sitemap = (paginas || []).map(p => ({
    url:             `${baseUrl}${p.path}`,
    lastModified:    new Date(p.updated_at),
    changeFrequency: 'monthly' as const,
    priority:        p.path === '/' ? 1.0 : 0.6,
  }))

  const articulosEntries: MetadataRoute.Sitemap = (articulos || []).map(a => ({
    url:             `${baseUrl}/blog/${a.slug}`,
    lastModified:    new Date(a.updated_at || a.fecha_publicacion),
    changeFrequency: 'weekly' as const,
    priority:        0.8,
  }))

  return [...paginasEntries, ...articulosEntries]
}
