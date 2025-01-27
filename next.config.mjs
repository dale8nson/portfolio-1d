/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  transpilePackages: ['three'],
  webpack(config) {
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'application/wasm',
      use: 'file-loader'
    })
    return config;
  }
};

export default nextConfig;
