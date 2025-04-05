/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindcss.com',
      },
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com', // You'll likely need this later for product images
      },
      // Add other allowed hostnames here
    ],
  },
};

module.exports = nextConfig;