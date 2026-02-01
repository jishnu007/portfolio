/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Performance optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['antd', 'react-icons', '@mdi/react', '@mdi/js'],
  },
  
  // Handle SVG imports and webpack optimizations
  webpack(config, { isServer }) {
    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    // Production optimizations
    if (!isServer) {
      // Split large vendor chunks
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for react/next
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Separate chunk for antd
            antd: {
              name: 'antd',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]antd[\\/]/,
              priority: 30,
            },
            // Separate chunk for react-icons
            icons: {
              name: 'icons',
              chunks: 'async',
              test: /[\\/]node_modules[\\/](react-icons|@mdi)[\\/]/,
              priority: 20,
            },
            // Common libraries
            lib: {
              test(module) {
                return (
                  module.size() > 50000 &&
                  /node_modules[/\\]/.test(module.identifier())
                );
              },
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )?.[1];
                return `lib.${packageName?.replace('@', '')}`;
              },
              priority: 10,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            // Shared code between pages
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 5,
            },
          },
        },
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;
