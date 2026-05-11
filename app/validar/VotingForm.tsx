'use client'

import { useState } from 'react'
import { registrarVoto } from './actions'

interface VotingFormProps {
  articulo: {
    id: string
    titular: string
    categoria: string
    resumen_email: string
    cuerpo: string
    slug: string
  }
  voterSlack: string
  existingVote?: {
    voto: 'publicar' | 'descartar'
    puntuacion: number
    nota_evaluador: string | null
  } | null
}

export default function VotingForm({
  articulo,
  voterSlack,
  existingVote,
}: VotingFormProps) {
  const [puntuacion, setPuntuacion] = useState<number | null>(
    existingVote?.puntuacion ?? null
  )
  const [nota, setNota] = useState(existingVote?.nota_evaluador ?? '')
  const [estado, setEstado] = useState<'idle' | 'voted' | 'loading'>(
    existingVote ? 'voted' : 'idle'
  )
  const [votoRegistrado, setVotoRegistrado] = useState<string | null>(
    existingVote?.voto ?? null
  )
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(voto: 'publicar' | 'descartar') {
    if (puntuacion === null) {
      setError('Selecciona una puntuación para continuar')
      return
    }
    setError(null)
    setEstado('loading')
    try {
      await registrarVoto({
        articulo_id: articulo.id,
        voter_slack: voterSlack,
        voto,
        puntuacion,
        nota_evaluador: nota.trim() || null,
      })
      setVotoRegistrado(voto)
      setEstado('voted')
    } catch {
      setError('Error al registrar el voto. Intenta de nuevo.')
      setEstado('idle')
    }
  }

  if (estado === 'voted' && votoRegistrado) {
    return (
      <div>
        <p className="text-xs uppercase tracking-widest mb-2" style={{ opacity: 0.4 }}>
          {articulo.categoria}
        </p>
        <h1 className="text-2xl font-bold mb-8 leading-snug">
          {articulo.titular}
        </h1>
        <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ opacity: 0.3 }}>
            Tu evaluación
          </p>
          <p className="text-sm mb-1">
            Voto: <span className="font-semibold capitalize">{votoRegistrado}</span>
          </p>
          <p className="text-sm mb-1">
            Puntuación: <span className="font-semibold">{puntuacion} / 5</span>
          </p>
          {nota && (
            <p className="text-sm mt-2" style={{ opacity: 0.6 }}>"{nota}"</p>
          )}
          <button
            onClick={() => setEstado('idle')}
            className="mt-6 text-xs underline underline-offset-2"
            style={{ opacity: 0.4 }}
          >
            Editar evaluación
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-widest mb-2" style={{ opacity: 0.4 }}>
        {articulo.categoria}
      </p>
      <h1 className="text-2xl font-bold mb-6 leading-snug">
        {articulo.titular}
      </h1>

      <div
        className="prose prose-sm max-w-none mb-10"
        style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.7' }}
        dangerouslySetInnerHTML={{ __html: articulo.cuerpo }}
      />

      <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <p className="text-xs uppercase tracking-widest mb-4 text-center" style={{ opacity: 0.3 }}>
          Evalúa este artículo
        </p>

        <div className="flex justify-center gap-3 mb-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => { setPuntuacion(n); setError(null) }}
              style={{
                width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                fontSize: '0.875rem',
                fontWeight: puntuacion === n ? 700 : 400,
                backgroundColor: puntuacion === n ? 'white' : 'transparent',
                color: puntuacion === n ? 'black' : 'rgba(255,255,255,0.4)',
                border: puntuacion === n ? 'none' : '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {n}
            </button>
          ))}
        </div>
        <p className="text-xs text-center mb-6" style={{ opacity: 0.3 }}>
          Calidad del contenido
        </p>

        <textarea
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          placeholder="Añade una nota (opcional)"
          rows={3}
          maxLength={500}
          style={{
            width: '100%', backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem',
            padding: '0.75rem', color: 'white', fontSize: '0.875rem',
            resize: 'none', marginBottom: '1.5rem', fontFamily: 'Lexend, sans-serif',
          }}
        />

        {error && (
          <p style={{ color: '#f87171', fontSize: '0.75rem', textAlign: 'center', marginBottom: '1rem' }}>
            {error}
          </p>
        )}

        {puntuacion === null && !error && (
          <p className="text-xs text-center mb-4" style={{ opacity: 0.3 }}>
            Selecciona una puntuación para continuar
          </p>
        )}

        <button
          onClick={() => handleSubmit('publicar')}
          disabled={puntuacion === null || estado === 'loading'}
          style={{
            width: '100%', padding: '1rem', borderRadius: '0.5rem',
            fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem',
            cursor: puntuacion !== null ? 'pointer' : 'not-allowed',
            backgroundColor: puntuacion !== null ? 'white' : 'rgba(255,255,255,0.2)',
            color: puntuacion !== null ? 'black' : 'rgba(255,255,255,0.3)',
            border: 'none', transition: 'all 0.15s', fontFamily: 'Lexend, sans-serif',
          }}
        >
          ✓ Publicar
        </button>
        <button
          onClick={() => handleSubmit('descartar')}
          disabled={puntuacion === null || estado === 'loading'}
          style={{
            width: '100%', padding: '1rem', borderRadius: '0.5rem',
            fontSize: '0.875rem',
            cursor: puntuacion !== null ? 'pointer' : 'not-allowed',
            backgroundColor: 'transparent',
            color: puntuacion !== null ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)',
            border: puntuacion !== null ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.15s', fontFamily: 'Lexend, sans-serif',
          }}
        >
          ✗ Descartar
        </button>
      </div>
    </div>
  )
}
