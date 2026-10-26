import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 960, 1200, 1440, 1920, 2048],
  },
  async redirects() {
    return [
      { source: "/dinner", destination: "/menus/dinner", permanent: true },
      { source: "/lunch", destination: "/menus/lunch", permanent: true },
      // TODO(hunter): /menus/dessert has no published items on the live site. Redirected until a dessert list exists.
      { source: "/menus/dessert", destination: "/menus/dinner", permanent: false },
    ];
  },
};

export default nextConfig;
