/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: "./",
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
