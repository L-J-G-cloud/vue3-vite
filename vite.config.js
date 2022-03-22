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
// 引入多语言
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import path from 'path'

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
    vueI18n({
      include:path.resolve(__dirname,'./src/langs/**')
    })
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
  // 本地运行配置，及反向代理配置
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
        '/api': {
          target: 'http://192.168.31.64:8001',   //代理接口
          changeOrigin: true,
      }
    }
  }
})
