import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (token !== process.env.NEWSLETTER_SEND_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const hoy = new Date().toISOString().slice(0, 10)

  const { data, error } = await supabaseServer
    .from('articulos')
    .select('id, titular, slug, meta_description, resumen_email, categoria, fuente_original_url, fuente_original_medio, created_at')
    .eq('estado', 'borrador')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ borradores: data, fecha: hoy })
}
