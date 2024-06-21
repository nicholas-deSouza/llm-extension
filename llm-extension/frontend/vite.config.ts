import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
process.env.BROWSER = "arc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
});
