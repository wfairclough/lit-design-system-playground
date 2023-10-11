import { defineConfig } from 'vite'
import { resolve } from 'path'
import postcssLit from 'rollup-plugin-postcss-lit';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/blueprintds.ts'),
      name: 'BlueprintDS',
      // the proper extensions will be added
      fileName: 'blueprintds',
    },
    rollupOptions: {
    },
  },
  plugins: [
    postcssLit(),
  ],
})
