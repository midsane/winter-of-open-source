/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Proxy Firebase Auth endpoints to make it same-origin
      {
        source: "/__/auth/:path*",
        has: [{ type: "header", key: "host", value: ".*" }],  // Match any host
        destination: "https://winter-of-open-source.firebaseapp.com/__/auth/:path*",  // ← YOUR PROJECT ID HERE
      },
      // Also proxy the iframe (critical for storage access)
      {
        source: "/__/firebase/:path*",
        has: [{ type: "header", key: "host", value: ".*" }],
        destination: "https://winter-of-open-source.firebaseapp.com/__/firebase/:path*",
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  async headers() {
    return [
      {
        source: "/:path*", // apply to every route
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
