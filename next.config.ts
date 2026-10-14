import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [384, 640, 960, 1400],
    imageSizes: [],
  },
  poweredByHeader: false,
};
export default nextConfig;
