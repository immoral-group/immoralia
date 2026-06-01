import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '../(blog)/blog-globals.css';
import BlogNavbar from '@/components/blog/BlogNavbar';
import BlogBackground from '@/components/blog/backgrounds/BlogBackgroundEditorial';
import VerticalPylon from '@/components/news/VerticalPylon';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'News · Immoralia',
  description:
    'News diario de Immoralia. IA aplicada a procesos de empresa.',
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`blog-shell ${roboto.className}`}>
      <BlogBackground />
      <BlogNavbar />
      <VerticalPylon />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
