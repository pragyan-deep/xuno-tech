/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig 