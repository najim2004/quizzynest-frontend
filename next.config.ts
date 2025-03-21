import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // যে কোনো ডোমেইন থেকে ইমেজ লোড করার জন্য
      },
    ],
  },
};

export default nextConfig;
