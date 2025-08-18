/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [new URL('https://m.media-amazon.com/**')],
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
