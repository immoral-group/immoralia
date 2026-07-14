import { NextResponse } from 'next/server'
import { getLlmsTxtContent } from '@/lib/llms-txt'

// force-dynamic: ruta nueva; verificado en imcontent.es que con solo
// `revalidate` el build inicial la deja devolviendo 404 cacheado.
export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET() {
  const content = await getLlmsTxtContent()

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
