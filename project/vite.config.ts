import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Do NOT set `base` here for Vercel — default "/" is correct
});

