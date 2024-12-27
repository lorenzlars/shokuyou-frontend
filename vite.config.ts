import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path'
import * as fs from 'node:fs'

// Needed for Heroku PHP
function renameIndexPlugin(fileName?: string) {
  return {
    name: 'rename-index-plugin',
    closeBundle() {
      const distPath = path.resolve(__dirname, 'dist')
      const indexHtmlPath = path.join(distPath, 'index.html')
      const indexPhpPath = path.join(distPath, fileName ?? 'index.php')

      if (fs.existsSync(indexHtmlPath)) {
        fs.renameSync(indexHtmlPath, indexPhpPath)
        console.log('index.html wurde zu index.php umbenannt!')
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), UnoCSS(), renameIndexPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
})
