import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "*googleusercontent.com",
        hostname: "picsum.photos",
        // port: "",
        // pathname: "/**",
      },
    ],
    qualities: [70, 90],
  },
};

export default nextConfig;
