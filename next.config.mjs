/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/questionnaire-select",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
