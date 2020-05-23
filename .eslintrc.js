module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  parser: "@typescript-eslint/parser",
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
  },
  plugins: [
    "@typescript-eslint"
  ]
}
