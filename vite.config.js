import { defineConfig } from "vite";
import { format, resolve } from 'node:path';

export default defineConfig({
  css: {
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // toget rid of Dart SASS deprecation message !
      }
    }
  },

  build: {
    emptyOutDir: true,
    copyPublicDir: false,
    // Note: at the moment lib mode do not minify the ES build
    // See https://github.com/vitejs/vite/issues/6555
    // lib: {
    //   entry: [resolve(__dirname, 'js/color-picker.js')],
    //   name: 'ColorPicker',
    //   formats: ['es', 'iife'],
    //   fileName: (format, entryName) => `${entryName}-${format}.js`,
    // },

    rollupOptions: {
      input: './js/color-picker.js',
      output: [
        {
          format: 'es',
          entryFileNames: '[name]-es.js',
        },
        {
          format: 'iife',
          entryFileNames: '[name]-iife.js',
        }
      ],
    }
  },
});