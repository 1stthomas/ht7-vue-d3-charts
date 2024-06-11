import * as path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, 'lib/main.js'),
      name: 'ht7 d3 charts for vue',
      // the proper extensions will be added
      fileName: 'ht7-vue-d3-charts',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@assets/scss/variables";
          `
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      // '@base': path.resolve(__dirname, '.'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@assets': path.resolve(__dirname, 'src', 'assets'),
      '@scss-components': path.resolve(__dirname, 'src', 'assets', 'scss', 'components')
    }
  },
})
