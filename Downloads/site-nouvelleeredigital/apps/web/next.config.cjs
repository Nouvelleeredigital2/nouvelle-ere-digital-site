/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisation des images
  images: {
    domains: ["nouvelle-ere-digital.fr", "localhost"],
    formats: ["image/webp", "image/avif"],
  },

  // Optimisations de performance
  experimental: {
    optimizeCss: true,
  },

  // Compression
  compress: true,

  // Headers de sécurité
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
