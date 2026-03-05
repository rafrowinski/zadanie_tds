import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
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
