import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform',
      transformIndexHtml(html, { mode }) {
        if (mode === 'production') {
          // In production, prepend portfolio to paths
          return html.replace('src="/env.js"', 'src="/portfolio/env.js"')
                    .replace('src="/src/main.jsx"', 'src="/portfolio/src/main.jsx"');
        }
        return html;
      }
    }
  ],
  base: '/portfolio/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('configService.js')) {
            return 'config';
          }
        }
      }
    }
  }
});