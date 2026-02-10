import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths"; // Плагин для поддержки путей из tsconfig.json
import eslintPlugin from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";
export default defineConfig({
    root: "./",
    base: "fun-chat",
    mode: "development",
    server: {
        // port: 3000,
        port: 4000,
        open: true,
        hmr: true,
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
    plugins: [
        tsconfigPaths(),
        eslintPlugin(),
        svgr({
            exportAsDefault: true,
            svgo: true, // Оптимизация SVG
            svgoConfig: {
                plugins: [
                    { removeViewBox: false }, // Сохраняем viewBox
                ],
            },
        }),
    ],
});
