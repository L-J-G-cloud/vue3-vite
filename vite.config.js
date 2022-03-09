import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// element-plus 的最新版按需引入
import ElementPlus from 'unplugin-element-plus/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

//引入gzip 压缩
import viteCompression from 'vite-plugin-compression'
//vant 的按需引入
import styleImport, { VantResolve } from 'vite-plugin-style-import';

export default defineConfig({
  plugins: [
    vue(),
    ElementPlus({
      importStyle: 'sass',
      useSource: true
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    styleImport({
      resolves: [VantResolve()],
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    
  ],
  // 全局css   //按需引入element-plus之后 全局的scss不生效,不知道为什么
  // css: {
  //   preprocessorOptions: { 
  //     scss: {
  //       additionalData: `@use "./src/var.scss" as *;`
  //     }
  //   }
  // },
  base: './',
  //静态资源服务的文件夹，默认public
  publicDir: 'public',
  // 打包时不生成.map文件
  productionSourceMap: false,
  externals: {
    vue: 'Vue'
  },
  // 静态资源打包处理
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
})
