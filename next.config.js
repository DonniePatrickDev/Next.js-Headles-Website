module.exports = {
  swcMinify: true,
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(', '),
  },
  async redirects() {
    return [
      {
        source: '/blog/:path*',
        destination: '/news/:path*',
        permanent: false,
      },
      {
        source: '/coming-soon',
        destination: '/dha-access-is-coming-soon',
        permanent: false,
      },
    ]
  },
}
