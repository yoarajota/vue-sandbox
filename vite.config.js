import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  // Dinamic routes to components
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
