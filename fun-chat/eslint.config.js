import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import parser from "@typescript-eslint/parser";

export default [
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: "./tsconfig.json",
            },
        },
        plugins: {
            "@typescript-eslint": eslintPluginTypeScript,
            unicorn: eslintPluginUnicorn,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/explicit-function-return-type": "off",
            "unicorn/prefer-query-selector": "warn",
        },
    },
];
