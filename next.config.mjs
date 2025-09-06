
/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["lucide-react"], // Fix for ESM packages.
};

export default config;

