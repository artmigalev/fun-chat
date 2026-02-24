// import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import globals from "globals";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tsParser from "@typescript-eslint/parser";
import unusedImports from "eslint-plugin-unused-imports";




export default defineConfig([
    globalIgnores(["dist", "node_modules", ".git", "vite.config.js", "eslint.config.js", "public"]),

    // Подключаем все рекомендованные конфиги через spread
    ...tseslint.configs.recommended.map((config) => ({
        ...config,
        files: ["**/*.{js,ts}"],
    })),

    // Unicorn
    {
        files: ["**/*.{js,ts}"],
        plugins: {
            unicorn: eslintPluginUnicorn,
            "unused-imports": unusedImports,
        },
        rules: {
            ...eslintPluginUnicorn.configs.recommended.rules,
            "unicorn/prevent-abbreviations": "off", // Отключаем
            'unicorn/no-null': 'off',
            "unicorn/better-regex": "warn",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],
        },
    },

    // Ваши специфичные правила
    {
        files: ["**/*.{js,ts}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        rules: {
            "no-undef": "error",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
        },
        ignores: ["**/*.d.ts"],
    },
]);
