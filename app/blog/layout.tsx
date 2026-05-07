import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './blog-globals.css';
import BlogNavbar from '@/components/blog/BlogNavbar';
// 3 background variants. Swap the import below to try a different look.
//   - BlogBackgroundAurora     → editorial, calmada, una sola aurora superior
//   - BlogBackgroundStarfield  → estrellas con parallax sutil
//   - BlogBackgroundEditorial  → revista digital seria con grano y grid tenue
import BlogBackground from '@/components/blog/backgrounds/BlogBackgroundAurora';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Immoralia — IA aplicada a procesos de empresa',
  description:
    'La newsletter diaria de Immoralia sobre IA aplicada a procesos de empresa. Lo que importa, cada día.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`blog-shell ${lexend.className}`}>
      <BlogBackground />
      <BlogNavbar />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
