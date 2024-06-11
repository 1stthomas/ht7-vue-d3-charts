import { resolve } from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // src/indext.ts is where the exported component are
      entry: resolve(__dirname, "src/index.ts"),
      name: 'ht7d3ChartsForVue',
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
  // dts is needed to make the types available.
  plugins: [dts({ rollupTypes: true }), vue()],
  resolve: {
    alias: {
      // '@base': path.resolve(__dirname, '.'),
      '@components': resolve(__dirname, 'src', 'components'),
      '@assets': resolve(__dirname, 'src', 'assets'),
      '@scss-components': resolve(__dirname, 'src', 'assets', 'scss', 'components')
    }
  },
})
