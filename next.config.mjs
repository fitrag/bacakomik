/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'komikcast.la',
          },
          {
            protocol: 'https',
            hostname: 'komikcast01.com',
          },
          {
            protocol: 'https',
            hostname: 'sv1.imgkc1.my.id',
          },
          {
            protocol: 'https',
            hostname: 'sv2.imgkc2.my.id',
          },
          {
            protocol: 'https',
            hostname: 'sv3.imgkc3.my.id',
          },
          {
            protocol: 'https',
            hostname: 'sv4.imgkc4.my.id',
          },
          {
            protocol: 'https',
            hostname: 'sv5.imgkc5.my.id',
          },
          {
            protocol: 'https',
            hostname: 'sv6.imgkc6.my.id',
          },
          {
            protocol: 'https',
            hostname: 'sv7.imgkc7.my.id',
          },
        ],
      },
    eslint: {
        dirs: ['pages', 'components', 'layout'],
    },
};

export default nextConfig;
