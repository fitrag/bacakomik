/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'komikcast.la',
          },
        ],
      },
    eslint: {
        dirs: ['pages', 'components', 'layout'],
    },
};

export default nextConfig;
