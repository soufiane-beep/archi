import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.premierart.be",
        pathname: "/assets/img/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/uploads/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
