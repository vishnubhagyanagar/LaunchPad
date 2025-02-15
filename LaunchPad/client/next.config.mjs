/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Cloudinary domain
        pathname: '/**', // Allows any path under this hostname
      },
    ],
  },
};

export default nextConfig;
