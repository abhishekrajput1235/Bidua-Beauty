import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
      include: ["three"], // 👈 Add this
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 👈 Add this
    },
  },
});
