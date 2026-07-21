import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite' // Importe loadEnv do 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// Passamos o 'mode' para o defineConfig para podermos usar no loadEnv
export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente baseadas no modo atual (dev/prod)
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [vue(), vueDevTools(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    test: {
      globals: true,
    },
    server: {
      proxy: {
        '^/api': {
          target: env.VITE_API_URI,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api\/products/, ''),
        },
      },
    },
  }
})
