/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@Immoral-marketing/motor-blog'],

  // SPEC-20 (Catálogo de Procesos): immoralia.es/procesos se sirve desde el
  // proyecto Vercel del catálogo (immoralia-hub), que tiene basePath '/procesos'.
  // Condicionado al host immoralia.es porque este repo puede desplegar otras
  // verticales (VERTICAL_ID) donde el rewrite no debe aplicar.
  async rewrites() {
    return [
      {
        source: '/procesos',
        has: [{ type: 'host', value: 'immoralia.es' }],
        destination: 'https://immoralia-hub.vercel.app/procesos',
      },
      {
        source: '/procesos/:path*',
        has: [{ type: 'host', value: 'immoralia.es' }],
        destination: 'https://immoralia-hub.vercel.app/procesos/:path*',
      },
    ];
  },
};

export default nextConfig;
