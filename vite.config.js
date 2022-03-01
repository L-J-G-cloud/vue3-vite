import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import styleImport, { VantResolve } from 'vite-plugin-style-import';
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  // 全局css 
  css: {
    preprocessorOptions: { 
      scss: {
        additionalData: "@import './src/var.scss';"
      }
    }
  },
  base: './',
  //静态资源服务的文件夹，默认public
  publicDir: 'public',
})
