import type { NextConfig } from "next";
import { imageOptimizer } from "next/dist/server/image-optimizer";
import { format } from "path";

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  poweredByHeader: false,

  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  images: {
    formats: ["image/avif", "image/webp"]
  },
};

export default nextConfig;