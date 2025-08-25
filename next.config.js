/** @type {import('next').NextConfig} */
// PRESERVED: Your existing bundle analyzer setup
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // PRESERVED: All your existing settings
  reactStrictMode: true,
  swcMinify: true,
  
  // ENHANCED: Image optimization with ad domains added
  images: {
    domains: [
      'img.youtube.com', 
      'i.ytimg.com',
      // NEW: Ad-related domains for better performance
      'googleads.g.doubleclick.net',
      'pagead2.googlesyndication.com'
    ],
    formats: ['image/webp', 'image/avif'],
    // NEW: Longer cache for better ad performance
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },
  
  // PRESERVED: Your compression and security settings
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
  
  // ENHANCED: Headers with ad optimization additions
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // PRESERVED: Your existing security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // NEW: Additional headers for better ad performance
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      // NEW: Cache optimization for static assets (better ad loading)
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // NEW: Cache images including potential ad images
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // NEW: SEO-friendly redirects (optional but good for ads)
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/download',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

// PRESERVED: Your existing export with bundle analyzer
module.exports = withBundleAnalyzer(nextConfig);