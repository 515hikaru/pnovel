// eslint.config.js
import js from "@eslint/js"
import ts from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import jest from "eslint-plugin-jest"
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.ts", "src/__tests__/**/*.spec.ts"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      "jest": jest,
    },
    rules: {
      "no-irregular-whitespace": "off",
      "quotes": ["warn", "double"],
      "comma-dangle": ["warn", "always-multiline"],
      "semi": ["error", "never"],
      "space-before-function-paren": ["error", "never"],
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
    ignores: ["pnovel.js", "dist/*.js"],
  },
]
