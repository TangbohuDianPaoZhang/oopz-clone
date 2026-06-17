import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cy5cq6p0ww.ufs.sh",
        pathname: "/f/*",
      },
    ],
  }
};

export default nextConfig;
