import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths"; // Плагин для поддержки путей из tsconfig.json
import eslintPlugin from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";
export default defineConfig({
    root: "./",
    base: "./",
    mode: "development",
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: "./public",
        sourcemap: true,
    },
    resolve: {
        alias: {
            "@": "/src",
            "@component": "/src/component/component.ts",
            "@assets": "/src/assets",
        },
    },
    plugins: [
        tsconfigPaths(),
        eslintPlugin(),
        svgr({
            exportAsDefault: true,
        }),
    ],
});
