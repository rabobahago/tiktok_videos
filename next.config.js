/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["gdurl.com", "lh3.googleusercontent.com"],
  },
  swcMinify: true,
};

module.exports = nextConfig;
