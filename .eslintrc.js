module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    "jest/globals": true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-irregular-whitespace": 0,
    quotes: ["warn", "double"],
    "comma-dangle": ["warn", "always-multiline"],
    semi: ["error", "never"],
    "space-before-function-paren": ["error", "never"],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": 0,
  },
  plugins: ["@typescript-eslint", "jest"],
}
