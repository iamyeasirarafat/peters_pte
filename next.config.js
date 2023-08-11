
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            reactStrictMode: true,
            swcMinify: false,
        };
    }

    return {
        distDir: "build",
        reactStrictMode: true,
        swcMinify: false,
    };
};
