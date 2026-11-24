/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/guides/why-instagram-tiktok-facebook-links-open-in-app-browser",
        destination: "/guides/why-social-media-links-open-in-app-browser",
        permanent: true,
      },
      {
        source: "/guides/how-to-open-social-media-links-outside-in-app-browsers",
        destination: "/guides/why-social-media-links-open-in-app-browser",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
