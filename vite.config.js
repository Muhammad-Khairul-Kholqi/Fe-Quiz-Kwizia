import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Prerender from 'vite-plugin-prerender'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Prerender({
      staticDir: 'dist',
      routes: ['/', '/blog', '/leaderboard', '/faq', '/contact-us'],
    })
  ],
})
