/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: [
      'res.cloudinary.com',
      'lh3.googleusercontent.com'
    ]
  },
  experimental: {
    newNextLinkBehavior: true,
    images: {
      allowFutureImage: true,
    }
  }
}

module.exports = nextConfig
