/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Temporairement ignorer les erreurs ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // Temporairement ignorer les erreurs TypeScript
  },
};
