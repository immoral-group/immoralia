import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { token } = await request.json()
    if (token !== process.env.NEWSLETTER_SEND_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)

    const { data: articulos, error: articulosError } = await supabase
      .from('articulos')
      .select('*')
      .eq('estado', 'publicado')
      .gte('fecha_publicacion', hoy.toISOString())
      .order('fecha_publicacion', { ascending: false })

    if (articulosError) throw articulosError
    if (!articulos || articulos.length === 0) {
      return NextResponse.json({ error: 'No hay articulos publicados hoy' }, { status: 404 })
    }

    const { data: suscriptores, error: suscriptoresError } = await supabase
      .from('suscriptores')
      .select('email')
      .eq('estado', 'activo')

    if (suscriptoresError) throw suscriptoresError
    if (!suscriptores || suscriptores.length === 0) {
      return NextResponse.json({ error: 'No hay suscriptores activos' }, { status: 404 })
    }

    const principal = articulos[0]
    const secundaria = articulos[1] || null
    const blogUrl = process.env.NEXT_PUBLIC_BLOG_URL || 'https://immoralia-blog.vercel.app/blog'

    // Recoger menciones del dia de hoy
    const fechaHoy = new Date().toLocaleDateString('en-CA') // formato YYYY-MM-DD en hora local

    const { data: mencionesHoy } = await supabase
      .from('menciones_breves')
      .select('titular, url_fuente, descripcion_breve')
      .eq('fecha', fechaHoy)
      .order('created_at', { ascending: true })

    const menciones = (mencionesHoy || []).map(m => ({
      titular: m.titular,
      fuente_url: m.url_fuente,
      resumen: m.descripcion_breve,
    }))

    console.log('Fecha buscada:', fechaHoy)
    console.log('Menciones encontradas:', mencionesHoy?.length, JSON.stringify(mencionesHoy))

    const emailHtml = buildEmail(principal, secundaria, menciones, blogUrl)

    const resultados = await Promise.allSettled(
      suscriptores.map(s =>
        resend.emails.send({
          from: 'Immoralia <newsletter@blog.immoralia.es>',
          to: s.email,
          subject: principal.asunto_email || principal.titular,
          html: emailHtml,
        })
      )
    )

    const enviados = resultados.filter(r => r.status === 'fulfilled').length
    const fallidos = resultados.filter(r => r.status === 'rejected').length

    await supabase.from('newsletter_envios').insert({
      vertical_id: principal.vertical_id,
      fecha_envio: new Date().toISOString(),
      asunto: principal.asunto_email,
      preheader: principal.preheader_email,
      base_size: suscriptores.length,
    })

    return NextResponse.json({ ok: true, enviados, fallidos, suscriptores: suscriptores.length })

  } catch (error) {
    console.error('Error enviando newsletter:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

function buildEmail(principal: any, secundaria: any | null, menciones: any[], blogUrl: string): string {

  const secundariaHtml = secundaria ? `
    <div style="padding:32px 40px;background:#FFFFFF;border-bottom:1px solid #F3F3F5;">
      <div style="font-size:11px;font-weight:500;color:#00CCCC;text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;">También hoy</div>
      <div style="background:#F3F3F5;border:1px solid rgba(0,17,86,0.1);border-radius:12px;padding:24px;">
        <span style="display:inline-block;background:rgba(0,17,86,0.08);color:#001156;font-size:11px;padding:6px 14px;border-radius:20px;border:1px solid rgba(0,17,86,0.15);margin-bottom:14px;">${secundaria.categoria}</span>
        <div style="font-size:17px;font-weight:700;color:#001156;line-height:1.3;margin-bottom:12px;">${secundaria.titular}</div>
        <div style="font-size:14px;font-weight:300;color:rgb(113,113,130);line-height:1.7;margin-bottom:20px;">${secundaria.resumen_email || secundaria.meta_description}</div>
        <a href="${blogUrl}/${secundaria.slug}" style="color:#001156;font-size:14px;font-weight:500;text-decoration:none;">Leer →</a>
      </div>
    </div>` : ''

  const mencionesHtml = menciones.length > 0 ? `
    <div style="padding:32px 40px;background:#FFFFFF;border-bottom:1px solid #F3F3F5;">
      <div style="font-size:11px;font-weight:500;color:rgb(113,113,130);text-transform:uppercase;letter-spacing:2px;margin-bottom:20px;">Esto también pasa hoy</div>
      ${menciones.map(m => `
        <div style="padding:14px 0;border-bottom:1px solid #F3F3F5;">
          <div style="font-size:13px;font-weight:300;color:rgb(113,113,130);line-height:1.5;">
            <a href="${m.fuente_url}" style="color:#001156;text-decoration:none;font-weight:500;">${m.titular}</a> — ${m.resumen}
          </div>
        </div>`).join('')}
    </div>` : ''

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

    <div style="padding:32px 40px;background:#FFFFFF;border-bottom:1px solid #F3F3F5;">
      <p style="font-size:16px;font-weight:400;color:#001156;line-height:1.7;margin:0;">${principal.hook_dia || ''}</p>
    </div>

    <div style="padding:32px 40px;background:#FFFFFF;border-bottom:1px solid #F3F3F5;">
      <div style="font-size:11px;font-weight:500;color:#00CCCC;text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;">Hoy</div>
      <div style="background:linear-gradient(to right,#001156,#05217A);border-radius:12px;padding:28px;">
        <span style="display:inline-block;background:rgba(0,255,255,0.15);color:#00CCCC;font-size:11px;padding:6px 14px;border-radius:20px;border:1px solid rgba(0,255,255,0.3);margin-bottom:14px;">${principal.categoria}</span>
        <div style="font-size:20px;font-weight:700;color:#FFFFFF;line-height:1.3;margin-bottom:12px;">${principal.titular}</div>
        <div style="font-size:14px;font-weight:300;color:rgba(255,255,255,0.7);line-height:1.7;margin-bottom:20px;">${principal.resumen_email || principal.meta_description}</div>
        <a href="${blogUrl}/${principal.slug}" style="color:#00CCCC;font-size:14px;font-weight:500;text-decoration:none;">Leer →</a>
      </div>
    </div>

    ${secundariaHtml}

    ${mencionesHtml}

    <div style="padding:32px 40px;background:#FFFFFF;border-bottom:1px solid #F3F3F5;text-align:center;">
      <a href="${blogUrl}" style="display:inline-block;background:#001156;color:#FFFFFF;font-family:Arial,sans-serif;font-size:14px;padding:14px 32px;border-radius:10px;text-decoration:none;">Ver todos los artículos</a>
    </div>

    <div style="padding:32px 40px;background:#F3F3F5;text-align:center;">
      <div style="font-size:18px;font-weight:900;margin-bottom:8px;">
        <span style="color:#001156;text-decoration:line-through;">immoral</span><span style="color:#00CCCC;">ia</span>
      </div>
      <div style="font-size:12px;font-weight:300;color:rgb(113,113,130);line-height:1.6;margin-bottom:16px;">
        La newsletter diaria de Immoralia sobre IA aplicada a procesos de empresa.
      </div>
      <div style="font-size:12px;color:rgb(113,113,130);margin-bottom:16px;">
        <a href="${blogUrl}" style="color:rgb(113,113,130);text-decoration:none;margin:0 8px;">Blog</a>
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
