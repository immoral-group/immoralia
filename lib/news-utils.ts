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
  { fg: '#0891b2', bg: 'rgba(8,145,178,0.06)', border: 'rgba(8,145,178,0.30)' },   // cyan (teal-600)
  { fg: '#1d4ed8', bg: 'rgba(29,78,216,0.06)', border: 'rgba(29,78,216,0.30)' },   // blue (blue-700)
  { fg: '#047857', bg: 'rgba(4,120,87,0.06)', border: 'rgba(4,120,87,0.30)' },    // mint (emerald-700)
  { fg: '#b45309', bg: 'rgba(180,83,9,0.06)', border: 'rgba(180,83,9,0.30)' },    // amber (amber-700)
  { fg: '#be185d', bg: 'rgba(190,24,93,0.06)', border: 'rgba(190,24,93,0.30)' },   // pink (pink-700)
  { fg: '#6d28d9', bg: 'rgba(109,40,217,0.06)', border: 'rgba(109,40,217,0.30)' }, // purple (purple-700)
  { fg: '#be123c', bg: 'rgba(190,18,60,0.06)', border: 'rgba(190,18,60,0.30)' },   // coral (rose-700)
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
