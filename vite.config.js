import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' makes all asset paths relative, so the build works no matter
// what the GitHub Pages repo is called (user.github.io OR user.github.io/repo).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
