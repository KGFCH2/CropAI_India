/// <reference types="node" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// Use root base in development for localhost, and repository base for production builds/preview
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
  return {
    plugins: [react()],
    // Use root base for dev and Vercel, GitHub Pages base for other production builds
    base: isDev || isVercel ? '/' : '/CropAI-India/',
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
