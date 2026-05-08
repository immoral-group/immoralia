export type Responsable = { slack_id: string; nombre: string }

export const vertical = {
  slug: 'immoralia',
  nombre: 'Immoralia',
  grupo: 'Immoral Group',
  tagline: 'IA aplicada a procesos de empresa. Lo que importa, cada día.',

  email: {
    from: 'newsletter@blog.immoralia.es',
    replyTo: 'hola@immoralia.es',
    colorPrimario: '#000000',
    colorFondo: '#0A0A0A',
    colorTexto: '#FFFFFF',
    asuntoPrefijo: 'Immoralia →',
    footerTexto: 'Estás recibiendo esto porque te suscribiste en immoralia.es',
    ctaTexto: 'Leer en el blog',
  },

  urls: {
    blog: process.env.NEXT_PUBLIC_BLOG_URL ?? 'https://immoralia.vercel.app/blog',
    app: process.env.NEXT_PUBLIC_APP_URL ?? 'https://immoralia.vercel.app',
  },

  responsables: [
    { slack_id: 'UNYGWKSSX', nombre: 'Marco' },
    { slack_id: 'UPA1UF672', nombre: 'Yure' },
    { slack_id: 'U08S85LCB2N', nombre: 'David' },
    { slack_id: 'U08S85N3398', nombre: 'Manel' },
  ] as Responsable[],

  validacion: {
    modo_prueba: true,
    voter_prueba_slack: 'U0AV6GP04LC',
  },
} as const
