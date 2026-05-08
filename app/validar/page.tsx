import { supabaseServer } from '@/lib/supabase-server'
import { vertical } from '@/lib/vertical.config'
import VotingForm from './VotingForm'

function ErrorState({ message }: { message: string }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: vertical.email.colorFondo }}
    >
      <p
        className="text-center text-sm"
        style={{ color: vertical.email.colorTexto, opacity: 0.6 }}
      >
        {message}
      </p>
    </div>
  )
}

export default async function ValidarPage({
  searchParams,
}: {
  searchParams: { a?: string; v?: string }
}) {
  const articuloId = searchParams.a
  const voterSlack = searchParams.v

  if (!articuloId || !voterSlack) {
    return <ErrorState message="Enlace inválido" />
  }

  const esResponsable = vertical.responsables.some(
    (r) => r.slack_id === voterSlack
  )
  const esVoterPrueba = voterSlack === vertical.validacion.voter_prueba_slack
  const modoActivo = vertical.validacion.modo_prueba
    ? esVoterPrueba
    : esResponsable

  if (!modoActivo) {
    return <ErrorState message="No tienes acceso a esta validación" />
  }

  const { data: articulo } = await supabaseServer
    .from('articulos')
    .select('id, titular, slug, categoria, resumen_email, cuerpo, estado')
    .eq('id', articuloId)
    .single()

  if (!articulo) return <ErrorState message="Artículo no encontrado" />

  if (
    articulo.estado === 'publicado' ||
    articulo.estado === 'descartado'
  ) {
    return <ErrorState message="Este artículo ya fue procesado" />
  }

  const { data: votoExistente } = await supabaseServer
    .from('votos_articulos')
    .select('voto, puntuacion, nota_evaluador')
    .eq('articulo_id', articuloId)
    .eq('voter_slack', voterSlack)
    .maybeSingle()

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: vertical.email.colorFondo,
        color: vertical.email.colorTexto,
        fontFamily: 'Lexend, sans-serif',
      }}
    >
      <div className="max-w-lg mx-auto px-6 py-12">
        <p
          className="text-xs mb-10 uppercase tracking-widest"
          style={{ opacity: 0.3 }}
        >
          {vertical.nombre}
        </p>
        <VotingForm
          articulo={{
            id: articulo.id,
            titular: articulo.titular,
            categoria: articulo.categoria,
            resumen_email: articulo.resumen_email,
            cuerpo: articulo.cuerpo,
            slug: articulo.slug,
          }}
          voterSlack={voterSlack}
          existingVote={votoExistente ?? null}
        />
      </div>
    </main>
  )
}
