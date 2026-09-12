import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
    allowedDevOrigins: ['192.168.1.*'],

};



const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  // ⬇️ skipWaiting ko yahan workboxOptions ke andar rakhein
  workboxOptions: {
    skipWaiting: true,
  },
});
export default nextConfig;
