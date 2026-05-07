import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

function validarPieza(pieza: any): string | null {
  if (!pieza.titular || typeof pieza.titular !== 'string') return 'Falta titular'
  if (!pieza.slug || typeof pieza.slug !== 'string') return 'Falta slug'
  if (!pieza.cuerpo || typeof pieza.cuerpo !== 'string') return 'Falta cuerpo'
  if (!pieza.categoria) return 'Falta categoria'
  if (!pieza.fuente_original_url) return 'Falta fuente_original_url'
  if (pieza.cuerpo.length < 100) return 'Cuerpo demasiado corto'
  return null
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (token !== process.env.NEWSLETTER_SEND_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      pieza_principal,
      pieza_secundaria,
      menciones_breves,
      fecha,
      hook_dia,
      asunto_email,
      preheader_email
    } = body

    // Validar estructura minima
    if (!pieza_principal) {
      return NextResponse.json({ error: 'Falta pieza_principal' }, { status: 400 })
    }

    const errorPrincipal = validarPieza(pieza_principal)
    if (errorPrincipal) {
      return NextResponse.json({ error: `pieza_principal invalida: ${errorPrincipal}` }, { status: 400 })
    }

    // Obtener vertical_id de Immoralia
    const { data: vertical } = await supabaseServer
      .from('verticales')
      .select('id')
      .eq('slug', 'immoralia')
      .single()

    if (!vertical) {
      return NextResponse.json({ error: 'Vertical no encontrada' }, { status: 404 })
    }

    const insertados = []
    const rechazados = []

    for (const [pieza, esPrincipal] of [[pieza_principal, true], [pieza_secundaria, false]]) {
      if (!pieza) continue

      const errorValidacion = validarPieza(pieza)
      if (errorValidacion) {
        rechazados.push({ titular: pieza.titular || 'sin titular', motivo: errorValidacion })
        continue
      }

      const { error } = await supabaseServer
        .from('articulos')
        .insert({
          vertical_id: vertical.id,
          titular: pieza.titular,
          slug: pieza.slug,
          meta_description: pieza.meta_description || null,
          resumen_email: pieza.resumen_email || null,
          cuerpo: pieza.cuerpo,
          categoria: pieza.categoria,
          estado: 'borrador',
          fuente_original_url: pieza.fuente_original_url,
          fuente_original_medio: pieza.fuente_original_medio || null,
          imagen_url: pieza.imagen_url || null,
          asunto_email: esPrincipal ? asunto_email : null,
          preheader_email: esPrincipal ? preheader_email : null,
          fecha_borrador: new Date().toISOString(),
        })

      if (error) {
        rechazados.push({ titular: pieza.titular, motivo: error.message })
      } else {
        insertados.push(pieza.titular)
      }
    }

    // Guardar menciones en menciones_breves
    if (menciones_breves && menciones_breves.length > 0) {
      const mencionesParaInsertar = menciones_breves.map((mencion: any) => ({
        fecha: fecha || new Date().toISOString().split('T')[0],
        titular: mencion.titular,
        url_fuente: mencion.fuente_url,
        descripcion_breve: mencion.resumen,
        vertical_id: vertical.id,
      }))

      const { error: errorMenciones } = await supabaseServer
        .from('menciones_breves')
        .insert(mencionesParaInsertar)

      if (errorMenciones) {
        console.error('Error insertando menciones:', errorMenciones)
      }
    }

    return NextResponse.json({
      ok: true,
      insertados,
      rechazados,
      total_insertados: insertados.length,
      total_rechazados: rechazados.length
    })

  } catch (error) {
    console.error('Error en ingest:', error)
    return NextResponse.json({ error: 'Error interno procesando articulos' }, { status: 500 })
  }
}
