/**
 * Editorial section divider — a heavy accent block + uppercase mono label.
 * Used to separate columns of stories in the news front page.
 */
export default function SectionLabel({
  label,
  count,
  accent = '#00ffff',
}: {
  label: string;
  count?: number;
  accent?: string;
}) {
  return (
    <header className="flex items-center justify-between border-b border-black/8 pb-4 mb-8">
      <div className="flex items-center gap-3">
        <span
          className="block w-3 h-3"
          style={{ background: accent }}
        />
        <h2
          className="uppercase text-black"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '12px',
            letterSpacing: '0.26em',
            fontWeight: 700,
          }}
        >
          {label}
        </h2>
      </div>
      {typeof count === 'number' && (
        <span
          className="text-black/40 uppercase"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '10px',
            letterSpacing: '0.22em',
          }}
        >
          {String(count).padStart(2, '0')} piezas
        </span>
      )}
    </header>
  );
}
