import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  experimental : { 
    globalNotFound : true
  },
  cacheComponents: true,  
  images: {
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);