import type { NextConfig } from "next";
const nextConfig: NextConfig = { images: { remotePatterns: [{ protocol: "https", hostname: "unrush.com.br" }, { protocol: "https", hostname: "www.unrush.com.br" }] } };
export default nextConfig;