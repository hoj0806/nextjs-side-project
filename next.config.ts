import type { NextConfig } from "next";
const removeImports = require("next-remove-imports")();

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // 예시 옵션
  images: {
    domains: ["tllepbgrwlndhmwlcnqf.supabase.co"],
  },
};

module.exports = removeImports(nextConfig);

export default nextConfig;
