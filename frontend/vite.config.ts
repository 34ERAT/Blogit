import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    // exclude: [".vite/deps/chunk-D3CTEY32.js?v=642a5bf9"],
  },
  plugins: [react()],
});
