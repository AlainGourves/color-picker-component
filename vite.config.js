import { defineConfig } from "vite";
import { format, resolve } from 'path'

export default defineConfig({
  css: {
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCaseOnly',
    },
  },

  build: {
    emptyOutDir: true,
    // lib: {
    //   entry: resolve(__dirname, 'js/color-picker.js'),
    //   formats: ['es']
    // },

    rollupOptions: {
      input: './js/color-picker.js',
      output: [
        {
          format: 'es',
          entryFileNames: '[name]-es.js',
          // file: 'dist/color-picker-es.js',
          // file: 'dist/color-picker.js',
        },
        {
          format: 'iife',
          entryFileNames: '[name]-iife.js',
          // file: 'dist/color-picker-iife.js',
        }
      ],
    }
  },
});