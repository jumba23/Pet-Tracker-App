/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        domain: "bytegrad.com",
      },
    ],
  },
};

export default nextConfig;
