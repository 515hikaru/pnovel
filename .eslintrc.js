module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    "jest/globals": true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["standard"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    "no-irregular-whitespace": 0,
    quotes: ["warn", "double"],
    "comma-dangle": ["warn", "always-multiline"],
    semi: ["error", "never"],
    "space-before-function-paren": ["error", "never"],
  },
  plugins: ["@typescript-eslint", "jest"],
}
