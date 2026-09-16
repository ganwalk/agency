import type { NextConfig } from "next";

// Export estático: HTML puro, GitHub Pages hoje, qualquer host amanhã.
// NEXT_PUBLIC_BASE_PATH só é definido no build do GitHub Pages ("/agency");
// em dev e num domínio próprio, fica vazio.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
