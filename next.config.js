/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  ignoreBuildErrors: true,

  images: {
    domains: [
      "api.codebyamirus.link",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
