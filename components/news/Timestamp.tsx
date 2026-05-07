import { formatNewsTimestamp } from '@/lib/news-utils';

export default function Timestamp({
  date,
  className = '',
}: {
  date: string | null | undefined;
  className?: string;
}) {
  const t = formatNewsTimestamp(date);
  if (!t) return null;
  return (
    <span
      className={`inline-block uppercase ${className}`}
      style={{
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: '10px',
        letterSpacing: '0.18em',
      }}
    >
      {t}
    </span>
  );
}
