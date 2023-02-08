import { defineConfig } from 'vite'
import postcss from './postcss.config.js'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/icp-editor/',
  plugins: [svelte()],
  css: {
    postcss,
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['/'],
    },
  },
})
