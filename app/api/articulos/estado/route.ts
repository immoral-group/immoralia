import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function POST(request: Request) {
  const body = await request.json()
  const { token, id, estado } = body

  if (token !== process.env.NEWSLETTER_SEND_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const estadosValidos = ['publicado', 'descartado', 'borrador']
  if (!estadosValidos.includes(estado)) {
    return NextResponse.json(
      { error: `Estado no válido. Usa: ${estadosValidos.join(', ')}` },
      { status: 400 }
    )
  }

  if (!id) {
    return NextResponse.json({ error: 'id es obligatorio' }, { status: 400 })
  }

  const { data, error } = await supabaseServer
    .from('articulos')
    .update({ estado })
    .eq('id', id)
    .select('id, titular, estado')
    .single()

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ ok: true, articulo: data })
}
