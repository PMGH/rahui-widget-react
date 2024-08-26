import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    rollupOptions: {
      input: "src/main.tsx",
      output: {
        format: "iife",
        dir: "dist",
        entryFileNames: "bundle.js",
      },
    },
  },
});
