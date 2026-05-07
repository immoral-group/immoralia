import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function extractOgImage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Immoralia/1.0)' },
      signal: AbortSignal.timeout(5000)
    })
    const html = await response.text()
    const match = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i)
    return match ? match[1] : null
  } catch {
    return null
  }
}

async function backfillImages() {
  const { data: articulos, error } = await supabase
    .from('articulos')
    .select('id, titular, fuente_original_url, imagen_url')
    .is('imagen_url', null)
    .not('fuente_original_url', 'is', null)

  if (error) {
    console.error('Error consultando articulos:', error)
    return
  }

  if (!articulos || articulos.length === 0) {
    console.log('No hay articulos sin imagen.')
    return
  }

  console.log(`Procesando ${articulos.length} articulos sin imagen...`)

  for (const articulo of articulos) {
    process.stdout.write(`  → ${articulo.titular.slice(0, 60)}... `)
    const ogImage = await extractOgImage(articulo.fuente_original_url)

    if (ogImage) {
      await supabase
        .from('articulos')
        .update({ imagen_url: ogImage })
        .eq('id', articulo.id)
      console.log(`OK — ${ogImage.slice(0, 60)}`)
    } else {
      console.log('sin og:image')
    }

    // Pausa para no saturar las fuentes
    await new Promise(r => setTimeout(r, 500))
  }

  console.log('Backfill completado.')
}

backfillImages()
