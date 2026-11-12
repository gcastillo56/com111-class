import type { NextConfig } from "next";
import path from 'node:path';

const BACKEND_URL = process.env.BACKEND_INTERNAL_URL || 'http://localhost:4000';
const MONOREPO_ROOT = path.resolve(__dirname, '../../');

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/shared'],

  // Proxy /api/* requests to the Express backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  outputFileTracingRoot: MONOREPO_ROOT,
  turbopack: {
    root: MONOREPO_ROOT,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
