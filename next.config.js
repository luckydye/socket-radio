/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  assetPrefix: "./",
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
