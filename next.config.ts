import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // turbopack: {
  //   root: path.resolve(__dirname),
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:5290/api/:path*",
  //     },
  //   ];
  // },

  // images: {
  //   domains: [
  //     "localhost",
  //     "dev.jayatraders.devxtechnologies.com",
  //     "qa.jayatraders.devxtechnologies.com",
  //     "jayatraders.devxtechnologies.com",
  //   ],
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
