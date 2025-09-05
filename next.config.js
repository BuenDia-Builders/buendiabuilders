/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "utf-8-validate": false,
      "bufferutil": false,
    };
    
    // Ignorar warnings específicos de Supabase
    config.ignoreWarnings = [
      /Critical dependency: the request of a dependency is an expression/,
    ];
    
    return config;
  },
};

module.exports = nextConfig;