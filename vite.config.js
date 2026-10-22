import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // The display face is small enough to ship inside the stylesheet, which
    // removes the late font swap that shifted the hero marquee after paint.
    assetsInlineLimit: (filePath) => filePath.includes("big-shoulders-display-latin.woff2"),
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 3000,
  },
});
