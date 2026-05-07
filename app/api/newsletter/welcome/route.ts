import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseServer } from '@/lib/supabase-server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 })
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

    // Insertar suscriptor con vertical_id correcto
    const { error: suscriptorError } = await supabaseServer
      .from('suscriptores')
      .insert({
        email,
        vertical_id: vertical.id,
        estado: 'activo',
        fuente_captacion: 'blog'
      })

    // Si ya existe (23505 = unique violation) no es un error — seguimos
    if (suscriptorError && suscriptorError.code !== '23505') {
      return NextResponse.json({ error: suscriptorError.message }, { status: 500 })
    }

    // Enviar email de bienvenida
    const { error: emailError } = await resend.emails.send({
      from: 'Immoralia <newsletter@blog.immoralia.es>',
      to: email,
      subject: 'Ya estás dentro.',
      html: buildWelcomeEmail()
    })

    if (emailError) {
      return NextResponse.json({ error: emailError.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })

  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

function buildWelcomeEmail(): string {
  const blogUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://blog.immoralia.es'

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="background-color:#F3F3F5;font-family:Arial,sans-serif;color:#001156;margin:0;padding:0;">
  <div style="max-width:600px;margin:0 auto;background-color:#FFFFFF;">

    <div style="padding:40px 40px 32px;background:linear-gradient(to right,#001156,#05217A);border-bottom:3px solid #00CCCC;">
      <div style="font-size:28px;font-weight:900;letter-spacing:-1px;">
        <span style="color:#FFFFFF;text-decoration:line-through;">immoral</span><span style="color:#00CCCC;">ia</span>
      </div>
      <div style="font-size:13px;font-weight:300;color:rgba(255,255,255,0.6);margin-top:6px;">IA aplicada a procesos de empresa. Lo que importa, cada día.</div>
    </div>

    <div style="padding:48px 40px;">
      <h1 style="font-size:28px;font-weight:900;color:#001156;line-height:1.2;margin:0 0 16px;letter-spacing:-0.5px;">
        Ya estás dentro.
      </h1>
      <p style="font-size:16px;font-weight:300;color:#001156;line-height:1.7;margin:0 0 16px;">
        A partir de mañana recibirás una selección diaria de noticias sobre IA aplicada a procesos de empresa. Sin ruido. Sin hype. Solo lo que cambia algo en tu empresa esta semana.
      </p>
      <p style="font-size:16px;font-weight:300;color:#001156;line-height:1.7;margin:0 0 32px;">
        Cada newsletter incluye una pieza principal, una secundaria y un par de menciones breves. Lo lees en tres minutos. Lo que necesitas saber, nada más.
      </p>
      <a href="${blogUrl}" style="display:inline-block;background:#001156;color:#FFFFFF;font-family:Arial,sans-serif;font-size:14px;font-weight:400;padding:14px 32px;border-radius:10px;text-decoration:none;">
        Ver los últimos artículos →
      </a>
    </div>

    <div style="margin:0 40px;border-top:1px solid #F3F3F5;"></div>

    <div style="padding:32px 40px;background:#F3F3F5;text-align:center;">
      <div style="font-size:18px;font-weight:900;margin-bottom:8px;">
        <span style="color:#001156;text-decoration:line-through;">immoral</span><span style="color:#00CCCC;">ia</span>
      </div>
      <div style="font-size:12px;font-weight:300;color:rgb(113,113,130);line-height:1.6;margin-bottom:16px;">
        La newsletter diaria de Immoralia sobre IA aplicada a procesos de empresa.
      </div>
      <div style="font-size:11px;color:rgba(113,113,130,0.8);line-height:1.6;">
        Recibes este email porque te suscribiste en immoralia.es.<br>
        Immoral Group · España<br>
        <a href="#" style="color:rgba(113,113,130,0.8);">Cancelar suscripción</a>
      </div>
    </div>

  </div>
</body>
</html>`
}
