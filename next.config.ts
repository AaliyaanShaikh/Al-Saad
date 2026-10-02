import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      { source: '/projects/autograph-residency', destination: '/projects/the-a-list-residences', permanent: true },
      { source: '/projects/g37-oshiwara', destination: '/projects/the-a-list-residences', permanent: true },
      { source: '/projects/vision-heights', destination: '/projects/the-a-list-residences', permanent: true },
      { source: '/projects/sky-gardens-jogeshwari-west', destination: '/projects/the-a-list-residences', permanent: true },
      { source: '/projects/aksa', destination: '/projects/designer-residences-jvlr', permanent: true },
      { source: '/projects/dream-india', destination: '/projects/boutique-tower-cafe-safar', permanent: true },
      { source: '/projects/paradigm-alaya', destination: '/projects/oshiwara-30-70', permanent: true },
      { source: '/projects/roswalt-zaiden', destination: '/projects/monolithic-andheri-west', permanent: true },
      { source: '/projects/sayba-noor-2', destination: '/projects/designer-residences-jvlr', permanent: true },
    ];
  },
};

export default nextConfig;
