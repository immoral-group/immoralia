import { NextResponse } from 'next/server'
import { getVerticalConfig } from '@/lib/vertical'

export const revalidate = 3600

export async function GET() {
  const vertical = await getVerticalConfig()
  const baseUrl  = process.env.NEXT_PUBLIC_APP_URL || ''

  const base = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /preview/',
    `Sitemap: ${baseUrl}/sitemap.xml`,
  ].join('\n')

  const content = vertical?.robots_extra_rules
    ? `${base}\n\n# Reglas adicionales\n${vertical.robots_extra_rules}`
    : base

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
