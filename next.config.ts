import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Avoid that Next tries to find the root directory (lockfiles outside the project).
    root: __dirname,
  },
};

export default nextConfig;
