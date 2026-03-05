import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: true,
      proxy: {
        '/api/currencybeacon': {
          target: 'https://api.currencybeacon.com/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/currencybeacon/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader(
                'Authorization',
                `Bearer ${env.CURRENCY_BEACON_API_KEY}`
              )
            })
          },
        },
      },
    },
  }
})
