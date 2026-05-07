import '../styles/index.css';

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ height: '100%' }}>{children}</div>;
}
