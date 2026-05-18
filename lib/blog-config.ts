import type { BlogConfig } from '@Immoral-marketing/motor-blog/lib/types'

export const blogConfig: BlogConfig = {
  siteName: 'Immoralia',

  nav: {
    logo: {
      src:  '/assets/670488ee96b1db32aac78994e494876f5d2bfc92.png',
      alt:  'Immoralia',
      href: '/',
    },
    cta: {
      text: 'Selector de procesos',
      href: 'https://procesos.immoralia.es/',
    },
    showBlogNewsToggle: true,
  },

  hero: {
    title:     'Lo que importa,',
    titleAlt:  'cada día',
    subtitle:  'Inteligencia artificial aplicada a procesos de empresa. Sin ruido. Sin hype. Solo lo que cambia algo en tu equipo esta semana.',
    frequency: 'Lunes a viernes',
  },

  cta: {
    badge:       'Newsletter diaria',
    title:       'Una noticia al día.',
    titleAlt:    'La que importa.',
    description: 'Sin ruido. Sin hype. Solo lo que cambia algo en tu empresa esta semana. Cancela cuando quieras.',
    compact: {
      title:       'Una noticia al día. La que importa.',
      description: 'Sin ruido. Sin hype. Cancela cuando quieras.',
    },
    stats: [
      'Lunes a viernes',
      '3 minutos de lectura',
      'Sin spam',
    ],
  },

  emptyState: {
    title:       'Próximamente',
    description: 'Estamos preparando la primera tirada. Suscríbete y recibe la primera noticia el día que salga.',
  },
}
