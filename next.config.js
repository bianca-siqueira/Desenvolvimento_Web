/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gera a versão estática do site na pasta "out" ao rodar "npm run build"
  output: "export",
  images: { unoptimized: true },
};

module.exports = nextConfig;
