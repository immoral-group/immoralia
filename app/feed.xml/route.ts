import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getVerticalConfig } from '@/lib/vertical'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const baseUrl    = process.env.NEXT_PUBLIC_APP_URL || ''
  const verticalId = process.env.VERTICAL_ID || ''
  const vertical   = await getVerticalConfig()
  const siteTitle  = vertical?.seo_site_title || 'Immoralia'
  const description = vertical?.llm_txt_description
    || 'Inteligencia artificial aplicada a procesos de empresa.'

  const { data: articulos, error } = await supabase
    .from('articulos')
    .select('titular, slug, meta_description, fecha_publicacion, created_at')
    .eq('vertical_id', verticalId)
    .eq('estado', 'publicado')
    .eq('noindex', false)
    .order('fecha_publicacion', { ascending: false, nullsFirst: false })
    .limit(50)

  if (error) {
    console.error('[feed.xml] Error al consultar articulos:', error.message)
  }

  const items = (articulos || [])
    .map(a => {
      const url  = `${baseUrl}/blog/${a.slug}`
      const date = new Date(a.fecha_publicacion || a.created_at).toUTCString()
      return `  <item>
    <title>${escapeXml(a.titular)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <pubDate>${date}</pubDate>
    ${a.meta_description ? `<description>${escapeXml(a.meta_description)}</description>` : ''}
  </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(siteTitle)}</title>
  <link>${baseUrl}/blog</link>
  <description>${escapeXml(description)}</description>
  <language>es</language>
  <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>
`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
