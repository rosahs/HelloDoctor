/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
       
        config.resolve.fallback = { fs: false, net: false, tls: false };
        return config;
    },
    images: {
        domains: ['example.com'],
    },
}

module.exports = nextConfig