import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // base: "/" is the standard for hosting at a root domain (Cloudflare Pages,
  // Netlify, your own domain). If you ever need to host from a subpath, change
  // this to "./" or to the subpath like "/lumina/".
  base: "/",
});
