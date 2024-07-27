/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
        pathname: "/img/logos/**",
      },
      {
        protocol: "https",
        hostname: "flowbite.com",
        pathname: "/docs/images/people/**",
      },
    ],
    domains: ['scontent.cdninstagram.com']
  },
};

export default nextConfig;
