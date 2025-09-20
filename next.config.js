/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better CSS handling
  experimental: {
    // Ensure CSS is processed correctly
    optimizeCss: false,
  },
  // Disable Next.js built-in PostCSS processing to use our own
  compiler: {
    // Let PostCSS handle all CSS processing
  },
  // Make sure CSS is processed in the correct order
  webpack: (config) => {
    return config
  },
  // Other settings
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
}

module.exports = nextConfig 