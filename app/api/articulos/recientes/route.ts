import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (token !== process.env.NEWSLETTER_SEND_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const hace7dias = new Date()
  hace7dias.setDate(hace7dias.getDate() - 7)

  const { data, error } = await supabase
    .from('articulos')
    .select('titular, meta_description, cuerpo, categoria, fuente_original_url, fuente_original_medio, fecha_publicacion')
    .gte('fecha_publicacion', hace7dias.toISOString())
    .order('fecha_publicacion', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Error consultando articulos' }, { status: 500 })
  }

  const articulosTruncados = (data || []).map(a => ({
    titular: a.titular,
    meta_description: a.meta_description,
    extracto: a.cuerpo ? a.cuerpo.replace(/<[^>]*>/g, '').slice(0, 600) : null,
    fuente_original_url: a.fuente_original_url,
    fuente_original_medio: a.fuente_original_medio,
    fecha_publicacion: a.fecha_publicacion
  }))

  return NextResponse.json({ articulos: articulosTruncados })
}
