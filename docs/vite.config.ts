import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  base: "/",
  appType: "spa",
  resolve: {
    alias: {
      "@finance-ui/components": resolve(__dirname, "../src/lib.ts"),
    },
  },
  build: {
    outDir: "dist",
  },
});
