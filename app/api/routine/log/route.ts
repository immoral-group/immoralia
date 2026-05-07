import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const fecha = searchParams.get('fecha') || new Date().toISOString().slice(0, 10)

  if (token !== process.env.NEWSLETTER_SEND_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabaseServer
    .from('routine_log')
    .select('*')
    .eq('fecha', fecha)
    .maybeSingle()

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ log: data })
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (token !== process.env.NEWSLETTER_SEND_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { fecha, estado, articulos_generados, detalle } = body

  const { error } = await supabaseServer
    .from('routine_log')
    .upsert(
      { fecha, estado, articulos_generados, detalle },
      { onConflict: 'fecha', ignoreDuplicates: true }
    )

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ ok: true })
}
