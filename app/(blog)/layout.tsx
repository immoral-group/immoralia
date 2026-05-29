import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './blog-globals.css';
import BlogNavbar from '@/components/blog/BlogNavbar';
import Script from 'next/script';
import { getVerticalConfig } from '@/lib/vertical';
import { BlogConfigProvider } from '@Immoral-marketing/motor-blog/lib/BlogConfigContext';
import { blogConfig } from '@/lib/blog-config';
// 3 background variants. Swap the import below to try a different look.
//   - BlogBackgroundAurora     → editorial, calmada, una sola aurora superior
//   - BlogBackgroundStarfield  → estrellas con parallax sutil
//   - BlogBackgroundEditorial  → revista digital seria con grano y grid tenue
import BlogBackground from '@/components/blog/backgrounds/BlogBackgroundAurora';
import SubscribePopup from '@/components/blog/SubscribePopup';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Immoralia — IA aplicada a procesos de empresa',
  description:
    'La newsletter diaria de Immoralia sobre IA aplicada a procesos de empresa. Lo que importa, cada día.',
};

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const vertical = await getVerticalConfig();

  return (
    <BlogConfigProvider config={blogConfig}>
      <div className={`blog-shell ${lexend.className}`}>
        <BlogBackground />
        <BlogNavbar />
        <div className="relative z-10">{children}</div>
        <SubscribePopup />

        {/* Google Tag Manager */}
        {vertical?.google_tag_manager_id && (
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${vertical.google_tag_manager_id}');
              `,
            }}
          />
        )}

        {/* Google Analytics — solo si NO hay GTM */}
        {vertical?.google_analytics_id && !vertical?.google_tag_manager_id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${vertical.google_analytics_id}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${vertical.google_analytics_id}');
                `,
              }}
            />
          </>
        )}

        {/* Scripts custom: Hotjar, Clarity, Cookiebot, etc. */}
        {vertical?.custom_head_scripts && (
          <div
            style={{ display: 'none' }}
            dangerouslySetInnerHTML={{ __html: vertical.custom_head_scripts }}
          />
        )}
      </div>
    </BlogConfigProvider>
  );
}
