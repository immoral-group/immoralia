// News-style date formatting & category color hashing.

export type Articulo = {
  id: string;
  titular: string;
  slug: string;
  meta_description: string | null;
  imagen_url: string | null;
  categoria: string | null;
  fecha_publicacion: string | null;
};

const MONTHS_ES_SHORT = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

/**
 * Editorial-style timestamp:
 *   < 1h:    "HACE 32 MIN"
 *   < 24h:   "HACE 6 H"
 *   yesterday: "AYER"
 *   < 7 days: "HACE 3 D"
 *   else:    "5 MAY 2026"
 */
export function formatNewsTimestamp(d: string | null | undefined): string {
  if (!d) return '';
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return '';
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'AHORA';
  if (diffMin < 60) return `HACE ${diffMin} MIN`;
  if (diffHour < 24) return `HACE ${diffHour} H`;
  if (diffDay === 1) return 'AYER';
  if (diffDay < 7) return `HACE ${diffDay} D`;

  const day = date.getDate();
  const month = MONTHS_ES_SHORT[date.getMonth()];
  const year = date.getFullYear();
  const sameYear = year === now.getFullYear();
  return sameYear ? `${day} ${month}` : `${day} ${month} ${year}`;
}

/** Long human date, e.g. "5 may, 14:32" */
export function formatNewsLongDate(d: string | null | undefined): string {
  if (!d) return '';
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return '';
  return date
    .toLocaleString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace('.', '');
}

/**
 * Deterministic color for a category. Same categoria string always returns
 * the same color (so the palette is stable across pages).
 */
const CATEGORY_PALETTE = [
  { fg: '#00ffff', bg: 'rgba(0,255,255,0.08)', border: 'rgba(0,255,255,0.35)' },   // cyan
  { fg: '#3B80DF', bg: 'rgba(59,128,223,0.10)', border: 'rgba(59,128,223,0.40)' }, // blue
  { fg: '#6EE7B7', bg: 'rgba(110,231,183,0.08)', border: 'rgba(110,231,183,0.35)' }, // mint
  { fg: '#FBBF24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.35)' },   // amber
  { fg: '#F472B6', bg: 'rgba(244,114,182,0.08)', border: 'rgba(244,114,182,0.35)' }, // pink
  { fg: '#A78BFA', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.35)' }, // purple
  { fg: '#FB7185', bg: 'rgba(251,113,133,0.08)', border: 'rgba(251,113,133,0.35)' }, // coral
];

export function categoryColors(categoria: string | null | undefined) {
  if (!categoria) return CATEGORY_PALETTE[0];
  let h = 0;
  for (let i = 0; i < categoria.length; i++) h = (h * 31 + categoria.charCodeAt(i)) >>> 0;
  return CATEGORY_PALETTE[h % CATEGORY_PALETTE.length];
}

/** ~220 words per minute reading rate */
export function readingMinutesFromHtml(html: string | null | undefined): number {
  if (!html) return 1;
  const text = html.replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
