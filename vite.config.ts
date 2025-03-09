import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import 'dotenv/config';

const API_BASE_URL = process.env.VITE_API_BASE_URL as string;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]_[local]__[hash:base64:5]',
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
