import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import '../(blog)/blog-globals.css';
import BlogNavbar from '@/components/blog/BlogNavbar';
import BlogBackground from '@/components/blog/backgrounds/BlogBackgroundEditorial';
import VerticalPylon from '@/components/news/VerticalPylon';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Noticiero · Immoralia',
  description:
    'Noticiero diario de Immoralia. IA aplicada a procesos de empresa.',
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`blog-shell ${lexend.className}`}>
      <BlogBackground />
      <BlogNavbar />
      <VerticalPylon />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
