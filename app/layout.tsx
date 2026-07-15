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

        {/* GA4 directo (decisión 14/07/2026, sin GTM): la etiqueta que
            Google detectaba en immoralia.es reportaba a la propiedad
            compartida "procesos.immoralia.es" (el Catálogo), mezclando
            métricas. Propiedad GA4 nueva y dedicada para este vertical
            (landing + blog + news), mismo patrón que immoral.es e
            imcontent.es. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N6N9X2RGR4"
          strategy="afterInteractive"
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N6N9X2RGR4');
          ` }}
        />
      </body>
    </html>
  );
}
