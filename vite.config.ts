import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            // Pencocokan ketat untuk mengisolasi hanya library core react
            if (id.includes("/node_modules/react/") || id.includes("/node_modules/react-dom/") || id.includes("/node_modules/scheduler/")) {
              return "react-vendor";
            }

            if (id.includes("/node_modules/react-router/") || id.includes("/node_modules/react-router-dom/")) {
              return "router-vendor";
            }

            if (id.includes("@radix-ui")) {
              return "ui-vendor";
            }

            if (id.includes("overlayscrollbars")) {
              return "scroll-vendor";
            }

            // Library lainnya
            return "vendor";
          }

          // Data chunks memisahkan data JSON yang besar
          if (id.includes("/src/data/raw/album-overview")) {
            return "data-albums";
          }
          if (id.includes("/src/data/raw/artist-overview")) {
            return "data-artists";
          }
          if (id.includes("/src/data/raw/playlist-overview")) {
            return "data-playlists";
          }
          if (id.includes("/src/data/")) {
            return "data-core";
          }

          // Icon chunks
          if (id.includes("/components/encore/icons/")) {
            return "icons";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
