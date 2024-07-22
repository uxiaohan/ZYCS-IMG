import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 按需引入
import { vitePluginForArco } from '@arco-plugins/vite-vue'

export default defineConfig({
  plugins: [vue(), vitePluginForArco()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { host: '0.0.0.0' },
  base: "./"
})
