import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue3-admin-template/',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  plugins: [vue(), WindiCSS()],
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'http://ceshi13.dishait.cn',
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/,'')
    //   }
    // }
  }
})
