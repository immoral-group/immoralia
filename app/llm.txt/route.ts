import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getVerticalConfig } from '@/lib/vertical'

export const revalidate = 3600

export async function GET() {
  const vertical   = await getVerticalConfig()
  const baseUrl    = process.env.NEXT_PUBLIC_APP_URL || ''
  const verticalId = process.env.VERTICAL_ID || ''

  const siteName    = vertical?.seo_site_title || 'Immoralia'
  const description = vertical?.llm_txt_description ||
    'Immoralia es una publicación diaria sobre inteligencia artificial aplicada a procesos de empresa. Cubre herramientas, casos de uso reales y tendencias relevantes para founders, directores de operaciones y equipos que quieren aplicar IA en su negocio.'

  // Últimos 50 artículos publicados
  const { data: articulos } = await supabase
    .from('articulos')
    .select('titular, slug, meta_description')
    .eq('vertical_id', verticalId)
    .eq('estado', 'publicado')
    .eq('noindex', false)
    .order('fecha_publicacion', { ascending: false, nullsFirst: false })
    .limit(50)

  const articulosList = (articulos || [])
    .map(a =>
      `- [${a.titular}](${baseUrl}/blog/${a.slug})${
        a.meta_description ? ': ' + a.meta_description : ''
      }`
    )
    .join('\n')

  const content = `# ${siteName}

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

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
