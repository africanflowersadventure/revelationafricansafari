
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.revelationafricansafari.com",
          },
        ],
        destination: "https://revelationafricansafari.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
