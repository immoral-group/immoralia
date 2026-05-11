'use server'

import { vertical } from '@/lib/vertical.config'

interface VotoPayload {
  articulo_id: string
  voter_slack: string
  voto: 'publicar' | 'descartar'
  puntuacion: number
  nota_evaluador?: string | null
}

export async function registrarVoto(payload: VotoPayload) {
  const token = process.env.NEWSLETTER_SEND_TOKEN
  if (!token) throw new Error('Token no configurado')

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/articulos/votar?token=${token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  )

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Error al registrar voto: ${error}`)
  }

  return res.json()
}
