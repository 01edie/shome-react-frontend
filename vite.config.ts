import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Sandhyamita Home 2",
        short_name: "SHOME",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\.(?:js|css|html|png|jpg|svg|webp|ico)$/, // Static assets
            handler: "CacheFirst", // Cache assets first
            options: {
              cacheName: "static-assets",
              expiration: {
                maxEntries: 100, // Maximum files in the cache
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache duration: 30 days
              },
            },
          },
        ],
        // maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // Allow files up to 3 MiB
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("exceljs")) {
              return "exceljs";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
