import type { NextConfig } from "next";
// import withPWAInit from "@ducanh2912/next-pwa";
import withPWA from "@ducanh2912/next-pwa";
// next.config.ts



const nextConfig: NextConfig = {
   turbopack: {}, 
  // reactStrictMode: true,
  //   allowedDevOrigins: ['https://riderfrontend-4ijzxlpq7-aalacode.vercel.app/*'],

};


export default withPWA({
  dest: "public",
    register: true,
  
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
// export default nextConfig;