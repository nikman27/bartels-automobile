/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bartels-automobile.de",
      },
      {
        protocol: "http",
        hostname: "bartels-automobile.de",
      },
    ],
  },
}

export default nextConfig
