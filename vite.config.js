import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// A relative base works for username.github.io, username.github.io/repo-name and custom domains.
// Navigation uses #/ routes, so refreshing a page never gives a 404 on GitHub Pages.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});
