const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      swcMinify: false,
      images: {
        domains: [
          "api.codebyamirus.link",
          "lh3.googleusercontent.com",
          "images.unsplash.com",
          "63.141.255.39",
        ],
      },
    };
  }

  return {
    distDir: "production",
    reactStrictMode: true,
    swcMinify: false,
    images: {
      domains: [
        "api.codebyamirus.link",
        "lh3.googleusercontent.com",
        "images.unsplash.com",
        "63.141.255.39",
      ],
    },
  };
};
