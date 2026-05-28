import type { Metadata } from 'next';
import Script from 'next/script';
import { TrackingInjector } from '@Immoral-marketing/motor-blog';

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
      <body style={{ margin: 0 }}>
        {children}
        {process.env.VERTICAL_ID && (
          <TrackingInjector verticalId={process.env.VERTICAL_ID} />
        )}

        {/* GTM — capa 2: cobertura completa del dominio */}
        {/* NEXT_PUBLIC_GTM_ID debe tener el mismo valor que 
            google_tag_manager_id configurado en el panel para esta vertical. */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script
            id="gtm-root"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
