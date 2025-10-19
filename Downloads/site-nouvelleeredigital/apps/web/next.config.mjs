/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Temporairement ignorer les erreurs ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // Temporairement ignorer les erreurs TypeScript
  },
  // Configuration pour Docker
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
  // Optimisations pour la production
  compress: true,
  poweredByHeader: false,
  // Configuration des images
  images: {
    domains: ['localhost'],
    unoptimized: true, // Pour Docker
  },
};
