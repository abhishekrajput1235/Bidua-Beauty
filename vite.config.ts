import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
const VITE_BACKEND_URL = process.env.VITE_BACKEND_URL || "http://localhost:5000";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `${VITE_BACKEND_URL}/api/v1`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
    include: ["three"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
