import { categoryColors } from '@/lib/news-utils';

export default function CategoryBadge({
  categoria,
  size = 'sm',
}: {
  categoria: string | null;
  size?: 'sm' | 'md' | 'lg';
}) {
  if (!categoria) return null;
  const c = categoryColors(categoria);
  const sizes = {
    sm: 'text-[10px] px-2 py-1 tracking-[0.2em]',
    md: 'text-[11px] px-2.5 py-1.5 tracking-[0.22em]',
    lg: 'text-xs px-3 py-2 tracking-[0.24em]',
  } as const;

  return (
    <span
      className={`inline-flex items-center font-mono uppercase ${sizes[size]}`}
      style={{
        color: c.fg,
        background: c.bg,
        borderLeft: `2px solid ${c.fg}`,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontWeight: 500,
      }}
    >
      {categoria}
    </span>
  );
}
