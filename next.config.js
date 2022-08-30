/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://tiktok-clone-b5pwtouq1-rabobahago.vercel.app/:path*",
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["gdurl.com", "lh3.googleusercontent.com"],
  },
  swcMinify: true,
};

module.exports = nextConfig;
