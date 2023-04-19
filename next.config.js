// /** @type {import('next').NextConfig} */
// const (config, { isServer }) = {
//     reactStrictMode: true,
//     if(!isServer) {
//         config.node = {
//             fs: 'empty'
//         }
//     }
// }

// module.exports = nextConfig

module.exports = {
    reactStrictMode: true,
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },
};
