import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "https://ucarecdn.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
