import { defineConfig } from "vite";
import { resolve } from 'path'

export default defineConfig({
  css: {
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCaseOnly',
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'js/color-picker.js'),
      formats: ['es']
    },
  }
});