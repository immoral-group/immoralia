import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import { getVerticalConfig } from '@/lib/vertical'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl    = process.env.NEXT_PUBLIC_APP_URL || ''
  const verticalId = process.env.VERTICAL_ID || ''
  const vertical   = await getVerticalConfig()

  // Páginas estáticas configuradas en el panel.
  // paginas_seo.vertical_id referencia verticales_panel.id (vertical.id),
  // no process.env.VERTICAL_ID (que vive en el espacio de verticales.id).
  const { data: paginas, error: paginasError } = await supabase
    .from('paginas_seo')
    .select('path, updated_at')
    .eq('vertical_id', vertical?.id || '')
    .eq('noindex', false)

  if (paginasError) {
    console.error('[sitemap] Error al consultar paginas_seo:', paginasError.message)
  }

  // Artículos publicados y no excluidos de indexación
  const { data: articulos, error: articulosError } = await supabase
    .from('articulos')
    .select('slug, fecha_publicacion, created_at')
    .eq('vertical_id', verticalId)
    .eq('estado', 'publicado')
    .eq('noindex', false)
    .order('fecha_publicacion', { ascending: false, nullsFirst: false })
    .limit(1000)

  if (articulosError) {
    console.error('[sitemap] Error al consultar articulos:', articulosError.message)
  }

  const paginasEntries: MetadataRoute.Sitemap = (paginas || []).map(p => ({
    url:             `${baseUrl}${p.path}`,
    lastModified:    new Date(p.updated_at),
    changeFrequency: 'monthly' as const,
    priority:        p.path === '/' ? 1.0 : 0.6,
  }))

  const articulosEntries: MetadataRoute.Sitemap = (articulos || []).map(a => ({
    url:             `${baseUrl}/blog/${a.slug}`,
    lastModified:    new Date(a.fecha_publicacion || a.created_at),
    changeFrequency: 'weekly' as const,
    priority:        0.8,
  }))

  return [...paginasEntries, ...articulosEntries]
}
