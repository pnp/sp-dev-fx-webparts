import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    // Ensure libraries that check process.env.NODE_ENV get the production value
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  build: {
    sourcemap: true,
    // use terser for better dead-code elimination on some deps
    minify: 'terser',
    lib: {
      entry: "src/main.tsx",
      name: "PnpSamplesGallery",
      formats: ["iife"],
      fileName: () => "pnp-samples-gallery.js"
    }
  }
});
