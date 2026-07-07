import { NextResponse } from 'next/server'
import { getVerticalConfig } from '@/lib/vertical'

export const revalidate = 3600

export async function GET() {
  const vertical = await getVerticalConfig()
  const baseUrl  = process.env.NEXT_PUBLIC_APP_URL || ''

  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /preview/',
    `Sitemap: ${baseUrl}/sitemap.xml`,
  ]

  // El Catálogo de Procesos vive bajo /procesos (proyecto Vercel aparte, SPEC-20).
  // Su sitemap debe declararse aquí: los buscadores solo leen el robots.txt de
  // la raíz del dominio, no el de un subdirectorio.
  if (baseUrl === 'https://immoralia.es') {
    lines.push(`Sitemap: ${baseUrl}/procesos/sitemap.xml`)
  }

  const base = lines.join('\n')

  const content = vertical?.robots_extra_rules
    ? `${base}\n\n# Reglas adicionales\n${vertical.robots_extra_rules}`
    : base

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
