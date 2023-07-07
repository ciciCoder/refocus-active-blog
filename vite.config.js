import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === 'production'
      ? 'https://ciciCoder.github.io/refocus-active-blog/'
      : undefined,
  plugins: [react(), tailwindcss()],
});
