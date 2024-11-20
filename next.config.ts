import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "images.ctfassets.net",
        protocol: "https",
      },
    ],
  },
  experimental: {
    ppr: "incremental",
  },
};

export default nextConfig;
