import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Skip static generation for authentication pages
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Skip problematic pages during static generation
  generateStaticParams: async () => {
    return [];
  },
};

export default nextConfig;
