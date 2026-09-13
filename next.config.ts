import type { NextConfig } from "next";
// import withPWAInit from "@ducanh2912/next-pwa";
import withPWA from "@ducanh2912/next-pwa";
// next.config.ts



const nextConfig: NextConfig = {
  // reactStrictMode: true,
  //   allowedDevOrigins: ['https://riderfrontend-4ijzxlpq7-aalacode.vercel.app/*'],

};
// const withPWA = withPWAInit({
//   dest: "public",
//   disable: process.env.NODE_ENV === "development",
//   register: true,
//   // ⬇️ skipWaiting ko yahan workboxOptions ke andar rakhein
//   workboxOptions: {
//     skipWaiting: true,
//   },
// });

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
// export default nextConfig;
