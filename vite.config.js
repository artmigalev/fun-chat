import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths"; // Плагин для поддержки путей из tsconfig.json
import eslintPlugin from "vite-plugin-eslint";
// import svgr from "vite-plugin-svgr";

export default defineConfig({
  root: "./",
  base: "/fun-chat/",
  server: {
    port: 3000,
    // port: 4000,
    open: true,
    hmr: {
      overlay: true, // показывать ошибки в браузере
    },
    watch: {
      usePolling: true,
    },
  },
  optimizeDeps: {
    force: true, // принудительная оптимизация зависимостей
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },

  plugins: [
    tsconfigPaths(),
    eslintPlugin(),
    // svgr({
    //     exportAsDefault: false,
    //     svgo: true, // Оптимизация SVG
    //     svgoConfig: {
    //         plugins: [
    //             { removeViewBox: false }, // Сохраняем viewBox
    //         ],
    //     },
    // }),
  ],
});
