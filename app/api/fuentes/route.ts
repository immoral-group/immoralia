import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (token !== process.env.NEWSLETTER_SEND_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: vertical } = await supabase
    .from('verticales')
    .select('id')
    .eq('slug', 'immoralia')
    .single()

  if (!vertical) {
    return NextResponse.json({ error: 'Vertical no encontrada' }, { status: 404 })
  }

  const { data, error } = await supabase
    .from('fuentes')
    .select('nombre, url, tipo')
    .eq('activa', true)
    .eq('vertical_id', vertical.id)
    .order('tipo', { ascending: true })

  if (error) {
    return NextResponse.json({ error: 'Error consultando fuentes' }, { status: 500 })
  }

  return NextResponse.json({ fuentes: data || [] })
}