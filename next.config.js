/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig


// next.config.js
module.exports = {
    server: {
      // Certifique-se de que o servidor escute em todas as interfaces de rede
      host: '0.0.0.0',
      // Porta que você deseja usar (por padrão, é 3000)
      port: 3000,
    },
  }