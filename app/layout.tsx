import type { Metadata } from 'next';
import Script from 'next/script';
import { TrackingInjector } from '@Immoral-marketing/motor-blog';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://immoralia.es';
const title = 'Immoralia — Automatización de procesos con IA para empresas';
const description = 'Immoralia es la división técnica de Immoral: documentamos e implementamos automatizaciones con IA para que tu empresa funcione con menos fricción.';
const ogImage = 'https://cnulbzfqwfkqvfkmbnxj.supabase.co/storage/v1/object/public/imagenes-blog/logos/a6098271-219f-4b35-8a29-1fd28005ab61/logo.png';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title,
    description,
    url: baseUrl,
    siteName: 'Immoralia',
    images: [{ url: ogImage, alt: 'Immoralia' }],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: [ogImage],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Immoralia',
  url: baseUrl,
  logo: ogImage,
  description,
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Immoralia',
  url: baseUrl,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
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
