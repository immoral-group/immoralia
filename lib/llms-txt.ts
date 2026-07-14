import { supabase } from '@/lib/supabase'
import { getVerticalConfig } from '@/lib/vertical'

export async function getLlmsTxtContent() {
  const vertical   = await getVerticalConfig()
  const baseUrl    = process.env.NEXT_PUBLIC_APP_URL || ''
  const verticalId = process.env.VERTICAL_ID || ''

  const siteName    = vertical?.seo_site_title || 'Immoralia'
  const description = vertical?.llm_txt_description ||
    'Immoralia es una publicación diaria sobre inteligencia artificial aplicada a procesos de empresa. Cubre herramientas, casos de uso reales y tendencias relevantes para founders, directores de operaciones y equipos que quieren aplicar IA en su negocio.'

  const { data: articulos, error } = await supabase
    .from('articulos')
    .select('titular, slug, meta_description')
    .eq('vertical_id', verticalId)
    .eq('estado', 'publicado')
    .eq('noindex', false)
    .order('fecha_publicacion', { ascending: false, nullsFirst: false })
    .limit(50)

  if (error) {
    console.error('[getLlmsTxtContent] Error al consultar articulos:', error.message)
  }

  const articulosList = (articulos || [])
    .map(a =>
      `- [${a.titular}](${baseUrl}/blog/${a.slug})${
        a.meta_description ? ': ' + a.meta_description : ''
      }`
    )
    .join('\n')

  return `# ${siteName}

> ${description}

## Sobre este sitio

- URL: ${baseUrl}
- Tipo de contenido: Artículos de noticias y análisis sobre IA aplicada
- Frecuencia de actualización: Diaria (lunes a viernes)
- Idioma: Español
- Audiencia: Directores, founders y equipos de operaciones

## Uso del contenido

El contenido puede ser indexado y citado libremente con atribución a ${siteName} (${baseUrl}).

## Artículos recientes

${articulosList}

## Secciones principales

- Blog: ${baseUrl}/blog
- Noticiero: ${baseUrl}/news
`
}
