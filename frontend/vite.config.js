import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://zupna-stranica-sibenik-b.onrender.com", // Proxy preusmjerava "/api" na backend
    },
  },
});
