import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  images: {
    // domains: ["res.cloudinary.com","picsum.photos"],
    // formats: ["image/avif", "image/webp"],
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
