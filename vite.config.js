import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths"; // Плагин для поддержки путей из tsconfig.json
import eslint from "vite-plugin-eslint2";

export default defineConfig({
    root: "./",
    base: "fun-chat",
    mode: "development",
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
        outDir: "./public",
        sourcemap: true,
    },
    resolve: {
        alias: {
            "@": "/src",
            "@component": "/src/app/components/**",
            "@utils": "/src/app/utils/**",
            "@home": "/src/pages/home/**",
            "@pages": "/src/pages/**",
        },
    },
    plugins: [tsconfigPaths(), eslint()],
    
});
