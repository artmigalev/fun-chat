import js from "@eslint/js";
import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import globals from "globals";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default defineConfig([
    globalIgnores(["dist", "node_modules", ".git"]),
    eslint.configs.recommended,
    tseslint.configs.recommended,
    eslintPluginUnicorn.configs.recommended,
    {
        files: ["**/*.{js,ts}"],
        extends: [js.configs.recommended],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: "./tsconfig.json",
            },
            ecmaVersion: 2020,
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },

        rules: {
            "unicorn/better-regex": "warn",
            "no-undef": "error",
            "no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
    },
]);
