/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    typedRoutes: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5001/:path*',
      },
    ];
  },
  // Configuration de proxy équivalente (Next.js 13+ utilise rewrites)
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:5001',
  //     changeOrigin: true
  //   }
  // }
};
