import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Immoralia',
  description: 'Immoralia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
