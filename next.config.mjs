const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // Skip linting and type checking during builds for faster compilation
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
};

export default nextConfig;
