/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisations de performance
  experimental: {
    // Optimisations du serveur
    serverComponentsExternalPackages: ['@prisma/client'],
    
    // Optimisations du client
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
    
    // Optimisations du build
    webpackBuildWorker: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Optimisations des images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 an
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Optimisations du bundle
  webpack: (config, { dev, isServer }) => {
    // Optimisations de production
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };
    }

    // Optimisations pour les modules externes
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push('@prisma/client');
    }

    return config;
  },

  // Optimisations des headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=7200',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Optimisations des redirections
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ];
  },

  // Optimisations des rewrites
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },

  // Optimisations de la compression
  compress: true,

  // Optimisations du power
  poweredByHeader: false,

  // Optimisations de la génération statique
  output: 'standalone',
  generateEtags: true,
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },

  // Optimisations des environnements
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Optimisations des types
  typescript: {
    ignoreBuildErrors: false,
  },

  // Optimisations ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Optimisations de la production
  productionBrowserSourceMaps: false,
  
  // Optimisations du serveur
  serverRuntimeConfig: {
    // Configuration du serveur
  },
  
  publicRuntimeConfig: {
    // Configuration publique
  },
};

export default nextConfig;
