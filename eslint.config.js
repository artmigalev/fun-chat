import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import globals from "globals";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
    globalIgnores(["dist", "node_modules", ".git"]),

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
        },
        rules: {
            ...eslintPluginUnicorn.configs.recommended.rules,
            "unicorn/prevent-abbreviations": "off", // Отключаем
            "unicorn/better-regex": "warn",
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
                project: "./tsconfig.json",
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
