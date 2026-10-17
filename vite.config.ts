import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The app is deployed to GitHub Pages at /trinity-county-timer, so assets
// must be prefixed with that base path.
export default defineConfig({
  base: '/trinity-county-timer/',
  plugins: [react()],
  build: {
    // Keep the "build" output folder so the gh-pages deploy script still works.
    outDir: 'build',
  },
});
