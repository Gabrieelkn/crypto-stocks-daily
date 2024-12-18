const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blogarticlesimages.s3.eu-central-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx"],
};

export default nextConfig;
